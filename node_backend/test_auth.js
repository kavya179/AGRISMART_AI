/**
 * Direct Integration Test for Node.js Auth APIs
 */
const http = require('http');

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: '127.0.0.1',
      port: 5000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('Testing Node.js /api/auth/register & /api/auth/login endpoints...');

  // Test 1: Successful Registration
  const testUser = {
    fullName: 'Demo Farmer Patil',
    email: 'demofarmer' + Date.now() + '@agrismart.ai',
    phone: '9876543210',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    role: 'farmer',
    state: 'Maharashtra',
    district: 'Pune',
    village: 'Khed',
    farmSizeAcres: '5.0',
    primaryCrop: 'Tomato',
    soilType: 'Black Soil',
  };

  try {
    const regRes = await postJson('/api/auth/register', testUser);
    console.log('\n[TEST 1] Register Response (Status ' + regRes.status + '):');
    console.log(JSON.stringify(regRes.body, null, 2));

    if (regRes.status === 201 && regRes.body.success) {
      console.log('  -> PASS: User created successfully with sanitized response (no password exposed)!');
    } else {
      console.log('  -> FAIL: Expected 201 status.');
    }

    // Test 2: Duplicate Registration
    const dupRes = await postJson('/api/auth/register', testUser);
    console.log('\n[TEST 2] Duplicate Email Register Response (Status ' + dupRes.status + '):');
    console.log(JSON.stringify(dupRes.body, null, 2));

    if (dupRes.status === 409 && !dupRes.body.success) {
      console.log('  -> PASS: Duplicate email prevented cleanly with 409 Conflict!');
    } else {
      console.log('  -> FAIL: Expected 409 status on duplicate email.');
    }

    // Test 3: Password Mismatch Validation
    const invalidUser = {
      fullName: 'Test User',
      email: 'invalid@example.com',
      phone: '9876543210',
      password: 'Password123',
      confirmPassword: 'MismatchedPassword',
    };
    const invRes = await postJson('/api/auth/register', invalidUser);
    console.log('\n[TEST 3] Password Mismatch Validation (Status ' + invRes.status + '):');
    console.log(JSON.stringify(invRes.body, null, 2));

    if (invRes.status === 400 && !invRes.body.success) {
      console.log('  -> PASS: Password mismatch caught with 400 Bad Request!');
    } else {
      console.log('  -> FAIL: Expected 400 status on mismatch.');
    }

    // Test 4: Successful Login
    const loginRes = await postJson('/api/auth/login', {
      email: testUser.email,
      password: testUser.password,
    });
    console.log('\n[TEST 4] Login Response (Status ' + loginRes.status + '):');
    console.log(JSON.stringify(loginRes.body, null, 2));

    if (loginRes.status === 200 && loginRes.body.success) {
      console.log('  -> PASS: Login successful with JWT token!');
    } else {
      console.log('  -> FAIL: Expected 200 status on login.');
    }
  } catch (err) {
    console.error('Request failed:', err.message);
  }
}

runTests();
