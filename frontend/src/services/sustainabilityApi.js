/**
 * AgriSmart AI - Farm Sustainability Service Module
 * Transparent, formula-backed evaluation of regenerative practices.
 * Interfaces with Django REST AI Engine:
 * POST /api/sustainability/calculate/
 * GET /api/sustainability/formula/
 */
import { DJANGO_BASE_URL, isMockMode, apiFetch, formatApiError } from './apiConfig';

/**
 * Sustainability Formula Specification:
 * Total Score: S = W(max 35) + R(max 35) + C(max 30) = 100 Points
 *
 * 1. Water Efficiency (W - Max 35 pts):
 *    - Irrigation Method: Drip/Micro (+15 pts), Sprinkler (+10 pts), Flood/Canal (+5 pts)
 *    - Rainwater Harvesting / Farm Pond (+10 pts)
 *    - Weather/Sensor Scheduled Watering (+10 pts)
 *
 * 2. Resource & Soil Health (R - Max 35 pts):
 *    - Organic Manure / Vermicompost Applied (+10 pts)
 *    - Laboratory Soil Health Card Tested (+8 pts)
 *    - Mulching / Organic Cover Crops (+9 pts)
 *    - Zero Crop Residue Burning (+8 pts)
 *
 * 3. Crop Health & Biodiversity (C - Max 30 pts):
 *    - Legume Crop Rotation (+10 pts)
 *    - Bio-Pesticides & Bio-Control Used (+10 pts)
 *    - Regular Digital Disease Scouting (+10 pts)
 */

