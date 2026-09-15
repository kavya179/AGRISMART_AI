import urllib.request
import json

def test_assistant_and_agentic_advisor():
    print("=== TESTING AI ASSISTANT & AGENTIC ADVISOR MODULES ===\n")

    # 1. Test Farmer Assistant Chat in English
    chat_payload = json.dumps({
        "query": "Why are my tomato leaves turning yellow with dark spots?",
        "language": "en",
        "farmer_context": {
            "crop": "Tomato",
            "soil": "Black Soil",
            "recent_scan": "Tomato Early Blight"
        }
    }).encode("utf-8")

    req_chat = urllib.request.Request(
        "http://localhost:8000/api/assistant/chat/",
        data=chat_payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req_chat) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print("1. Farmer Assistant Chat (English):")
        print("   Status:", resp.status)
        print("   Success:", res.get("success"))
        print("   Reply:", res.get("response", {}).get("reply"))
        print("   Suggested Followups:", res.get("response", {}).get("suggested_followups"))

    # 2. Test Farmer Assistant Chat in Hindi
    chat_hi_payload = json.dumps({
        "query": "टमाटर के पत्तों पर पीले धब्बे क्यों आ रहे हैं?",
        "language": "hi",
        "farmer_context": {"crop": "Tomato"}
    }).encode("utf-8")

    req_chat_hi = urllib.request.Request(
        "http://localhost:8000/api/assistant/chat/",
        data=chat_hi_payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req_chat_hi) as resp:
        res_hi = json.loads(resp.read().decode("utf-8"))
        print("\n2. Farmer Assistant Chat (Hindi):")
        print("   Status:", resp.status)
        print("   Success:", res_hi.get("success"))
        reply_text = res_hi.get("response", {}).get("reply", "")
        print("   Reply (Safe ASCII):", reply_text.encode('ascii', 'backslashreplace').decode('ascii')[:120] + "...")

    # 3. Test Agentic Advisor 8-Stage Loop
    agentic_payload = json.dumps({
        "crop_type": "Tomato",
        "growth_stage": "Flowering",
        "soil_moisture": 64.0,
        "disease_detected": "Tomato Early Blight",
        "disease_status": "diseased",
        "weather_forecast": "Rain likely within 24 hours",
        "rain_probability": 75.0,
        "humidity": 78.0,
        "temperature": 28.0,
        "wind_speed": 9.0
    }).encode("utf-8")

    req_agentic = urllib.request.Request(
        "http://localhost:8000/api/assistant/agentic-loop/run/",
        data=agentic_payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req_agentic) as resp:
        res_agentic = json.loads(resp.read().decode("utf-8"))
        print("\n3. Agentic Advisor 8-Stage Loop:")
        print("   Status:", resp.status)
        print("   Success:", res_agentic.get("success"))
        print("   Loop Status:", res_agentic.get("decision_loop_summary", {}).get("status"))
        print("   Total Trace Stages:", len(res_agentic.get("decision_traces", [])))
        print("   Headline:", res_agentic.get("recommendation", {}).get("headline"))
        print("   Synthesized Directive:", res_agentic.get("recommendation", {}).get("synthesized_directive"))
        print("   Notification Alert:", res_agentic.get("notification", {}).get("alert_title"))

    print("\n=======================================================")

if __name__ == "__main__":
    test_assistant_and_agentic_advisor()
