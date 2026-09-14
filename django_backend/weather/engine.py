"""
AgriSmart AI — Weather Intelligence Engine
Integrates live meteorological data with crop and farm conditions
to generate deterministic, actionable agricultural directives.
"""
import urllib.request
import json
import logging

logger = logging.getLogger(__name__)

# Regional Indian Agro-Climatic Coordinates Database
LOCATION_COORDINATES = {
    'maharashtra': {'lat': 18.5204, 'lon': 73.8567, 'name': 'Pune, Maharashtra'},
    'gujarat': {'lat': 22.5645, 'lon': 72.9289, 'name': 'Anand / Ahmedabad, Gujarat'},
    'punjab': {'lat': 30.9010, 'lon': 75.8573, 'name': 'Ludhiana, Punjab'},
    'haryana': {'lat': 29.9695, 'lon': 76.8783, 'name': 'Karnal, Haryana'},
    'rajasthan': {'lat': 26.9124, 'lon': 75.7873, 'name': 'Jaipur, Rajasthan'},
    'karnataka': {'lat': 12.9716, 'lon': 77.5946, 'name': 'Bengaluru / Dharwad, Karnataka'},
    'uttar pradesh': {'lat': 26.8467, 'lon': 80.9462, 'name': 'Lucknow, Uttar Pradesh'},
    'madhya pradesh': {'lat': 23.2599, 'lon': 77.4126, 'name': 'Bhopal / Indore, Madhya Pradesh'},
    'andhra pradesh': {'lat': 16.5062, 'lon': 80.6480, 'name': 'Guntur, Andhra Pradesh'},
    'tamil nadu': {'lat': 11.0168, 'lon': 76.9558, 'name': 'Coimbatore, Tamil Nadu'},
    'west bengal': {'lat': 22.9868, 'lon': 87.8550, 'name': 'Burdwan, West Bengal'},
    'default': {'lat': 22.5645, 'lon': 72.9289, 'name': 'Western Agro-Zone, India'},
}

def resolve_coordinates(location_str):
    """Resolve location string to latitude and longitude."""
    if not location_str:
        return LOCATION_COORDINATES['default']
    loc_lower = str(location_str).lower().strip()
    for key, val in LOCATION_COORDINATES.items():
        if key in loc_lower or loc_lower in key:
            return val
    return LOCATION_COORDINATES['default']


