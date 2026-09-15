/**
 * AgriSmart AI - Authentication & Profile API Service Module
 * Handles login, registration, role management, and session status.
 */
import { DJANGO_BASE_URL, NODE_BASE_URL, isMockMode, apiFetch, formatApiError } from './apiConfig';
import { ROLES, ROLE_CONFIG, getCurrentRole, switchActiveRole } from './authService';
import { getStoredUserProfile, saveStoredUserProfile, clearAllAppData } from './historyStorage';
import { mockFarmerData, mockExpertData, mockAdminData } from '../data/mockData';

/**
 * Perform User Login (Phone / Email OTP or Password)
 */
export async function loginUser(credentials) {
  const { phone, role = ROLES.FARMER, otp, password } = credentials;

  // 1. If in Live mode, attempt connection with backend auth endpoint
  if (!isMockMode()) {
    try {
      const payload = { phone, role, otp, password };
      // Attempt Node.js backend auth or Django auth
      const response = await apiFetch(`${NODE_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, 3500);

      if (response && response.token) {
        localStorage.setItem('agrismart_token', response.token);
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
      // If server is unavailable, inform caller or fall back gracefully
      console.warn('Backend login endpoint unavailable, applying localized authentication session:', err.message);
    }
  }

  // 2. Local / Mock Authentication Flow
  await new Promise((resolve) => setTimeout(resolve, 300));

  const roleProfile = switchActiveRole(role);
  const userProfile = {
    ...roleProfile,
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
 * Perform User Registration
 */
export async function registerUser(userData) {
  const { name, phone, role = ROLES.FARMER, state, district, farmSize, preferredLanguage = 'en' } = userData;

  if (!isMockMode()) {
    try {
      const response = await apiFetch(`${NODE_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }, 4000);

      if (response && response.success) {
        return {
          success: true,
          user: response.user,
          isRealBackend: true,
        };
      }
    } catch (err) {
      console.warn('Backend register endpoint unavailable, falling back to local registration:', err.message);
    }
  }

  // Local / Mock registration
  await new Promise((resolve) => setTimeout(resolve, 400));

  const newProfile = {
    name: name || 'Farm Producer',
    phone: phone || '9876543210',
    role: role,
    location: `${district || 'Central'}, ${state || 'Gujarat'}, India`,
    farmSize: farmSize ? `${farmSize} Acres` : '4.5 Acres',
    soilType: 'Black Clay Loam',
    crops: ['Tomato', 'Wheat', 'Cotton'],
    preferredLanguage,
    registeredAt: new Date().toISOString(),
  };

  saveStoredUserProfile(newProfile);

  return {
    success: true,
    user: newProfile,
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
