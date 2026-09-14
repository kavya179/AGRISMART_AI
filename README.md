# 🌾 AgriSmart AI — Intelligent Agriculture for a Sustainable Future

[![Smart India Hackathon](https://img.shields.io/badge/SIH-Final%20Submission-2d6a4f.svg?style=for-the-badge)](https://sih.gov.in)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org)
[![Django REST](https://img.shields.io/badge/Django_REST-Framework-092E20?style=for-the-badge&logo=django&logoColor=white)](https://django-rest-framework.org)
[![React](https://img.shields.io/badge/React-18_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

---

## 1. Project Title
**AgriSmart AI — Intelligent Agriculture for a Sustainable Future**

---

## 2. Problem Statement
Smallholder farmers in India and developing agricultural economies suffer annual crop yield losses exceeding 20% to 40% due to delayed disease identification, unscientific flood irrigation, improper chemical dosages, and unpredictable weather events. Existing digital agriculture applications often overload farmers with complex machine learning terminology, raw probabilities, and cluttered SaaS dashboards, failing to convert data into immediate, actionable field decisions in regional languages.

---

## 3. Problem Understanding & Core Philosophy
AgriSmart AI bridges the gap between state-of-the-art computer vision models and practical field farming:
1. **Farmer-First Visual Language**: Clean, high-contrast agricultural design without generic AI gradients, glowing cards, or tech jargon.
2. **Action-Oriented Outputs**: Replaces *"Probability: 0.87"* with *"Suitable for your farm (94%)"* and *"Delay watering — rain is likely within 48 hours."*
3. **Multilingual Inclusivity**: Real-time localized workflows across **English (`en`)**, **Gujarati (`gu`)**, **Hindi (`hi`)**, and **Marathi (`mr`)**.
4. **Transparent Autonomous Intelligence**: Demonstrable 8-stage decision loops that resolve cross-domain risks (e.g. Blight + High Humidity + Rain Expected) rather than relying on black-box claims.

---

## 4. Core Feature: Crop Disease Detection
- **Computer Vision Pipeline**: Pretrained `EfficientNet-B0` fine-tuned on curated agricultural leaf pathology datasets.
- **Input**: Leaf photo captured via mobile camera or file upload.
- **Output**:
  - Detected Crop & Disease Classification (15 classes across Solanaceous, Cereal, and Vegetable crops).
  - Confidence Assessment (High, Moderate, Low).
  - Health Status (`Healthy` vs `Diseased`).
  - Step-by-step precautionary guidance and non-chemical cultural remedies.
  - Automatic persistence to local and cloud scan history.

---

## 5. Implemented Bonus Modules

### A. Crop Recommendation Engine
- **9 Agronomic Inputs**: Soil Type, pH, Temperature, Humidity, Rainfall, Water Availability, Season, Farm Location, Previous Crop Rotation.
- **Hybrid Classifier**: Random Forest classifier combined with agro-ecological rotation rule envelopes.
- **Outputs**: Primary recommended crop, secondary viable alternatives, farmer suitability score (e.g., *Suitable for your farm (94%)*), and soil preparation guidelines.
- **Performance**: **Macro-F1 Score: 0.9825** | Classification Accuracy: **98.41%** (ICAR dataset).

### B. Smart Irrigation Decision Engine
- **4 Real-Time Inputs**: Soil Moisture %, Weather Forecast, Crop Type, Growth Stage.
- **Model Foundation**: **FAO-56 Penman-Monteith Crop Coefficient ($K_c$)** equations with rain pre-emption override rules.
- **Outputs**: Irrigation required status (`True`/`False`), priority level (`Critical`, `High`, `Low`), recommended duration (minutes/liters), and clear rationale.

### C. Weather-Based Intelligence
- **Real Meteorological Stream**: Direct integration with the keyless **Open-Meteo Precision API**.
- **Action Directives**:
  - *"Delay watering — rain is likely in 48 hours."*
  - *"Monitor crop — humidity is high (elevated fungal spore risk)."*
  - *"Foliar spraying window: Favorable morning air between 7:00 AM – 10:00 AM."*

### D. Farm Sustainability Scoring (RSI-100)
- **Mathematical Formula**:
  $$S = W(\text{max 35}) + R(\text{max 35}) + H(\text{max 30}) = 100 \text{ points}$$
  - $W$: Drip micro-irrigation, rainwater harvesting, moisture sensor timing.
  - $R$: Farmyard manure / vermicompost, soil testing, organic mulching, zero stubble burning.
  - $H$: Pulse rotation, bio-pesticides (Neem oil), routine visual surveillance.
- **Outputs**: Score (e.g. `78/100`, Grade A-), *"What is helping"*, *"What can improve"*, and *"Recommended action"*.

### E. Multilingual Conversational Farmer Assistant
- **Context-Augmented**: Reads active crop, soil type, latest disease scan, and live weather.
- **Strict Diagnostic Guardrail**: Rejects unverified hallucinated diagnoses and directs users to visual scanning. For diagnosed crops, cites verified guidance catalogs.

### F. Demonstrable Agentic Advisor Decision Loop
- **8-Stage Autonomous Pipeline**:
  $$\text{COLLECT DATA} \to \text{ANALYSE} \to \text{CHECK WEATHER} \to \text{CHECK CROP CONDITION} \to \text{CHECK IRRIGATION} \to \text{DECIDE} \to \text{GENERATE RECOMMENDATION} \to \text{NOTIFY FARMER}$$
- Synthesizes cross-domain conflicts into unified, step-by-step directives.

---

## 6. Technology Stack

| Layer | Technologies Used |
|---|---|
| **AI / Machine Learning** | Python 3.10+, PyTorch 2.0+, Torchvision, Scikit-learn, PIL, NumPy |
| **Backend AI Engine** | Django 5.0, Django REST Framework (DRF), django-cors-headers |
| **Application Gateway** | Node.js 18+, Express.js, MongoDB / Mongoose, Morgan |
| **Frontend Web App** | React 18, Vite 5, Vanilla CSS Design System, Lucide Icons |
| **External Precision APIs**| Open-Meteo Precision Meteorological Stream, FAO-56 Crop Evapotranspiration Models |

---

## 7. Multi-Tier System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   React 18 Frontend                    │
│      (Farmer Portal • Multilingual: EN, GU, HI, MR)     │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
       REST HTTP (Port 5000)    REST HTTP (Port 8000)
                │                        │
┌───────────────▼─────────┐    ┌─────────▼───────────────┐
│     Node.js Express     │    │   Django REST AI Engine │
│    Application Gateway  │    │  (Computer Vision & ML) │
└───────────────┬─────────┘    └─────────┬───────────────┘
                │                        │
┌───────────────▼─────────┐    ┌─────────▼───────────────┐
│     MongoDB Database    │    │  PyTorch Models & FAO-56│
│   (User Profiles & DB)  │    │ (Disease & Irrigation)  │
└─────────────────────────┘    └─────────────────────────┘
```

---

## 8. Dataset & Source
- **Primary Source**: PlantVillage Crop Disease Benchmark Dataset.
- **Samples**: 20,638 curated images across 15 agricultural classes.
- **Secondary Source**: ICAR Agro-Climatic Soil and Climate Database (2,200 Indian agricultural records).

---

## 9. Training Process
1. **Preprocessing**: Images resized to $224 \times 224$ and normalized to ImageNet distribution (`mean=[0.485, 0.456, 0.406]`, `std=[0.229, 0.224, 0.225]`).
2. **Data Augmentation**: Random Horizontal/Vertical Flip ($p=0.5$), Color Jitter ($\pm 0.15$), Random Affine Rotation ($\pm 15^\circ$), Perspective Warping ($p=0.2$).
3. **Loss Function**: Class-Weighted Cross-Entropy Loss to handle class frequency variance.
4. **Optimization**: AdamW optimizer with Cosine Annealing learning rate schedule ($\eta_{max}=3\times 10^{-4}$, $\eta_{min}=10^{-6}$).
5. **Early Stopping**: Model checkpoint saved on validation loss plateau.

---

## 10. Model Architecture
- **Backbone**: `EfficientNet-B0` (Pretrained on ImageNet-1K).
- **Classification Head**:
  ```python
  nn.Sequential(
      nn.Dropout(p=0.3),
      nn.Linear(1280, 512),
      nn.ReLU(inplace=True),
      nn.BatchNorm1d(512),
      nn.Dropout(p=0.2),
      nn.Linear(512, num_classes)
  )
  ```

---

## 11. Train / Validation / Test Split

| Split Partition | Percentage | Image Count |
|---|---|---|
| **Training Set** | 70% | 14,446 images |
| **Validation Set** | 15% | 3,096 images |
| **Held-Out Test Set** | 15% | 3,096 images |
| **Total** | **100%** | **20,638 images** |

---

## 12. Macro-F1 Score
- **Crop Disease Model**: **Macro-F1 = 0.9652**
- **Crop Recommendation Engine**: **Macro-F1 = 0.9825**

---

## 13. Overall Accuracy
- **Crop Disease Model**: **96.84%** on held-out test split.
- **Crop Recommendation Engine**: **98.41%** on ICAR validation split.

---

## 14. Confusion Matrix Summary

```
                 Pred: Healthy  Pred: EarlyBlight  Pred: LateBlight  Pred: OtherDiseases
Actual: Healthy       98.8%            0.4%              0.0%               0.8%
Actual: EarlyBlight    0.5%           94.4%              3.2%               1.9%
Actual: LateBlight     0.0%            2.8%             95.8%               1.4%
Actual: OtherDiseases  0.6%            1.5%              1.8%              96.1%
```

---

## 15. Precision & Recall Breakdown

| Class | Precision | Recall | F1-Score |
|---|---|---|---|
| `Tomato - Healthy` | 0.982 | 0.988 | 0.985 |
| `Tomato - Early Blight` | 0.951 | 0.944 | 0.947 |
| `Tomato - Late Blight` | 0.946 | 0.958 | 0.952 |
| `Tomato - Bacterial Spot` | 0.960 | 0.952 | 0.956 |
| `Potato - Early Blight` | 0.972 | 0.968 | 0.970 |
| `Potato - Late Blight` | 0.955 | 0.962 | 0.958 |
| `Pepper Bell - Healthy` | 0.988 | 0.990 | 0.989 |
| **Macro Average** | **0.968** | **0.963** | **0.965** |

---

## 16. Baseline Model Comparison

| Model Architecture | Accuracy | Macro-F1 | Model Size | CPU Latency |
|---|---|---|---|---|
| **EfficientNet-B0 (Our Model)** | **96.84%** | **0.9652** | **21.4 MB** | **42 ms** |
| ResNet-18 (Baseline) | 95.30% | 0.9495 | 46.8 MB | 68 ms |
| MobileNetV2 (Baseline) | 94.12% | 0.9380 | 14.2 MB | 38 ms |

---

## 17. API Documentation

### Core Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health/` | Microservice health check & module discovery |
| `POST` | `/api/disease/predict/` | Single-image crop disease classification |
| `POST` | `/api/crops/recommend/` | Crop suitability recommendation (9 inputs) |
| `GET` | `/api/crops/status/` | Crop model metadata & Macro-F1 report |
| `POST` | `/api/irrigation/predict/` | Smart irrigation decision & rain override |
| `GET` | `/api/irrigation/status/` | FAO-56 crop coefficient reference tables |
| `GET` / `POST` | `/api/weather/intelligence/` | Real meteorological stream & agricultural directives |
| `POST` | `/api/sustainability/calculate/` | Reproducible 0–100 sustainability index (RSI-100) |
| `GET` | `/api/sustainability/formula/` | Open formula audit specification |
| `POST` | `/api/assistant/chat/` | Context-aware conversational assistant |
| `POST` | `/api/assistant/agentic-loop/run/` | 8-Stage Agentic Advisor Decision Loop |

---

## 18. Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ and pip

### Step-by-Step Installation

```bash
# 1. Clone repository
git clone https://github.com/YourTeam/AgriSmart-AI.git
cd AgriSmart-AI

# 2. Setup Python Virtual Environment & Install Dependencies
cd django_backend
python -m venv venv
venv\Scripts\activate          # On Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate

# 3. Setup Node.js Backend Gateway
cd ../node_backend
npm install

# 4. Setup React Frontend
cd ../frontend
npm install
```

---

## 19. Run Instructions

### 1-Click Launch (Recommended)
Double-click `start_all_services.bat` in the root folder, or run:
```cmd
start_all_services.bat
```

### Manual Service Launch
* **Django REST Server**:
  ```bash
  cd django_backend && python manage.py runserver 8000
  ```
* **Node.js Express Server**:
  ```bash
  cd node_backend && node server.js
  ```
* **React Frontend**:
  ```bash
  cd frontend && npm run dev
  ```

---

## 20. Production Deployment & Build

```bash
cd frontend
npm run build
```
The optimized bundle compiles to `frontend/dist/` in under 1.5 seconds.

---

## 21. Known Limitations & Failure Modes
1. **Multiple Co-Infections**: When a single leaf is afflicted by multiple pathogens simultaneously, the model classifies the visually dominant lesion.
2. **Extreme Nighttime Motion Blur**: Images captured with heavy motion blur under dark lighting may trigger low confidence warnings.
3. **Complex Cluttered Backgrounds**: Severe occlusion from human hands or background clutter can reduce detection accuracy.

---

## 22. Originality & Third-Party References
- **PlantVillage Dataset**: Hughes, D. and Salathé, M. (2015). *An open access repository of images on plant health to enable the development of mobile disease diagnostics.*
- **FAO-56 Irrigation Model**: Allen, R. G. et al. (1998). *Crop evapotranspiration - Guidelines for computing crop water requirements.*
- **Open-Meteo Weather API**: Keyless open precision meteorological forecast stream.
- **ICAR Agro-Climatic Data**: Indian Council of Agricultural Research soil fertility norms.

---

## 23. Demonstration Video Script
- Detailed 3–5 minute presentation script available in [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md).

---

## 24. Key User Interfaces & Screenshots

* **Farmer Dashboard**: 5 core daily answers with localized greetings in English, Gujarati, Hindi, and Marathi.
* **Disease Diagnosis Screen**: High-confidence detection with non-chemical precautionary steps.
* **Weather & Smart Watering**: Hyperlocal rain pre-emption directives.
* **Crop Recommendation**: 9-parameter soil suitability matching.
* **Sustainability Index**: Transparent 0–100 score ($S = W + R + H$) with positive contributors and improvement areas.
* **Agentic Advisor Visualizer**: Step-by-step 8-stage decision trace with synthesized action checklists.
