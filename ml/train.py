"""
AgriSmart AI - Model Training Entrypoint
Usage:
  python ml/train.py --data_dir ml/dataset/crop_diseases --arch efficientnet_b0 --epochs 15
"""
import sys
from pathlib import Path

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ml.training.train import main

if __name__ == '__main__':
    main()
