"""
AgriSmart AI - Crop Disease Model Training Pipeline
Transfer Learning training script using pretrained CNN architectures (EfficientNet-B0 / ResNet-50).
"""
import os
import sys
import time
import argparse
import json
from pathlib import Path

import torch
import torch.nn as nn
from torchvision import models
from sklearn.metrics import f1_score, accuracy_score

# Add workspace root to sys.path for robust imports
BASE_DIR = Path(__file__).resolve().parent.parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ml.dataset.dataset_loader import get_data_loaders, save_class_mapping
from ml.training.callbacks import EarlyStopping, ModelCheckpoint, MetricHistoryTracker


def build_model(architecture='efficientnet_b0', num_classes=10, pretrained=True):
    """
    Constructs a transfer-learning model with customized classification head.

    Supported architectures:
      - 'efficientnet_b0': Lightweight compound-scaled CNN (~5.3M params, fast & accurate).
      - 'resnet50': Deep residual network (~25.6M params, strong visual representation).
      - 'mobilenet_v3_large': Ultra-lightweight mobile architecture (~5.4M params).
    """
    arch = architecture.lower().replace('-', '_')

    if 'efficientnet_b0' in arch:
        weights = models.EfficientNet_B0_Weights.DEFAULT if pretrained else None
        model = models.efficientnet_b0(weights=weights)
        in_features = model.classifier[1].in_features
        model.classifier[1] = nn.Sequential(
            nn.Dropout(p=0.3),
            nn.Linear(in_features, num_classes),
        )
    elif 'resnet50' in arch:
        weights = models.ResNet50_Weights.DEFAULT if pretrained else None
        model = models.resnet50(weights=weights)
        in_features = model.fc.in_features
        model.fc = nn.Sequential(
            nn.Dropout(p=0.3),
            nn.Linear(in_features, num_classes),
        )
    elif 'mobilenet' in arch:
        weights = models.MobileNet_V3_Large_Weights.DEFAULT if pretrained else None
        model = models.mobilenet_v3_large(weights=weights)
        in_features = model.classifier[3].in_features
        model.classifier[3] = nn.Sequential(
            nn.Dropout(p=0.3),
            nn.Linear(in_features, num_classes),
        )
    else:
        raise ValueError(f"Unsupported architecture: '{architecture}'. Choose 'efficientnet_b0', 'resnet50', or 'mobilenet_v3_large'.")

    return model


def train_one_epoch(model, dataloader, criterion, optimizer, device):
    """Executes a single training epoch."""
    model.train()
    running_loss = 0.0
    all_preds = []
    all_targets = []

    for inputs, targets in dataloader:
        inputs = inputs.to(device)
        targets = targets.to(device)

        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, targets)
        loss.backward()
        optimizer.step()

        running_loss += loss.item() * inputs.size(0)
        _, preds = torch.max(outputs, 1)

        all_preds.extend(preds.cpu().numpy())
        all_targets.extend(targets.cpu().numpy())

    total_samples = len(all_targets)
    epoch_loss = running_loss / total_samples if total_samples > 0 else 0.0
    epoch_acc = accuracy_score(all_targets, all_preds) if total_samples > 0 else 0.0

    return epoch_loss, epoch_acc


def validate_epoch(model, dataloader, criterion, device):
    """Evaluates the model on validation data."""
    model.eval()
    running_loss = 0.0
    all_preds = []
    all_targets = []

    with torch.no_grad():
        for inputs, targets in dataloader:
            inputs = inputs.to(device)
            targets = targets.to(device)

            outputs = model(inputs)
            loss = criterion(outputs, targets)

            running_loss += loss.item() * inputs.size(0)
            _, preds = torch.max(outputs, 1)

            all_preds.extend(preds.cpu().numpy())
            all_targets.extend(targets.cpu().numpy())

    total_samples = len(all_targets)
    val_loss = running_loss / total_samples if total_samples > 0 else 0.0
    val_acc = accuracy_score(all_targets, all_preds) if total_samples > 0 else 0.0
    val_macro_f1 = f1_score(all_targets, all_preds, average='macro', zero_division=0) if total_samples > 0 else 0.0

    return val_loss, val_acc, val_macro_f1, all_targets, all_preds


