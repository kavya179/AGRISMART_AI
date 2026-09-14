/**
 * Local & remote persistence for farmer scan records and preferences.
 */

const STORAGE_KEY = 'agrismart_scan_history';
const USER_KEY = 'agrismart_user_profile';

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

export function getStoredUserProfile() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : {
      fullName: 'Ramesh Patil',
      phone: '+91 98765 43210',
      state: 'Maharashtra',
      district: 'Pune',
      village: 'Khed',
      farmSizeAcres: '4.5',
      primaryCrop: 'Tomato',
      soilType: 'Black Soil',
      preferredLanguage: 'en',
    };
  } catch {
    return null;
  }
}

export function saveStoredUserProfile(profile) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
}
