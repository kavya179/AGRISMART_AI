/**
 * AgriSmart AI - Weather Intelligence Service Module
 * Cleanly interfaces with Django REST AI Engine:
 * GET /api/weather/intelligence/
 * POST /api/weather/intelligence/
 */
import { DJANGO_BASE_URL, isMockMode, apiFetch, formatApiError } from './apiConfig';

/**
 * Regional climate profiles for Indian agricultural belts
 */
const REGIONAL_WEATHER = {
  Maharashtra: {
    location: 'Pune & Western Maharashtra, India',
    current: {
      temp: 28.4,
      humidity: 68,
      windSpeed: 9.5,
      windDirection: 'SW',
      rainfallTodayMm: 0.0,
      condition: 'Partly Sunny',
      uvIndex: 'Moderate (6/10)',
    },
    rainChance48h: '70%',
    sprayingWindow: '07:00 AM – 10:30 AM (Calm winds < 10 km/h)',
    alerts: [
      'Precipitation Alert: 12-18 mm rain forecasted on Thursday. Delay planned fertilizer and drip cycles.',
      'Fungal Alert: 70%+ relative humidity elevates sporulation risk for Tomato Early Blight.',
    ],
    forecast: [
      { day: 'Today', date: '15 Sep', max: 29, min: 20, rainProb: '15%', condition: 'Partly Sunny', rainMm: 0 },
      { day: 'Tomorrow', date: '16 Sep', max: 30, min: 21, rainProb: '25%', condition: 'Mostly Sunny', rainMm: 0 },
      { day: 'Thu', date: '17 Sep', max: 27, min: 19, rainProb: '75%', condition: 'Rain / Thunderstorms', rainMm: 16 },
      { day: 'Fri', date: '18 Sep', max: 26, min: 18, rainProb: '60%', condition: 'Scattered Showers', rainMm: 8 },
      { day: 'Sat', date: '19 Sep', max: 28, min: 19, rainProb: '20%', condition: 'Partly Cloudy', rainMm: 1 },
      { day: 'Sun', date: '20 Sep', max: 30, min: 20, rainProb: '10%', condition: 'Sunny & Clear', rainMm: 0 },
      { day: 'Mon', date: '21 Sep', max: 31, min: 21, rainProb: '5%', condition: 'Clear Sky', rainMm: 0 },
    ],
  },
  Gujarat: {
    location: 'Anand & Central Gujarat, India',
    current: {
      temp: 31.2,
      humidity: 58,
      windSpeed: 11.0,
      windDirection: 'W',
      rainfallTodayMm: 0.0,
      condition: 'Sunny & Clear',
      uvIndex: 'High (8/10)',
    },
    rainChance48h: '10%',
    sprayingWindow: '06:30 AM – 09:30 AM (Best before midday heat)',
    alerts: [
      'High Temperature Alert: Peak afternoon temperatures reaching 34°C. Maintain adequate soil moisture for vegetable crops.',
    ],
    forecast: [
      { day: 'Today', date: '15 Sep', max: 32, min: 22, rainProb: '5%', condition: 'Sunny & Clear', rainMm: 0 },
      { day: 'Tomorrow', date: '16 Sep', max: 33, min: 23, rainProb: '10%', condition: 'Sunny', rainMm: 0 },
      { day: 'Thu', date: '17 Sep', max: 31, min: 22, rainProb: '15%', condition: 'Partly Cloudy', rainMm: 0 },
      { day: 'Fri', date: '18 Sep', max: 30, min: 21, rainProb: '20%', condition: 'Passing Clouds', rainMm: 0 },
      { day: 'Sat', date: '19 Sep', max: 32, min: 22, rainProb: '5%', condition: 'Sunny & Warm', rainMm: 0 },
      { day: 'Sun', date: '20 Sep', max: 33, min: 23, rainProb: '0%', condition: 'Clear Sky', rainMm: 0 },
      { day: 'Mon', date: '21 Sep', max: 34, min: 24, rainProb: '0%', condition: 'Clear Sky', rainMm: 0 },
    ],
  },
  Punjab: {
    location: 'Ludhiana Agro-Zone, Punjab, India',
    current: {
      temp: 29.8,
      humidity: 54,
      windSpeed: 8.0,
      windDirection: 'NW',
      rainfallTodayMm: 0.0,
      condition: 'Clear Sky',
      uvIndex: 'Moderate (6/10)',
    },
    rainChance48h: '5%',
    sprayingWindow: '07:00 AM – 11:00 AM (Optimal conditions)',
    alerts: [
      'Ideal Tillage Window: Low humidity and dry soil conditions are ideal for pre-rabi land preparation.',
    ],
    forecast: [
      { day: 'Today', date: '15 Sep', max: 31, min: 19, rainProb: '0%', condition: 'Clear Sky', rainMm: 0 },
      { day: 'Tomorrow', date: '16 Sep', max: 31, min: 19, rainProb: '5%', condition: 'Sunny', rainMm: 0 },
      { day: 'Thu', date: '17 Sep', max: 30, min: 18, rainProb: '10%', condition: 'Sunny', rainMm: 0 },
      { day: 'Fri', date: '18 Sep', max: 29, min: 17, rainProb: '5%', condition: 'Clear', rainMm: 0 },
      { day: 'Sat', date: '19 Sep', max: 30, min: 18, rainProb: '0%', condition: 'Clear Sky', rainMm: 0 },
      { day: 'Sun', date: '20 Sep', max: 31, min: 19, rainProb: '0%', condition: 'Sunny', rainMm: 0 },
      { day: 'Mon', date: '21 Sep', max: 32, min: 20, rainProb: '0%', condition: 'Sunny & Warm', rainMm: 0 },
    ],
  },
};

