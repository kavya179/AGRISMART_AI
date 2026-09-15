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
    parser.add_argument("image_pos", nargs="?", default=None, help="Path to input crop leaf image file (positional)")
    parser.add_argument("--image", type=str, default=None, help="Path to input crop leaf image file (optional flag)")
    parser.add_argument("--model", type=str, default=None, help="Optional path to model .pth weights")
    parser.add_argument("--class_map", type=str, default=None, help="Optional path to class_mapping.json")
    parser.add_argument("--top_k", type=int, default=3, help="Number of top predictions to display")
    parser.add_argument("--json", action="store_true", help="Output raw JSON format")
    args = parser.parse_args()

    image_path = args.image or args.image_pos
    if not image_path:
        parser.print_help()
        sys.exit(1)

    predictor = CropDiseasePredictor(model_path=args.model, class_mapping_path=args.class_map)
    result = predictor.predict(image_path, top_k=args.top_k)

    if args.json:
        print(json.dumps(result, indent=2))
        return

    print("=================================================================")
    print("AgriSmart AI - Crop Leaf Diagnostic Result")
    print("=================================================================")
    print(f"Target Image:   {image_path}")
    print(f"Status:         {result.get('status')}")

    if result.get('status') == 'success':
        print(f"\nPredicted Diagnosis: {result['predicted_class']}")
        print(f"Confidence Score:    {result['confidence_percentage']} ({result['confidence']:.4f})")
        print(f"Class ID:            {result['class_id']}")
        
        if not result.get('is_confident', True):
            print(f"\n[ACTION NOTICE]      {result.get('uncertainty_guidance')}")

        print("\nTop Candidate Predictions:")
        for rank, p in enumerate(result['top_predictions'], 1):
            print(f"  {rank}. {p['class_name']} - {p['confidence_percentage']}")
    else:
        print(f"\n[INFO] Result Info: {result.get('message', 'No prediction available')}")
    print("=================================================================")


if __name__ == '__main__':
    main()
