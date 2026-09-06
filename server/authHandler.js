import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'karigar_secret_jwt_artisan_2026_key';
const JWT_EXPIRES_IN = '7d';

/**
 * Strips sensitive fields like passwordHash from user object
 */
function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

/**
 * Extract token from Authorization header or cookie
 */
function extractToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

/**
 * Main request router for /api/auth/*
 */
export async function handleAuthRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method.toUpperCase();

  // Helper for JSON response
  const jsonResponse = (statusCode, data) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  // Helper for reading JSON body
  const parseBody = () => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 1e6) {
          req.connection.destroy();
          reject(new Error('Body too large'));
        }
      });
      req.on('end', () => {
        if (!body) {
          resolve({});
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error('Invalid JSON'));
        }
      });
      req.on('error', reject);
    });
  };

  try {
    // -------------------------------------------------------------
    // POST /api/auth/signup
    // -------------------------------------------------------------
    if (pathname === '/api/auth/signup' && method === 'POST') {
      const body = await parseBody();
      const {
        fullName,
        email,
        mobile,
        password,
        confirmPassword,
        craftType,
        state,
        district,
        yearsOfExperience,
        businessName,
        giTagNumber,
        clusterName,
        agreeTerms
      } = body;

      // Validation
      if (!fullName || !fullName.trim()) {
        return jsonResponse(400, { error: 'Full Name is required' });
      }

      if (!email || !email.trim()) {
        return jsonResponse(400, { error: 'Valid Email is required' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return jsonResponse(400, { error: 'Please provide a valid email address' });
      }

      const cleanMobile = mobile ? String(mobile).trim() : null;
      if (cleanMobile) {
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(cleanMobile)) {
          return jsonResponse(400, { error: 'Please enter a valid 10-digit mobile number' });
        }
      }

      if (!password || password.length < 6) {
        return jsonResponse(400, { error: 'Password must be at least 6 characters' });
      }

      if (confirmPassword !== undefined && password !== confirmPassword) {
        return jsonResponse(400, { error: 'Passwords do not match' });
      }

      if (!craftType || !craftType.trim()) {
        return jsonResponse(400, { error: 'Craft Type is required' });
      }

      if (!state || !state.trim()) {
        return jsonResponse(400, { error: 'State is required' });
      }

      if (agreeTerms !== undefined && !agreeTerms) {
        return jsonResponse(400, { error: 'You must agree to the Terms & Conditions' });
      }

      // Check duplicate email
      const normalizedEmail = email.trim().toLowerCase();
      const existingEmail = await prisma.user.findUnique({
        where: { email: normalizedEmail }
      });
      if (existingEmail) {
        return jsonResponse(409, { error: 'An account with this email already exists' });
      }

      // Check duplicate mobile
      if (cleanMobile) {
        const existingMobile = await prisma.user.findUnique({
          where: { mobile: cleanMobile }
        });
        if (existingMobile) {
          return jsonResponse(409, { error: 'An account with this mobile number already exists' });
        }
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create Artisan user
      const user = await prisma.user.create({
        data: {
          fullName: fullName.trim(),
          email: normalizedEmail,
          mobile: cleanMobile,
          passwordHash,
          role: 'ARTISAN', // Force role to ARTISAN for artisan registration
          craftType: craftType.trim(),
          state: state.trim(),
          district: district ? district.trim() : null,
          yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience, 10) || 0 : null,
          businessName: businessName ? businessName.trim() : null,
          giTagNumber: giTagNumber ? giTagNumber.trim() : null,
          clusterName: clusterName ? clusterName.trim() : null,
          isVerified: false,
          isActive: true
        }
      });

      const safeUser = sanitizeUser(user);

      // Issue JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return jsonResponse(201, {
        success: true,
        message: 'Artisan account created successfully',
        token,
        user: safeUser
      });
    }

    // -------------------------------------------------------------
    // POST /api/auth/login
    // -------------------------------------------------------------
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await parseBody();
      const { identifier, password, selectedRole = 'ARTISAN' } = body;

      if (!identifier || !identifier.trim()) {
        return jsonResponse(400, { error: 'Email or Mobile Number is required' });
      }

      if (!password) {
        return jsonResponse(400, { error: 'Password is required' });
      }

      const cleanIdentifier = identifier.trim();
      const isEmail = cleanIdentifier.includes('@');

      // Find user by email or mobile
      const user = await prisma.user.findFirst({
        where: isEmail
          ? { email: cleanIdentifier.toLowerCase() }
          : { mobile: cleanIdentifier }
      });

      if (!user) {
        return jsonResponse(401, { error: 'Invalid email/mobile or password' });
      }

      if (!user.isActive) {
        return jsonResponse(403, { error: 'Account has been deactivated. Please contact Karigar support.' });
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return jsonResponse(401, { error: 'Invalid email/mobile or password' });
      }

      // Authorization Rule:
      // If Artisan / Weaver is selected: database role MUST be ARTISAN
      if (selectedRole === 'ARTISAN' || selectedRole === 'Artisan / Weaver') {
        if (user.role !== 'ARTISAN') {
          return jsonResponse(403, { error: 'This account is not registered as an artisan.' });
        }
      } else if (selectedRole === 'PATRON' || selectedRole === 'Patron / Collector') {
        // Buyer/Collector login is not available in seller portal
        return jsonResponse(403, {
          error: 'Buyer/Collector login is not available in this portal yet. Please use the main marketplace.'
        });
      }

      const safeUser = sanitizeUser(user);

      // Issue JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return jsonResponse(200, {
        success: true,
        message: 'Login successful',
        token,
        user: safeUser
      });
    }

    // -------------------------------------------------------------
    // GET /api/auth/me
    // -------------------------------------------------------------
    if (pathname === '/api/auth/me' && method === 'GET') {
      const token = extractToken(req);
      if (!token) {
        return jsonResponse(401, { error: 'Authorization token required' });
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
          where: { id: decoded.id }
        });

        if (!user || !user.isActive) {
          return jsonResponse(401, { error: 'User not found or inactive' });
        }

        return jsonResponse(200, {
          success: true,
          user: sanitizeUser(user)
        });
      } catch (jwtErr) {
        return jsonResponse(401, { error: 'Session expired or invalid token' });
      }
    }

    // -------------------------------------------------------------
    // POST /api/auth/logout
    // -------------------------------------------------------------
    if (pathname === '/api/auth/logout' && method === 'POST') {
      return jsonResponse(200, {
        success: true,
        message: 'Logged out successfully'
      });
    }

    // Fallback 404 for other auth routes
    return jsonResponse(404, { error: `Endpoint ${method} ${pathname} not found` });
  } catch (err) {
    console.error('API Auth Error:', err);
    return jsonResponse(500, {
      error: 'An internal server error occurred. Please try again later.'
    });
  }
}

export { prisma };
