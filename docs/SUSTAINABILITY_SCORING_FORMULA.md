# AgriSmart AI — Farm Sustainability Scoring Formula

## 1. Objective & Principle
The **AgriSmart Regenerative Sustainability Index (RSI-100)** provides a transparent, reproducible, and mathematically grounded score $(S \in [0, 100])$ representing the environmental and ecological resilience of a farm.

Every score is 100% reproducible and verifiable from defined physical farming practices, avoiding vague or greenwashed claims.

---

## 2. Mathematical Scoring Model

The aggregate Sustainability Score $S$ is calculated as:
$$S = W + R + H$$

Where:
- $W \in [0, 35]$: **Water Efficiency Score**
- $R \in [0, 35]$: **Resource & Soil Health Management Score**
- $H \in [0, 30]$: **Crop Health & Biodiversity Score**

$$\text{Maximum Possible Score } S_{max} = 35 + 35 + 30 = 100$$

---

## 3. Detailed Parameter Scoring Rules

### A. Water Efficiency ($W$, Max 35 Points)
1. **Irrigation Delivery Method ($W_{method}$)**:
   - Drip Micro-Irrigation: **+20 Pts** (Delivers water directly to the root zone, reducing groundwater loss by 40-50%).
   - Sprinkler Irrigation: **+14 Pts** (Uniform distribution, prevents excessive deep percolation).
   - Furrow / Border Irrigation: **+8 Pts** (Moderate efficiency with channel losses).
   - Flood / Basin Irrigation: **+3 Pts** (High evaporative and seepage losses).
2. **Rainwater Harvesting / Farm Pond ($W_{rain}$)**: **+9 Pts** (Captures monsoon runoff to recharge local aquifers).
3. **Moisture-Sensor / Scheduled Watering ($W_{timing}$)**: **+6 Pts** (Watering based on tensiometer/sensor readings rather than fixed timers).

$$W = \min(35, W_{method} + W_{rain} + W_{timing})$$

---

### B. Resource & Soil Health Management ($R$, Max 35 Points)
1. **Organic Manure / Vermicompost Application ($R_{organic}$)**: **+12 Pts** (Incorporate farmyard manure or vermicompost to increase Soil Organic Carbon).
2. **Soil Testing & Balanced NPK Fertilization ($R_{test}$)**: **+10 Pts** (Laboratory-verified dosage preventing excess synthetic urea).
3. **Cover Cropping / Organic Mulching ($R_{mulch}$)**: **+8 Pts** (Prevents topsoil erosion and cuts evaporation by 25%).
4. **Zero Stubble / Crop-Residue Burning ($R_{residue}$)**: **+5 Pts** (Incorporate straw into soil instead of polluting and destroying surface micro-flora).

$$R = \min(35, R_{organic} + R_{test} + R_{mulch} + R_{residue})$$

---

### C. Crop Health & Biodiversity ($H$, Max 30 Points)
1. **Legume / Pulse Crop Rotation ($H_{legume}$)**: **+12 Pts** (Biological nitrogen fixation of 30-40 kg N/ha, breaking pest cycles).
2. **Bio-Pesticides & Integrated Pest Management ($H_{bio}$)**: **+10 Pts** (Use of Neem formulations, pheromone traps, and Trichoderma).
3. **Routine Visual Disease Surveillance ($H_{monitor}$)**: **+8 Pts** (Early leaf inspection and diagnosis to minimize emergency chemical sprays).

$$H = \min(30, H_{legume} + H_{bio} + H_{monitor})$$

---

## 4. Reproducible Rating Tiers

| Score Range ($S$) | Rating Grade | Classification |
|---|---|---|
| **85 – 100** | **Grade A+** | Exemplary Regenerative Farm |
| **75 – 84** | **Grade A-** | High Sustainable Standard |
| **60 – 74** | **Grade B** | Moderate Conservation Standard |
| **45 – 59** | **Grade C** | Transitioning Farm |
| **< 45** | **Grade D** | High Input Dependency |

---

## 5. Sample Calculation (Reproducible Case)

**Farmer Profile (e.g. 78/100 Score)**:
- Drip Irrigation: $+20$
- Sensor / Smart Timing: $+6$
- Rainwater Harvesting: Not yet ($0$)
- Organic Manure / FYM: $+12$
- Laboratory Soil Tested: $+10$
- Zero Stubble Burning: $+5$
- Mulching: Not yet ($0$)
- Pulse Crop Rotation: $+12$
- Bio-Pesticides (Neem Oil): $+10$
- Routine Surveillance: $+8$ (via AgriSmart Disease Scanner)

**Calculation**:
- $W = 20 + 0 + 6 = 26 / 35$
- $R = 12 + 10 + 0 + 5 = 27 / 35$
- $H = 12 + 10 + 8 = 30 / 30$ (Max capped)
- **Total Score**: $S = 26 + 27 + 25 = 78 / 100$ (**Grade A-**)

### Output Directives:
- **"What is helping"**: Drip irrigation, organic manure, lab soil testing, pulse rotation.
- **"What can improve"**: Mulching to reduce soil evaporation, farm pond construction.
- **"Recommended action"**: *"Apply crop residue or dry straw mulching around vegetable beds to conserve 25% moisture during summer."*
