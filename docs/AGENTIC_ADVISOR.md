# AgriSmart AI — Agentic Advisor Decision Loop & Conversational Assistant

## 1. Overview & Transparency Statement
The **AgriSmart Agentic Advisor** is an autonomous cross-module decision loop that continuously synthesizes pathology scans, root-zone soil moisture, short-term meteorological risks, and physiological growth stages into prioritized, actionable field directives.

Unlike opaque AI agents that make untraceable claims, the AgriSmart Agentic Advisor executes a **transparent, step-by-step 8-stage decision loop** where each intermediate evaluation is logged, audited, and presented clearly to the farmer and agricultural officer.

---

## 2. The 8-Stage Demonstrable Decision Loop

```
COLLECT DATA
     ↓
  ANALYSE
     ↓
CHECK WEATHER
     ↓
CHECK CROP CONDITION
     ↓
CHECK IRRIGATION
     ↓
  DECIDE
     ↓
GENERATE RECOMMENDATION
     ↓
NOTIFY FARMER
```

### Stage-by-Stage Architecture:

1. **COLLECT DATA**: Aggregates the farm's active state across all microservices:
   - Active Crop & Growth Stage ($C_{crop}, G_{stage}$)
   - Recent Disease Detection Output (Pathology class, status, confidence score)
   - Real-Time Meteorological Stream ($T^\circ\text{C}, RH\%, P_{rain}\%$, wind speed)
   - Soil Moisture Level ($SM\%$)
2. **ANALYSE**: Identifies multi-factor cross-domain agronomic risks (e.g. active sporulation risks vs incoming rain).
3. **CHECK WEATHER**: Evaluates 48-hour precipitation probability and leaf-wetness duration hazards.
4. **CHECK CROP CONDITION**: Assesses plant susceptibility based on growth stage (e.g., flowering anthesis vulnerability).
5. **CHECK IRRIGATION**: Calculates root-zone depletion against FAO-56 allowable thresholds ($\theta_{crit}$).
6. **DECIDE**: Resolves conflicting directives via a deterministic multi-variable decision matrix (e.g., pre-empting irrigation before rainfall to save power and prevent waterlogging).
7. **GENERATE RECOMMENDATION**: Produces a structured, action-oriented advisory with an execution checklist.
8. **NOTIFY FARMER**: Dispatches prioritized action alerts directly to the farmer's mobile dashboard.

---

## 3. End-to-End Automated Synthesis Example

### Input State:
* **Crop**: Tomato (*Flowering Stage*)
* **Disease Detection**: *Tomato Early Blight* (Diseased)
* **Soil Moisture**: $65\%$ (Adequate)
* **Weather Forecast**: Rain likely within 24 hours ($75\%$ probability, $14.5\text{ mm}$ expected)
* **Relative Humidity**: $78\%$

### Autonomous Decision Matrix Execution:
- **Irrigation Sub-decision**: `HALT / DELAY` (Natural precipitation incoming; avoids root hypoxia).
- **Chemical Spray Sub-decision**: `POSTPONE` (Precipitation will cause chemical wash-off and chemical wastage).
- **Sanitation Sub-decision**: `MANUAL SANITATION` (Prune lower 2-3 infected leaves before rainfall to improve canopy airflow).

### Synthesized Farmer Directive:
> **"Do not irrigate today. Monitor the affected leaves and clear drainage channels before the rain."**

#### Action Checklist:
1. *Do not irrigate today — let incoming rain supply moisture naturally.*
2. *Remove visibly spotted lower leaves before the rain shower to curb fungal spread.*
3. *Ensure field drainage ditches are unobstructed to prevent water stagnating around roots.*
4. *Re-inspect foliage 48 hours after rain ends.*

---

## 4. Grounded Conversational Assistant Guardrails

The **Farmer Assistant** operates under strict agronomic guardrails:
1. **Zero Diagnostic Hallucination**: The conversational assistant will never invent or guess a crop disease diagnosis. When asked to identify an illness, it directs the farmer to the computer-vision *Check Crop* leaf scanner.
2. **Catalog-Grounded Treatment**: When discussing diagnosed conditions, it retrieves verified precautions and organic remedies directly from `disease_detection/guidance_catalog.py`.
3. **Multilingual Fluency**: Native conversational capability in **English**, **Gujarati**, **Hindi**, and **Marathi**.
