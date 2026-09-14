"""
AgriSmart AI - Automated Test Suite for Phase 6 Bonus Modules
Tests:
1. POST /api/crops/recommend/ (9 parameters, scoring, alternatives, farming consideration)
2. POST /api/irrigation/predict/ (Soil moisture, weather forecast delay rule, priority)
"""
import os
import sys
import json

import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.test import TestCase, Client


class BonusModulesTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_01_crop_recommendation_valid(self):
        """Test POST /api/crops/recommend/ with full 9 parameters."""
        payload = {
            "soil_type": "Black Soil",
            "ph": 6.8,
            "temperature": 27.0,
            "humidity": 65.0,
            "rainfall": 150.0,
            "water_availability": "Moderate",
            "season": "Kharif (Monsoon)",
            "location": "Maharashtra",
            "previous_crop": "Wheat"
        }
        response = self.client.post(
            '/api/crops/recommend/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data['success'])
        self.assertIn('recommended_crop', data)
        self.assertIn('suitability_score', data)
        self.assertIn('short_reason', data)
        self.assertIn('basic_farming_consideration', data)
        self.assertIn('alternative_crops', data)
        print(f"  [PASS] Test 1: Crop Recommendation returned: {data['recommended_crop']} ({data['suitability_score']})")

    def test_02_crop_recommendation_status(self):
        """Test GET /api/crop/status/ returns model metadata and Macro-F1."""
        response = self.client.get('/api/crop/status/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['status'], 'ready')
        self.assertIn('metadata', data)
        self.assertIn('evaluation_metrics', data['metadata'])
        print(f"  [PASS] Test 2: Crop Recommendation Metadata returned (Macro-F1: {data['metadata']['evaluation_metrics']['macro_f1']})")

    def test_03_irrigation_predict_delay_on_rain(self):
        """Test POST /api/irrigation/predict/ delays watering when rain is forecast."""
        payload = {
            "soil_moisture": 35.0,
            "weather_forecast": "Rain Expected within 24h",
            "crop_type": "Tomato",
            "growth_stage": "Flowering"
        }
        response = self.client.post(
            '/api/irrigation/predict/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data['success'])
        self.assertFalse(data['irrigation_required'])
        self.assertEqual(data['recommended_action'], 'Delay watering')
        self.assertIn('Rain is likely', data['reason'])
        print(f"  [PASS] Test 3: Smart Irrigation correctly delayed watering on rain forecast")

    def test_04_irrigation_predict_immediate_when_dry(self):
        """Test POST /api/irrigation/predict/ requests watering when dry without rain."""
        payload = {
            "soil_moisture": 25.0,
            "weather_forecast": "Sunny & Dry",
            "crop_type": "Tomato",
            "growth_stage": "Flowering"
        }
        response = self.client.post(
            '/api/irrigation/predict/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data['success'])
        self.assertTrue(data['irrigation_required'])
        self.assertIn('Immediate', data['priority'])
        print(f"  [PASS] Test 4: Smart Irrigation triggered immediate watering for dry soil ({payload['soil_moisture']}%)")


if __name__ == '__main__':
    print("==========================================================")
    print("Running AgriSmart AI Phase 6 Bonus Modules Test Suite")
    print("==========================================================")
    import unittest
    suite = unittest.TestLoader().loadTestsFromTestCase(BonusModulesTestCase)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    if not result.wasSuccessful():
        sys.exit(1)
