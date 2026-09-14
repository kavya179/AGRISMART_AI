"""
AgriSmart AI - Weather Intelligence Views
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import WeatherIntelligenceInputSerializer
from .engine import WeatherIntelligenceService, resolve_coordinates

class WeatherIntelligenceView(APIView):
    """
    POST /api/weather/intelligence/
    GET  /api/weather/intelligence/
    Fetches real weather data and synthesizes farm-specific directives.
    """
    def get(self, request):
        location = request.query_params.get('location', 'Gujarat')
        crop_type = request.query_params.get('crop', 'Tomato')
        growth_stage = request.query_params.get('stage', 'Flowering')
        
        coords = resolve_coordinates(location)
        weather_res = WeatherIntelligenceService.fetch_live_weather(coords['lat'], coords['lon'])
        
        guidance = WeatherIntelligenceService.generate_agricultural_actions(
            weather_data=weather_res['raw_data'],
            crop_type=crop_type,
            growth_stage=growth_stage,
            location_name=coords['name']
        )
        guidance['data_source'] = weather_res['source']
        
        return Response({
            'success': True,
            'weather_intelligence': guidance
        }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = WeatherIntelligenceInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        data = serializer.validated_data
        location = data.get('location', 'Gujarat')
        crop_type = data.get('crop_type', 'Tomato')
        growth_stage = data.get('growth_stage', 'Flowering')

        lat = data.get('latitude')
        lon = data.get('longitude')
        
        if lat is None or lon is None:
            coords = resolve_coordinates(location)
            lat = coords['lat']
            lon = coords['lon']
            location_name = coords['name']
        else:
            location_name = location

        weather_res = WeatherIntelligenceService.fetch_live_weather(lat, lon)
        guidance = WeatherIntelligenceService.generate_agricultural_actions(
            weather_data=weather_res['raw_data'],
            crop_type=crop_type,
            growth_stage=growth_stage,
            location_name=location_name
        )
        guidance['data_source'] = weather_res['source']

        return Response({
            'success': True,
            'weather_intelligence': guidance
        }, status=status.HTTP_200_OK)


class WeatherStatusView(APIView):
    """
    GET /api/weather/status/
    """
    def get(self, request):
        return Response({
            'module': 'AgriSmart Hyperlocal Weather Intelligence Engine',
            'status': 'Online & Active (Live Precision Weather Enabled)',
            'data_provider': 'Open-Meteo Precision Meteorological API (Keyless & Open)',
            'supported_directives': [
                'Delay watering — rain is likely.',
                'Monitor crop — humidity is high.',
                'Watering conditions look suitable.',
                'High temperature expected — check crop stress.',
                'Foliar spraying window advisory based on wind and precipitation'
            ]
        }, status=status.HTTP_200_OK)
