/**
 * AgriSmart AI - Crop Disease Detection Service Module
 * Cleanly interfaces with Django REST AI Engine:
 * POST /api/disease/predict/ (multipart/form-data with 'image' field)
 * GET /api/disease/status/
 */
import { DJANGO_BASE_URL, isMockMode, apiFetch, formatApiError } from './apiConfig';

/**
 * Standard Mock Knowledge Base for Plant Pathology
 */
const MOCK_DIAGNOSES = [
  {
    crop: 'Tomato',
    disease: 'Tomato Early Blight (Alternaria solani)',
    status: 'diseased',
    confidence: 91.5,
    severity: 'Moderate',
    explanation:
      'Alternaria solani is a common fungal pathogen that produces concentric dark circular rings on older foliage, resembling a target-board pattern. It thrives in high humidity (>80%) and moderate temperatures (24-29°C).',
    recommendation:
      'Remove and destroy heavily spotted lower leaves. Avoid overhead sprinkling to reduce leaf wetness. Apply preventative spray of Mancozeb 75% WP @ 2.5g/L water.',
    preventionTips: [
      'Space plants adequately to ensure good ventilation and rapid foliage drying.',
      'Practice crop rotation away from solanaceous plants (potatoes, eggplants) for 2 seasons.',
      'Mulch soil around plants to prevent fungal spores from splashing up during rains.',
      'Water at the base of plants during early morning hours.',
    ],
    expertConsultationRequired: false,
  },
  {
    crop: 'Soybean',
    disease: 'Healthy Leaf (No pathogen detected)',
    status: 'healthy',
    confidence: 96.8,
    severity: 'None',
    explanation:
      'The leaf exhibits uniform chlorophyll distribution, healthy turgor, and no visible signs of fungal sporulation, bacterial water-soaking, or viral mosaic patterning.',
    recommendation:
      'Your crop is healthy and vigorous! Maintain your current balanced fertigation and routine scouting schedule.',
    preventionTips: [
      'Continue regular weekly leaf inspections for early pest detection.',
      'Maintain optimal drip irrigation without waterlogging root zones.',
      'Apply balanced NPK nutrients according to soil test recommendations.',
    ],
    expertConsultationRequired: false,
  },
  {
    crop: 'Potato',
    disease: 'Potato Late Blight (Phytophthora infestans)',
    status: 'diseased',
    confidence: 88.4,
    severity: 'High',
    explanation:
      'Phytophthora infestans causes rapid water-soaked lesions that turn dark brown to black. In humid conditions, a delicate white mildew appears on the underside of the leaves. This is an aggressive pathogen capable of destroying whole fields within days.',
    recommendation:
      'Immediately isolate affected patches. Apply systemic fungicide Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L. Discontinue overhead irrigation immediately.',
    preventionTips: [
      'Plant certified disease-free seed tubers from verified nurseries.',
      'Destroy volunteer potato plants and cull piles from previous harvests.',
      'Monitor local agrometeorological alerts for late blight infection periods.',
    ],
    expertConsultationRequired: true,
  },
  {
    crop: 'Tomato',
    disease: 'Uncertain Pattern / Low Confidence Leaf Scan',
    status: 'uncertain',
    confidence: 54.2,
    severity: 'Unknown',
    explanation:
      'The image features blurriness, suboptimal lighting, or ambiguous leaf symptoms that could not be classified with high confidence against the trained plant disease models.',
    recommendation:
      'Result is uncertain. Please upload a clearer photo taken in natural daylight with the affected leaf centered, or submit this case for review by an agricultural expert.',
    preventionTips: [
      'Ensure the leaf is in focus and fills at least 70% of the camera frame.',
      'Avoid harsh glare, flash reflections, or heavy shadows on the leaf surface.',
      'Photograph both upper and lower leaf surfaces if spotting is visible.',
    ],
    expertConsultationRequired: true,
  },
  {
    crop: 'Cotton',
    disease: 'Cotton Bacterial Blight (Xanthomonas citri pv. malvacearum)',
    status: 'diseased',
    confidence: 89.1,
    severity: 'High',
    explanation:
      'Angular leaf spots bounded by leaf veins with water-soaked appearances. If unchecked, can progress to blackarm phase on stems and boll rot.',
    recommendation:
      'Spray Copper Oxychloride 50% WP (2.5g) + Streptocycline (0.1g) per litre of water. Remove severely infected branches.',
    preventionTips: [
      'Use acid-delinted and fungicide-treated seeds.',
      'Avoid high nitrogen fertilizer doses which promote succulent susceptible tissue.',
      'Destroy crop residue after harvest to prevent pathogen overwintering.',
    ],
    expertConsultationRequired: false,
  },
];

