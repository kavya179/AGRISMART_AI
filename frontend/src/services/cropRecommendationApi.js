import { DJANGO_BASE_URL, isMockMode, apiFetch, formatApiError } from './apiConfig';

/**
 * Knowledge base of major Indian crop profiles with agro-climatic requirements
 */
const CROP_DATABASE = [
  {
    crop: 'Wheat (गेहूं / ઘઉં)',
    category: 'Cereal / Food Grain',
    seasons: ['Rabi (Winter)', 'Annual (12 Months)'],
    soilTypes: ['Alluvial Soil', 'Black Soil', 'Clayey Loam'],
    minPh: 6.0,
    maxPh: 7.8,
    minTemp: 10,
    maxTemp: 28,
    waterNeed: 'Moderate (400-500 mm)',
    waterLevel: ['Moderate', 'High'],
    previousCropSuitability: ['Rice (Paddy)', 'Legumes / Pulses', 'Cotton', 'Maize'],
    rotationBenefit: 'High - Excellent successor after kharif legumes or paddy, restoring soil structure.',
    farmingGuidance: [
      'Seed Treatment: Treat with Trichoderma viride @ 4g/kg seed or Carbendazim before sowing.',
      'Sowing Time: Ideal window is 1st to 3rd week of November for timely sown varieties.',
      'Irrigation Stages: Critical at Crown Root Initiation (21 days) and Flowering stage.',
      'Fertilizer Management: Balanced N:P:K ratio of 120:60:40 kg/ha with zinc sulfate application.',
    ],
    expectedConditions: 'Cool weather during vegetative growth (15-20°C) and warm sunshine during grain filling (25°C).',
  },
  {
    crop: 'Tomato (टमाटर / ટામેટા)',
    category: 'High-Value Horticulture',
    seasons: ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)', 'Annual (12 Months)'],
    soilTypes: ['Black Soil', 'Alluvial Soil', 'Sandy Loam', 'Red Soil'],
    minPh: 6.0,
    maxPh: 7.5,
    minTemp: 18,
    maxTemp: 34,
    waterNeed: 'Moderate (400-600 mm via Drip)',
    waterLevel: ['Moderate', 'High'],
    previousCropSuitability: ['Wheat', 'Legumes / Pulses', 'Fallow / None', 'Maize'],
    rotationBenefit: 'Very High - Breaks monoculture cereal cycles and yields superior market returns per acre.',
    farmingGuidance: [
      'Transplanting: 25-30 days old healthy seedlings with 60×45 cm spacing on raised beds.',
      'Staking: Support plants with bamboo stakes to keep fruits off moist soil and reduce blight.',
      'Drip Fertigation: Supply water-soluble 19:19:19 and potassium nitrate in split doses.',
      'Mulching: Silver-black plastic mulch (25 micron) suppresses weeds and retains root moisture.',
    ],
    expectedConditions: 'Well-drained loamy or black soil with pH 6.2-7.2 and sunny days (22-28°C).',
  },
  {
    crop: 'Cotton (कपास / કપાસ)',
    category: 'Commercial Fiber',
    seasons: ['Kharif (Monsoon)', 'Annual (12 Months)'],
    soilTypes: ['Black Soil', 'Alluvial Soil'],
    minPh: 6.5,
    maxPh: 8.5,
    minTemp: 22,
    maxTemp: 40,
    waterNeed: 'Moderate to High (600-800 mm)',
    waterLevel: ['Moderate', 'High', 'Low'],
    previousCropSuitability: ['Wheat', 'Legumes / Pulses', 'Fallow / None'],
    rotationBenefit: 'High - Deep taproots utilize subsoil nutrients, excellent rotation for black soils.',
    farmingGuidance: [
      'Soil Prep: Deep summer ploughing followed by 2-3 harrowings to eradicate perennial weeds.',
      'Spacing: 90×60 cm or 120×45 cm depending on hybrid vigor.',
      'Intercropping: Companion planting with green gram / cowpea increases natural predatory insects.',
      'Boll Care: Apply planofix @ 4ml/15L water at flowering to prevent bud/boll shedding.',
    ],
    expectedConditions: 'Deep black soil (Regur) with high water-holding capacity and warm climate (26-34°C).',
  },
  {
    crop: 'Chickpea / Gram (चना / ચણા)',
    category: 'Pulse / Nitrogen-Fixing Legume',
    seasons: ['Rabi (Winter)'],
    soilTypes: ['Black Soil', 'Alluvial Soil', 'Sandy Loam'],
    minPh: 6.0,
    maxPh: 8.2,
    minTemp: 12,
    maxTemp: 30,
    waterNeed: 'Low (250-350 mm)',
    waterLevel: ['Low', 'Moderate'],
    previousCropSuitability: ['Rice (Paddy)', 'Maize', 'Cotton', 'Fallow / None'],
    rotationBenefit: 'Maximum - Fixes 35-45 kg atmospheric nitrogen/ha, enriching soil for following season.',
    farmingGuidance: [
      'Bio-Fertilizer: Inoculate seed with Rhizobium and PSB (Phosphate Solubilizing Bacteria).',
      'Nipping: Pluck apical shoot buds at 30-35 days to stimulate prolific branching and more pods.',
      'Drainage: Highly sensitive to waterlogging; avoid excess irrigation at vegetative stage.',
      'Pod Borer Alert: Install pheromone traps @ 5/acre for early monitoring of Helicoverpa.',
    ],
    expectedConditions: 'Cool winter climate with low humidity and conserved soil moisture.',
  },
  {
    crop: 'Soybean (सोयाबीन)',
    category: 'Oilseed & Protein Crop',
    seasons: ['Kharif (Monsoon)'],
    soilTypes: ['Black Soil', 'Alluvial Soil', 'Clayey Loam'],
    minPh: 6.0,
    maxPh: 7.5,
    minTemp: 20,
    maxTemp: 35,
    waterNeed: 'Moderate (450-650 mm)',
    waterLevel: ['Moderate', 'High'],
    previousCropSuitability: ['Wheat', 'Chickpea / Gram', 'Mustard', 'Fallow / None'],
    rotationBenefit: 'High - Ideal rotation crop restoring organic matter and nitrogen balance.',
    farmingGuidance: [
      'Broadbed Furrow (BBF): Sowing on BBF prevents water stagnation during heavy rains.',
      'Sowing Depth: Sow at 3-4 cm depth with broad spectrum fungicide seed dressing.',
      'Weed Control: Apply pre-emergence herbicide Diclosulam or Pendimethalin within 48 hours.',
      'Pod Filling: Ensure adequate moisture during pod formation and grain fill.',
    ],
    expectedConditions: 'Well-drained loamy-clay soil, 25-32°C temperature with evenly distributed monsoon rains.',
  },
  {
    crop: 'Mustard (सरसों / રાઈ)',
    category: 'Rabi Oilseed',
    seasons: ['Rabi (Winter)'],
    soilTypes: ['Alluvial Soil', 'Sandy Loam', 'Black Soil'],
    minPh: 5.8,
    maxPh: 8.0,
    minTemp: 10,
    maxTemp: 26,
    waterNeed: 'Low (200-300 mm)',
    waterLevel: ['Low', 'Moderate'],
    previousCropSuitability: ['Rice (Paddy)', 'Maize', 'Fallow / None', 'Cotton'],
    rotationBenefit: 'High - Low water consumer, ideal for dryland or limited-water rabi cycles.',
    farmingGuidance: [
      'Sowing Window: 15th to 30th October to escape aphid attack during flowering.',
      'Thinning: Thin seedlings at 15-20 days to maintain 10-15 cm intra-row plant spacing.',
      'Sulfur Requirement: Apply elemental sulfur @ 25 kg/ha to boost oil content significantly.',
    ],
    expectedConditions: 'Cool, clear winter days with light to medium loam soil.',
  },
  {
    crop: 'Sugarcane (गन्ना / શેરડી)',
    category: 'Perennial Cash Crop',
    seasons: ['Annual (12 Months)', 'Kharif (Monsoon)', 'Rabi (Winter)'],
    soilTypes: ['Alluvial Soil', 'Black Soil', 'Clayey Loam'],
    minPh: 6.5,
    maxPh: 8.0,
    minTemp: 22,
    maxTemp: 38,
    waterNeed: 'High (1500-2500 mm)',
    waterLevel: ['High'],
    previousCropSuitability: ['Legumes / Pulses', 'Wheat', 'Vegetables'],
    rotationBenefit: 'Moderate - Heavy feeder; requires green manuring prior to planting.',
    farmingGuidance: [
      'Sett Treatment: Dip two-budded setts in Carbendazim (1g/L) + Chlorpyrifos for 10 mins.',
      'Trash Mulching: Spread dried cane trash in inter-rows to conserve up to 30% irrigation water.',
      'Earthing Up: Complete earthing-up at 90-120 days to prevent lodging during monsoon winds.',
    ],
    expectedConditions: 'Deep fertile soil with continuous irrigation supply and hot sunny weather (28-35°C).',
  },
];

