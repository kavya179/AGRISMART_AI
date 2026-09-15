import urllib.request
import json

def test_environmental_modules():
    print("=== TESTING ENVIRONMENTAL MODULES (DJANGO BACKEND) ===\n")

    # 1. Smart Irrigation Test
    irrigation_payload = json.dumps({
        "soil_moisture": 32.0,
        "weather_forecast": "Sunny & Clear",
        "crop_type": "Tomato",
        "growth_stage": "Flowering"
    }).encode("utf-8")

    req_irrigation = urllib.request.Request(
        "http://localhost:8000/api/irrigation/predict/",
        data=irrigation_payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req_irrigation) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print("1. Smart Irrigation Test:")
        print("   Status:", resp.status)
        print("   Irrigation Required:", res.get("irrigation_required"))
        print("   Priority:", res.get("priority"))
        print("   Action:", res.get("recommended_action"))
        print("   Reason:", res.get("reason"))

    # 2. Weather Intelligence Test
    req_weather = urllib.request.Request(
        "http://localhost:8000/api/weather/intelligence/?location=Maharashtra&crop=Tomato&stage=Flowering",
        method="GET"
    )

    with urllib.request.urlopen(req_weather) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print("\n2. Weather Intelligence Test:")
        print("   Status:", resp.status)
        print("   Success:", res.get("success"))
        guidance = res.get("weather_intelligence", {})
        print("   Location:", guidance.get("location"))
        print("   Current Temp:", guidance.get("current_conditions", {}).get("temperature_celsius"))
        print("   Directives Count:", len(guidance.get("primary_agricultural_actions", [])))

    # 3. Sustainability Score Test
    sustainability_payload = json.dumps({
        "irrigation_method": "drip",
        "rainwater_harvesting": True,
        "moisture_sensor_timing": True,
        "organic_manure_used": True,
        "soil_tested": True,
        "mulching_or_cover_crop": True,
        "crop_residue_burned": False,
        "legume_crop_rotation": True,
        "bio_pesticides_used": True,
        "regular_disease_monitoring": True
    }).encode("utf-8")

    req_sustainability = urllib.request.Request(
        "http://localhost:8000/api/sustainability/calculate/",
        data=sustainability_payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req_sustainability) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print("\n3. Sustainability Score Test:")
        print("   Status:", resp.status)
        print("   Success:", res.get("success"))
        score_data = res.get("sustainability", {})
        print("   Total Score:", score_data.get("sustainability_score"))
        print("   Grade:", score_data.get("rating_grade"))
        print("   Tier:", score_data.get("tier_badge"))

    print("\n======================================================")

if __name__ == "__main__":
    test_environmental_modules()
