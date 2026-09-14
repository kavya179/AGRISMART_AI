const FarmerProfile = require('../models/FarmerProfile');
const CropRecord = require('../models/CropRecord');

/**
 * Get all farmer profiles (with optional limit)
 */
const getFarmerProfiles = async (req, res, next) => {
  try {
    const profiles = await FarmerProfile.find().limit(20).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new farmer profile
 */
const createFarmerProfile = async (req, res, next) => {
  try {
    const { fullName, phoneNumber, preferredLanguage, location, farmDetails } = req.body;

    if (!fullName || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Full name and phone number are required',
      });
    }

    const newProfile = await FarmerProfile.create({
      fullName,
      phoneNumber,
      preferredLanguage: preferredLanguage || 'en',
      location: location || { state: 'Maharashtra', district: 'Pune' },
      farmDetails: farmDetails || {},
    });

    res.status(201).json({
      success: true,
      message: 'Farmer profile created successfully',
      data: newProfile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get crop records
 */
const getCropRecords = async (req, res, next) => {
  try {
    const records = await CropRecord.find().populate('farmerId', 'fullName phoneNumber').limit(20);
    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFarmerProfiles,
  createFarmerProfile,
  getCropRecords,
};
