/**
 * AgriSmart AI - Unified API Service Layer Entrypoint
 * Re-exports modular services for seamless backwards compatibility and clean architectural decoupling.
 */

export * from './apiConfig';
export * from './authApi';
export * from './diseaseApi';
export * from './cropRecommendationApi';
export * from './irrigationApi';
export * from './weatherApi';
export * from './sustainabilityApi';
export * from './assistantApi';
export * from './advisorApi';
export * from './historyStorage';

/**
 * Backend Health Check Service
 */
import { DJANGO_BASE_URL, apiFetch } from './apiConfig';

export async function checkBackendHealth() {
  try {
    const data = await apiFetch(`${DJANGO_BASE_URL}/health/`, { method: 'GET' }, 3000);
    return {
      djangoOnline: true,
      djangoData: data,
    };
  } catch (e) {
    return {
      djangoOnline: false,
      djangoData: null,
      error: e.message,
    };
  }
}
