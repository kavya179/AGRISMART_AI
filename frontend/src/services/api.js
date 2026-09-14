/**
 * AgriSmart AI - Frontend API Service Layer
 * Cleanly decouples communication with Django REST AI Engine and Node.js App Gateway.
 */

const DJANGO_URL = import.meta.env.VITE_DJANGO_API_URL || 'http://localhost:8000/api';
const NODE_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:5000/api';

/**
 * Predict crop disease from an uploaded leaf image
 */
export async function predictCropDisease(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(`${DJANGO_URL}/disease/predict/`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 503) {
        return {
          success: false,
          error: data?.error || 'The crop disease detection model is currently being prepared. Please try again shortly.',
          isModelPending: true,
        };
      }
      const errorMessage = data?.details?.image?.[0] || data?.error || `Upload failed with status code ${response.status}.`;
      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: true,
      prediction: data.prediction,
      guidance: data.guidance,
    };
  } catch (err) {
    return {
      success: false,
      error: 'Unable to connect to the crop diagnosis server. Please check your internet connection or verify the Django server is running on port 8000.',
    };
  }
}

/**
 * Check backend services health
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${DJANGO_URL}/health/`, { method: 'GET' });
    const data = await res.json().catch(() => null);
    return {
      djangoOnline: res.ok,
      djangoData: data,
    };
  } catch (e) {
    return {
      djangoOnline: false,
      djangoData: null,
    };
  }
}

/**
 * Fetch crop recommendation based on soil, climate, and crop history parameters
 */
export async function getCropRecommendation(cropData) {
  try {
    const res = await fetch(`${DJANGO_URL}/crops/recommend/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cropData),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return { success: false, error: data?.error || data?.details || `Recommendation request failed (${res.status})` };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Unable to connect to crop recommendation service.' };
  }
}

/**
 * Fetch smart irrigation prediction based on soil moisture, weather forecast, crop, and stage
 */
export async function getSmartIrrigationAdvice(irrigationData) {
  try {
    const res = await fetch(`${DJANGO_URL}/irrigation/predict/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(irrigationData),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return { success: false, error: data?.error || data?.details || `Irrigation advice request failed (${res.status})` };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Unable to connect to smart irrigation service.' };
  }
}

/**
 * Fetch hyperlocal weather intelligence and agricultural action directives
 */
export async function getWeatherIntelligence(params = {}) {
  try {
    const query = new URLSearchParams({
      location: params.location || 'Gujarat',
      crop: params.crop_type || 'Tomato',
      stage: params.growth_stage || 'Flowering',
    }).toString();

    const res = await fetch(`${DJANGO_URL}/weather/intelligence/?${query}`, {
      method: 'GET',
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return { success: false, error: data?.error || `Weather intelligence fetch failed (${res.status})` };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Unable to connect to weather intelligence service.' };
  }
}

/**
 * Calculate farm sustainability score based on farming practices
 */
export async function calculateSustainabilityScore(practices = {}) {
  try {
    const res = await fetch(`${DJANGO_URL}/sustainability/calculate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(practices),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return { success: false, error: data?.error || `Sustainability calculation failed (${res.status})` };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Unable to connect to sustainability scoring service.' };
  }
}

/**
 * Fetch open sustainability formula specification
 */
export async function getSustainabilityFormula() {
  try {
    const res = await fetch(`${DJANGO_URL}/sustainability/formula/`, { method: 'GET' });
    return await res.json().catch(() => null);
  } catch (err) {
    return null;
  }
}

/**
 * Chat with Grounded Conversational Farmer Assistant
 */
export async function chatWithFarmerAssistant(query, language = 'en', farmerContext = {}) {
  try {
    const res = await fetch(`${DJANGO_URL}/assistant/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        language,
        farmer_context: farmerContext,
      }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return { success: false, error: data?.error || `Assistant service error (${res.status})` };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Unable to connect to assistant service.' };
  }
}

/**
 * Execute Demonstrable Agentic Advisor Decision Loop
 */
export async function runAgenticAdvisorLoop(farmContext = {}) {
  try {
    const res = await fetch(`${DJANGO_URL}/assistant/agentic-loop/run/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(farmContext),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return { success: false, error: data?.error || `Agentic loop error (${res.status})` };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Unable to connect to agentic advisor loop.' };
  }
}