/**
 * Validate crop recommendation parameters
 */
export function validateCropParameters(params) {
  const errors = {};

  // Soil pH validation (3.5 to 10.0)
  const ph = parseFloat(params.ph);
  if (isNaN(ph) || ph < 3.5 || ph > 10.0) {
    errors.ph = 'Soil pH must be a valid number between 3.5 and 10.0 (Optimal: 6.0 - 7.5).';
  }

  // Temperature validation (5°C to 55°C)
  const temp = parseFloat(params.temperature);
  if (isNaN(temp) || temp < 5 || temp > 55) {
    errors.temperature = 'Temperature must be between 5°C and 55°C.';
  }

  // Humidity validation (10% to 100%)
  const hum = parseFloat(params.humidity);
  if (isNaN(hum) || hum < 10 || hum > 100) {
    errors.humidity = 'Relative Humidity must be between 10% and 100%.';
  }

  // Rainfall validation (0 to 3000 mm)
  const rain = parseFloat(params.rainfall);
  if (isNaN(rain) || rain < 0 || rain > 3000) {
    errors.rainfall = 'Rainfall must be between 0 and 3000 mm per season.';
  }

  // Location check
  if (!params.location || params.location.trim().length < 2) {
    errors.location = 'Please specify your farm district or state.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Score a crop against farmer parameters
 */
function scoreCrop(crop, params) {
  let score = 100;
  const reasons = [];

  const ph = parseFloat(params.ph);
  const temp = parseFloat(params.temperature);
  const hum = parseFloat(params.humidity);
  const rain = parseFloat(params.rainfall);

  // 1. pH suitability
  if (ph >= crop.minPh && ph <= crop.maxPh) {
    score += 15;
    reasons.push(`Soil pH (${ph}) is within the optimal range of ${crop.minPh} - ${crop.maxPh}.`);
  } else {
    const diff = Math.min(Math.abs(ph - crop.minPh), Math.abs(ph - crop.maxPh));
    score -= diff * 18;
  }

  // 2. Temperature match
  if (temp >= crop.minTemp && temp <= crop.maxTemp) {
    score += 12;
    reasons.push(`Current temperature (${temp}°C) matches ideal growth climate.`);
  } else {
    score -= 20;
  }

  // 3. Soil type match
  if (crop.soilTypes.includes(params.soil_type)) {
    score += 14;
    reasons.push(`${params.soil_type} provides favorable drainage and nutrient retention.`);
  } else {
    score -= 15;
  }

  // 4. Season suitability
  if (crop.seasons.includes(params.season) || crop.seasons.includes('Annual (12 Months)')) {
    score += 12;
    reasons.push(`Well-aligned with ${params.season} cropping cycle.`);
  } else {
    score -= 25;
  }

  // 5. Water availability match
  if (crop.waterLevel.includes(params.water_availability)) {
    score += 10;
    reasons.push(`Water availability (${params.water_availability}) meets the crop's irrigation demand.`);
  } else {
    score -= 18;
  }

  // 6. Previous crop rotation bonus
  if (crop.previousCropSuitability.includes(params.previous_crop)) {
    score += 12;
    reasons.push(`Rotating after ${params.previous_crop} prevents pest buildup and balances soil fertility.`);
  }

  const normalizedScore = Math.max(45, Math.min(98, Math.round(score)));

  let suitabilityLabel = 'Highly Suitable';
  if (normalizedScore < 75) suitabilityLabel = 'Moderately Suitable';
  else if (normalizedScore < 88) suitabilityLabel = 'Suitable';

  return {
    ...crop,
    suitabilityScore: normalizedScore,
    suitabilityLabel,
    matchedReasons: reasons,
  };
}

/**
 * Fetch crop recommendations (Simulates POST /api/crops/recommend/ with Django fallback)
 */
export async function getCropRecommendation(params) {
  // Validate parameters before sending
  const validation = validateCropParameters(params);
  if (!validation.isValid) {
    return {
      success: false,
      validationErrors: validation.errors,
      error: 'Please correct the invalid form inputs before calculating.',
    };
  }

  // 1. If in Live mode, attempt connection with Django REST API
  if (!isMockMode()) {
    try {
      const data = await apiFetch(`${DJANGO_BASE_URL}/crops/recommend/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      }, 5000);

      if (data && data.success) {
        const primaryCrop = data.recommended_crop || data.recommendation?.primary_crop || 'Recommended Crop';
        const primaryScore = data.suitability_score || data.recommendation?.suitability_score || '98%';
        const primaryScoreNum = parseInt(primaryScore, 10) || 95;
        const primaryReason = data.short_reason || data.recommendation?.short_reason || 'Highly suitable for your soil and climate.';
        const primaryGuidance = data.basic_farming_consideration 
          ? [data.basic_farming_consideration, 'Maintain regular monitoring and balanced NPK nutrient supply.']
          : (data.recommendation?.farming_guidance || ['Maintain optimal irrigation and pest monitoring.']);

        const ranked = [];
        ranked.push({
          rank: 1,
          crop: primaryCrop,
          category: 'Recommended Choice',
          suitability_score: primaryScoreNum,
          suitability_label: primaryScoreNum >= 85 ? 'Highly Suitable' : 'Suitable',
          water_requirement: 'Moderate (400-600 mm)',
          expected_conditions: `${params.soil_type || 'Soil'}, pH ${params.ph || '6.5'}, ${params.season || 'Current Season'}`,
          matched_reasons: [primaryReason],
          farming_guidance: primaryGuidance,
        });

        if (Array.isArray(data.alternative_crops)) {
          data.alternative_crops.forEach((alt, idx) => {
            const scoreNum = parseInt(alt.suitability, 10) || (95 - (idx + 1) * 3);
            ranked.push({
              rank: idx + 2,
              crop: alt.crop,
              category: 'Alternative Choice',
              suitability_score: scoreNum,
              suitability_label: scoreNum >= 85 ? 'Highly Suitable' : 'Suitable',
              water_requirement: 'Moderate',
              expected_conditions: `${params.soil_type || 'Soil'}, pH ${params.ph || '6.5'}`,
              matched_reasons: [alt.short_reason || 'Well-suited to regional soil and climate conditions.'],
              farming_guidance: ['Follow standard agronomic practices and seed treatment.'],
            });
          });
        }

        return {
          success: true,
          isRealBackend: true,
          recommendation: {
            primary_crop: primaryCrop,
            suitability_score: primaryScore,
            suitability_percentage: primaryScoreNum,
            short_reason: primaryReason,
            water_requirement: 'Moderate (400-600 mm)',
            expected_conditions: `${params.soil_type || 'Soil'}, pH ${params.ph || '6.5'}, ${params.season || 'Current Season'}`,
            farming_guidance: primaryGuidance,
            ranked_recommendations: ranked,
          },
        };
      }
    } catch (err) {
      console.warn('Real Django crop recommendation endpoint unavailable, falling back:', err.message);
      if (!isMockMode()) {
        return formatApiError(err, 'Unable to connect to Django crop recommendation service on port 8000.');
      }
    }
  }

  // Simulate inference computation latency (800ms - 1100ms)
  await new Promise((resolve) => setTimeout(resolve, 950));

  // Score all crops in database
  const scoredCrops = CROP_DATABASE.map((c) => scoreCrop(c, params));

  // Sort descending by suitability
  scoredCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  const topCrops = scoredCrops.slice(0, 3);
  const primary = topCrops[0];

  return {
    success: true,
    isMock: true,
    recommendation: {
      primary_crop: primary.crop,
      suitability_score: `${primary.suitabilityLabel} (${primary.suitabilityScore}%)`,
      suitability_percentage: primary.suitabilityScore,
      short_reason: primary.matchedReasons.slice(0, 2).join(' ') || `${primary.crop} is well-suited to your soil pH and seasonal conditions.`,
      water_requirement: primary.waterNeed,
      expected_conditions: primary.expectedConditions,
      rotation_benefit: primary.rotationBenefit,
      farming_guidance: primary.farmingGuidance,
      ranked_recommendations: topCrops.map((c, index) => ({
        rank: index + 1,
        crop: c.crop,
        category: c.category,
        suitability_score: c.suitabilityScore,
        suitability_label: c.suitabilityLabel,
        water_requirement: c.waterNeed,
        expected_conditions: c.expectedConditions,
        matched_reasons: c.matchedReasons,
        farming_guidance: c.farmingGuidance,
      })),
    },
  };
}

/**
 * Quick preset farm profiles for instant farmer exploration
 */
export function getFarmPresets() {
  return [
    {
      id: 'rabi-wheat-black-soil',
      title: 'Rabi Winter (Wheat / Pulses)',
      desc: 'Black soil, pH 7.2, 18°C, Moderate water',
      data: {
        soil_type: 'Black Soil',
        ph: 7.2,
        temperature: 18,
        humidity: 50,
        rainfall: 80,
        water_availability: 'Moderate',
        season: 'Rabi (Winter)',
        location: 'Pune, Maharashtra',
        previous_crop: 'Rice (Paddy)',
      },
    },
    {
      id: 'kharif-monsoon-horticulture',
      title: 'Kharif Monsoon (Vegetables / Cotton)',
      desc: 'Alluvial soil, pH 6.8, 28°C, High water',
      data: {
        soil_type: 'Alluvial Soil',
        ph: 6.8,
        temperature: 28,
        humidity: 78,
        rainfall: 450,
        water_availability: 'High',
        season: 'Kharif (Monsoon)',
        location: 'Anand, Gujarat',
        previous_crop: 'Wheat',
      },
    },
    {
      id: 'dryland-pulses-loam',
      title: 'Dryland Rainfed (Mustard / Gram)',
      desc: 'Sandy Loam, pH 6.4, 22°C, Low water',
      data: {
        soil_type: 'Sandy Loam',
        ph: 6.4,
        temperature: 22,
        humidity: 45,
        rainfall: 60,
        water_availability: 'Low',
        season: 'Rabi (Winter)',
        location: 'Vidarbha, Maharashtra',
        previous_crop: 'Cotton',
      },
    },
  ];
}
