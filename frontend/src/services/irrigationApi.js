/**
 * AgriSmart AI - Smart Irrigation Service Module
 * Interfaces with Django REST AI Engine:
 * POST /api/irrigation/predict/
 * GET /api/irrigation/status/
 */
import { DJANGO_BASE_URL, isMockMode, apiFetch, formatApiError } from './apiConfig';

/**
 * Crop moisture thresholds by growth stage
 */
const CROP_THRESHOLDS = {
  Tomato: { minMoisture: 42, optimal: 60, waterPerSqm: 14.5, cycleMins: 50 },
  Wheat: { minMoisture: 35, optimal: 55, waterPerSqm: 12.0, cycleMins: 45 },
  Cotton: { minMoisture: 38, optimal: 58, waterPerSqm: 16.0, cycleMins: 60 },
  Sugarcane: { minMoisture: 50, optimal: 70, waterPerSqm: 22.0, cycleMins: 80 },
  Soybean: { minMoisture: 36, optimal: 55, waterPerSqm: 11.5, cycleMins: 40 },
  Potato: { minMoisture: 45, optimal: 65, waterPerSqm: 15.0, cycleMins: 55 },
  Rice: { minMoisture: 65, optimal: 85, waterPerSqm: 28.0, cycleMins: 90 },
};

/**
 * Calculate smart irrigation advisory
 */