/**
 * Fetch Hyperlocal Weather Intelligence
 */
export async function getWeatherIntelligence(params = {}) {
  const locKey = params.location || 'Maharashtra';

  // 1. If in Live mode, attempt connection with Django REST API
  if (!isMockMode()) {
    try {
      const query = new URLSearchParams({
        location: locKey,
        crop: params.crop_type || 'Tomato',
        stage: params.growth_stage || 'Flowering',
      }).toString();

      const data = await apiFetch(`${DJANGO_BASE_URL}/weather/intelligence/?${query}`, {
        method: 'GET',
      }, 4000);

      if (data && data.success && data.weather_intelligence) {
        return {
          success: true,
          isRealBackend: true,
          weather_intelligence: data.weather_intelligence,
        };
      }
    } catch (err) {
      console.warn('Real Django weather service unavailable, falling back:', err.message);
      if (!isMockMode()) {
        return formatApiError(err, 'Unable to connect to Django weather intelligence service on port 8000.');
      }
    }
  }

  // 2. Local / Mock Climate Intelligence
  await new Promise((resolve) => setTimeout(resolve, 650));

  const matchedRegion = REGIONAL_WEATHER[locKey] || REGIONAL_WEATHER.Maharashtra;

  return {
    success: true,
    isMock: true,
    weather_intelligence: {
      location: matchedRegion.location,
      current_conditions: {
        temperature_celsius: matchedRegion.current.temp,
        relative_humidity_percent: matchedRegion.current.humidity,
        wind_speed_kmh: matchedRegion.current.windSpeed,
        wind_direction: matchedRegion.current.windDirection,
        current_precipitation_mm: matchedRegion.current.rainfallTodayMm,
        weather_summary: `${matchedRegion.current.condition} • Humidity ${matchedRegion.current.humidity}%`,
        uv_index: matchedRegion.current.uvIndex,
      },
      primary_agricultural_actions: [
        matchedRegion.rainChance48h.includes('70')
          ? 'Delay scheduled watering — significant rainfall (12-18mm) expected within 48 hours.'
          : 'Normal irrigation schedule recommended. Soil moisture loss is moderate.',
        `Safe foliar spray window today: ${matchedRegion.sprayingWindow}.`,
        'Scout crops for early fungal symptoms due to elevated relative humidity.',
      ],
      irrigation_directive: {
        action: matchedRegion.rainChance48h.includes('70') ? 'Delay watering — rain expected' : 'Normal scheduled watering',
        priority: matchedRegion.rainChance48h.includes('70') ? 'High (Water Conservation)' : 'Routine',
        reason: `${matchedRegion.rainChance48h} chance of precipitation forecasted. Conserve water and prevent waterlogging.`,
      },
      spraying_window: {
        suitable: true,
        time_slot: matchedRegion.sprayingWindow,
        advice: 'Calm morning winds (< 10 km/h) ensure maximum spray droplet adhesion without pesticide drift.',
      },
      alerts: matchedRegion.alerts,
      seven_day_forecast: matchedRegion.forecast,
    },
  };
}

/**
 * Get available farming region locations
 */
export function getAvailableWeatherRegions() {
  return [
    { id: 'Maharashtra', name: 'Maharashtra (Pune / Nashik / Satara)' },
    { id: 'Gujarat', name: 'Gujarat (Anand / Ahmedabad / Rajkot)' },
    { id: 'Punjab', name: 'Punjab (Ludhiana / Amritsar)' },
  ];
}
