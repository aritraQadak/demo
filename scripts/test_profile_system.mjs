import { handleAuthRequest, prisma } from '../server/authHandler.js';
import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function runProfileTests() {
  console.log('=== STARTING SEPARATE USER PROFILE & SECURITY TESTS ===\n');

  // Cleanup test accounts
  const testEmails = [
    'santosh.sharma@artisan.in',
    'anita.sharma@artisan.in',
    'vikram.patron@collector.in',
    'priya.patron@collector.in'
  ];
  await prisma.user.deleteMany({
    where: { email: { in: testEmails } }
  });

  // -------------------------------------------------------------
  // 1. Create Artisan Account A: Santosh Sharma
  // -------------------------------------------------------------
  console.log('1. Creating Artisan A (Santosh Sharma)...');
  const artisanAReq = createMockReqRes('POST', '/api/auth/signup', {
    fullName: 'Santosh Sharma',
    email: 'santosh.sharma@artisan.in',
    mobile: '9811111111',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    craftType: 'Terracotta Pottery',
    state: 'West Bengal',
    district: 'Bankura',
    yearsOfExperience: 22,
    businessName: 'Sharma Terracotta Art',
    giTagNumber: 'GI-WB-452',
    clusterName: 'Panchmura Cooperative',
    agreeTerms: true
  });
  const artisanARes = await artisanAReq.execute();
  const tokenArtisanA = artisanARes.data.token;
  console.log('Artisan A created. ID:', artisanARes.data.user.id, '| Token present:', Boolean(tokenArtisanA));

  // -------------------------------------------------------------
  // 2. Create Artisan Account B: Anita Sharma
  // -------------------------------------------------------------
  console.log('2. Creating Artisan B (Anita Sharma)...');
  const artisanBReq = createMockReqRes('POST', '/api/auth/signup', {
    fullName: 'Anita Sharma',
    email: 'anita.sharma@artisan.in',
    mobile: '9822222222',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    craftType: 'Kantha Embroidery',
    state: 'West Bengal',
    district: 'Birbhum',
    yearsOfExperience: 18,
    businessName: 'Anita Heritage Threads',
    giTagNumber: 'GI-WB-082',
    clusterName: 'Bolpur Craft Guild',
    agreeTerms: true
  });
  const artisanBRes = await artisanBReq.execute();
  const tokenArtisanB = artisanBRes.data.token;
  console.log('Artisan B created. ID:', artisanBRes.data.user.id, '| Token present:', Boolean(tokenArtisanB));

  // -------------------------------------------------------------
  // 3. Create Patron Account A: Vikram
  // -------------------------------------------------------------
  console.log('3. Creating Patron A (Vikram Singhania)...');
  const patronAReq = createMockReqRes('POST', '/api/auth/signup', {
    fullName: 'Vikram Singhania',
    email: 'vikram.patron@collector.in',
    mobile: '9833333333',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    role: 'PATRON',
    agreeTerms: true
  });
  const patronARes = await patronAReq.execute();
  const tokenPatronA = patronARes.data.token;
  console.log('Patron A created. ID:', patronARes.data.user.id, '| Token present:', Boolean(tokenPatronA));

  // -------------------------------------------------------------
  // 4. Create Patron Account B: Priya
  // -------------------------------------------------------------
  console.log('4. Creating Patron B (Priya Mukherjee)...');
  const patronBReq = createMockReqRes('POST', '/api/auth/signup', {
    fullName: 'Priya Mukherjee',
    email: 'priya.patron@collector.in',
    mobile: '9844444444',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    role: 'PATRON',
    agreeTerms: true
  });
  const patronBRes = await patronBReq.execute();
  const tokenPatronB = patronBRes.data.token;
  console.log('Patron B created. ID:', patronBRes.data.user.id, '| Token present:', Boolean(tokenPatronB));

  // -------------------------------------------------------------
  // 5. Test Profile Isolation: Santosh Sharma only sees Santosh Sharma
  // -------------------------------------------------------------
  console.log('\n5. Verifying Profile Isolation: Santosh Sharma gets Santosh Sharma profile...');
  const getProfAReq = createMockReqRes('GET', '/api/profile', null, {
    authorization: `Bearer ${tokenArtisanA}`
  });
  const getProfARes = await getProfAReq.execute();
  if (getProfARes.data.user.fullName !== 'Santosh Sharma' || getProfARes.data.user.email !== 'santosh.sharma@artisan.in') {
    throw new Error('Artisan A did not receive Santosh Sharma data!');
  }
  console.log('✓ Artisan A successfully retrieved own profile:', getProfARes.data.user.fullName);

  // -------------------------------------------------------------
  // 6. Test Profile Isolation: Anita Sharma only sees Anita Sharma
  // -------------------------------------------------------------
  console.log('6. Verifying Profile Isolation: Anita Sharma gets Anita Sharma profile...');
  const getProfBReq = createMockReqRes('GET', '/api/profile', null, {
    authorization: `Bearer ${tokenArtisanB}`
  });
  const getProfBRes = await getProfBReq.execute();
  if (getProfBRes.data.user.fullName !== 'Anita Sharma' || getProfBRes.data.user.email !== 'anita.sharma@artisan.in') {
    throw new Error('Artisan B did not receive Anita Sharma data!');
  }
  console.log('✓ Artisan B successfully retrieved own profile:', getProfBRes.data.user.fullName);

  // -------------------------------------------------------------
  // 7. Verify Patron Isolation: Vikram vs Priya
  // -------------------------------------------------------------
  console.log('7. Verifying Patron Isolation: Vikram gets Vikram, Priya gets Priya...');
  const getPatronAReq = createMockReqRes('GET', '/api/profile', null, {
    authorization: `Bearer ${tokenPatronA}`
  });
  const getPatronARes = await getPatronAReq.execute();
  if (getPatronARes.data.user.fullName !== 'Vikram Singhania') {
    throw new Error('Patron A profile mismatch!');
  }

  const getPatronBReq = createMockReqRes('GET', '/api/profile', null, {
    authorization: `Bearer ${tokenPatronB}`
  });
  const getPatronBRes = await getPatronBReq.execute();
  if (getPatronBRes.data.user.fullName !== 'Priya Mukherjee') {
    throw new Error('Patron B profile mismatch!');
  }
  console.log('✓ Patron isolation verified: A and B see only their own data.');

  // -------------------------------------------------------------
  // 8. Test Profile Editing (PATCH /api/profile)
  // -------------------------------------------------------------
  console.log('\n8. Testing Profile Update (Santosh edits craft experience and district)...');
  const patchReq = createMockReqRes('PATCH', '/api/profile', {
    yearsOfExperience: 25,
    district: 'Panchmura South',
    businessName: 'Santosh Sharma Master Terracotta Studio'
  }, {
    authorization: `Bearer ${tokenArtisanA}`
  });
  const patchRes = await patchReq.execute();
  if (patchRes.status !== 200 || patchRes.data.user.yearsOfExperience !== 25) {
    throw new Error('Failed to update profile!');
  }
  console.log('✓ Profile updated successfully in database:', patchRes.data.user.yearsOfExperience, 'years');

  // Verify Anita's profile was completely unaffected
  const verifyBReq = createMockReqRes('GET', '/api/profile', null, {
    authorization: `Bearer ${tokenArtisanB}`
  });
  const verifyBRes = await verifyBReq.execute();
  if (verifyBRes.data.user.yearsOfExperience !== 18 || verifyBRes.data.user.district !== 'Birbhum') {
    throw new Error('Cross-user pollution! Anita profile was mutated!');
  }
  console.log('✓ Cross-user integrity verified: Anita remained untouched.');

  // -------------------------------------------------------------
  // 9. Test Security: Attempting to mutate role, id, isVerified
  // -------------------------------------------------------------
  console.log('\n9. Testing Security: Normal user trying to change role or isVerified...');
  const hackReq = createMockReqRes('PATCH', '/api/profile', {
    role: 'ADMIN',
    isVerified: true
  }, {
    authorization: `Bearer ${tokenArtisanA}`
  });
  const hackRes = await hackReq.execute();
  if (hackRes.data.user.role !== 'ARTISAN') {
    throw new Error('Security flaw: Role was modified by client PATCH!');
  }
  console.log('✓ Immutable fields protected: Role remains ARTISAN.');

  // -------------------------------------------------------------
  // 10. Test Photo Upload: POST /api/profile/avatar
  // -------------------------------------------------------------
  console.log('\n10. Testing Photo Upload (POST /api/profile/avatar)...');
  // 1x1 transparent PNG in base64
  const testBase64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const uploadReq = createMockReqRes('POST', '/api/profile/avatar', {
    image: `data:image/png;base64,${testBase64Png}`,
    filename: 'test_avatar.png'
  }, {
    authorization: `Bearer ${tokenArtisanA}`
  });
  const uploadRes = await uploadReq.execute();
  console.log('Upload status:', uploadRes.status);
  console.log('Avatar URL returned:', uploadRes.data.avatarUrl);

  if (uploadRes.status !== 200 || !uploadRes.data.avatarUrl.startsWith('/uploads/avatars/')) {
    throw new Error('Upload failed or returned invalid URL: ' + JSON.stringify(uploadRes.data));
  }

  // Check file exists on filesystem
  const savedRelPath = uploadRes.data.avatarUrl.replace('/uploads/avatars/', '');
  const targetFilePath = path.resolve(__dirname, '..', 'public', 'uploads', 'avatars', savedRelPath);
  if (!fs.existsSync(targetFilePath)) {
    throw new Error('Uploaded file was not found on disk at: ' + targetFilePath);
  }
  console.log('✓ Uploaded avatar successfully stored on disk:', targetFilePath);

  // Check URL stored in database
  const dbSantosh = await prisma.user.findUnique({
    where: { email: 'santosh.sharma@artisan.in' }
  });
  if (dbSantosh.avatarUrl !== uploadRes.data.avatarUrl) {
    throw new Error('Prisma avatarUrl does not match uploaded avatar URL!');
  }
  console.log('✓ Prisma avatarUrl accurately updated for Santosh Sharma.');

  // -------------------------------------------------------------
  // 11. Test Photo Upload Validation: Invalid format
  // -------------------------------------------------------------
  console.log('\n11. Testing Upload Validation (Invalid MIME type rejection)...');
  const invalidTypeReq = createMockReqRes('POST', '/api/profile/avatar', {
    image: 'data:application/pdf;base64,JVBERi0xLjQK',
    filename: 'test.pdf'
  }, {
    authorization: `Bearer ${tokenArtisanA}`
  });
  const invalidTypeRes = await invalidTypeReq.execute();
  if (invalidTypeRes.status !== 400) {
    throw new Error('Invalid format was not rejected with 400!');
  }
  console.log('✓ Non-image upload correctly rejected with 400.');

  // -------------------------------------------------------------
  // 12. Test Google Auth Avatar Preservation
  // -------------------------------------------------------------
  console.log('\n12. Testing Google Login does not overwrite custom uploaded avatar...');
  // First login with Google
  const googleLogin1 = await createMockReqRes('POST', '/api/auth/google', {
    token: 'mock-google-token:sub_patron_google_99:google.custom@patron.in:Google Patron Account',
    selectedRole: 'PATRON'
  }).execute();
  const googleToken = googleLogin1.data.token;

  // Custom photo upload
  await createMockReqRes('POST', '/api/profile/avatar', {
    image: `data:image/png;base64,${testBase64Png}`,
    filename: 'custom_avatar.png'
  }, {
    authorization: `Bearer ${googleToken}`
  }).execute();

  const userAfterUpload = await prisma.user.findUnique({
    where: { email: 'google.custom@patron.in' }
  });
  const customAvatar = userAfterUpload.avatarUrl;
  console.log('Custom avatar uploaded:', customAvatar);

  // Second login with Google: should NOT overwrite customAvatar!
  await createMockReqRes('POST', '/api/auth/google', {
    token: 'mock-google-token:sub_patron_google_99:google.custom@patron.in:Google Patron Account',
    selectedRole: 'PATRON'
  }).execute();

  const userAfterSecondGoogleLogin = await prisma.user.findUnique({
    where: { email: 'google.custom@patron.in' }
  });
  if (userAfterSecondGoogleLogin.avatarUrl !== customAvatar) {
    throw new Error('Google login overwrote custom profile photo!');
  }
  console.log('✓ Custom avatar preserved across subsequent Google logins!');

  console.log('\nALL 12 PROFILE & SECURITY TESTS PASSED PERFECTLY! ✅');
  await prisma.$disconnect();
}

runProfileTests().catch(async (err) => {
  console.error('TEST ERROR:', err);
  await prisma.$disconnect();
  process.exit(1);
});
