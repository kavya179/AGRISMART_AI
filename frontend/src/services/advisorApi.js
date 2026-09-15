/**
 * AgriSmart AI - Agentic Advisor API Service Module
 * Handles multi-stage autonomous farm reasoning loops:
 * POST /api/assistant/agentic-loop/run/
 */
import { DJANGO_BASE_URL, isMockMode, apiFetch, formatApiError } from './apiConfig';

/**
 * Execute Demonstrable 8-Stage Agentic Decision Loop
 */
export async function runAgenticAdvisorLoop(scenario = {}) {
  // If in Live mode, call Django REST Framework endpoint
  if (!isMockMode()) {
    try {
      const response = await apiFetch(`${DJANGO_BASE_URL}/assistant/agentic-loop/run/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scenario),
      }, 5000);

      if (response && response.success) {
        const loopResult = response.loop_result || {
          decision: response.recommendation?.headline || 'Cross-domain reasoning synthesized',
          primary_directive: response.recommendation?.synthesized_directive || response.recommendation?.headline || 'Review agricultural guidance.',
          reasoning_factors: response.recommendation?.cross_domain_synthesis || [
            'Cross-domain sensor and pathogen metrics evaluated.',
            'Weather radar and irrigation coefficients matched.',
          ],
          action_list: response.recommendation?.action_checklist || [
            'Follow recommended localized water and crop protection actions.',
          ],
          stages: (response.decision_traces || []).map((t) => ({
            stageNumber: t.step,
            name: t.name,
            description: t.detail,
            status: 'completed',
          })),
          notification: response.notification,
        };

        return {
          success: true,
          isRealBackend: true,
          loop_result: loopResult,
        };
      }
    } catch (err) {
      console.warn('Real agentic advisor endpoint failed or offline, falling back to local simulation:', err.message);
      if (!isMockMode()) {
        return formatApiError(err, 'Agentic advisor service unreachable on port 8000.');
      }
    }
  }

  // Local / Mock Agentic Loop Simulation
  await new Promise((resolve) => setTimeout(resolve, 800));

  const crop = scenario.crop_type || 'Tomato';
  const stage = scenario.growth_stage || 'Flowering';
  const disease = scenario.disease_detected || 'Tomato Early Blight';
  const isDiseased = disease !== 'None' && !disease.includes('Healthy');
  const moisture = Number(scenario.soil_moisture) || 65;
  const rainProb = Number(scenario.rain_probability) || 75;
  const rainExpected = rainProb >= 50;

  let decision = '';
  let primaryDirective = '';
  let reasoningFactors = [];
  let actionList = [];

  if (rainExpected && moisture >= 40) {
    decision = 'DELAY_IRRIGATION_AND_PREPARE_FUNGAL_PREVENTION';
    primaryDirective = `Delay irrigation for ${crop} because soil moisture is already high (${moisture}%) and ${rainProb}% rainfall is forecasted within 24-48 hours. Natural precipitation will replenish root zones without waterlogging.`;
    reasoningFactors = [
      `Soil moisture (${moisture}%) is above the minimum threshold.`,
      `Incoming precipitation (${rainProb}% chance) will provide adequate water.`,
      isDiseased
        ? `Early Blight risk is elevated by high humidity (>75%). Avoid overhead wetting.`
        : 'Prevent unnecessary pump electricity consumption.',
    ];
    actionList = [
      'Pause drip / canal irrigation schedule for the next 48 hours.',
      isDiseased ? 'Prepare preventative spray of Mancozeb (2.5g/L) for post-rain application.' : 'Monitor field drainage channels.',
      'Check soil moisture again 24 hours after rainfall completes.',
    ];
  } else if (moisture < 35 && !rainExpected) {
    decision = 'EXECUTE_SCHEDULED_DRIP_IRRIGATION';
    primaryDirective = `Execute morning drip irrigation cycle (45 mins) for ${crop}. Soil moisture (${moisture}%) is low and no rain is expected.`;
    reasoningFactors = [
      `Soil moisture (${moisture}%) is below the critical threshold for ${crop} at ${stage} stage.`,
      'Weather is clear with zero rain probability.',
      'Prevents blossom drop and moisture stress.',
    ];
    actionList = [
      'Turn on Drip Zone 1 between 06:00 AM – 08:30 AM.',
      'Inject water-soluble potassium nutrient if in fruit development phase.',
    ];
  } else {
    decision = 'MONITOR_FIELD_AND_MAINTAIN_SCHEDULE';
    primaryDirective = `Maintain current baseline schedule. Crop health and soil moisture (${moisture}%) are in equilibrium.`;
    reasoningFactors = [
      `Moisture level (${moisture}%) is in optimal range.`,
      'No critical weather or pathogen alerts triggered.',
    ];
    actionList = [
      'Continue routine weekly field scouting.',
      'Maintain standard drip irrigation cycles.',
    ];
  }

  const loopStages = [
    {
      stageNumber: 1,
      name: 'Farm Data Ingestion',
      description: `Ingested profile: ${crop} (${stage} stage), 4.5 Acres, Black Soil.`,
      status: 'completed',
    },
    {
      stageNumber: 2,
      name: 'Crop Health Telemetry',
      description: isDiseased ? `Pathology detected: ${disease} (Severity: Moderate).` : 'Foliage verified healthy.',
      status: 'completed',
    },
    {
      stageNumber: 3,
      name: 'Weather Intelligence',
      description: `Precipitation probability: ${rainProb}% • Wind: 9 km/h • Humidity: 78%.`,
      status: 'completed',
    },
    {
      stageNumber: 4,
      name: 'Soil & Irrigation Status',
      description: `Root-zone soil moisture: ${moisture}% (Threshold: 45%).`,
      status: 'completed',
    },
    {
      stageNumber: 5,
      name: 'Cross-Module Synthesis',
      description: 'Synthesizing soil moisture reserves with rain forecast & fungal spore risk.',
      status: 'completed',
    },
    {
      stageNumber: 6,
      name: 'Agentic Decision',
      description: decision,
      status: 'completed',
    },
    {
      stageNumber: 7,
      name: 'Agronomic Recommendation',
      description: primaryDirective,
      status: 'completed',
    },
    {
      stageNumber: 8,
      name: 'Farmer Notification Dispatch',
      description: 'Alert formatted for SMS and AgriSmart Mobile Push Notification.',
      status: 'completed',
    },
  ];

  return {
    success: true,
    isMock: true,
    loop_result: {
      decision_code: decision,
      primary_directive: primaryDirective,
      reasoning_factors: reasoningFactors,
      action_items: actionList,
      stages: loopStages,
      timestamp: new Date().toISOString(),
    },
  };
}