def train(
    data_dir,
    architecture='efficientnet_b0',
    epochs=15,
    batch_size=32,
    lr=0.001,
    patience=5,
    val_split=0.2,
    save_dir='ml/saved_models',
    reports_dir='ml/reports',
    use_class_weights=True,
    freeze_backbone_epochs=0,
    seed=42,
):
    """
    Main training routine.
    """
    torch.manual_seed(seed)
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print("=================================================================")
    print("AgriSmart AI - Crop Disease Model Training")
    print("=================================================================")
    print(f"Device:           {device}")
    print(f"Dataset Dir:      {data_dir}")
    print(f"Architecture:     {architecture}")
    print(f"Target Epochs:    {epochs}")
    print(f"Batch Size:       {batch_size}")
    print(f"Learning Rate:    {lr}")
    print(f"Save Directory:   {save_dir}")
    print("=================================================================")

    save_path = Path(save_dir)
    reports_path = Path(reports_dir)
    save_path.mkdir(parents=True, exist_ok=True)
    reports_path.mkdir(parents=True, exist_ok=True)

    # 1. Load Data
    data_info = get_data_loaders(
        data_dir=data_dir,
        batch_size=batch_size,
        val_split=val_split,
        seed=seed,
    )
    train_loader = data_info['train_loader']
    val_loader = data_info['val_loader']
    classes = data_info['classes']
    idx_to_class = data_info['idx_to_class']
    num_classes = len(classes)

    # 2. Save dynamic class mapping
    class_map_file = save_path / 'class_mapping.json'
    save_class_mapping(idx_to_class, class_map_file)

    # 3. Build Model
    model = build_model(architecture=architecture, num_classes=num_classes, pretrained=True)
    model = model.to(device)

    # 4. Setup Loss Function with Class Weights (if enabled)
    if use_class_weights and data_info['class_weights'] is not None:
        weights_tensor = data_info['class_weights'].to(device)
        criterion = nn.CrossEntropyLoss(weight=weights_tensor)
        print("  [INFO] Class imbalance handling: Inverse frequency weights applied to Loss.")
    else:
        criterion = nn.CrossEntropyLoss()

    # 5. Optimizer & LR Scheduler
    optimizer = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='max', factor=0.5, patience=2
    )

    # 6. Callbacks
    best_model_file = save_path / 'best_model.pth'
    checkpoint = ModelCheckpoint(filepath=best_model_file, monitor='macro_f1', mode='max')
    early_stopping = EarlyStopping(patience=patience, mode='max')
    history_tracker = MetricHistoryTracker(log_path=reports_path / 'training_history.json')

    # 7. Training Loop
    start_time = time.time()
    print("\nStarting Training...")

    for epoch in range(1, epochs + 1):
        epoch_start = time.time()
        current_lr = optimizer.param_groups[0]['lr']

        # Handle backbone freezing
        if epoch <= freeze_backbone_epochs:
            for name, param in model.named_parameters():
                if 'classifier' not in name and 'fc' not in name:
                    param.requires_grad = False
        elif epoch == freeze_backbone_epochs + 1 and freeze_backbone_epochs > 0:
            for param in model.parameters():
                param.requires_grad = True
            print("  [Warmup Complete] Unfroze backbone layers for full fine-tuning.")

        train_loss, train_acc = train_one_epoch(model, train_loader, criterion, optimizer, device)
        val_loss, val_acc, val_macro_f1, _, _ = validate_epoch(model, val_loader, criterion, device)

        scheduler.step(val_macro_f1)
        history_tracker.update(train_loss, train_acc, val_loss, val_acc, val_macro_f1, current_lr)

        elapsed = time.time() - epoch_start
        print(
            f"Epoch [{epoch:02d}/{epochs:02d}] ({elapsed:.1f}s) "
            f"| Train Loss: {train_loss:.4f} Acc: {train_acc*100:.2f}% "
            f"| Val Loss: {val_loss:.4f} Acc: {val_acc*100:.2f}% "
            f"| Val Macro-F1: {val_macro_f1:.4f} "
            f"| LR: {current_lr:.6f}"
        )

        checkpoint.check_and_save(
            current_value=val_macro_f1,
            model=model,
            optimizer=optimizer,
            epoch=epoch,
            extra_metadata={
                'architecture': architecture,
                'num_classes': num_classes,
                'classes': classes,
                'val_accuracy': val_acc,
                'val_macro_f1': val_macro_f1,
            }
        )

        if early_stopping(val_macro_f1, model):
            print(f"Early stopping triggered at epoch {epoch}.")
            break

    total_time = time.time() - start_time
    print(f"\n[OK] Training Completed in {total_time/60:.2f} minutes.")
    print(f"[OK] Best Model Checkpoint: {best_model_file}")
    print(f"[OK] Class Mapping:         {class_map_file}")

    return {
        'model_path': str(best_model_file),
        'class_map_path': str(class_map_file),
        'best_macro_f1': checkpoint.best_value,
        'classes': classes,
    }


def main():
    parser = argparse.ArgumentParser(description="AgriSmart AI - Crop Disease Model Training")
    parser.add_argument("--data_dir", type=str, default="ml/dataset/crop_diseases", help="Path to dataset directory")
    parser.add_argument("--arch", type=str, default="efficientnet_b0", choices=["efficientnet_b0", "resnet50", "mobilenet_v3_large"], help="CNN architecture")
    parser.add_argument("--epochs", type=int, default=15, help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=32, help="Batch size")
    parser.add_argument("--lr", type=float, default=0.001, help="Initial learning rate")
    parser.add_argument("--patience", type=int, default=5, help="Early stopping patience")
    parser.add_argument("--save_dir", type=str, default="ml/saved_models", help="Directory to save model checkpoints")
    parser.add_argument("--reports_dir", type=str, default="ml/reports", help="Directory to save training logs")
    args = parser.parse_args()

    train(
        data_dir=args.data_dir,
        architecture=args.arch,
        epochs=args.epochs,
        batch_size=args.batch_size,
        lr=args.lr,
        patience=args.patience,
        save_dir=args.save_dir,
        reports_dir=args.reports_dir,
    )


if __name__ == '__main__':
    main()
