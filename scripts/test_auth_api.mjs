import { handleAuthRequest, prisma } from '../server/authHandler.js';
import { EventEmitter } from 'events';

// Helper to simulate HTTP req and res
function createMockReqRes(method, path, body = null, headers = {}) {
  const req = new EventEmitter();
  req.method = method;
  req.url = path;
  req.headers = { host: 'localhost:5173', ...headers };

  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(key, value) {
      this.headers[key] = value;
    },
    end(chunk) {
      if (chunk) this.body += chunk;
      this.emit('finish');
    }
  };
  Object.assign(res, EventEmitter.prototype);
  EventEmitter.call(res);

  const execute = () => {
    return new Promise((resolve) => {
      res.on('finish', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(res.body);
        } catch (e) {
          parsed = res.body;
        }
        resolve({ status: res.statusCode, headers: res.headers, data: parsed });
      });

      handleAuthRequest(req, res);

      if (body) {
        req.emit('data', Buffer.from(JSON.stringify(body)));
      }
      req.emit('end');
    });
  };

  return { execute };
}

async function runTests() {
  console.log('--- STARTING PRISMA AUTH API TESTS ---');

  // Clean test user if exists
  await prisma.user.deleteMany({
    where: {
      OR: [
        { email: 'test.artisan@craftguild.in' },
        { mobile: '9876543210' }
      ]
    }
  });

  // 1. Test Signup
  console.log('1. Testing Artisan Signup...');
  const signupReq = createMockReqRes('POST', '/api/auth/signup', {
    fullName: 'Ramesh Kumar',
    email: 'test.artisan@craftguild.in',
    mobile: '9876543210',
    password: 'ArtisanPassword123!',
    confirmPassword: 'ArtisanPassword123!',
    craftType: 'Handloom Weaving',
    state: 'West Bengal',
    district: 'Nadia',
    yearsOfExperience: 15,
    businessName: 'Nadia Weavers Guild',
    giTagNumber: 'GI-WB-2024-001',
    clusterName: 'Shantipur Handloom Cluster',
    agreeTerms: true
  });
  const signupRes = await signupReq.execute();
  console.log('Signup Status:', signupRes.status);
  console.log('Signup Data:', signupRes.data);

  if (signupRes.status !== 201 || !signupRes.data.token) {
    throw new Error('Signup failed: ' + JSON.stringify(signupRes.data));
  }

  const token = signupRes.data.token;

  // Verify in database that hashed password is stored in password column and NOT raw password
  const dbUser = await prisma.user.findUnique({
    where: { email: 'test.artisan@craftguild.in' }
  });
  console.log('Database verification:');
  console.log('- User ID:', dbUser.id);
  console.log('- Role:', dbUser.role);
  console.log('- Has password:', Boolean(dbUser.password));
  console.log('- Password is not raw:', dbUser.password !== 'ArtisanPassword123!');

  if (dbUser.password === 'ArtisanPassword123!') {
    throw new Error('Security violation: Raw password stored in database!');
  }
  if (dbUser.role !== 'ARTISAN') {
    throw new Error('Role was not ARTISAN!');
  }

  // 2. Test Duplicate Email
  console.log('\n2. Testing Duplicate Email Detection...');
  const dupReq = createMockReqRes('POST', '/api/auth/signup', {
    fullName: 'Ramesh Duplicate',
    email: 'test.artisan@craftguild.in',
    password: 'Password123!',
    craftType: 'Pottery',
    state: 'Rajasthan',
    agreeTerms: true
  });
  const dupRes = await dupReq.execute();
  console.log('Duplicate Email Status:', dupRes.status);
  if (dupRes.status !== 409) {
    throw new Error('Duplicate email was not rejected with 409!');
  }

  // 3. Test Login with Email
  console.log('\n3. Testing Login with Email...');
  const loginEmailReq = createMockReqRes('POST', '/api/auth/login', {
    identifier: 'test.artisan@craftguild.in',
    password: 'ArtisanPassword123!',
    selectedRole: 'ARTISAN'
  });
  const loginEmailRes = await loginEmailReq.execute();
  console.log('Login Email Status:', loginEmailRes.status);
  if (loginEmailRes.status !== 200 || !loginEmailRes.data.token) {
    throw new Error('Login with email failed!');
  }

  // 4. Test Login with Mobile
  console.log('\n4. Testing Login with Mobile...');
  const loginMobileReq = createMockReqRes('POST', '/api/auth/login', {
    identifier: '9876543210',
    password: 'ArtisanPassword123!',
    selectedRole: 'ARTISAN'
  });
  const loginMobileRes = await loginMobileReq.execute();
  console.log('Login Mobile Status:', loginMobileRes.status);
  if (loginMobileRes.status !== 200 || !loginMobileRes.data.token) {
    throw new Error('Login with mobile failed!');
  }

  // 5. Test Patron Selection Rejection
  console.log('\n5. Testing Patron Role Rejection on Seller Portal...');
  const patronLoginReq = createMockReqRes('POST', '/api/auth/login', {
    identifier: 'test.artisan@craftguild.in',
    password: 'ArtisanPassword123!',
    selectedRole: 'PATRON'
  });
  const patronLoginRes = await patronLoginReq.execute();
  console.log('Patron Login Status:', patronLoginRes.status);
  console.log('Patron Error Message:', patronLoginRes.data.error);
  if (patronLoginRes.status !== 403) {
    throw new Error('Patron login was not rejected on seller portal!');
  }

  // 6. Test GET /api/auth/me
  console.log('\n6. Testing GET /api/auth/me with Bearer token...');
  const meReq = createMockReqRes('GET', '/api/auth/me', null, {
    authorization: `Bearer ${token}`
  });
  const meRes = await meReq.execute();
  console.log('Me Status:', meRes.status);
  console.log('Me User:', meRes.data.user?.fullName, '| Role:', meRes.data.user?.role);
  if (meRes.status !== 200 || meRes.data.user?.email !== 'test.artisan@craftguild.in') {
    throw new Error('GET /api/auth/me failed!');
  }

  // 7. Test Logout
  console.log('\n7. Testing POST /api/auth/logout...');
  const logoutReq = createMockReqRes('POST', '/api/auth/logout');
  const logoutRes = await logoutReq.execute();
  console.log('Logout Status:', logoutRes.status);
  if (logoutRes.status !== 200) {
    throw new Error('Logout endpoint failed!');
  }

  // 8. Test Missing Role Rejection
  console.log('\n8. Testing Missing Role Rejection on Login...');
  const noRoleReq = createMockReqRes('POST', '/api/auth/login', {
    identifier: 'test.artisan@craftguild.in',
    password: 'ArtisanPassword123!'
  });
  const noRoleRes = await noRoleReq.execute();
  console.log('No-role login status:', noRoleRes.status);
  if (noRoleRes.status !== 400) {
    throw new Error('Login without role selection should return 400!');
  }

  // 9. Test Patron Registration
  console.log('\n9. Testing Patron Registration...');
  await prisma.user.deleteMany({
    where: { email: 'patron.test@collector.in' }
  });
  const patronSignupReq = createMockReqRes('POST', '/api/auth/signup', {
    fullName: 'Ananya Sen',
    email: 'patron.test@collector.in',
    mobile: '9876543299',
    password: 'PatronSecure123!',
    confirmPassword: 'PatronSecure123!',
    role: 'PATRON',
    agreeTerms: true
  });
  const patronSignupRes = await patronSignupReq.execute();
  console.log('Patron Signup Status:', patronSignupRes.status);
  console.log('Patron User Role:', patronSignupRes.data.user?.role);
  if (patronSignupRes.status !== 201 || patronSignupRes.data.user?.role !== 'PATRON') {
    throw new Error('Patron signup failed or did not set role PATRON');
  }

  // 10. Test Patron Login
  console.log('\n10. Testing Patron Login...');
  const patronLoginSuccessReq = createMockReqRes('POST', '/api/auth/login', {
    identifier: 'patron.test@collector.in',
    password: 'PatronSecure123!',
    selectedRole: 'PATRON'
  });
  const patronLoginSuccessRes = await patronLoginSuccessReq.execute();
  console.log('Patron Login Status:', patronLoginSuccessRes.status);
  if (patronLoginSuccessRes.status !== 200 || patronLoginSuccessRes.data.user?.role !== 'PATRON') {
    throw new Error('Patron login failed!');
  }

  // 11. Test Patron attempting Artisan login
  console.log('\n11. Testing Patron attempting Artisan Login...');
  const patronAsArtisanReq = createMockReqRes('POST', '/api/auth/login', {
    identifier: 'patron.test@collector.in',
    password: 'PatronSecure123!',
    selectedRole: 'ARTISAN'
  });
  const patronAsArtisanRes = await patronAsArtisanReq.execute();
  console.log('Patron as Artisan Status:', patronAsArtisanRes.status);
  console.log('Patron as Artisan Error:', patronAsArtisanRes.data.error);
  if (patronAsArtisanRes.status !== 403) {
    throw new Error('Patron accessing Artisan role should be rejected with 403!');
  }

  // 12. Test Google Auth Without Role
  console.log('\n12. Testing Google Auth Without Role...');
  const googleNoRoleReq = createMockReqRes('POST', '/api/auth/google', {
    token: 'mock-google-token:sub_123:google.user@example.com:Google Patron'
  });
  const googleNoRoleRes = await googleNoRoleReq.execute();
  console.log('Google No Role Status:', googleNoRoleRes.status);
  if (googleNoRoleRes.status !== 400) {
    throw new Error('Google auth without selectedRole must return 400!');
  }

  // 13. Test Google Auth First-time Patron User
  console.log('\n13. Testing Google Auth First-time Patron...');
  await prisma.user.deleteMany({
    where: { email: 'google.patron@example.com' }
  });
  const googlePatronReq = createMockReqRes('POST', '/api/auth/google', {
    token: 'mock-google-token:google_sub_patron_999:google.patron@example.com:Google Patron User',
    selectedRole: 'PATRON'
  });
  const googlePatronRes = await googlePatronReq.execute();
  console.log('Google Patron Status:', googlePatronRes.status);
  console.log('Google Patron User:', googlePatronRes.data.user?.fullName, '| Role:', googlePatronRes.data.user?.role);
  if (googlePatronRes.status !== 200 || googlePatronRes.data.user?.role !== 'PATRON') {
    throw new Error('Google Patron first-time login failed!');
  }

  // 14. Test Google Role Mismatch on Existing User
  console.log('\n14. Testing Google Role Mismatch on Existing User...');
  const googleMismatchReq = createMockReqRes('POST', '/api/auth/google', {
    token: 'mock-google-token:google_sub_patron_999:google.patron@example.com:Google Patron User',
    selectedRole: 'ARTISAN'
  });
  const googleMismatchRes = await googleMismatchReq.execute();
  console.log('Google Mismatch Status:', googleMismatchRes.status);
  console.log('Google Mismatch Error:', googleMismatchRes.data.error);
  if (googleMismatchRes.status !== 403) {
    throw new Error('Google role mismatch must return 403!');
  }

  // Confirm DB role is STILL PATRON (not changed!)
  const preservedUser = await prisma.user.findUnique({
    where: { email: 'google.patron@example.com' }
  });
  if (preservedUser.role !== 'PATRON') {
    throw new Error('Database role was illegally modified on Google role mismatch!');
  }
  console.log('Preserved Prisma Role:', preservedUser.role);

  // 15. Test Google-Only User Attempting Email/Password Login
  console.log('\n15. Testing Google-Only User Attempting Email/Password Login...');
  const googleEmailLoginReq = createMockReqRes('POST', '/api/auth/login', {
    identifier: 'google.patron@example.com',
    password: 'AnyPassword123!',
    selectedRole: 'PATRON'
  });
  const googleEmailLoginRes = await googleEmailLoginReq.execute();
  console.log('Google-Only Email Login Status:', googleEmailLoginRes.status);
  console.log('Google-Only Email Login Error:', googleEmailLoginRes.data.error);
  if (googleEmailLoginRes.status !== 400 || !googleEmailLoginRes.data.error.includes('uses Google Sign-In')) {
    throw new Error('Google-only user email login should return 400 with Google Sign-In prompt!');
  }

  // 16. Security Check: Verify password field is NEVER exposed in API response
  console.log('\n16. Security Check: Verifying password hash is never exposed...');
  if (signupRes.data.user && 'password' in signupRes.data.user) {
    throw new Error('Security violation: password returned in signup response!');
  }
  if (loginEmailRes.data.user && 'password' in loginEmailRes.data.user) {
    throw new Error('Security violation: password returned in login response!');
  }
  if (meRes.data.user && 'password' in meRes.data.user) {
    throw new Error('Security violation: password returned in /api/auth/me response!');
  }
  console.log('Password hash privacy verified: NEVER returned in API responses! \u2705');

  console.log('\nALL 16 PRISMA & AUTH API TESTS PASSED SUCCESSFULLY! \u2705');
  await prisma.$disconnect();
}

runTests().catch(async (err) => {
  console.error('TEST FAILED:', err);
  await prisma.$disconnect();
  process.exit(1);
});
