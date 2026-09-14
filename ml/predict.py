"""
AgriSmart AI - Single-Image Crop Disease Predictor CLI
Usage:
  python ml/predict.py --image path/to/leaf.jpg
"""
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ml.inference.predict import main
from ml.inference.predictor import CropDiseasePredictor


def predict(image_path):
    """
    Standard single-function interface: predict(image_path) -> class_label
    """
    predictor = CropDiseasePredictor()
    res = predictor.predict(image_path)
    if res.get('status') == 'success':
        return res['predicted_class']
    return res.get('message', 'Prediction failed')


if __name__ == '__main__':
    main()
