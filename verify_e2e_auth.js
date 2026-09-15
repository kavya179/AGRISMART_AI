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

async function runFullVerification() {
  console.log('=== AGRISMART E2E SIGNUP & LOGIN FLOW VERIFICATION ===\n');

  const randomId = Date.now();

  // Test 1: Register New Farmer
  const newFarmerEmail = `test_farmer_${randomId}@agrismart.ai`;
  const regFarmerRes = await testPost('/api/auth/register', {
    fullName: 'Suresh Kumar',
    email: newFarmerEmail,
    phone: '9811223344',
    password: 'password123',
    confirmPassword: 'password123',
    role: 'farmer',
    state: 'Punjab',
    district: 'Ludhiana',
    village: 'Samrala',
    farmSizeAcres: '6.0',
    primaryCrop: 'Wheat',
    soilType: 'Alluvial Soil',
  });
  console.log('1. Register New Farmer:');
  console.log('   Status:', regFarmerRes.status, '(Expected 201)');
  console.log('   Success:', regFarmerRes.body.success);
  console.log('   Role Assigned:', regFarmerRes.body.user?.role);
  console.log('   Email:', regFarmerRes.body.user?.email);

  // Test 2: Login With Newly Registered Farmer
  const loginNewFarmer = await testPost('/api/auth/login', {
    email: newFarmerEmail,
    password: 'password123',
  });
  console.log('\n2. Login Newly Registered Farmer:');
  console.log('   Status:', loginNewFarmer.status, '(Expected 200)');
  console.log('   Role Determined:', loginNewFarmer.body.user?.role);
  console.log('   Token Generated:', Boolean(loginNewFarmer.body.token));

  // Test 3: Register New Agronomist / Expert
  const newExpertEmail = `test_expert_${randomId}@agrismart.ai`;
  const regExpertRes = await testPost('/api/auth/register', {
    fullName: 'Dr. Vikram Seth',
    email: newExpertEmail,
    phone: '9844556677',
    password: 'password123',
    confirmPassword: 'password123',
    role: 'expert',
    specialization: 'Soil Microbiology',
    institution: 'IARI Pusa',
  });
  console.log('\n3. Register New Expert:');
  console.log('   Status:', regExpertRes.status, '(Expected 201)');
  console.log('   Role Assigned:', regExpertRes.body.user?.role);

  // Test 4: Login With Newly Registered Expert
  const loginNewExpert = await testPost('/api/auth/login', {
    email: newExpertEmail,
    password: 'password123',
  });
  console.log('\n4. Login Newly Registered Expert:');
  console.log('   Status:', loginNewExpert.status, '(Expected 200)');
  console.log('   Role Determined:', loginNewExpert.body.user?.role);

  // Test 5: Duplicate Email Prevention
  const dupRes = await testPost('/api/auth/register', {
    fullName: 'Duplicate User',
    email: newFarmerEmail,
    password: 'password123',
    confirmPassword: 'password123',
    role: 'farmer',
  });
  console.log('\n5. Duplicate Email Rejection:');
  console.log('   Status:', dupRes.status, '(Expected 409)');
  console.log('   Error Message:', dupRes.body.error);

  console.log('\n======================================================');
}

runFullVerification().catch(console.error);
