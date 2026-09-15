/**
 * Local & remote persistence for farmer scan records and preferences.
 */

const STORAGE_KEY = 'agrismart_scan_history';
const USER_KEY = 'agrismart_user_profile';
const TOKEN_KEY = 'agrismart_token';
const ACTIVE_PAGE_KEY = 'agrismart_active_page';

export function getStoredScanHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveScanRecord(record) {
  try {
    const current = getStoredScanHistory();
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      ...record,
    };
    const updated = [newRecord, ...current].slice(0, 50); // Keep last 50 scans
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  } catch (e) {
    console.error('Failed to save scan record:', e);
    return record;
  }
}

export function clearStoredHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function setAuthToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (e) {
    console.error('Failed to update auth token in storage:', e);
  }
}

export function getStoredActivePage() {
  try {
    return localStorage.getItem(ACTIVE_PAGE_KEY) || null;
  } catch {
    return null;
  }
}

export function saveStoredActivePage(page) {
  try {
    if (page) {
      localStorage.setItem(ACTIVE_PAGE_KEY, page);
    } else {
      localStorage.removeItem(ACTIVE_PAGE_KEY);
    }
  } catch (e) {
    console.error('Failed to save active page in storage:', e);
  }
}

export function clearAllAppData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ACTIVE_PAGE_KEY);
  } catch (e) {
    console.error('Failed to clear app data:', e);
  }
}

export function getStoredUserProfile() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      if (!parsed.role) parsed.role = 'farmer';
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveStoredUserProfile(profile) {
  try {
    if (profile) {
      localStorage.setItem(USER_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
}

export function isAuthenticated() {
  const token = getAuthToken();
  const profile = getStoredUserProfile();
  return Boolean(token || profile);
}

