const mongoose = require('mongoose');

const FarmerProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide farmer full name'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide phone number'],
      unique: true,
      trim: true,
    },
    preferredLanguage: {
      type: String,
      default: 'en',
      enum: ['en', 'hi', 'mr', 'gu', 'te', 'ta', 'kn', 'pa'],
    },
    location: {
      state: { type: String, required: true },
      district: { type: String, required: true },
      village: { type: String, default: '' },
      pincode: { type: String, default: '' },
      coordinates: {
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null },
      },
    },
    farmDetails: {
      totalAreaAcres: { type: Number, default: 0 },
      soilType: {
        type: String,
        enum: ['Alluvial', 'Black', 'Red', 'Laterite', 'Arid', 'Clayey', 'Loamy', 'Other'],
        default: 'Loamy',
      },
      irrigationSource: {
        type: String,
        enum: ['Borewell', 'Canal', 'Rainfed', 'Drip', 'Sprinkler', 'River', 'Other'],
        default: 'Rainfed',
      },
      currentCrops: [{ type: String }],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FarmerProfile', FarmerProfileSchema);
