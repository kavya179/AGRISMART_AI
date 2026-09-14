"""
Image transforms interface for PyTorch datasets and inference pipelines.
"""
from .preprocess import get_image_transforms, IMAGENET_MEAN, IMAGENET_STD

def get_train_transforms(image_size=(224, 224)):
    return get_image_transforms(image_size=image_size, is_training=True)

def get_inference_transforms(image_size=(224, 224)):
    return get_image_transforms(image_size=image_size, is_training=False)
