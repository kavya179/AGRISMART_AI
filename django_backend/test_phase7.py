"""
AgriSmart AI — Phase 7 Automated Test Suite
Validates Weather-Based Intelligence and Sustainability Scoring REST endpoints.
"""
import unittest
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from rest_framework.test import APIClient

class Phase7TestCase(unittest.TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_01_weather_intelligence_get(self):
        """Test GET /api/weather/intelligence/ with query params."""
        response = self.client.get('/api/weather/intelligence/', {'location': 'Gujarat', 'crop': 'Tomato'})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get('success'))
        intelligence = data.get('weather_intelligence', {})
        self.assertIn('primary_agricultural_actions', intelligence)
        self.assertIn('irrigation_directive', intelligence)
        self.assertIn('spraying_window', intelligence)
        self.assertIn('seven_day_forecast', intelligence)
        print("  [PASS] Test 1: Weather Intelligence GET returned valid forecast & agricultural actions.")

    def test_02_weather_intelligence_post(self):
        """Test POST /api/weather/intelligence/ with farm parameters."""
        payload = {
            'location': 'Maharashtra',
            'crop_type': 'Cotton',
            'growth_stage': 'Flowering'
        }
        response = self.client.post('/api/weather/intelligence/', payload, format='json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get('success'))
        intelligence = data.get('weather_intelligence', {})
        self.assertIn('current_conditions', intelligence)
        print(f"  [PASS] Test 2: Weather Intelligence POST for {payload['location']} returned actions: {intelligence.get('primary_agricultural_actions')}")

    def test_03_sustainability_calculate(self):
        """Test POST /api/sustainability/calculate/ reproducible formula."""
        # Case generating exact 78/100
        payload = {
            'irrigation_method': 'drip',
            'rainwater_harvesting': False,
            'moisture_sensor_timing': True,
            'organic_manure_used': True,
            'soil_tested': True,
            'mulching_or_cover_crop': False,
            'crop_residue_burned': False,
            'legume_crop_rotation': True,
            'bio_pesticides_used': True,
            'regular_disease_monitoring': True,
        }
        response = self.client.post('/api/sustainability/calculate/', payload, format='json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get('success'))
        sust = data.get('sustainability', {})
        self.assertEqual(sust.get('sustainability_score'), 78)
        self.assertIn('what_is_helping', sust)
        self.assertIn('what_can_improve', sust)
        self.assertIn('recommended_action', sust)
        print(f"  [PASS] Test 3: Sustainability Calculation returned exact reproducible score: {sust.get('sustainability_score')}/100 ({sust.get('rating_grade')})")

    def test_04_sustainability_formula_audit(self):
        """Test GET /api/sustainability/formula/ returns open formula."""
        response = self.client.get('/api/sustainability/formula/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('aggregate_equation', data)
        self.assertIn('breakdown', data)
        print("  [PASS] Test 4: Sustainability Formula audit endpoint verified.")

if __name__ == '__main__':
    print("=" * 60)
    print("Running AgriSmart AI Phase 7 Test Suite")
    print("=" * 60)
    unittest.main()
