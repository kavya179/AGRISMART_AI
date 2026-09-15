"""
AgriSmart AI - Single-Image Crop Disease Predictor CLI & API Entrypoint
Usage:
  python ml/predict.py path/to/leaf.jpg
  python ml/predict.py --image path/to/leaf.jpg
"""
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ml.inference.predict import main
from ml.inference.predictor import CropDiseasePredictor


def predict(image_path: str) -> str:
    """
    Mandatory SIH functional interface:
        predict(image_path) -> class_label

    Args:
        image_path (str): Path to the target crop leaf image.

    Returns:
        str: Predicted crop disease class label (e.g. 'Tomato___Early_blight' or 'Tomato___healthy')
    """
    predictor = CropDiseasePredictor()
    res = predictor.predict(image_path)
    if res.get('status') == 'success':
        return res['predicted_class']
    return res.get('message', 'Prediction failed')


if __name__ == '__main__':
    main()
