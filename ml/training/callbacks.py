"""
AgriSmart AI - Training Callbacks & Model Checkpointing Module
Includes EarlyStopping, ModelCheckpoint, and MetricHistoryTracker.
"""
import copy
import json
import torch
from pathlib import Path


class EarlyStopping:
    """
    Early stopping callback to stop training when a monitored metric stops improving.
    """
    def __init__(self, patience=5, min_delta=0.001, mode='max'):
        self.patience = patience
        self.min_delta = min_delta
        self.mode = mode
        self.counter = 0
        self.best_score = None
        self.early_stop = False
        self.best_weights = None

    def __call__(self, current_score, model):
        if self.best_score is None:
            self.best_score = current_score
            self.best_weights = copy.deepcopy(model.state_dict())
            return False

        if self.mode == 'max':
            improved = current_score > (self.best_score + self.min_delta)
        else:
            improved = current_score < (self.best_score - self.min_delta)

        if improved:
            self.best_score = current_score
            self.best_weights = copy.deepcopy(model.state_dict())
            self.counter = 0
            return False
        else:
            self.counter += 1
            print(f"  [EarlyStopping] No improvement for {self.counter}/{self.patience} epochs (Best: {self.best_score:.4f})")
            if self.counter >= self.patience:
                self.early_stop = True
                print("  [EarlyStopping] Patience reached. Triggering early stop.")
                return True
            return False

    def restore_best_weights(self, model):
        if self.best_weights is not None:
            model.load_state_dict(self.best_weights)
            print("  [EarlyStopping] Restored best model weights.")


class ModelCheckpoint:
    """
    Saves best model checkpoint weights to disk when validation metric improves.
    """
    def __init__(self, filepath, monitor='macro_f1', mode='max'):
        self.filepath = Path(filepath)
        self.filepath.parent.mkdir(parents=True, exist_ok=True)
        self.monitor = monitor
        self.mode = mode
        self.best_value = -float('inf') if mode == 'max' else float('inf')

    def check_and_save(self, current_value, model, optimizer=None, epoch=None, extra_metadata=None):
        if self.mode == 'max':
            is_better = current_value > self.best_value
        else:
            is_better = current_value < self.best_value

        if is_better:
            prev = self.best_value
            self.best_value = current_value
            
            save_payload = {
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'best_metric_name': self.monitor,
                'best_metric_value': current_value,
                'metadata': extra_metadata or {},
            }
            if optimizer:
                save_payload['optimizer_state_dict'] = optimizer.state_dict()

            torch.save(save_payload, str(self.filepath))
            print(f"  [CHECKPOINT] Saved! {self.monitor}: {prev:.4f} -> {current_value:.4f} -> {self.filepath}")
            return True
        return False


class MetricHistoryTracker:
    """
    Records training and validation metrics per epoch and exports history to JSON.
    """
    def __init__(self, log_path=None):
        self.log_path = Path(log_path) if log_path else None
        self.history = {
            'train_loss': [],
            'train_acc': [],
            'val_loss': [],
            'val_acc': [],
            'val_macro_f1': [],
            'lr': [],
        }

    def update(self, train_loss, train_acc, val_loss, val_acc, val_macro_f1, lr):
        self.history['train_loss'].append(float(train_loss))
        self.history['train_acc'].append(float(train_acc))
        self.history['val_loss'].append(float(val_loss))
        self.history['val_acc'].append(float(val_acc))
        self.history['val_macro_f1'].append(float(val_macro_f1))
        self.history['lr'].append(float(lr))

        if self.log_path:
            self.log_path.parent.mkdir(parents=True, exist_ok=True)
            with open(self.log_path, 'w', encoding='utf-8') as f:
                json.dump(self.history, f, indent=2)
