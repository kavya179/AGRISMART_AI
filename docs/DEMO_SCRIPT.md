# AgriSmart AI — 3 to 5 Minute Live Judging Demonstration Script

This presentation script guides judges and evaluators through the complete live demonstration sequence of AgriSmart AI.

---

## Demonstration Sequence (0:00 – 5:00)

### 0:00 – 0:20 | 1. The Core Agricultural Challenge
- **Visual**: Landing Page (`http://localhost:5173`)
- **Spoken Keynote**:
  > *"Every season, smallholder farmers lose 20% to 40% of their crop yields to undetected fungal diseases, inaccurate watering, and unscientific fertilizer use. Generic SaaS dashboards and complex AI probabilities don't help farmers in the field. AgriSmart AI solves this by converting precision computer vision and meteorological intelligence into simple, immediate agricultural actions in English, Gujarati, Hindi, and Marathi."*

---

### 0:20 – 0:45 | 2. Farmer Sign In & Dashboard
- **Action**: Enter mobile number, demo sign in, view the Dashboard.
- **Key Features to Show**:
  - Greeting in chosen language: *Namaste / નમસ્તે, Krisha Patel*.
  - Five core daily questions answered at a glance:
    1. *Is my crop healthy?*
    2. *Does my crop need water?*
    3. *What is the weather today?*
    4. *What should I do today?*
    5. *Are there disease warnings in my district?*

---

### 0:45 – 1:30 | 3. Leaf Photo Upload & Real-Time Computer Vision
- **Action**: Click *"Check Your Crop"*, upload or drag a leaf photo (e.g. `Tomato Early Blight`).
- **Key Features to Show**:
  - Drag-and-drop dropzone with mobile camera capture support.
  - Image size and format validation.
  - Transparent loading state without freezing the UI.

---

### 1:30 – 2:00 | 4. Diagnostic Result & Actionable Guidance
- **Action**: View the Diagnosis Screen.
- **Key Features to Show**:
  - Diagnosis badge: **Tomato Early Blight (High Confidence: 94%)**.
  - Farmer-friendly explanations: *"What this means"*, *"What you should do today"*, *"When to check again"*.
  - Step-by-step non-chemical precautions (pruning lower leaves, avoiding overhead irrigation).
  - Diagnostic record automatically saved to persistent history.

---

### 2:00 – 2:30 | 5. Hyperlocal Weather & Smart Irrigation
- **Action**: Open *"Weather & Watering"* tools.
- **Key Features to Show**:
  - Real meteorological stream from Open-Meteo API.
  - Agricultural action conversion: **"Delay watering — rain is likely in 48 hours."**
  - FAO-56 crop coefficient calculation and morning spraying window.

---

### 2:30 – 3:00 | 6. Best Crop Recommendation
- **Action**: Open *"Soil & Crop Choice"*.
- **Key Features to Show**:
  - 9 agro-climatic inputs (Soil type, pH, rainfall, temperature, humidity, water access, season, location, rotation crop).
  - Calculated output: **Suitable for your farm (94%)**, primary crop, secondary options, and soil management tips.

---

### 3:00 – 3:30 | 7. Farm Sustainability Score
- **Action**: Open *"Soil Health & Sustainability"*.
- **Key Features to Show**:
  - Score: **78 / 100 (Grade A-)**.
  - Transparent formula: $S = W(35) + R(35) + H(30)$.
  - Exact breakdown: *"What is helping"* (drip, vermicompost, pulse rotation) vs *"What can improve"* (straw mulching).

---

### 3:30 – 4:00 | 8. Conversational Farmer Assistant
- **Action**: Open *"Ask Assistant"*.
- **Key Features to Show**:
  - Switch language to Gujarati (`gu`) or Hindi (`hi`).
  - Ask: *"How to make neem spray?"* or *"What should I do for tomato blight?"*.
  - Show the diagnostic guardrail: Assistant cites verified guidance catalogs and refuses to hallucinate un-scanned diseases.

---

### 4:00 – 4:30 | 9. Demonstrable Agentic Advisor Decision Loop
- **Action**: Click *"Agentic Decision Loop (8 Stages)"*.
- **Key Features to Show**:
  - Click *"Trigger Decision Loop"*.
  - Show the live 8-stage decision trace:
    `COLLECT DATA → ANALYSE → CHECK WEATHER → CHECK CROP CONDITION → CHECK IRRIGATION → DECIDE → GENERATE RECOMMENDATION → NOTIFY FARMER`
  - Synthesized unified directive: *"Do not irrigate today. Monitor the affected leaves and clear drainage channels."*

---

### 4:30 – 5:00 | 10. Impact & Conclusion
- **Spoken Keynote**:
  > *"AgriSmart AI is not a mockup or a generic AI SaaS shell. It is a fully functional, multi-tier precision platform combining PyTorch computer vision, FAO-56 irrigation models, and real meteorological streams into practical decisions for Indian agriculture."*
