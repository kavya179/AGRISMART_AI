# AgriSmart AI – API Documentation (Phase 3 Complete)

## 📡 Django AI / ML Backend (`http://localhost:8000`)

---

### 1. Health Check Endpoint
- **URL**: `/api/health/`
- **Method**: `GET`
- **Description**: Verifies Django service uptime, PyTorch model singleton readiness, and registered modules.
- **Success Response (`200 OK`)**:
```json
{
  "status": "healthy",
  "service": "AgriSmart AI Django REST Service",
  "timestamp": "2026-09-11T12:15:00.000000+00:00",
  "framework": "Django REST Framework",
  "debug_mode": true,
  "model_service": {
    "crop_disease_model_loaded": true,
    "architecture": "efficientnet_b0",
    "classes_count": 38
  },
  "endpoints": {
    "health": "/api/health/",
    "disease_predict": "/api/disease/predict/",
    "disease_status": "/api/disease/status/",
    "crop_recommendation": "/api/crop/recommend/",
    "irrigation": "/api/irrigation/status/",
    "weather": "/api/weather/status/"
  }
}
```

---

### 2. Crop Disease Prediction Endpoint
- **URL**: `/api/disease/predict/`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Description**: Accepts a leaf/crop image, performs validation, runs singleton model inference, and returns diagnosis with precautionary guidance.

#### Request Parameters:
| Key | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `image` | File | **Yes** | Crop leaf image file (.jpg, .jpeg, .png, .webp, .bmp, max 10MB) |

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "prediction": {
    "class": "Tomato Early Blight",
    "confidence": 0.9124,
    "status": "diseased"
  },
  "guidance": {
    "precautions": [
      "Remove visibly affected lower leaves to prevent spore dispersion.",
      "Avoid overhead sprinkler irrigation; apply water directly to the soil base.",
      "Ensure adequate plant spacing for proper airflow and sunlight penetration.",
      "Apply copper-based organic fungicide early in the morning."
    ]
  }
}
```

#### Healthy Crop Response (`200 OK`):
```json
{
  "success": true,
  "prediction": {
    "class": "Tomato Healthy",
    "confidence": 0.9658,
    "status": "healthy"
  },
  "guidance": {
    "precautions": [
      "No pathogen symptoms detected; continue routine monitoring.",
      "Maintain balanced soil nutrition (NPK) and moisture levels.",
      "Adhere to integrated pest management (IPM) best practices."
    ]
  }
}
```

#### Validation Error Response (`400 Bad Request`):
```json
{
  "success": false,
  "error": "Invalid request payload.",
  "details": {
    "image": [
      "Unsupported file format '.txt'. Allowed formats: .bmp, .jpeg, .jpg, .png, .webp."
    ]
  }
}
```

#### Model Not Loaded Response (`503 Service Unavailable`):
```json
{
  "success": false,
  "error": "Model is not ready. Train the model using 'python ml/train.py' before querying inference."
}
```

---

### 3. Crop Disease Status Endpoint
- **URL**: `/api/disease/status/`
- **Method**: `GET`
- **Description**: Returns model readiness and supported classes list.

---

## 🛠️ Testing Instructions & Examples

### Using `curl` (Linux / macOS / Git Bash)
```bash
# 1. Health Check
curl -X GET http://localhost:8000/api/health/

# 2. Disease Prediction
curl -X POST http://localhost:8000/api/disease/predict/ \
  -F "image=@/path/to/leaf_photo.jpg"
```

### Using PowerShell (Windows)
```powershell
# 1. Health Check
Invoke-RestMethod -Uri "http://localhost:8000/api/health/" -Method Get

# 2. Disease Prediction
$form = @{
    image = Get-Item -Path "c:\path\to\leaf_photo.jpg"
}
Invoke-RestMethod -Uri "http://localhost:8000/api/disease/predict/" -Method Post -Form $form
```

### Using Postman
1. Set Request Type to **`POST`**.
2. URL: `http://localhost:8000/api/disease/predict/`.
3. Go to the **Body** tab $\rightarrow$ select **form-data**.
4. Key: `image` (Change dropdown on the right of key from *Text* to *File*).
5. Value: Browse and select your crop leaf image.
6. Click **Send**.
