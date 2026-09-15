const express = require('express');
const http = require('http');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

const server = app.listen(5099, async () => {
  console.log('Verification test server listening on port 5099...');

  function postJson(path, payload) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(payload);
      const options = {
        hostname: '127.0.0.1',
        port: 5099,
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

  try {
    // Test 1: Successful Registration
    const demoUser = {
      fullName: 'Ramesh Patil',
      email: 'ramesh.patil.' + Date.now() + '@agrismart.ai',
      phone: '9876543210',
      password: 'StrongPassword123',
      confirmPassword: 'StrongPassword123',
      role: 'farmer',
      state: 'Maharashtra',
      district: 'Pune',
      village: 'Khed',
      farmSizeAcres: '4.5',
      primaryCrop: 'Tomato',
      soilType: 'Black Soil',
    };

    console.log('\n--- Test 1: Registering New Demo Farmer Account ---');
    const res1 = await postJson('/api/auth/register', demoUser);
    console.log(`Status: ${res1.status}`);
    console.log('Response:', JSON.stringify(res1.body, null, 2));

    if (res1.status === 201 && res1.body.success && res1.body.user && !res1.body.user.passwordHash) {
      console.log('✅ TEST 1 PASSED: User registered with sanitized profile & JWT token.');
    } else {
      console.log('❌ TEST 1 FAILED.');
    }

    // Test 2: Duplicate Account Prevention
    console.log('\n--- Test 2: Duplicate Email Rejection ---');
    const res2 = await postJson('/api/auth/register', demoUser);
    console.log(`Status: ${res2.status}`);
    console.log('Response:', JSON.stringify(res2.body, null, 2));

    if (res2.status === 409 && !res2.body.success) {
      console.log('✅ TEST 2 PASSED: Duplicate registration rejected with 409 Conflict.');
    } else {
      console.log('❌ TEST 2 FAILED.');
    }

    // Test 3: Invalid Email Format
    console.log('\n--- Test 3: Invalid Email Format Validation ---');
    const res3 = await postJson('/api/auth/register', {
      ...demoUser,
      email: 'not-a-valid-email',
    });
    console.log(`Status: ${res3.status}`);
    console.log('Response:', JSON.stringify(res3.body, null, 2));

    if (res3.status === 400 && !res3.body.success) {
      console.log('✅ TEST 3 PASSED: Invalid email rejected with 400 Bad Request.');
    } else {
      console.log('❌ TEST 3 FAILED.');
    }

    // Test 4: Password Mismatch Validation
    console.log('\n--- Test 4: Password Mismatch Validation ---');
    const res4 = await postJson('/api/auth/register', {
      ...demoUser,
      email: 'unique.' + Date.now() + '@agrismart.ai',
      password: 'Password123',
      confirmPassword: 'DifferentPassword456',
    });
    console.log(`Status: ${res4.status}`);
    console.log('Response:', JSON.stringify(res4.body, null, 2));

    if (res4.status === 400 && !res4.body.success) {
      console.log('✅ TEST 4 PASSED: Password mismatch rejected with 400 Bad Request.');
    } else {
      console.log('❌ TEST 4 FAILED.');
    }

    // Test 5: Login with Created Account
    console.log('\n--- Test 5: Login Verification ---');
    const res5 = await postJson('/api/auth/login', {
      email: demoUser.email,
      password: demoUser.password,
    });
    console.log(`Status: ${res5.status}`);
    console.log('Response:', JSON.stringify(res5.body, null, 2));

    if (res5.status === 200 && res5.body.success && res5.body.token) {
      console.log('✅ TEST 5 PASSED: Login authenticated successfully.');
    } else {
      console.log('❌ TEST 5 FAILED.');
    }
  } catch (err) {
    console.error('Error running verification:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
