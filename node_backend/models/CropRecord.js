const mongoose = require('mongoose');

const CropRecordSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FarmerProfile',
      required: false, // Optional for guest/anonymous scans
    },
    cropName: {
      type: String,
      required: [true, 'Crop name is required'],
      trim: true,
    },
    variety: {
      type: String,
      default: '',
    },
    sowingDate: {
      type: Date,
    },
    harvestExpectedDate: {
      type: Date,
    },
    healthStatus: {
      type: String,
      enum: ['Healthy', 'Suspected Disease', 'Under Treatment', 'Resolved', 'Unknown'],
      default: 'Unknown',
    },
    scanHistory: [
      {
        scanId: { type: String },
        scannedAt: { type: Date, default: Date.now },
        imageUrl: { type: String },
        predictedLabel: { type: String },
        confidence: { type: Number },
        treatmentApplied: { type: String, default: '' },
      },
    ],
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CropRecord', CropRecordSchema);
