"""
AgriSmart AI - Automated REST API Test Suite for Phase 3 (with Model Loaded Test)
"""
import io
import os
import sys
import json
from pathlib import Path
from PIL import Image

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.conf import settings
from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile

BASE_PROJECT_DIR = settings.BASE_DIR.parent
if str(BASE_PROJECT_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_PROJECT_DIR))

import torch
from ml.training.train import build_model
from disease_detection.services import disease_model_service


def create_test_image(format='JPEG', size=(224, 224), color=(34, 139, 34)):
    """Creates a memory-based PIL image for testing."""
    img = Image.new('RGB', size, color=color)
    byte_arr = io.BytesIO()
    img.save(byte_arr, format=format)
    byte_arr.seek(0)
    return byte_arr.getvalue()


class Phase3ModelIntegrationTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_01_health_check_endpoint(self):
        """Test GET /api/health/ returns 200 and healthy status."""
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['status'], 'healthy')
        self.assertIn('model_service', data)
        print("  [PASS] Test 1: GET /api/health/ returned 200 OK")

    def test_02_disease_status_endpoint(self):
        """Test GET /api/disease/status/ returns 200."""
        response = self.client.get('/api/disease/status/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('status', data)
        self.assertIn('model_loaded', data)
        print("  [PASS] Test 2: GET /api/disease/status/ returned 200 OK")

    def test_03_predict_missing_image(self):
        """Test POST /api/disease/predict/ without image returns 400."""
        response = self.client.post('/api/disease/predict/', {})
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data['success'])
        self.assertIn('details', data)
        print("  [PASS] Test 3: Missing image payload rejected with 400 Bad Request")

    def test_04_predict_invalid_file_extension(self):
        """Test POST /api/disease/predict/ with .txt file returns 400."""
        invalid_file = SimpleUploadedFile(
            "test_notes.txt",
            b"This is not a leaf image",
            content_type="text/plain"
        )
        response = self.client.post('/api/disease/predict/', {'image': invalid_file})
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data['success'])
        print("  [PASS] Test 4: Non-image file rejected with 400 Bad Request")

    def test_05_live_model_prediction_and_guidance(self):
        """
        Creates a test checkpoint in ml/saved_models/, initializes singleton service,
        and tests complete live inference and precautionary guidance formatting.
        """
        saved_models_dir = Path(settings.ML_DIR) / 'saved_models'
        saved_models_dir.mkdir(parents=True, exist_ok=True)
        model_file = saved_models_dir / 'best_model.pth'
        class_map_file = saved_models_dir / 'class_mapping.json'

        # 1. Create sample class mapping
        test_classes = {
            "0": "Tomato___Early_blight",
            "1": "Tomato___Late_blight",
            "2": "Tomato___healthy"
        }
        with open(class_map_file, 'w', encoding='utf-8') as f:
            json.dump(test_classes, f, indent=2)

        # 2. Create checkpoint weights
        test_model = build_model(architecture='efficientnet_b0', num_classes=3, pretrained=False)
        payload = {
            'model_state_dict': test_model.state_dict(),
            'metadata': {
                'architecture': 'efficientnet_b0',
                'classes': list(test_classes.values())
            }
        }
        torch.save(payload, str(model_file))

        # 3. Reload Singleton Service
        disease_model_service.load_model()
        self.assertTrue(disease_model_service.is_loaded)

        # 4. Post image to API
        img_bytes = create_test_image(format='JPEG')
        image_file = SimpleUploadedFile(
            "leaf_test.jpg",
            img_bytes,
            content_type="image/jpeg"
        )
        response = self.client.post('/api/disease/predict/', {'image': image_file})
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertTrue(data['success'])
        self.assertIn('prediction', data)
        self.assertIn('class', data['prediction'])
        self.assertIn('confidence', data['prediction'])
        self.assertIn('status', data['prediction'])
        self.assertIn('guidance', data)
        self.assertIn('precautions', data['guidance'])
        self.assertIsInstance(data['guidance']['precautions'], list)
        self.assertGreater(len(data['guidance']['precautions']), 0)

        print("  [PASS] Test 5: Live model predicted:\n", json.dumps(data, indent=2))


if __name__ == '__main__':
    print("==========================================================")
    print("Running AgriSmart AI Phase 3 REST API Tests")
    print("==========================================================")
    import unittest
    suite = unittest.TestLoader().loadTestsFromTestCase(Phase3ModelIntegrationTestCase)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    if not result.wasSuccessful():
        sys.exit(1)
