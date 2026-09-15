const User = require('../models/User');
const FarmerProfile = require('../models/FarmerProfile');
const crypto = require('crypto');

// In-memory fallback user repository if MongoDB daemon is offline during testing
const memoryUsers = new Map();

// Helper to hash password for in-memory users
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, storedHash) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === storedHash;
}

// Seed default accounts for the 3 roles
const defaultSeedUsers = [
  {
    id: 'user_farmer_01',
    fullName: 'Ramesh Patil',
    email: 'farmer@agrismart.ai',
    phone: '9876543210',
    role: 'farmer',
    preferredLanguage: 'en',
    location: 'Pune, Maharashtra, India',
    state: 'Maharashtra',
    district: 'Pune',
    village: 'Khed',
    farmSize: '4.5 Acres',
    farmSizeAcres: '4.5',
    primaryCrop: 'Tomato',
    soilType: 'Black Soil',
    crops: ['Tomato', 'Wheat'],
  },
  {
    id: 'user_expert_01',
    fullName: 'Dr. Anjali Sharma',
    email: 'expert@agrismart.ai',
    phone: '9822334455',
    role: 'expert',
    preferredLanguage: 'en',
    location: 'Anand, Gujarat, India',
    specialization: 'Plant Pathology & IPM Solutions',
    institution: 'State Agricultural Extension Center',
  },
  {
    id: 'user_admin_01',
    fullName: 'System Administrator',
    email: 'admin@agrismart.ai',
    phone: '9988776655',
    role: 'admin',
    preferredLanguage: 'en',
    location: 'New Delhi, India',
  },
];

defaultSeedUsers.forEach((u) => {
  const { salt, hash } = hashPassword('password123');
  memoryUsers.set(u.email, {
    ...u,
    passwordHash: hash,
    salt,
    createdAt: new Date().toISOString(),
  });
  if (u.phone) {
    memoryUsers.set(u.phone, memoryUsers.get(u.email));
  }
});

/**
 * POST /api/auth/register
 * Handles user account creation for Farmers, Experts, and Admins
 */
const register = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      phone,
      password,
      confirmPassword,
      role = 'farmer',
      state = 'Maharashtra',
      district = 'Pune',
      village = '',
      farmSizeAcres = '4.5',
      primaryCrop = 'Tomato',
      soilType = 'Black Soil',
      specialization = '',
      institution = '',
      preferredLanguage = 'en',
    } = req.body;

    const contactPhone = phoneNumber || phone || '';
    const userRole = ['farmer', 'expert', 'admin'].includes(role) ? role : 'farmer';

    // 1. Mandatory Fields Validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your full name.',
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // 2. Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address format (e.g. farmer@example.com).',
      });
    }

    // 3. Password Validation
    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Password is required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long.',
      });
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Password and Confirm Password do not match.',
      });
    }

    // 4. Check for Duplicate Email in Database / Memory Store
    let existingUser = null;
    const isDbConnected = User.db && User.db.readyState === 1;

    if (isDbConnected) {
      try {
        existingUser = await User.findOne({ email: cleanEmail }).maxTimeMS(2000);
      } catch (dbErr) {
        existingUser = null;
      }
    }

    if (!existingUser) {
      existingUser = memoryUsers.get(cleanEmail);
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email address already exists. Please sign in instead.',
      });
    }

    // 5. Create User Record
    let safeUser = null;
    if (isDbConnected) {
      try {
        const user = new User({
          fullName: fullName.trim(),
          email: cleanEmail,
          phoneNumber: contactPhone,
          role: userRole,
          preferredLanguage,
          location: { state, district, village },
          farmDetails: {
            farmSize: `${farmSizeAcres} Acres`,
            primaryCrop,
            soilType,
          },
          specialization,
          institution,
        });

        user.setPassword(password);
        await user.save();
        safeUser = user.toSafeObject();

        if (userRole === 'farmer') {
          await FarmerProfile.create({
            fullName: fullName.trim(),
            phoneNumber: contactPhone || cleanEmail,
            preferredLanguage,
            location: { state, district, village },
            farmDetails: {
              totalAreaAcres: Number(farmSizeAcres) || 4.5,
              soilType: soilType.includes('Black') ? 'Black' : 'Loamy',
              currentCrops: [primaryCrop],
            },
          }).catch(() => {});
        }
      } catch (saveErr) {
        safeUser = null;
      }
    }

    if (!safeUser) {
      // Memory persistence
      const { salt, hash } = hashPassword(password);
      const memUser = {
        id: 'user_' + Date.now(),
        fullName: fullName.trim(),
        email: cleanEmail,
        phone: contactPhone,
        passwordHash: hash,
        salt,
        role: userRole,
        preferredLanguage,
        location: `${district}, ${state}, India`,
        state,
        district,
        village,
        farmSize: `${farmSizeAcres} Acres`,
        farmSizeAcres: String(farmSizeAcres),
        primaryCrop,
        soilType,
        crops: [primaryCrop, 'Wheat'],
        specialization,
        institution,
        createdAt: new Date().toISOString(),
      };
      memoryUsers.set(cleanEmail, memUser);
      const { passwordHash: _, salt: __, ...userWithoutPassword } = memUser;
      safeUser = userWithoutPassword;
    }

    const token = 'jwt-token-agrismart-' + Buffer.from(cleanEmail).toString('base64') + '-' + Date.now();

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to AgriSmart AI.',
      user: safeUser,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/auth/login
 * Handles user authentication
 */
const login = async (req, res, next) => {
  try {
    const { email, phone, phoneNumber, password, role } = req.body;
    const identifier = (email || phone || phoneNumber || '').trim().toLowerCase();

    if (!identifier) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your registered email or phone number.',
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your password.',
      });
    }

    let user = null;
    const isDbConnected = User.db && User.db.readyState === 1;

    if (isDbConnected) {
      try {
        user = await User.findOne({
          $or: [{ email: identifier }, { phoneNumber: identifier }],
        }).maxTimeMS(2000);
      } catch (e) {
        user = null;
      }
    }

    if (!user) {
      user = memoryUsers.get(identifier);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'No registered account found with these credentials.',
      });
    }

    let isMatch = false;
    if (typeof user.validatePassword === 'function') {
      isMatch = user.validatePassword(password);
    } else if (user.salt && user.passwordHash) {
      isMatch = verifyPassword(password, user.salt, user.passwordHash);
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect password. Please try again.',
      });
    }

    const safeUser = typeof user.toSafeObject === 'function' ? user.toSafeObject() : user;
    const token = 'jwt-token-agrismart-' + Buffer.from(identifier).toString('base64') + '-' + Date.now();

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: safeUser,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
};
