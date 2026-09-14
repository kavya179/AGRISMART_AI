"""
AgriSmart AI - Model Evaluation Entrypoint
Usage:
  python ml/evaluate.py --model_path ml/saved_models/best_model.pth --data_dir ml/dataset/test
"""
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ml.evaluation.evaluate import main

if __name__ == '__main__':
    main()
