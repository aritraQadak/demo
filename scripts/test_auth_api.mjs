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

  // Verify in database that passwordHash is stored and NOT raw password
  const dbUser = await prisma.user.findUnique({
    where: { email: 'test.artisan@craftguild.in' }
  });
  console.log('Database verification:');
  console.log('- User ID:', dbUser.id);
  console.log('- Role:', dbUser.role);
  console.log('- Has passwordHash:', Boolean(dbUser.passwordHash));
  console.log('- Password is not raw:', dbUser.passwordHash !== 'ArtisanPassword123!');

  if (dbUser.passwordHash === 'ArtisanPassword123!') {
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

  console.log('\nALL PRISMA AUTH API TESTS PASSED SUCCESSFULLY! \u2705');
  await prisma.$disconnect();
}

runTests().catch(async (err) => {
  console.error('TEST FAILED:', err);
  await prisma.$disconnect();
  process.exit(1);
});
