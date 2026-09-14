"""
AgriSmart AI - Disease Detection Serializers & Input Validation
"""
from rest_framework import serializers
from PIL import Image, UnidentifiedImageError
from pathlib import Path

ALLOWED_IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.bmp'}
ALLOWED_CONTENT_TYPES = {'image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/x-ms-bmp'}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB limit


class DiseaseImageUploadSerializer(serializers.Serializer):
    """
    Validates uploaded crop leaf image files before passing to model inference.
    """
    image = serializers.ImageField(
        required=True,
        error_messages={
            'required': 'Please provide an image file using the "image" key.',
            'invalid_image': 'Upload a valid image file. The file you submitted is either not an image or corrupted.'
        }
    )

    def validate_image(self, file_obj):
        # 1. Size Validation
        if file_obj.size > MAX_FILE_SIZE_BYTES:
            max_mb = MAX_FILE_SIZE_BYTES // (1024 * 1024)
            raise serializers.ValidationError(
                f"File size exceeds maximum allowed limit of {max_mb} MB."
            )

        if file_obj.size == 0:
            raise serializers.ValidationError("The uploaded file is empty (0 bytes).")

        # 2. Extension Validation
        ext = Path(file_obj.name).suffix.lower()
        if ext not in ALLOWED_IMAGE_EXTENSIONS:
            raise serializers.ValidationError(
                f"Unsupported file format '{ext}'. Allowed formats: {', '.join(sorted(ALLOWED_IMAGE_EXTENSIONS))}."
            )

        # 3. Content-Type Validation
        content_type = getattr(file_obj, 'content_type', '').lower()
        if content_type and content_type not in ALLOWED_CONTENT_TYPES:
            raise serializers.ValidationError(
                f"Invalid MIME type '{content_type}'. Must be a valid image."
            )

        # 4. Integrity / Corruption Validation via PIL
        try:
            # Reset pointer
            file_obj.seek(0)
            with Image.open(file_obj) as img:
                img.verify()
            file_obj.seek(0)
        except (UnidentifiedImageError, OSError, Exception) as err:
            raise serializers.ValidationError(
                "Image file appears corrupted or unreadable. Please upload a fresh photograph."
            )

        return file_obj
