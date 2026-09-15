/**
 * AgriSmart AI - Farmer Assistant Service Module
 * Handles conversational agricultural chat queries:
 * POST /api/assistant/chat/
 */
import { DJANGO_BASE_URL, isMockMode, apiFetch, formatApiError } from './apiConfig';
export { runAgenticAdvisorLoop } from './advisorApi';

/**
 * Knowledge Base of Agronomic Answers for Chat Assistant
 */
const KNOWLEDGE_RESPONSES = [
  {
    keywords: ['yellow', 'yellowing', 'leaves', 'leaf', 'blight', 'spot'],
    reply:
      'Yellowing leaves in tomatoes are commonly caused by either Early Blight (concentric brown rings with yellow halo) or Nitrogen deficiency (generalized yellowing from the bottom up). If spots are visible, spray Mancozeb (2.5g/L) or Neem Oil. Avoid overhead sprinkling to keep foliage dry.',
    suggestedFollowUp: ['How to prepare organic neem oil spray?', 'What fertilizer ratio is best for tomatoes?'],
  },
  {
    keywords: ['water', 'irrigate', 'irrigation', 'watering', 'when'],
    reply:
      'Irrigate when topsoil (2-3 inches) feels dry or soil moisture drops below 40%. For vegetables and cereals, early morning (06:00 - 08:30 AM) drip cycles are ideal to minimize evaporation loss and avoid fungal spore germination.',
    suggestedFollowUp: ['Check smart irrigation schedule', 'How much water does wheat need?'],
  },
  {
    keywords: ['suitable', 'which crop', 'crop choice', 'soil', 'recommend'],
    reply:
      'Crop suitability depends on soil pH and drainage. For Black soils with pH 6.5-7.5, Tomato, Wheat, Cotton, and Chickpea thrive. For lighter sandy loams with pH 6.0-6.8, Pulses and Mustard give high returns. Use the "Crop Recommendation" tool to calculate your exact field match.',
    suggestedFollowUp: ['Calculate best crops for my soil', 'What is the optimal soil pH for cotton?'],
  },
  {
    keywords: ['efficiency', 'improve water', 'conserve', 'sustainability', 'drip'],
    reply:
      'You can boost water efficiency by 30-40% by: 1) Adopting micro-drip irrigation instead of flood watering; 2) Applying straw or plastic mulching to cut surface evaporation; 3) Scheduling irrigation based on sensor readings and rain forecasts.',
    suggestedFollowUp: ['View farm sustainability score', 'How to apply straw mulching?'],
  },
  {
    keywords: ['fertilizer', 'urea', 'npk', 'manure', 'nutrient'],
    reply:
      'Apply well-rotted Farmyard Manure (FYM) @ 8-10 tonnes/acre during land preparation. For top-dressing, apply nitrogenous fertilizers (Urea) in split doses near root zones rather than broadcasting, preferably just before a scheduled light irrigation.',
    suggestedFollowUp: ['How to conduct laboratory soil testing?', 'What are the benefits of vermicompost?'],
  },
  {
    keywords: ['rain', 'rainy', 'forecast', 'tomorrow', 'spray'],
    reply:
      'If rain is forecasted within 24-48 hours, immediately postpone scheduled irrigation and foliar chemical spraying to prevent runoff. Ensure field drainage channels are clear to prevent waterlogging.',
    suggestedFollowUp: ['Check hyperlocal weather forecast', 'When is the next safe spraying window?'],
  },
];

/**
 * Conversational Farmer Assistant Chat
 */
export async function chatWithFarmerAssistant(query, language = 'en', farmerContext = {}) {
  if (!query || !query.trim()) {
    return {
      success: false,
      error: 'Please type a question or agricultural query.',
      code: 'INVALID_INPUT',
    };
  }

  // 1. If in Live mode, attempt connection with Django REST API
  if (!isMockMode()) {
    try {
      const data = await apiFetch(`${DJANGO_BASE_URL}/assistant/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          language,
          farmer_context: farmerContext,
        }),
      }, 5000);

      if (data && data.success && data.response) {
        return {
          success: true,
          isRealBackend: true,
          response: data.response,
        };
      }
    } catch (err) {
      console.warn('Real Django farmer assistant endpoint unavailable, falling back:', err.message);
      if (!isMockMode()) {
        return formatApiError(err, 'Unable to connect to Django assistant service on port 8000.');
      }
    }
  }

  // 2. Local / Mock Grounded Conversational AI
  await new Promise((resolve) => setTimeout(resolve, 850));

  const lowerQuery = (query || '').toLowerCase();
  let matched = KNOWLEDGE_RESPONSES.find((item) =>
    item.keywords.some((k) => lowerQuery.includes(k))
  );

  if (!matched) {
    matched = {
      reply: `Regarding "${query}": For best results in your ${farmerContext.crop || 'crop'} field, maintain regular soil moisture monitoring and inspect lower leaves weekly. If you suspect disease or nutrient deficiency, consider checking the leaf scanner or scheduling a soil test.`,
      suggestedFollowUp: [
        'Why are my tomato leaves turning yellow?',
        'When should I irrigate my crop?',
        'Which crop is suitable for my soil?',
      ],
    };
  }

  return {
    success: true,
    isMock: true,
    response: {
      reply: matched.reply,
      suggested_followups: matched.suggestedFollowUp,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  };
}

/**
 * Suggested Questions for Farmer Assistant
 */
export function getSuggestedQuestions() {
  return [
    'Why are my tomato leaves turning yellow?',
    'When should I irrigate my crop?',
    'Which crop is suitable for my soil?',
    'How can I improve water efficiency?',
  ];
}
