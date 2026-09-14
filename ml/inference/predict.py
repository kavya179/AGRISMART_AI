"""
AgriSmart AI - Crop Disease Prediction CLI
Run single-image prediction from command-line.
"""
import sys
import json
import argparse
from pathlib import Path

# Add workspace root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ml.inference.predictor import CropDiseasePredictor


def main():
    parser = argparse.ArgumentParser(description="AgriSmart AI - Single-Image Crop Disease Predictor CLI")
    parser.add_argument("--image", type=str, required=True, help="Path to input crop leaf image file")
    parser.add_argument("--model", type=str, default=None, help="Optional path to model .pth weights")
    parser.add_argument("--class_map", type=str, default=None, help="Optional path to class_mapping.json")
    parser.add_argument("--top_k", type=int, default=3, help="Number of top predictions to display")
    parser.add_argument("--json", action="store_true", help="Output raw JSON format")
    args = parser.parse_args()

    predictor = CropDiseasePredictor(model_path=args.model, class_mapping_path=args.class_map)
    result = predictor.predict(args.image, top_k=args.top_k)

    if args.json:
        print(json.dumps(result, indent=2))
        return

    print("=================================================================")
    print("🌿 AgriSmart AI - Crop Leaf Diagnostic Result")
    print("=================================================================")
    print(f"Target Image:   {args.image}")
    print(f"Status:         {result.get('status')}")

    if result.get('status') == 'success':
        print(f"\n🎯 Predicted Diagnosis: {result['predicted_class']}")
        print(f"📊 Confidence Score:   {result['confidence_percentage']} ({result['confidence']:.4f})")
        print(f"🏷️ Class ID:           {result['class_id']}")
        
        print("\nTop Candidate Predictions:")
        for rank, p in enumerate(result['top_predictions'], 1):
            print(f"  {rank}. {p['class_name']} - {p['confidence_percentage']}")
    else:
        print(f"\n⚠️ Result Info: {result.get('message', 'No prediction available')}")
    print("=================================================================")


if __name__ == '__main__':
    main()