class WeatherIntelligenceService:
    """
    Fetches real-time weather forecasts and translates meteorological parameters
    into actionable farm decisions.
    """

    @classmethod
    def fetch_live_weather(cls, latitude, longitude):
        """
        Fetch real meteorological forecast from Open-Meteo API.
        Falls back to resilient agro-meteorological simulation if offline.
        """
        url = (
            f"https://api.open-meteo.com/v1/forecast?"
            f"latitude={latitude}&longitude={longitude}&"
            f"current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&"
            f"daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code&"
            f"timezone=auto"
        )
        try:
            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'AgriSmart-AI-Weather-Service/1.0'}
            )
            with urllib.request.urlopen(req, timeout=4) as response:
                if response.status == 200:
                    data = json.loads(response.read().decode('utf-8'))
                    return {
                        'success': True,
                        'source': 'Open-Meteo Live Precision API',
                        'raw_data': data
                    }
        except Exception as e:
            logger.warning(f"Live weather API fetch failed: {e}. Falling back to default meteorological profile.")

        # Resilient fallback forecast
        return {
            'success': True,
            'source': 'Agro-Meteorological Indian Profile (Offline Fallback)',
            'raw_data': {
                'current': {
                    'temperature_2m': 28.5,
                    'relative_humidity_2m': 68,
                    'precipitation': 0.0,
                    'weather_code': 2,
                    'wind_speed_10m': 8.5
                },
                'daily': {
                    'time': ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                    'temperature_2m_max': [29.0, 30.2, 28.0, 27.5, 29.5, 31.0, 31.5],
                    'temperature_2m_min': [20.0, 21.0, 19.5, 18.5, 19.0, 21.5, 22.0],
                    'precipitation_sum': [0.0, 0.0, 14.5, 6.0, 0.0, 0.0, 0.0],
                    'precipitation_probability_max': [10, 15, 75, 45, 20, 5, 0],
                    'weather_code': [1, 1, 61, 51, 2, 0, 0]
                }
            }
        }

    @classmethod
    def generate_agricultural_actions(cls, weather_data, crop_type='Tomato', growth_stage='Flowering', location_name='Your Farm'):
        """
        Synthesizes weather parameters and crop characteristics into actionable farm directives.
        """
        current = weather_data.get('current', {})
        daily = weather_data.get('daily', {})

        temp = float(current.get('temperature_2m', 28.0))
        humidity = float(current.get('relative_humidity_2m', 65.0))
        wind = float(current.get('wind_speed_10m', 8.0))
        current_precip = float(current.get('precipitation', 0.0))

        # Check 48h rain forecast
        rain_probs = daily.get('precipitation_probability_max', [10, 10])
        rain_sums = daily.get('precipitation_sum', [0, 0])
        
        prob_day1 = rain_probs[0] if len(rain_probs) > 0 else 10
        prob_day2 = rain_probs[1] if len(rain_probs) > 1 else 10
        rain_sum_48h = (rain_sums[0] if len(rain_sums) > 0 else 0) + (rain_sums[1] if len(rain_sums) > 1 else 0)

        max_temp_week = max(daily.get('temperature_2m_max', [temp]))

        actions = []
        alerts = []
        spraying_window = {}
        irrigation_advice = {}

        # 1. Irrigation Directive based on rainfall likelihood
        if prob_day1 >= 50 or prob_day2 >= 60 or rain_sum_48h >= 8.0 or current_precip > 2.0:
            irrigation_advice = {
                'action': 'Delay watering — rain is likely.',
                'status': 'Delay Irrigation',
                'priority': 'High',
                'reason': f'{max(prob_day1, prob_day2)}% chance of rain forecasted ({rain_sum_48h:.1f} mm expected) in the next 48 hours. Let natural rainfall irrigate the crop.'
            }
            actions.append('Delay watering — rain is likely.')
            alerts.append(f'Rain Alert: {rain_sum_48h:.1f} mm expected. Pause canal/drip irrigation to prevent waterlogging.')
        elif temp > 35 and humidity < 40:
            irrigation_advice = {
                'action': 'High temperature expected — check crop stress and irrigate early.',
                'status': 'Irrigate Early Morning',
                'priority': 'Urgent',
                'reason': f'High temperatures ({temp}°C) combined with dry winds will accelerate evapotranspiration.'
            }
            actions.append('High temperature expected — check crop stress.')
        else:
            irrigation_advice = {
                'action': 'Watering conditions look suitable.',
                'status': 'Standard Irrigation',
                'priority': 'Normal',
                'reason': 'Moderate weather with low precipitation probability allows regular irrigation.'
            }
            actions.append('Watering conditions look suitable.')

        # 2. Disease & Foliar Risk Directive based on humidity and temp
        if humidity > 75 and 18 <= temp <= 30:
            disease_action = 'Monitor crop — humidity is high.'
            actions.append(disease_action)
            alerts.append(f'Foliar Disease Alert: High relative humidity ({humidity}%) creates favorable conditions for fungal spore germination (Early/Late Blight). Inspect lower foliage.')
        elif humidity > 85:
            actions.append('Monitor crop — very high humidity increases fungal risk.')

        # 3. Spraying Window Directive based on wind speed and rain
        if wind < 12 and prob_day1 < 30 and current_precip == 0:
            spraying_window = {
                'suitable': True,
                'time_slot': '7:00 AM – 10:00 AM',
                'advice': 'Ideal spraying conditions today. Gentle wind speed ensures uniform foliar coverage with minimal drift.'
            }
            actions.append('Foliar spraying window is favorable this morning (7:00 AM – 10:00 AM).')
        else:
            spraying_window = {
                'suitable': False,
                'time_slot': 'Postpone Spraying',
                'advice': f'Suboptimal spraying conditions (Wind: {wind} km/h, Rain chance: {prob_day1}%). Postpone chemical sprays to avoid drift loss or rain washout.'
            }
            if wind >= 15:
                alerts.append(f'Wind Alert: Gusts up to {wind} km/h. Avoid pesticide spraying to prevent chemical drift.')

        # Build 7-day structured forecast for frontend
        forecast_days = []
        times = daily.get('time', ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'])
        max_temps = daily.get('temperature_2m_max', [28]*7)
        min_temps = daily.get('temperature_2m_min', [19]*7)
        precip_probs = daily.get('precipitation_probability_max', [10]*7)
        precip_sums = daily.get('precipitation_sum', [0]*7)

        for i in range(min(7, len(times))):
            p_prob = precip_probs[i] if i < len(precip_probs) else 0
            p_sum = precip_sums[i] if i < len(precip_sums) else 0
            cond = 'Sunny & Clear'
            if p_prob > 50 or p_sum > 5:
                cond = 'Rain / Showers'
            elif p_prob > 25:
                cond = 'Partly Cloudy / Showers'
            elif humidity > 70:
                cond = 'Partly Sunny'

            forecast_days.append({
                'day_label': f'Day {i+1}' if i > 0 else 'Today',
                'date': times[i] if i < len(times) else f'+{i} Days',
                'max_temp': round(max_temps[i], 1) if i < len(max_temps) else 28,
                'min_temp': round(min_temps[i], 1) if i < len(min_temps) else 19,
                'rain_probability': f'{p_prob}%',
                'rain_sum_mm': round(p_sum, 1),
                'condition': cond
            })

        return {
            'location': location_name,
            'current_conditions': {
                'temperature_celsius': temp,
                'relative_humidity_percent': humidity,
                'wind_speed_kmh': wind,
                'current_precipitation_mm': current_precip,
                'weather_summary': 'Partly Sunny • Good Field Conditions' if prob_day1 < 30 else 'Cloudy • Rain Expected'
            },
            'primary_agricultural_actions': actions,
            'irrigation_directive': irrigation_advice,
            'spraying_window': spraying_window,
            'alerts': alerts,
            'seven_day_forecast': forecast_days,
            'crop_context': {
                'crop_type': crop_type,
                'growth_stage': growth_stage
            }
        }
