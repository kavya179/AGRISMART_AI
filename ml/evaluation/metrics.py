"""
AgriSmart AI - Evaluation Metrics & Report Generation Module
Computes Macro-F1, Accuracy, Precision, Recall, Confusion Matrix, and generates reports.
"""
import json
from pathlib import Path
import numpy as np
from sklearn.metrics import (
    accuracy_score,
    f1_score,
    precision_score,
    recall_score,
    classification_report,
    confusion_matrix,
)


def compute_comprehensive_metrics(y_true, y_pred, class_names=None):
    """
    Computes all standard computer vision classification metrics.

    Returns:
        dict: Full metrics dictionary.
    """
    acc = accuracy_score(y_true, y_pred)
    macro_f1 = f1_score(y_true, y_pred, average='macro', zero_division=0)
    macro_prec = precision_score(y_true, y_pred, average='macro', zero_division=0)
    macro_rec = recall_score(y_true, y_pred, average='macro', zero_division=0)
    weighted_f1 = f1_score(y_true, y_pred, average='weighted', zero_division=0)

    # Per-class classification report
    report_dict = classification_report(
        y_true,
        y_pred,
        target_names=class_names,
        output_dict=True,
        zero_division=0,
    )
    report_text = classification_report(
        y_true,
        y_pred,
        target_names=class_names,
        zero_division=0,
    )

    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred)

    return {
        'accuracy': float(acc),
        'macro_f1': float(macro_f1),
        'macro_precision': float(macro_prec),
        'macro_recall': float(macro_rec),
        'weighted_f1': float(weighted_f1),
        'total_samples': len(y_true),
        'per_class_report': report_dict,
        'classification_report_text': report_text,
        'confusion_matrix': cm.tolist(),
        'class_names': class_names or [],
    }


def save_confusion_matrix_plot(cm, class_names, output_path):
    """
    Renders and saves a confusion matrix visualization image.
    """
    try:
        import matplotlib.pyplot as plt
        import itertools

        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        cm_arr = np.array(cm)
        fig, ax = plt.subplots(figsize=(max(8, len(class_names) * 0.8), max(6, len(class_names) * 0.8)))
        im = ax.imshow(cm_arr, interpolation='nearest', cmap=plt.cm.Greens)
        ax.figure.colorbar(im, ax=ax)

        ax.set(
            xticks=np.arange(cm_arr.shape[1]),
            yticks=np.arange(cm_arr.shape[0]),
            xticklabels=class_names,
            yticklabels=class_names,
            title='AgriSmart AI - Crop Disease Confusion Matrix',
            ylabel='True Crop Disease Label',
            xlabel='Predicted Crop Disease Label',
        )

        plt.setp(ax.get_xticklabels(), rotation=45, ha="right", rotation_mode="anchor")

        thresh = cm_arr.max() / 2.0
        for i, j in itertools.product(range(cm_arr.shape[0]), range(cm_arr.shape[1])):
            ax.text(
                j, i, format(cm_arr[i, j], 'd'),
                ha="center", va="center",
                color="white" if cm_arr[i, j] > thresh else "black",
                fontsize=9
            )

        fig.tight_layout()
        plt.savefig(output_path, dpi=200, bbox_inches='tight')
        plt.close()
        print(f"Confusion matrix plot saved to: {output_path}")
    except Exception as e:
        print(f"Note: Could not save matplotlib plot ({e}). Confusion matrix is preserved in JSON report.")


def export_markdown_report(metrics, architecture, hyperparameters, output_path, dataset_name="PlantVillage"):
    """
    Generates a student & reviewer-friendly Markdown evaluation report.
    """
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    class_names = metrics.get('class_names', [])
    report_dict = metrics.get('per_class_report', {})

    rows = []
    for cls in class_names:
        if cls in report_dict:
            c_data = report_dict[cls]
            rows.append(
                f"| {cls} | {c_data['precision']:.4f} | {c_data['recall']:.4f} | {c_data['f1-score']:.4f} | {int(c_data['support'])} |"
            )

    table_rows = "\n".join(rows) if rows else "| No class details available | - | - | - | - |"

    md_content = f"""# AgriSmart AI - Model Evaluation Report

**Target Domain:** Crop Disease Detection (Mandatory Core Feature)
**Evaluation Type:** Real Benchmark Run

---

## 1. Executive Summary

| Metric | Benchmark Score |
| :--- | :--- |
| **Macro-F1 Score** | **{metrics['macro_f1']:.4f}** |
| **Overall Accuracy** | **{metrics['accuracy']*100:.2f}%** |
| **Macro-Precision** | **{metrics['macro_precision']:.4f}** |
| **Macro-Recall** | **{metrics['macro_recall']:.4f}** |
| **Evaluated Samples** | **{metrics['total_samples']}** |

---

## 2. Dataset & Split Configuration
- **Dataset Source**: {dataset_name}
- **Input Resolution**: 224 x 224 pixels (RGB)
- **Normalization**: ImageNet Standard (`mean=[0.485, 0.456, 0.406]`, `std=[0.229, 0.224, 0.225]`)
- **Data Augmentation**: Random Horizontal/Vertical Flip, Random Rotation (+/- 15 deg), Color Jitter

---

## 3. Model Architecture & Hyperparameters
- **Backbone Architecture**: `{architecture}` (Transfer Learning from ImageNet)
- **Optimization Algorithm**: `{hyperparameters.get('optimizer', 'AdamW')}`
- **Initial Learning Rate**: `{hyperparameters.get('lr', 0.001)}`
- **Batch Size**: `{hyperparameters.get('batch_size', 32)}`
- **Imbalance Handling**: Inverse Class Frequency Weighted Cross-Entropy Loss

---

## 4. Per-Class Diagnostic Performance

| Class Name | Precision | Recall | F1-Score | Support (Samples) |
| :--- | :--- | :--- | :--- | :--- |
{table_rows}

---

## 5. Limitations & Edge Case Considerations

1. **Illumination Variability**: Field photos taken in intense sunlight or deep shadows may reduce feature clarity compared to laboratory conditions.
2. **Multiple Pathogens**: Leaves with simultaneous bacterial and fungal infections are classified based on the dominant visual symptom.
3. **Background Clutter**: Soil, hands, or weeds in the image background can introduce noise; center-cropping or isolating the leaf improves diagnostic confidence.
"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md_content)

    print(f"Markdown evaluation report generated at: {output_path}")
