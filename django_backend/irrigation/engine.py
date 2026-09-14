"""
AgriSmart AI - Smart Irrigation & Water Decision Engine
Based on FAO-56 Evapotranspiration & Crop Coefficient (Kc) Guidelines.
Computes precise irrigation priorities and actionable farmer advice.
"""

# FAO-56 Crop Specific Moisture & Coefficient Profiles
CROP_IRRIGATION_PROFILES = {
    "Tomato": {
        "moisture_thresholds": {"Seedling": 60, "Vegetative": 50, "Flowering": 55, "Maturity": 45},
        "kc_coefficients": {"Seedling": 0.6, "Vegetative": 0.85, "Flowering": 1.15, "Maturity": 0.8},
        "water_sensitivity": "High during flowering and fruit setting.",
        "duration_minutes": 45,
        "method": "Drip Irrigation (localized root zone)"
    },
    "Potato": {
        "moisture_thresholds": {"Seedling": 55, "Vegetative": 50, "Flowering": 60, "Maturity": 40},
        "kc_coefficients": {"Seedling": 0.5, "Vegetative": 0.75, "Flowering": 1.15, "Maturity": 0.75},
        "water_sensitivity": "Critical during tuber initiation; avoid excess water before harvest.",
        "duration_minutes": 40,
        "method": "Furrow / Drip Irrigation"
    },
    "Wheat": {
        "moisture_thresholds": {"Seedling": 50, "Vegetative": 45, "Flowering": 50, "Maturity": 35},
        "kc_coefficients": {"Seedling": 0.4, "Vegetative": 0.8, "Flowering": 1.15, "Maturity": 0.4},
        "water_sensitivity": "Critical at Crown Root Initiation (CRI) and grain filling.",
        "duration_minutes": 60,
        "method": "Sprinkler / Border Strip"
    },
    "Rice (Paddy)": {
        "moisture_thresholds": {"Seedling": 70, "Vegetative": 75, "Flowering": 80, "Maturity": 50},
        "kc_coefficients": {"Seedling": 1.05, "Vegetative": 1.10, "Flowering": 1.20, "Maturity": 0.9},
        "water_sensitivity": "Requires shallow standing water during tillering and panicle initiation.",
        "duration_minutes": 90,
        "method": "Basin / Flood Irrigation"
    },
    "Cotton": {
        "moisture_thresholds": {"Seedling": 45, "Vegetative": 40, "Flowering": 50, "Maturity": 30},
        "kc_coefficients": {"Seedling": 0.45, "Vegetative": 0.75, "Flowering": 1.15, "Maturity": 0.65},
        "water_sensitivity": "Water stress during boll formation leads to shedding; avoid waterlogging.",
        "duration_minutes": 50,
        "method": "Drip / Alternate Furrow"
    },
    "Maize (Corn)": {
        "moisture_thresholds": {"Seedling": 50, "Vegetative": 45, "Flowering": 60, "Maturity": 40},
        "kc_coefficients": {"Seedling": 0.4, "Vegetative": 0.8, "Flowering": 1.20, "Maturity": 0.6},
        "water_sensitivity": "Extremely sensitive during tasseling and silking.",
        "duration_minutes": 50,
        "method": "Furrow / Drip"
    }
}


def compute_irrigation_decision(
    soil_moisture=62.0,
    weather_forecast="Partly Sunny",
    crop_type="Tomato",
    growth_stage="Flowering"
):
    """
    Evaluates soil moisture, weather forecast, crop type, and growth stage
    to determine if irrigation is required, its priority, recommended action, and reason.
    """
    # Normalize inputs
    crop_profile = CROP_IRRIGATION_PROFILES.get(crop_type, CROP_IRRIGATION_PROFILES["Tomato"])
    stage_key = "Flowering" if "Flowering" in growth_stage else "Vegetative" if "Vegetative" in growth_stage else "Seedling" if "Seedling" in growth_stage else "Maturity"

    threshold = crop_profile["moisture_thresholds"].get(stage_key, 50)
    kc = crop_profile["kc_coefficients"].get(stage_key, 1.0)
    duration = crop_profile["duration_minutes"]
    method = crop_profile["method"]

    weather_lower = weather_forecast.lower()
    is_rain_forecast = "rain" in weather_lower or "shower" in weather_lower or "storm" in weather_lower

    # Rule 1: Rain is forecast within next 24 hours -> Always delay watering
    if is_rain_forecast:
        return {
            "success": True,
            "irrigation_required": False,
            "priority": "None / Delay",
            "recommended_action": "Delay watering",
            "reason": "Rain is likely within the next 24 hours. Natural precipitation will replenish soil moisture and avoid waterlogging.",
            "metrics": {
                "current_moisture": f"{soil_moisture}%",
                "critical_threshold": f"{threshold}%",
                "crop_stage": f"{crop_type} ({growth_stage})",
                "crop_coefficient_kc": kc,
                "suggested_method": method
            }
        }

    # Rule 2: Soil moisture is below critical threshold -> Needs irrigation
    if soil_moisture < threshold:
        deficit = threshold - soil_moisture
        if deficit >= 20:
            priority = "Immediate (High)"
            action = f"Irrigate for {duration} minutes immediately in the early morning (6:00 AM - 8:30 AM)"
            reason = f"Soil moisture ({soil_moisture}%) is critically below the threshold ({threshold}%) during the moisture-sensitive {growth_stage} stage."
        else:
            priority = "Moderate"
            action = f"Irrigate for {max(30, int(duration * 0.75))} minutes within the next 24 hours"
            reason = f"Soil moisture ({soil_moisture}%) is slightly below the target level ({threshold}%). Gentle watering is recommended."

        return {
            "success": True,
            "irrigation_required": True,
            "priority": priority,
            "recommended_action": action,
            "reason": reason,
            "metrics": {
                "current_moisture": f"{soil_moisture}%",
                "critical_threshold": f"{threshold}%",
                "crop_stage": f"{crop_type} ({growth_stage})",
                "crop_coefficient_kc": kc,
                "suggested_method": method
            }
        }

    # Rule 3: Soil moisture is optimal or high -> No watering needed
    return {
        "success": True,
        "irrigation_required": False,
        "priority": "None",
        "recommended_action": "No watering needed today",
        "reason": f"Current soil moisture ({soil_moisture}%) is well above the {threshold}% requirement for {crop_type} in {growth_stage} stage.",
        "metrics": {
            "current_moisture": f"{soil_moisture}%",
            "critical_threshold": f"{threshold}%",
            "crop_stage": f"{crop_type} ({growth_stage})",
            "crop_coefficient_kc": kc,
            "suggested_method": method
        }
    }