export function calculateLocalSustainability(practices = {}) {
  // 1. Water Efficiency (Max 35)
  let waterScore = 0;
  if (practices.irrigation_method === 'drip') waterScore += 15;
  else if (practices.irrigation_method === 'sprinkler') waterScore += 10;
  else waterScore += 5;

  if (practices.rainwater_harvesting) waterScore += 10;
  if (practices.moisture_sensor_timing) waterScore += 10;

  // 2. Resource & Soil Health (Max 35)
  let soilScore = 0;
  if (practices.organic_manure_used) soilScore += 10;
  if (practices.soil_tested) soilScore += 8;
  if (practices.mulching_or_cover_crop) soilScore += 9;
  if (!practices.crop_residue_burned) soilScore += 8;

  // 3. Crop Health & Biodiversity (Max 30)
  let cropScore = 0;
  if (practices.legume_crop_rotation) cropScore += 10;
  if (practices.bio_pesticides_used) cropScore += 10;
  if (practices.regular_disease_monitoring) cropScore += 10;

  const totalScore = Math.min(100, waterScore + soilScore + cropScore);

  let ratingGrade = 'Eco-Leader (Grade A+)';
  let tierBadge = 'Tier A (Regenerative Leader)';
  if (totalScore < 50) {
    ratingGrade = 'Developing (Grade C)';
    tierBadge = 'Tier C (Needs Optimization)';
  } else if (totalScore < 75) {
    ratingGrade = 'Sustainable (Grade B)';
    tierBadge = 'Tier B (Good Practice)';
  } else if (totalScore < 90) {
    ratingGrade = 'High Eco-Standard (Grade A)';
    tierBadge = 'Tier A (High Eco-Standard)';
  }

  const whatIsHelping = [];
  const improvementOpportunities = [];

  // Feedback generation
  if (practices.irrigation_method === 'drip') {
    whatIsHelping.push('Drip micro-irrigation delivers precise root-zone moisture, conserving 40-50% groundwater.');
  } else {
    improvementOpportunities.push({
      title: 'Upgrade to Drip Irrigation',
      gain: '+10 pts',
      desc: 'Shift from flood watering to drip systems to reduce water waste and prevent soil salinization.',
    });
  }

  if (practices.rainwater_harvesting) {
    whatIsHelping.push('Rainwater harvesting catchments help recharge farm aquifers.');
  } else {
    improvementOpportunities.push({
      title: 'Build Rainwater Catchment / Farm Pond',
      gain: '+10 pts',
      desc: 'Excavate farm bund ponds to capture monsoon runoff for critical dry spells.',
    });
  }

  if (practices.mulching_or_cover_crop) {
    whatIsHelping.push('Organic straw mulching suppresses weeds and cuts surface moisture evaporation by 25%.');
  } else {
    improvementOpportunities.push({
      title: 'Apply Crop Residue / Straw Mulching',
      gain: '+9 pts',
      desc: 'Cover vegetable beds with straw or dry leaves to retain root moisture and enhance soil microbial life.',
    });
  }

  if (practices.organic_manure_used) {
    whatIsHelping.push('Farmyard manure & vermicompost enhance soil organic carbon (SOC) and microbial diversity.');
  }

  if (practices.legume_crop_rotation) {
    whatIsHelping.push('Legume crop rotation enriches soil nitrogen naturally without synthetic chemical reliance.');
  }

  if (practices.bio_pesticides_used) {
    whatIsHelping.push('Neem and Trichoderma bio-controls protect beneficial pollinators and beneficial soil fauna.');
  }

  return {
    sustainability_score: totalScore,
    max_score: 100,
    rating_grade: ratingGrade,
    tier_badge: tierBadge,
    score_breakdown: {
      water_efficiency: {
        score: waterScore,
        max: 35,
        percentage: `${Math.round((waterScore / 35) * 100)}%`,
        status: waterScore >= 25 ? 'High Efficiency' : 'Moderate',
      },
      resource_and_soil_health: {
        score: soilScore,
        max: 35,
        percentage: `${Math.round((soilScore / 35) * 100)}%`,
        status: soilScore >= 25 ? 'Rich Organic Soil' : 'Moderate',
      },
      crop_health_and_biodiversity: {
        score: cropScore,
        max: 30,
        percentage: `${Math.round((cropScore / 30) * 100)}%`,
        status: cropScore >= 22 ? 'High Resilience' : 'Moderate',
      },
    },
    what_is_helping: whatIsHelping,
    improvement_opportunities: improvementOpportunities,
    recommended_action:
      improvementOpportunities[0]?.desc || 'Maintain current organic soil enrichment and drip fertigation schedule.',
    formula_reference: 'Score = Water (max 35) + Soil & Resources (max 35) + Crop Health & Biodiversity (max 30)',
  };
}

/**
 * Fetch Sustainability Score
 */
export async function calculateSustainabilityScore(practices = {}) {
  // 1. If in Live mode, attempt connection with Django REST API
  if (!isMockMode()) {
    try {
      const data = await apiFetch(`${DJANGO_BASE_URL}/sustainability/calculate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(practices),
      }, 4000);

      if (data && data.success && data.sustainability) {
        return {
          success: true,
          isRealBackend: true,
          sustainability: data.sustainability,
        };
      }
    } catch (err) {
      console.warn('Real Django sustainability service unavailable, falling back:', err.message);
      if (!isMockMode()) {
        return formatApiError(err, 'Unable to connect to Django sustainability scoring service on port 8000.');
      }
    }
  }

  // 2. Local / Mock Deterministic Evaluation
  await new Promise((resolve) => setTimeout(resolve, 550));

  return {
    success: true,
    isMock: true,
    sustainability: calculateLocalSustainability(practices),
  };
}

/**
 * Fetch Transparent Sustainability Formula Specification
 */
export async function getSustainabilityFormula() {
  if (!isMockMode()) {
    try {
      return await apiFetch(`${DJANGO_BASE_URL}/sustainability/formula/`, { method: 'GET' }, 3000);
    } catch (e) {
      // Fallback
    }
  }
  return {
    formula: 'Sustainability Score = Water Efficiency (35) + Soil/Resource Health (35) + Crop & Biodiversity (30)',
    max_score: 100,
  };
}
