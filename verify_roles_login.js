const http = require('http');

async function testPost(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let respData = '';
        res.on('data', (chunk) => {
          respData += chunk;
        });
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(respData) });
          } catch {
            resolve({ status: res.statusCode, body: respData });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runAuthVerification() {
  console.log('=== AGRISMART AUTH & ROLE-BASED ACCESS VERIFICATION ===\n');

  // Test 1: Farmer Login
  const farmerRes = await testPost('/api/auth/login', {
    email: 'farmer@agrismart.ai',
    password: 'password123',
    role: 'farmer',
  });
  console.log('1. Farmer Login:');
  console.log('   Status:', farmerRes.status);
  console.log('   Success:', farmerRes.body.success);
  console.log('   Role Returned:', farmerRes.body.user?.role);
  console.log('   User Full Name:', farmerRes.body.user?.fullName);
  console.log('   Has Token:', Boolean(farmerRes.body.token));

  // Test 2: Expert Login
  const expertRes = await testPost('/api/auth/login', {
    email: 'expert@agrismart.ai',
    password: 'password123',
    role: 'expert',
  });
  console.log('\n2. Expert Login:');
  console.log('   Status:', expertRes.status);
  console.log('   Success:', expertRes.body.success);
  console.log('   Role Returned:', expertRes.body.user?.role);
  console.log('   User Full Name:', expertRes.body.user?.fullName);
  console.log('   Has Token:', Boolean(expertRes.body.token));

  // Test 3: Admin Login
  const adminRes = await testPost('/api/auth/login', {
    email: 'admin@agrismart.ai',
    password: 'password123',
    role: 'admin',
  });
  console.log('\n3. Admin Login:');
  console.log('   Status:', adminRes.status);
  console.log('   Success:', adminRes.body.success);
  console.log('   Role Returned:', adminRes.body.user?.role);
  console.log('   User Full Name:', adminRes.body.user?.fullName);
  console.log('   Has Token:', Boolean(adminRes.body.token));

  // Test 4: Wrong Password
  const wrongPwdRes = await testPost('/api/auth/login', {
    email: 'farmer@agrismart.ai',
    password: 'wrong_password',
  });
  console.log('\n4. Invalid Password Attempt:');
  console.log('   Status:', wrongPwdRes.status, '(Expected 401)');
  console.log('   Error Message:', wrongPwdRes.body.error);

  // Test 5: Unknown User
  const unknownUserRes = await testPost('/api/auth/login', {
    email: 'unknown_ghost@agrismart.ai',
    password: 'password123',
  });
  console.log('\n5. Unknown User Attempt:');
  console.log('   Status:', unknownUserRes.status, '(Expected 401)');
  console.log('   Error Message:', unknownUserRes.body.error);

  console.log('\n======================================================');
}

runAuthVerification().catch(console.error);
