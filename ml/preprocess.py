"""
AgriSmart AI - Preprocessing & Dataset Validation Entrypoint
Usage:
  python ml/preprocess.py --data_dir ml/dataset/crop_diseases
"""
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ml.preprocessing.preprocess import main

if __name__ == '__main__':
    main()
