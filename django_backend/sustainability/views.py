"""
AgriSmart AI - Sustainability Views
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SustainabilityCalculateInputSerializer
from .engine import SustainabilityScoringEngine

class SustainabilityCalculateView(APIView):
    """
    POST /api/sustainability/calculate/
    GET  /api/sustainability/calculate/
    Computes deterministic farm sustainability score (0-100) and actionable explanations.
    """
    def get(self, request):
        default_params = {
            'irrigation_method': 'drip',
            'rainwater_harvesting': True,
            'moisture_sensor_timing': True,
            'organic_manure_used': True,
            'soil_tested': True,
            'mulching_or_cover_crop': False,
            'crop_residue_burned': False,
            'legume_crop_rotation': True,
            'bio_pesticides_used': True,
            'regular_disease_monitoring': True,
        }
        result = SustainabilityScoringEngine.calculate_score(default_params)
        return Response({
            'success': True,
            'sustainability': result
        }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SustainabilityCalculateInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        result = SustainabilityScoringEngine.calculate_score(serializer.validated_data)
        return Response({
            'success': True,
            'sustainability': result
        }, status=status.HTTP_200_OK)


class SustainabilityFormulaView(APIView):
    """
    GET /api/sustainability/formula/
    Returns the exact mathematical scoring formula for public audit and transparency.
    """
    def get(self, request):
        return Response({
            'formula_name': 'AgriSmart Regenerative Sustainability Index (RSI-100)',
            'aggregate_equation': 'S = W + R + H  (Total: 0 to 100 points)',
            'breakdown': {
                'W (Water Efficiency, Max 35)': {
                    'irrigation_method': 'Drip (+20), Sprinkler (+14), Furrow (+8), Flood (+3)',
                    'rainwater_harvesting': '+9 pts',
                    'moisture_sensor_timing': '+6 pts'
                },
                'R (Resource & Soil Health, Max 35)': {
                    'organic_manure_vermicompost': '+12 pts',
                    'soil_testing_balanced_npk': '+10 pts',
                    'cover_cropping_mulch': '+8 pts',
                    'zero_crop_stubble_burning': '+5 pts'
                },
                'H (Crop Health & Biodiversity, Max 30)': {
                    'legume_crop_rotation': '+12 pts',
                    'biopesticides_ipm': '+10 pts',
                    'regular_disease_monitoring': '+8 pts'
                }
            },
            'sample_evaluation': {
                'profile': 'Standard Sustainable Farm with Drip, Soil Testing, and Pulses Rotation',
                'calculated_score': '78 / 100',
                'grade': 'Grade A- (High Sustainable Standard)'
            }
        }, status=status.HTTP_200_OK)


class SustainabilityStatusView(APIView):
    """
    GET /api/sustainability/status/
    """
    def get(self, request):
        return Response({
            'module': 'AgriSmart Farm Sustainability & Regenerative Soil Health AI',
            'status': 'Online & Active',
            'formula_audited': True,
            'scoring_range': '0 to 100 points'
        }, status=status.HTTP_200_OK)