export async function getSmartIrrigationAdvice(params) {
  // Validate input
  if (!params || params.soil_moisture === undefined || params.soil_moisture === '') {
    return {
      success: false,
      error: 'Please enter a valid soil moisture percentage.',
      code: 'INVALID_INPUT',
    };
  }

  // 1. If in Live mode, attempt connection with Django REST API
  if (!isMockMode()) {
    try {
      const data = await apiFetch(`${DJANGO_BASE_URL}/irrigation/predict/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      }, 4000);

      if (data && data.success) {
        const isRequired = Boolean(data.irrigation_required);
        const isRain = data.priority === 'None / Delay' || (data.recommended_action || '').toLowerCase().includes('delay');
        const badgeSeverity = isRequired ? (data.priority?.includes('High') ? 'danger' : 'warning') : (isRain ? 'warning' : 'healthy');
        const statusTitle = isRequired ? (data.priority?.includes('High') ? 'Critical Irrigation Required' : 'Irrigation Recommended') : (isRain ? 'Delay Irrigation — Rain Forecasted' : 'No Irrigation Required');

        const advice = data.irrigation_advice || {
          irrigation_required: isRequired,
          status_title: statusTitle,
          badge_severity: badgeSeverity,
          recommended_action: data.recommended_action || 'No watering needed today',
          reason: data.reason || 'Soil moisture is optimal for current crop growth stage.',
          next_irrigation_time: isRequired ? 'Today during early morning window (06:00 - 08:30 AM)' : (isRain ? 'Postpone by 48 hours (Evaluate post-rain)' : 'Tomorrow at 06:00 AM (Routine Check)'),
          metrics: {
            soil_moisture_level: data.metrics?.current_moisture || `${params.soil_moisture}%`,
            suggested_duration_mins: isRequired ? 45 : 0,
            water_per_sqm: data.metrics?.crop_coefficient_kc ? `${data.metrics.crop_coefficient_kc * 12} L/m²` : '0 L/m²',
            estimated_savings_liters: isRain ? 23000 : 0,
            crop_stage: data.metrics?.crop_stage || `${params.crop_type || 'Tomato'} (${params.growth_stage || 'Flowering'})`,
            suggested_method: data.metrics?.suggested_method || 'Drip Irrigation',
          },
        };

        return {
          success: true,
          isRealBackend: true,
          irrigation_advice: advice,
        };
      }
    } catch (err) {
      console.warn('Real Django smart irrigation endpoint unavailable, falling back:', err.message);
      if (!isMockMode()) {
        return formatApiError(err, 'Unable to connect to Django smart irrigation service on port 8000.');
      }
    }
  }

  // 2. Local / Mock Deterministic Simulation
  await new Promise((resolve) => setTimeout(resolve, 750));

  const moisture = Number(params.soil_moisture) || 35;
  const crop = params.crop_type || 'Tomato';
  const stage = params.growth_stage || 'Flowering';
  const weather = (params.weather_forecast || 'Partly Sunny').toLowerCase();
  const rainExpectedMm = Number(params.expected_rainfall_mm) || 0;

  const cropSpec = CROP_THRESHOLDS[crop] || CROP_THRESHOLDS.Tomato;
  const isRainLikely = weather.includes('rain') || weather.includes('shower') || rainExpectedMm >= 5;

  let isRequired = false;
  let statusTitle = 'No Irrigation Required';
  let badgeSeverity = 'healthy';
  let recommendedAction = 'No watering needed today';
  let reason = '';
  let nextIrrigationTime = 'Tomorrow at 06:00 AM (Routine Check)';
  let durationMins = 0;
  let waterLitersPerSqm = 0;
  let estimatedSavingsLiters = 0;

  if (isRainLikely && moisture >= 25) {
    isRequired = false;
    statusTitle = 'Delay Irrigation — Rain Forecasted';
    badgeSeverity = 'warning';
    recommendedAction = 'Pause scheduled watering';
    reason = `Rain is forecasted in your area (${rainExpectedMm > 0 ? rainExpectedMm + ' mm' : 'Showers expected'}). Natural rainfall will replenish soil moisture. Delaying irrigation prevents waterlogging, root suffocation, and electricity waste.`;
    nextIrrigationTime = 'Postpone by 48 hours (Evaluate post-rain)';
    estimatedSavingsLiters = Math.round(cropSpec.waterPerSqm * 4047 * 0.4); // For a 1-acre plot
  } else if (moisture < cropSpec.minMoisture) {
    isRequired = true;
    const isCriticalStage = stage.includes('Flowering') || stage.includes('Fruit') || stage.includes('Reproductive');
    statusTitle = isCriticalStage ? 'Critical Irrigation Required' : 'Irrigation Recommended';
    badgeSeverity = isCriticalStage ? 'danger' : 'warning';
    recommendedAction = `Irrigate for ${cropSpec.cycleMins} minutes (Prefer early morning Drip)`;
    reason = `Soil moisture (${moisture}%) has dropped below the threshold of ${cropSpec.minMoisture}% required for ${crop} during the ${stage} stage. Immediate watering is essential to prevent moisture stress and blossom drop.`;
    nextIrrigationTime = 'Today during early morning window (06:00 - 08:30 AM)';
    durationMins = cropSpec.cycleMins;
    waterLitersPerSqm = cropSpec.waterPerSqm;
  } else {
    isRequired = false;
    statusTitle = 'No Irrigation Required Today';
    badgeSeverity = 'healthy';
    recommendedAction = 'Maintain current moisture monitoring';
    reason = `Current soil moisture (${moisture}%) is well within the healthy zone (${cropSpec.minMoisture}% - ${cropSpec.optimal}%) for ${crop} at ${stage} stage. Root zones have adequate moisture reserves.`;
    nextIrrigationTime = 'Tomorrow at 06:00 AM';
    estimatedSavingsLiters = Math.round(cropSpec.waterPerSqm * 4047 * 0.2);
  }

  return {
    success: true,
    isMock: true,
    irrigation_advice: {
      irrigation_required: isRequired,
      status_title: statusTitle,
      badge_severity: badgeSeverity,
      recommended_action: recommendedAction,
      reason,
      next_irrigation_time: nextIrrigationTime,
      metrics: {
        soil_moisture_level: `${moisture}%`,
        optimal_threshold: `${cropSpec.minMoisture}% - ${cropSpec.optimal}%`,
        suggested_duration_mins: durationMins,
        water_volume_liters_per_sqm: waterLitersPerSqm,
        estimated_water_saved_liters: estimatedSavingsLiters,
      },
      guidelines: [
        'Prefer early morning (06:00 - 08:30 AM) drip cycles to minimize evaporation loss.',
        'Avoid evening watering during high humidity periods to prevent leaf wetness and fungal sporulation.',
        'Ensure soil drains properly; avoid standing water around the plant collar zone.',
      ],
    },
  };
}

/**
 * Quick irrigation test presets
 */
export function getIrrigationPresets() {
  return [
    {
      id: 'dry-stress',
      title: 'Low Soil Moisture (Stress)',
      desc: '28% Moisture, Flowering Tomato, Clear Weather',
      data: {
        crop_type: 'Tomato',
        soil_moisture: 28,
        growth_stage: 'Flowering / Reproductive',
        weather_forecast: 'Sunny & Clear',
        expected_rainfall_mm: 0,
      },
    },
    {
      id: 'pre-rain',
      title: 'Rain Approaching (Delay Scenario)',
      desc: '38% Moisture, Vegetative Cotton, 14mm Rain Forecast',
      data: {
        crop_type: 'Cotton',
        soil_moisture: 38,
        growth_stage: 'Vegetative Growth',
        weather_forecast: 'Rain / Showers Expected',
        expected_rainfall_mm: 14,
      },
    },
    {
      id: 'optimal-healthy',
      title: 'Optimal Moisture (No Action)',
      desc: '52% Moisture, Seedling Wheat, Overcast',
      data: {
        crop_type: 'Wheat',
        soil_moisture: 52,
        growth_stage: 'Tillering / Vegetative',
        weather_forecast: 'Partly Cloudy',
        expected_rainfall_mm: 0,
      },
    },
  ];
}
