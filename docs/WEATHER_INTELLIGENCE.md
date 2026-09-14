# AgriSmart AI — Weather Intelligence & Agricultural Action Engine

## 1. Overview
The **AgriSmart Weather Intelligence Engine** connects directly to real-time meteorological data providers (such as the keyless **Open-Meteo Precision API**) and translates atmospheric parameters into direct, field-level agronomic actions.

Rather than presenting raw meteorological numbers that leave farmers guessing, the engine calculates risk thresholds and outputs actionable farming advisories.

---

## 2. Real-Time Meteorological Inputs Evaluated
1. **Current Temperature ($T_{current}$)** in °C
2. **Relative Humidity ($RH$)** in %
3. **Current & 48-Hour Precipitation Sum ($\Sigma P_{48h}$)** in mm
4. **Precipitation Probability ($P_{rain}$)** in %
5. **Wind Speed ($V_{wind}$)** in km/h
6. **7-Day Max & Min Temperature Trends**
7. **Farm Location Coordinates / Agro-Zone Mapping**

---

## 3. Translation of Weather Data into Actionable Directives

### A. Irrigation Actions
| Condition | Triggered Action Directive | Agronomic Reason |
|---|---|---|
| $P_{rain, 48h} \ge 50\%$ or $\Sigma P_{48h} \ge 8$ mm | **"Delay watering — rain is likely."** | Natural precipitation will recharge root-zone soil. Prevents waterlogging, root asphyxiation, and energy expenditure. |
| $T_{current} > 35^\circ\text{C}$ & $RH < 40\%$ | **"High temperature expected — check crop stress."** | High evaporative demand causes moisture stress and flower drop. Irrigate early morning and maintain mulching. |
| $P_{rain} < 20\%$ & $T_{current} \le 34^\circ\text{C}$ | **"Watering conditions look suitable."** | Normal evapotranspiration envelope; standard scheduled irrigation can proceed. |

### B. Plant Disease & Foliar Health Actions
| Condition | Triggered Action Directive | Agronomic Reason |
|---|---|---|
| $RH > 75\%$ and $18^\circ\text{C} \le T \le 30^\circ\text{C}$ | **"Monitor crop — humidity is high."** | Extended high humidity within the optimal temperature envelope facilitates rapid fungal spore germination (e.g., *Phytophthora infestans*, *Alternaria solani*). |

### C. Chemical & Organic Spraying Window
| Condition | Triggered Action Directive | Agronomic Reason |
|---|---|---|
| $V_{wind} < 12$ km/h, $P_{rain} < 30\%$, $P_{now} = 0$ | **"Foliar spraying window is favorable this morning (7:00 AM – 10:00 AM)."** | Calm morning air ensures uniform droplet deposition on leaf surfaces without wind drift or rain wash-off. |
| $V_{wind} \ge 15$ km/h or $P_{rain} \ge 40\%$ | **"Suboptimal spraying conditions — postpone foliar sprays."** | High wind velocity causes off-target chemical drift; rain risks immediate active ingredient wash-off. |

---

## 4. API Endpoints

- **`POST /api/weather/intelligence/`**: Submits farm location coordinates, crop type, and growth stage to return real-time weather and agronomic directives.
- **`GET /api/weather/intelligence/?location=Gujarat&crop=Tomato`**: Query-parameter enabled endpoint for fast widget consumption.
- **`GET /api/weather/status/`**: Health & data provider audit endpoint.
