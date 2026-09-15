const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: '',
    },
    passwordHash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['farmer', 'expert', 'admin'],
      default: 'farmer',
    },
    preferredLanguage: {
      type: String,
      default: 'en',
    },
    location: {
      state: { type: String, default: 'Maharashtra' },
      district: { type: String, default: 'Pune' },
      village: { type: String, default: '' },
    },
    farmDetails: {
      farmSize: { type: String, default: '4.5 Acres' },
      primaryCrop: { type: String, default: 'Tomato' },
      soilType: { type: String, default: 'Black Soil' },
    },
    specialization: {
      type: String,
      default: '',
    },
    institution: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.passwordHash === hash;
};

UserSchema.methods.toSafeObject = function () {
  return {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    phone: this.phoneNumber,
    role: this.role,
    preferredLanguage: this.preferredLanguage,
    location: `${this.location?.district || 'Pune'}, ${this.location?.state || 'Maharashtra'}, India`,
    state: this.location?.state || 'Maharashtra',
    district: this.location?.district || 'Pune',
    village: this.location?.village || '',
    farmSize: this.farmDetails?.farmSize || '4.5 Acres',
    farmSizeAcres: this.farmDetails?.farmSize?.replace(' Acres', '') || '4.5',
    primaryCrop: this.farmDetails?.primaryCrop || 'Tomato',
    soilType: this.farmDetails?.soilType || 'Black Soil',
    crops: [this.farmDetails?.primaryCrop || 'Tomato', 'Wheat'],
    specialization: this.specialization || '',
    institution: this.institution || '',
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model('User', UserSchema);
