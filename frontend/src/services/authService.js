/**
 * AgriSmart AI - Role-Based Authentication & Authorization Helpers
 */
import { getStoredUserProfile, saveStoredUserProfile } from './historyStorage';
import { mockFarmerData, mockExpertData, mockAdminData } from '../data/mockData';

export const ROLES = {
  FARMER: 'farmer',
  EXPERT: 'expert',
  ADMIN: 'admin',
};

export const ROLE_CONFIG = {
  [ROLES.FARMER]: {
    label: 'Farmer',
    badgeClass: 'badge-farmer',
    portalTitle: 'Smart Farming Hub',
    dashboardPage: 'dashboard',
    defaultProfile: mockFarmerData.profile,
  },
  [ROLES.EXPERT]: {
    label: 'Agricultural Expert',
    badgeClass: 'badge-expert',
    portalTitle: 'Agronomist Command Center',
    dashboardPage: 'expert-dashboard',
    defaultProfile: mockExpertData.profile,
  },
  [ROLES.ADMIN]: {
    label: 'System Admin',
    badgeClass: 'badge-admin',
    portalTitle: 'Platform Administration',
    dashboardPage: 'admin-dashboard',
    defaultProfile: mockAdminData.profile,
  },
};

/**
 * Get current active user role (defaults to 'farmer')
 */
export function getCurrentRole() {
  const profile = getStoredUserProfile();
  if (profile && profile.role && ROLE_CONFIG[profile.role]) {
    return profile.role;
  }
  return ROLES.FARMER;
}

/**
 * Switch active role and update user profile appropriately
 */
export function switchActiveRole(newRole) {
  if (!ROLE_CONFIG[newRole]) return;
  const current = getStoredUserProfile() || {};
  const defaults = ROLE_CONFIG[newRole].defaultProfile;

  const updatedProfile = {
    ...defaults,
    ...current,
    role: newRole,
    preferredLanguage: current.preferredLanguage || defaults.preferredLanguage || 'en',
  };

  saveStoredUserProfile(updatedProfile);
  return updatedProfile;
}

/**
 * Define permissions / allowed pages per role
 */
export const ROLE_PERMISSIONS = {
  [ROLES.FARMER]: [
    'landing',
    'login',
    'register',
    'dashboard',
    'disease',
    'disease-result',
    'crop-recommendation',
    'irrigation',
    'weather',
    'sustainability',
    'assistant',
    'agentic-advisor',
    'history',
    'profile',
    'help',
    'system-status',
  ],
  [ROLES.EXPERT]: [
    'landing',
    'login',
    'register',
    'dashboard',
    'expert-dashboard',
    'expert-requests',
    'expert-disease-analysis',
    'expert-recommendations',
    'expert-advisory',
    'expert-reports',
    'disease',
    'disease-result',
    'weather',
    'profile',
    'help',
    'system-status',
  ],
  [ROLES.ADMIN]: [
    'landing',
    'login',
    'register',
    'dashboard',
    'admin-dashboard',
    'admin-users',
    'admin-farmers',
    'admin-experts',
    'admin-disease-reports',
    'admin-analytics',
    'admin-model-status',
    'admin-reports',
    'admin-settings',
    'system-status',
    'profile',
    'help',
  ],
};

/**
 * Check if current user is authorized to access a given page
 */
export function canAccessPage(pageId, role = getCurrentRole()) {
  const allowed = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS[ROLES.FARMER];
  return allowed.includes(pageId);
}

/**
 * Get the proper dashboard target page for a given role
 */
export function getRoleDashboard(role = getCurrentRole()) {
  switch (role) {
    case ROLES.EXPERT:
      return 'expert-dashboard';
    case ROLES.ADMIN:
      return 'admin-dashboard';
    case ROLES.FARMER:
    default:
      return 'dashboard';
  }
}
