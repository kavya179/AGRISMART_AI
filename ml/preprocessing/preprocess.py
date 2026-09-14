"""
AgriSmart AI - Image Preprocessing & Validation Module
Handles image validation, corrupt file detection, resizing, and transform creation.
"""
import os
import sys
import argparse
from pathlib import Path
from PIL import Image, UnidentifiedImageError

SUPPORTED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.bmp', '.webp'}

# Standard ImageNet normalization statistics
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]


def validate_image_file(image_path):
    """
    Validates that an image file exists, has a supported extension,
    can be parsed by PIL, and is not truncated or corrupted.

    Returns:
        (bool, str): (is_valid, message_or_error)
    """
    path = Path(image_path)
    if not path.exists():
        return False, f"File does not exist: {image_path}"
    
    if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
        return False, f"Unsupported file extension '{path.suffix}'. Supported: {SUPPORTED_EXTENSIONS}"
    
    if path.stat().st_size == 0:
        return False, "File is 0 bytes (empty file)"
    
    try:
        with Image.open(path) as img:
            img.verify()  # Verify file integrity
        # Re-open to verify decoding and convert RGB
        with Image.open(path) as img:
            img.convert('RGB')
        return True, "Image is valid"
    except (UnidentifiedImageError, OSError, Exception) as e:
        return False, f"Corrupted or invalid image: {str(e)}"


def scan_and_clean_dataset(dataset_dir, remove_corrupt=False):
    """
    Scans a dataset directory structure for invalid, corrupt, or zero-byte images.
    
    Returns:
        dict: Summary of scanned, valid, and invalid image counts.
    """
    dataset_path = Path(dataset_dir)
    if not dataset_path.exists():
        raise FileNotFoundError(f"Dataset directory not found: {dataset_dir}")
    
    total_scanned = 0
    valid_count = 0
    corrupt_files = []

    print(f"Scanning dataset directory: {dataset_path} ...")

    for root, _, files in os.walk(dataset_path):
        for f in files:
            file_path = Path(root) / f
            if file_path.suffix.lower() in SUPPORTED_EXTENSIONS:
                total_scanned += 1
                is_valid, reason = validate_image_file(file_path)
                if is_valid:
                    valid_count += 1
                else:
                    corrupt_files.append((str(file_path), reason))
                    if remove_corrupt:
                        try:
                            file_path.unlink()
                            print(f"  [REMOVED] {file_path} -> {reason}")
                        except Exception as del_err:
                            print(f"  [ERROR REMOVING] {file_path}: {del_err}")

    summary = {
        'total_scanned': total_scanned,
        'valid_images': valid_count,
        'corrupt_images': len(corrupt_files),
        'corrupt_list': corrupt_files,
    }

    print("\nDataset Scan Summary:")
    print(f"  - Total images scanned: {total_scanned}")
    print(f"  - Valid images:         {valid_count}")
    print(f"  - Corrupt / Invalid:    {len(corrupt_files)}")

    return summary


def get_image_transforms(image_size=(224, 224), is_training=True):
    """
    Builds TorchVision transforms pipeline for training (with augmentation)
    or evaluation/inference (deterministic resize + normalization).
    """
    try:
        from torchvision import transforms
    except ImportError:
        raise ImportError("torchvision is required for transforms. Run: pip install torchvision")

    if is_training:
        return transforms.Compose([
            transforms.Resize((int(image_size[0] * 1.14), int(image_size[1] * 1.14))),
            transforms.RandomCrop(image_size),
            transforms.RandomHorizontalFlip(p=0.5),
            transforms.RandomVerticalFlip(p=0.2),
            transforms.RandomRotation(degrees=15),
            transforms.ColorJitter(brightness=0.15, contrast=0.15, saturation=0.15),
            transforms.ToTensor(),
            transforms.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
        ])
    else:
        return transforms.Compose([
            transforms.Resize(image_size),
            transforms.ToTensor(),
            transforms.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
        ])


def main():
    parser = argparse.ArgumentParser(description="AgriSmart AI - Image Preprocessing & Dataset Validation CLI")
    parser.add_argument("--data_dir", type=str, default="ml/dataset", help="Path to dataset root folder")
    parser.add_argument("--clean", action="store_true", help="Automatically remove corrupt or unreadable image files")
    args = parser.parse_args()

    scan_and_clean_dataset(args.data_dir, remove_corrupt=args.clean)


if __name__ == "__main__":
    main()
