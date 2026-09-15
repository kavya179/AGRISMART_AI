import urllib.request
import json
from PIL import Image
import io

def test_disease_api():
    print("=== TESTING REAL DJANGO DISEASE PREDICTION API ===")

    # 1. Test Service Status
    req_status = urllib.request.Request("http://localhost:8000/api/disease/status/", method="GET")
    with urllib.request.urlopen(req_status) as resp:
        status_data = json.loads(resp.read().decode("utf-8"))
        print("\n1. GET /api/disease/status/ Response:")
        print(json.dumps(status_data, indent=2))

    # 2. Test Prediction with a Green Leaf Image
    img = Image.new("RGB", (224, 224), color=(34, 139, 34))
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format="JPEG")
    img_bytes = img_byte_arr.getvalue()

    boundary = "----WebKitFormBoundaryAGRISMART789"
    delimiter = f"--{boundary}\r\n".encode("utf-8")
    header = 'Content-Disposition: form-data; name="image"; filename="healthy_leaf.jpg"\r\nContent-Type: image/jpeg\r\n\r\n'.encode("utf-8")
    footer = f"\r\n--{boundary}--\r\n".encode("utf-8")
    body = delimiter + header + img_bytes + footer

    req_pred = urllib.request.Request(
        "http://localhost:8000/api/disease/predict/",
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST"
    )

    with urllib.request.urlopen(req_pred) as resp:
        pred_data = json.loads(resp.read().decode("utf-8"))
        print("\n2. POST /api/disease/predict/ Response:")
        print(json.dumps(pred_data, indent=2))

    print("\n=== VERIFICATION SUCCESSFUL ===")

if __name__ == "__main__":
    test_disease_api()
