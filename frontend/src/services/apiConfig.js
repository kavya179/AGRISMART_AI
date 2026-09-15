/**
 * AgriSmart AI - Centralized API Configuration & HTTP Client
 * Provides environment-aware endpoints, Mock vs. Real mode toggle,
 * request timeouts, and standardized error normalization.
 */

export const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_API_URL || 'http://localhost:8000/api';
export const NODE_BASE_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:5000/api';

const MODE_STORAGE_KEY = 'agrismart_api_mode'; // 'real' | 'mock'
const subscribers = new Set();

/**
 * Check whether Mock mode is active.
 * Defaults to 'real' if VITE_USE_MOCK_DATA is 'false' or Django is expected,
 * but allows instant runtime switching via UI or localStorage.
 */
export function isMockMode() {
  const stored = localStorage.getItem(MODE_STORAGE_KEY);
  if (stored !== null) {
    return stored === 'mock';
  }
  // Default to mock if env variable is explicitly set to true
  return import.meta.env.VITE_USE_MOCK_DATA === 'true';
}

/**
 * Set the API execution mode ('mock' | 'real')
 */
export function setMockMode(enableMock) {
  const mode = enableMock ? 'mock' : 'real';
  localStorage.setItem(MODE_STORAGE_KEY, mode);
  subscribers.forEach((cb) => cb(enableMock));
}

/**
 * Toggle between Real and Mock modes
 */
export function toggleMockMode() {
  const current = isMockMode();
  setMockMode(!current);
  return !current;
}

/**
 * Subscribe to API mode changes
 */
export function subscribeToApiMode(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

/**
 * Standardized error formatter for all API service calls
 */
export function formatApiError(err, defaultMsg = 'An unexpected error occurred.') {
  if (typeof err === 'string') {
    return { success: false, error: err, code: 'CLIENT_ERROR' };
  }
  if (err?.name === 'AbortError' || err?.message?.includes('aborted') || err?.message?.includes('timeout')) {
    return {
      success: false,
      error: 'Request timed out. The backend server took too long to respond. Please ensure Django is running on port 8000.',
      code: 'TIMEOUT',
    };
  }
  if (err?.code === 'NETWORK_ERROR' || !navigator.onLine || err?.message?.includes('Failed to fetch')) {
    return {
      success: false,
      error: 'Unable to connect to the backend server. Please verify Django (port 8000) or switch to Mock Demo mode.',
      code: 'NETWORK_ERROR',
    };
  }
  return {
    success: false,
    error: err?.message || err?.error || defaultMsg,
    code: err?.code || 'SERVER_ERROR',
    details: err?.details || null,
  };
}

/**
 * Generic Fetch helper with timeout and standardized parsing
 */
export async function apiFetch(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type') || '';
    let data = null;
    if (contentType.includes('application/json')) {
      data = await response.json().catch(() => null);
    } else {
      const text = await response.text().catch(() => '');
      data = { raw: text };
    }

    if (!response.ok) {
      const errorMsg =
        data?.error ||
        data?.message ||
        (data?.details ? JSON.stringify(data.details) : null) ||
        `Request failed with status ${response.status} (${response.statusText})`;

      const err = new Error(errorMsg);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}
