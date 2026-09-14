const express = require('express');
const router = express.Router();
const {
  getFarmerProfiles,
  createFarmerProfile,
  getCropRecords,
} = require('../controllers/farmerController');

// Routes for farmer management
router.get('/profiles', getFarmerProfiles);
router.post('/profiles', createFarmerProfile);
router.get('/crops', getCropRecords);

module.exports = router;
