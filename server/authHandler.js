import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'karigar_secret_jwt_artisan_2026_key';
const JWT_EXPIRES_IN = '7d';

/**
 * Strips sensitive fields like password from user object
 */
function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
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
        role: requestedRole,
        craftType,
        state,
        district,
        yearsOfExperience,
        businessName,
        giTagNumber,
        clusterName,
        agreeTerms
      } = body;

      const userRole = requestedRole === 'PATRON' ? 'PATRON' : 'ARTISAN';

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

      // Artisan specific validations (only if userRole is ARTISAN)
      if (userRole === 'ARTISAN') {
        if (!craftType || !craftType.trim()) {
          return jsonResponse(400, { error: 'Craft Type is required for Artisan registration' });
        }

        if (!state || !state.trim()) {
          return jsonResponse(400, { error: 'State is required for Artisan registration' });
        }
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

      // Hash password with bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create User (ARTISAN or PATRON)
      const user = await prisma.user.create({
        data: {
          fullName: fullName.trim(),
          email: normalizedEmail,
          mobile: cleanMobile,
          password: hashedPassword,
          role: userRole,
          craftType: craftType ? craftType.trim() : null,
          state: state ? state.trim() : null,
          district: district ? district.trim() : null,
          yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience, 10) || 0 : null,
          businessName: businessName ? businessName.trim() : null,
          giTagNumber: giTagNumber ? giTagNumber.trim() : null,
          clusterName: clusterName ? clusterName.trim() : null,
          isVerified: userRole === 'PATRON', // Patron is verified by default
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
        message: `${userRole === 'PATRON' ? 'Patron' : 'Artisan'} account created successfully`,
        token,
        user: safeUser
      });
    }

    // -------------------------------------------------------------
    // POST /api/auth/login
    // -------------------------------------------------------------
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await parseBody();
      const { identifier, password, selectedRole } = body;

      if (!selectedRole) {
        return jsonResponse(400, {
          error: 'Please select Artisan / Weaver or Patron / Collector before continuing.'
        });
      }

      const targetRole = (selectedRole === 'PATRON' || selectedRole === 'Patron / Collector')
        ? 'PATRON'
        : (selectedRole === 'ARTISAN' || selectedRole === 'Artisan / Weaver')
        ? 'ARTISAN'
        : null;

      if (!targetRole) {
        return jsonResponse(400, {
          error: 'Please select Artisan / Weaver or Patron / Collector before continuing.'
        });
      }

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

      // If user registered with Google only and has no password
      if (!user.password) {
        return jsonResponse(400, {
          error: 'This account uses Google Sign-In. Please continue with Google.'
        });
      }

      // Verify bcrypt password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return jsonResponse(401, { error: 'Invalid email/mobile or password' });
      }

      // Role check: enforce registered role matching
      if (user.role !== targetRole) {
        if (user.role === 'ARTISAN') {
          return jsonResponse(403, {
            error: 'This account is registered as an Artisan / Weaver. Please select the correct account type.'
          });
        } else {
          return jsonResponse(403, {
            error: 'This account is registered as a Patron / Collector. Please select the correct account type.'
          });
        }
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
    // POST /api/auth/google
    // -------------------------------------------------------------
    if (pathname === '/api/auth/google' && method === 'POST') {
      const body = await parseBody();
      const { token: clientToken, idToken, accessToken, credential, selectedRole } = body;

      if (!selectedRole) {
        return jsonResponse(400, {
          error: 'Please select Artisan / Weaver or Patron / Collector before continuing.'
        });
      }

      const targetRole = (selectedRole === 'PATRON' || selectedRole === 'Patron / Collector')
        ? 'PATRON'
        : (selectedRole === 'ARTISAN' || selectedRole === 'Artisan / Weaver')
        ? 'ARTISAN'
        : null;

      if (!targetRole) {
        return jsonResponse(400, {
          error: 'Please select Artisan / Weaver or Patron / Collector before continuing.'
        });
      }

      const rawAuthToken = idToken || accessToken || clientToken || credential;
      if (!rawAuthToken) {
        return jsonResponse(400, {
          error: 'Google authentication token is required.'
        });
      }

      // Verify Google identity token or access token
      let googleProfile = null;

      // 1. Try id_token verification via Google tokeninfo
      try {
        const idTokenRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(rawAuthToken)}`);
        if (idTokenRes.ok) {
          const idData = await idTokenRes.json();
          if (idData.email) {
            googleProfile = {
              sub: idData.sub,
              email: idData.email.toLowerCase(),
              name: idData.name || idData.email.split('@')[0],
              picture: idData.picture || null,
              email_verified: idData.email_verified === 'true' || idData.email_verified === true
            };
          }
        }
      } catch (_e) {
        // Fall through to access_token check
      }

      // 2. If id_token check didn't produce a verified profile, try access_token via Google userinfo
      if (!googleProfile) {
        try {
          const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${rawAuthToken}` }
          });
          if (userinfoRes.ok) {
            const uData = await userinfoRes.json();
            if (uData.email) {
              googleProfile = {
                sub: uData.sub,
                email: uData.email.toLowerCase(),
                name: uData.name || uData.email.split('@')[0],
                picture: uData.picture || null,
                email_verified: uData.email_verified === true || uData.email_verified === 'true'
              };
            }
          }
        } catch (_e) {
          // Token verification error
        }
      }

      // 3. Testing/Mock support for automated testing without live internet or Google credentials
      if (!googleProfile && (process.env.NODE_ENV !== 'production' || !process.env.NODE_ENV) && typeof rawAuthToken === 'string' && rawAuthToken.startsWith('mock-google-token:')) {
        const parts = rawAuthToken.split(':');
        googleProfile = {
          sub: parts[1] || 'google_mock_user_123',
          email: (parts[2] || 'google.user@example.com').toLowerCase(),
          name: parts[3] || 'Google User',
          picture: 'https://lh3.googleusercontent.com/a/mock-user',
          email_verified: true
        };
      }

      if (!googleProfile || !googleProfile.email) {
        return jsonResponse(401, {
          error: 'Unable to verify Google authentication. The token was invalid or expired.'
        });
      }

      // Check if user exists by email or providerAccountId
      let user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: googleProfile.email },
            { providerAccountId: googleProfile.sub }
          ]
        }
      });

      if (user) {
        // Existing user: STRICT ROLE ENFORCEMENT - NEVER SILENTLY CHANGE ROLE
        if (user.role !== targetRole) {
          if (user.role === 'ARTISAN') {
            return jsonResponse(403, {
              error: 'This Google account is registered as an Artisan / Weaver. Please select the correct account type.'
            });
          } else {
            return jsonResponse(403, {
              error: 'This Google account is registered as a Patron / Collector. Please select the correct account type.'
            });
          }
        }

        if (!user.isActive) {
          return jsonResponse(403, {
            error: 'Account has been deactivated. Please contact Karigar support.'
          });
        }

        // Role matches. Update provider details if missing
        if (!user.providerAccountId || !user.avatarUrl || user.provider !== 'google') {
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              provider: 'google',
              providerAccountId: user.providerAccountId || googleProfile.sub,
              avatarUrl: user.avatarUrl || googleProfile.picture
            }
          });
        }
      } else {
        // First-time Google user: Create new Prisma user with selected role
        user = await prisma.user.create({
          data: {
            fullName: googleProfile.name,
            email: googleProfile.email,
            role: targetRole,
            provider: 'google',
            providerAccountId: googleProfile.sub,
            avatarUrl: googleProfile.picture,
            isVerified: true,
            isActive: true
          }
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
        message: 'Google login successful',
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
