/**
 * AgriSmart AI - Authentication & Profile API Service Module
 * Handles login, registration, role management, and session status.
 */
import { DJANGO_BASE_URL, NODE_BASE_URL, isMockMode, apiFetch, formatApiError } from './apiConfig';
import { ROLES, ROLE_CONFIG, getCurrentRole, switchActiveRole } from './authService';
import { getStoredUserProfile, saveStoredUserProfile, clearAllAppData } from './historyStorage';
import { mockFarmerData, mockExpertData, mockAdminData } from '../data/mockData';

/**
 * Perform User Login (Email / Phone + Password or OTP)
 */
export async function loginUser(credentials) {
  const { email, phone, role = ROLES.FARMER, otp, password } = credentials;
  const identifier = email || phone || '';

  // 1. If in Live mode, attempt connection with backend auth endpoint
  if (!isMockMode()) {
    try {
      const payload = {
        email: email || (phone ? undefined : identifier),
        phone: phone || (email ? undefined : identifier),
        phoneNumber: phone || identifier,
        role,
        otp,
        password,
      };

      const response = await apiFetch(`${NODE_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, 4000);

      if (response && response.success) {
        if (response.token) {
          localStorage.setItem('agrismart_token', response.token);
        }
        const profile = response.user || ROLE_CONFIG[role]?.defaultProfile;
        saveStoredUserProfile(profile);
        return {
          success: true,
          token: response.token,
          user: profile,
          isRealBackend: true,
        };
      }
    } catch (err) {
      const formatted = formatApiError(err, 'Login request failed.');
      // If server returned an explicit error (like 401 or 400), return it directly
      if (err?.status === 401 || err?.status === 400 || err?.status === 404) {
        return {
          success: false,
          error: err?.data?.error || err?.data?.message || err.message,
        };
      }
      console.warn('Backend login endpoint unavailable, applying localized authentication fallback:', err.message);
    }
  }

  // 2. Local / Mock Authentication Flow
  await new Promise((resolve) => setTimeout(resolve, 300));

  const roleProfile = switchActiveRole(role);
  const userProfile = {
    ...roleProfile,
    email: email || `${role}@agrismart.ai`,
    phone: phone || roleProfile.phone || '9876543210',
    lastLogin: new Date().toISOString(),
  };
  saveStoredUserProfile(userProfile);

  return {
    success: true,
    token: 'mock-jwt-token-agrismart-' + Date.now(),
    user: userProfile,
    isMock: true,
  };
}

/**
 * Perform User Registration (Connected to POST /api/auth/register)
 */
export async function registerUser(userData = {}) {
  const fullName = userData.fullName || userData.name || 'Farm Producer';
  const email = (userData.email || '').trim().toLowerCase();
  const phone = userData.phone || userData.phoneNumber || '9876543210';
  const password = userData.password || '';
  const confirmPassword = userData.confirmPassword || '';
  const role = userData.role || ROLES.FARMER;
  const state = userData.state || 'Maharashtra';
  const district = userData.district || 'Pune';
  const village = userData.village || 'Khed';
  const farmSizeAcres = userData.farmSizeAcres || userData.farmSize || '4.5';
  const primaryCrop = userData.primaryCrop || 'Tomato';
  const soilType = userData.soilType || 'Black Soil';
  const specialization = userData.specialization || '';
  const institution = userData.institution || '';
  const preferredLanguage = userData.preferredLanguage || 'en';

  // 1. Live Backend Request
  if (!isMockMode()) {
    try {
      const response = await apiFetch(`${NODE_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          phoneNumber: phone,
          password,
          confirmPassword,
          role,
          state,
          district,
          village,
          farmSizeAcres,
          primaryCrop,
          soilType,
          specialization,
          institution,
          preferredLanguage,
        }),
      }, 5000);

      if (response && response.success) {
        const saved = response.user || {
          fullName,
          email,
          phone,
          role,
          state,
          district,
          village,
          farmSizeAcres,
          primaryCrop,
          soilType,
          location: `${district}, ${state}, India`,
          crops: [primaryCrop, 'Wheat'],
          specialization,
          institution,
          preferredLanguage,
          registeredAt: new Date().toISOString(),
        };

        if (response.token) {
          localStorage.setItem('agrismart_token', response.token);
        }
        saveStoredUserProfile(saved);

        return {
          success: true,
          message: response.message || 'Registration successful!',
          user: saved,
          token: response.token,
          isRealBackend: true,
        };
      }
    } catch (err) {
      // If server returned duplicate email (409) or bad request (400), return error to user
      if (err?.status === 409 || err?.status === 400) {
        return {
          success: false,
          error: err?.data?.error || err?.data?.message || err.message,
        };
      }
      console.warn('Backend register endpoint unavailable, falling back to local registration:', err.message);
    }
  }

  // 2. Local / Mock Registration Flow
  await new Promise((resolve) => setTimeout(resolve, 350));

  const newProfile = {
    fullName,
    email: email || 'farmer@agrismart.ai',
    phone,
    role,
    state,
    district,
    village,
    farmSizeAcres,
    primaryCrop,
    soilType,
    location: `${district}, ${state}, India`,
    farmSize: `${farmSizeAcres} Acres`,
    crops: [primaryCrop, 'Wheat'],
    specialization,
    institution,
    preferredLanguage,
    registeredAt: new Date().toISOString(),
  };

  saveStoredUserProfile(newProfile);

  return {
    success: true,
    message: 'Profile created successfully!',
    user: newProfile,
    token: 'mock-jwt-token-agrismart-' + Date.now(),
    isMock: true,
  };
}

/**
 * Logout User & Clear Session
 */
export async function logoutUser() {
  localStorage.removeItem('agrismart_token');
  return { success: true };
}

/**
 * Get Current Active User Session Profile
 */
export function getCurrentUserProfile() {
  return getStoredUserProfile() || ROLE_CONFIG[ROLES.FARMER].defaultProfile;
}

export { ROLES, ROLE_CONFIG, getCurrentRole, switchActiveRole };