/**
 * Predict crop disease from an uploaded image file
 * Interfacing with Django REST Engine (POST /api/disease/predict/)
 */
export async function predictCropDisease(imageFile, sampleType = null) {
  if (!imageFile) {
    return {
      success: false,
      error: 'No image file provided for crop disease diagnosis.',
      code: 'INVALID_INPUT',
    };
  }

  // 1. If in Live mode, attempt connection with real Django REST Engine
  if (!isMockMode()) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout for ML inference

      const response = await fetch(`${DJANGO_BASE_URL}/disease/predict/`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg =
          data?.error ||
          data?.details?.image?.[0] ||
          `Django prediction service failed with status ${response.status}.`;
        return {
          success: false,
          error: errorMsg,
          code: 'PREDICTION_ERROR',
        };
      }

      if (data && data.success && data.prediction) {
        return {
          success: true,
          crop: data.prediction.crop || (data.prediction.class?.split('___')[0] || 'Crop'),
          disease: data.prediction.class || 'Detected Condition',
          confidence: Math.round((data.prediction.confidence || 0.9) * 100),
          status: data.prediction.status || 'diseased',
          severity: data.prediction.severity || (data.prediction.status === 'healthy' ? 'None' : 'Moderate'),
          explanation: data.guidance?.explanation || 'Pathological analysis completed via Computer Vision & ML.',
          recommendation: data.guidance?.recommendation || 'Follow standard agronomic crop care.',
          preventionTips: data.guidance?.precautions || data.guidance?.preventionTips || [
            'Inspect crop foliage weekly for early symptom recurrence.',
            'Maintain optimal soil moisture avoiding standing water.',
          ],
          expertConsultationRequired: (data.prediction.confidence || 1) < 0.70,
          isRealBackend: true,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (err) {
      console.warn('Real Django disease predict service unavailable, falling back:', err.message);
      // If user strictly disabled mock mode, return actual error
      if (!isMockMode()) {
        return formatApiError(err, 'Unable to connect to Django crop diagnosis service on port 8000.');
      }
    }
  }

  // 2. Local / Mock Inference Simulation (Fast, CPU-safe)
  await new Promise((resolve) => setTimeout(resolve, 1100));

  let matchedDiagnosis = MOCK_DIAGNOSES[0]; // Default Tomato Early Blight

  const fileName = (imageFile?.name || '').toLowerCase();
  const explicitSample = (sampleType || '').toLowerCase();

  if (explicitSample.includes('healthy') || fileName.includes('healthy')) {
    matchedDiagnosis = MOCK_DIAGNOSES[1];
  } else if (
    explicitSample.includes('potato') ||
    explicitSample.includes('late') ||
    fileName.includes('potato') ||
    fileName.includes('late')
  ) {
    matchedDiagnosis = MOCK_DIAGNOSES[2];
  } else if (
    explicitSample.includes('uncertain') ||
    explicitSample.includes('blurry') ||
    fileName.includes('blur') ||
    fileName.includes('uncertain')
  ) {
    matchedDiagnosis = MOCK_DIAGNOSES[3];
  } else if (explicitSample.includes('cotton') || fileName.includes('cotton')) {
    matchedDiagnosis = MOCK_DIAGNOSES[4];
  } else {
    const charCode = fileName.charCodeAt(0) || 0;
    matchedDiagnosis = MOCK_DIAGNOSES[charCode % MOCK_DIAGNOSES.length];
  }

  return {
    success: true,
    ...matchedDiagnosis,
    isMock: true,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Check Disease Detection ML Service Status
 */
export async function checkDiseaseServiceStatus() {
  try {
    const response = await apiFetch(`${DJANGO_BASE_URL}/disease/status/`, { method: 'GET' }, 3000);
    return {
      online: true,
      data: response,
    };
  } catch (e) {
    return {
      online: false,
      error: e.message,
    };
  }
}

/**
 * Get available sample leaf presets for fast farmer testing
 */
export function getSampleLeafPresets() {
  return [
    {
      id: 'tomato-early-blight',
      label: 'Tomato Early Blight',
      badge: 'Fungal',
      type: 'early-blight',
      desc: 'Concentric dark spots on leaf',
    },
    {
      id: 'healthy-soybean',
      label: 'Healthy Soybean Leaf',
      badge: 'Healthy',
      type: 'healthy',
      desc: 'Clean, green, disease-free leaf',
    },
    {
      id: 'potato-late-blight',
      label: 'Potato Late Blight',
      badge: 'Critical',
      type: 'late-blight',
      desc: 'Water-soaked brown decay',
    },
    {
      id: 'uncertain-scan',
      label: 'Blurry / Low Confidence',
      badge: 'Uncertain',
      type: 'uncertain',
      desc: 'Suboptimal lighting / blur',
    },
  ];
}
