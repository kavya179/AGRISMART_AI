"""
AgriSmart AI — Phase 8 Automated Test Suite
Validates Farmer Assistant, Diagnostic Guardrails, and Agentic Decision Loop.
"""
import unittest
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from rest_framework.test import APIClient

class Phase8TestCase(unittest.TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_01_assistant_diagnostic_guardrail(self):
        """Verify assistant does NOT invent disease diagnoses without visual model scan."""
        payload = {
            'query': 'What disease does my leaf have?',
            'language': 'en',
            'farmer_context': {}
        }
        response = self.client.post('/api/assistant/chat/', payload, format='json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get('success'))
        reply = data.get('response', {}).get('reply', '')
        self.assertIn("Check Crop", reply)
        print("  [PASS] Test 1: Assistant Diagnostic Guardrail enforced — redirected to visual model scan.")

    def test_02_assistant_grounded_context_response(self):
        """Verify assistant utilizes actual disease diagnosis from model context."""
        payload = {
            'query': 'How should I treat the blight spots on my tomato plant?',
            'language': 'en',
            'farmer_context': {
                'crop': 'Tomato',
                'recent_disease_prediction': {
                    'class': 'Tomato Early Blight',
                    'status': 'diseased'
                }
            }
        }
        response = self.client.post('/api/assistant/chat/', payload, format='json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get('success'))
        reply = data.get('response', {}).get('reply', '')
        self.assertIn("Tomato Early Blight", reply)
        print("  [PASS] Test 2: Assistant successfully answered using grounded guidance catalog for Tomato Early Blight.")

    def test_03_assistant_multilingual_gujarati(self):
        """Verify assistant answers in Gujarati when selected."""
        payload = {
            'query': 'લીમડાનું તેલ કેવી રીતે છાંટવું?',
            'language': 'gu',
            'farmer_context': {'crop': 'Tomato'}
        }
        response = self.client.post('/api/assistant/chat/', payload, format='json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get('success'))
        reply = data.get('response', {}).get('reply', '')
        self.assertIn("લીમડાનું", reply)
        print("  [PASS] Test 3: Assistant responded in Gujarati with authentic neem advisory.")

    def test_04_agentic_decision_loop_execution(self):
        """Verify the 8-stage Agentic Advisor Decision Loop executes end-to-end."""
        payload = {
            'crop_type': 'Tomato',
            'growth_stage': 'Flowering',
            'soil_moisture': 65.0,
            'disease_detected': 'Tomato Early Blight',
            'disease_status': 'diseased',
            'weather_forecast': 'Rain likely within 24 hours',
            'rain_probability': 75.0,
            'humidity': 78.0,
            'temperature': 28.0,
            'wind_speed': 9.0
        }
        response = self.client.post('/api/assistant/agentic-loop/run/', payload, format='json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get('success'))
        self.assertEqual(data.get('decision_loop_summary', {}).get('loop_stages_count'), 8)
        traces = data.get('decision_traces', [])
        self.assertEqual(len(traces), 8)

        # Check step names
        expected_steps = [
            'COLLECT DATA', 'ANALYSE', 'CHECK WEATHER', 'CHECK CROP CONDITION',
            'CHECK IRRIGATION', 'DECIDE', 'GENERATE RECOMMENDATION', 'NOTIFY FARMER'
        ]
        actual_steps = [t['name'] for t in traces]
        self.assertEqual(actual_steps, expected_steps)

        # Check recommendation
        rec = data.get('recommendation', {})
        self.assertIn("Do not irrigate today", rec.get('headline'))
        print(f"  [PASS] Test 4: Agentic Loop executed 8 stages cleanly. Synthesized Directive: '{rec.get('headline')}'")

if __name__ == '__main__':
    print("=" * 60)
    print("Running AgriSmart AI Phase 8 Test Suite")
    print("=" * 60)
    unittest.main()
