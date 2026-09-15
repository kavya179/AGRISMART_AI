"""
AgriSmart AI - Model Evaluation Script
Evaluates trained checkpoint on validation/test dataset and generates Macro-F1,
Accuracy, Per-Class metrics, Confusion Matrix, and Markdown/JSON reports.
Supports both standard validation/test sets and independent field-condition test sets.
"""
import os
import sys
import json
import argparse
from pathlib import Path
import torch
from torch.utils.data import DataLoader

# Add workspace root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ml.dataset.dataset_loader import SafeImageFolder, load_class_mapping
from ml.preprocessing.preprocess import get_image_transforms
from ml.training.train import build_model
from ml.evaluation.metrics import (
    compute_comprehensive_metrics,
    save_confusion_matrix_plot,
    export_markdown_report,
)


def evaluate_model(
    model_path,
    data_dir,
    class_mapping_path=None,
    architecture='efficientnet_b0',
    batch_size=32,
    reports_dir='ml/reports',
    is_field_test=False,
):
    """
    Runs full evaluation pass on test, validation, or independent field dataset.
    """
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model_path = Path(model_path)
    reports_path = Path(reports_dir)
    reports_path.mkdir(parents=True, exist_ok=True)

    if not model_path.exists():
        raise FileNotFoundError(
            f"Model checkpoint not found at: {model_path}.\n"
            f"Train the model using python ml/train.py before running evaluation."
        )

    # 1. Load Checkpoint
    checkpoint = torch.load(str(model_path), map_location=device)
    state_dict = checkpoint.get('model_state_dict', checkpoint)
    metadata = checkpoint.get('metadata', {})
    saved_arch = metadata.get('architecture', architecture)

    # 2. Load Class Mapping
    if class_mapping_path and Path(class_mapping_path).exists():
        idx_to_class = load_class_mapping(class_mapping_path)
    elif (model_path.parent / 'class_mapping.json').exists():
        idx_to_class = load_class_mapping(model_path.parent / 'class_mapping.json')
    elif 'classes' in metadata:
        idx_to_class = {i: c for i, c in enumerate(metadata['classes'])}
    else:
        raise ValueError("No class mapping found. Please provide --class_map or place class_mapping.json alongside the model.")

    class_names = [idx_to_class[i] for i in sorted(idx_to_class.keys())]
    class_to_idx = {c: i for i, c in idx_to_class.items()}
    num_classes = len(class_names)

    # 3. Build & Load Model
    model = build_model(architecture=saved_arch, num_classes=num_classes, pretrained=False)
    model.load_state_dict(state_dict)
    model = model.to(device)
    model.eval()

    # 4. Load Evaluation Dataset with matching class mapping
    eval_transforms = get_image_transforms(image_size=(224, 224), is_training=False)
    eval_dataset = SafeImageFolder(
        str(data_dir),
        transform=eval_transforms,
        class_to_idx=class_to_idx,
    )
    eval_loader = DataLoader(
        eval_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=0,  # Safe for Windows & low-resource laptop
        pin_memory=False,
    )

    eval_type_title = "Independent Field-Condition Test" if is_field_test else "Model Evaluation Runner"

    print("=================================================================")
    print(f"AgriSmart AI - {eval_type_title}")
    print("=================================================================")
    print(f"Model Path:       {model_path}")
    print(f"Architecture:     {saved_arch}")
    print(f"Evaluation Dir:   {data_dir}")
    print(f"Total Samples:    {len(eval_dataset)}")
    print(f"Total Classes:    {num_classes}")
    print(f"Device:           {device}")
    print("=================================================================")

    # 5. Run Inference
    all_preds = []
    all_targets = []

    with torch.no_grad():
        for inputs, targets in eval_loader:
            inputs = inputs.to(device)
            outputs = model(inputs)
            _, preds = torch.max(outputs, 1)

            all_preds.extend(preds.cpu().numpy().tolist())
            all_targets.extend(targets.numpy().tolist())

    # 6. Compute Comprehensive Metrics
    metrics = compute_comprehensive_metrics(all_targets, all_preds, class_names=class_names)

    prefix = "Field Test " if is_field_test else ""
    print(f"\n--- {prefix}Evaluation Summary Results ---")
    print(f"{prefix}Overall Accuracy:  {metrics['accuracy']*100:.2f}%")
    print(f"{prefix}Macro-F1 Score:    {metrics['macro_f1']:.4f}")
    print(f"{prefix}Macro-Precision:   {metrics['macro_precision']:.4f}")
    print(f"{prefix}Macro-Recall:      {metrics['macro_recall']:.4f}")
    print(f"{prefix}Weighted-F1:       {metrics['weighted_f1']:.4f}")
    print(f"\nDetailed Per-Class Report:")
    print(metrics['classification_report_text'])

    # 7. Save Artifacts
    suffix = "_field_test" if is_field_test else ""
    json_report_file = reports_path / f'evaluation_results{suffix}.json'
    with open(json_report_file, 'w', encoding='utf-8') as f:
        json.dump(metrics, f, indent=2)
    print(f"[OK] JSON report saved to: {json_report_file}")

    cm_plot_file = reports_path / f'confusion_matrix{suffix}.png'
    save_confusion_matrix_plot(metrics['confusion_matrix'], class_names, cm_plot_file)

    md_report_file = reports_path / f'model_evaluation_report{suffix}.md'
    export_markdown_report(
        metrics=metrics,
        architecture=saved_arch,
        hyperparameters={'batch_size': batch_size},
        output_path=md_report_file,
        dataset_name="Field-Condition Dataset" if is_field_test else "PlantVillage",
    )

    return metrics


def main():
    parser = argparse.ArgumentParser(description="AgriSmart AI - Model Evaluation CLI")
    parser.add_argument("--model_path", type=str, default="ml/saved_models/best_model.pth", help="Path to trained .pth model file")
    parser.add_argument("--data_dir", type=str, required=True, help="Path to evaluation/test dataset directory")
    parser.add_argument("--class_map", type=str, default="ml/saved_models/class_mapping.json", help="Path to class_mapping.json")
    parser.add_argument("--arch", type=str, default="efficientnet_b0", help="Model architecture")
    parser.add_argument("--batch_size", type=int, default=32, help="Evaluation batch size")
    parser.add_argument("--reports_dir", type=str, default="ml/reports", help="Directory to save evaluation reports")
    parser.add_argument("--field_test", action="store_true", help="Mark as independent field-condition test run")
    args = parser.parse_args()

    evaluate_model(
        model_path=args.model_path,
        data_dir=args.data_dir,
        class_mapping_path=args.class_map,
        architecture=args.arch,
        batch_size=args.batch_size,
        reports_dir=args.reports_dir,
        is_field_test=args.field_test,
    )


if __name__ == '__main__':
    main()
