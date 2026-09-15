"""
AgriSmart AI - Model Factory
Contains model architecture creation shared by training and inference.
"""

import torch.nn as nn
from torchvision import models


def build_model(architecture='efficientnet_b0', num_classes=10, pretrained=True):
    """
    Constructs a transfer-learning model with a custom classification head.

    Supported architectures:
        - efficientnet_b0
        - resnet50
        - mobilenet_v3_large
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

    elif 'mobilenet_v3_large' in arch or 'mobilenet' in arch:
        weights = models.MobileNet_V3_Large_Weights.DEFAULT if pretrained else None
        model = models.mobilenet_v3_large(weights=weights)

        in_features = model.classifier[3].in_features

        model.classifier[3] = nn.Sequential(
            nn.Dropout(p=0.3),
            nn.Linear(in_features, num_classes),
        )

    else:
        raise ValueError(
            f"Unsupported architecture: '{architecture}'. "
            "Choose 'efficientnet_b0', 'resnet50', or 'mobilenet_v3_large'."
        )

    return model