# AgriSmart AI – System Architecture (Phase 1)

## 1. Architectural Philosophy
AgriSmart AI is designed with clean architectural separation between:
1. **AI / ML Computation Engine**: Powered by **Django + Django REST Framework** in Python. This allows direct native access to PyTorch, TorchVision, NumPy, and Scikit-Learn without clunky foreign interop.
2. **Application Data & Farmer Identity Layer**: Powered by **Node.js + Express + MongoDB**. Handles flexible JSON document stores (farmer records, multilingual preferences, soil logs) with low latency.
3. **Farmer Frontend Portal**: Powered by **React.js + Vite**. High contrast, clean visual language, mobile responsive, and optimized for farmers and field workers.

---

## 2. Port & Service Allocation Map

| Service Layer | Technology | Default Port | Primary Responsibilities |
| :--- | :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | `5173` | UI, Leaf camera capture, diagnostics visualization, agro dashboard |
| **Node.js Backend** | Express.js + Mongoose | `5000` | Farmer profiles, scan history logs, auth & MongoDB data store |
| **Django Backend** | Django + DRF | `8000` | Crop disease CV model, soil NPK recommendation, weather advisories |
| **Database** | MongoDB | `27017` | Document persistence (`agrismart_db`) |

---

## 3. Communication Flow

```
[ Farmer Browser / Mobile (Port 5173) ]
          │                           │
          │ (Disease Scan & AI Query) │ (Farmer Profile & Records)
          ▼                           ▼
[ Django DRF (Port 8000) ]     [ Node/Express (Port 5000) ]
          │                                   │
   [ ML Inference ]                           │ (Mongoose)
   [ ml/saved_models ]                        ▼
                                   [ MongoDB (Port 27017) ]
```

---

## 4. Cross-Origin Resource Sharing (CORS)
- **Django**: Configured via `django-cors-headers` allowing origins `http://localhost:5173` and `http://127.0.0.1:5173`.
- **Node.js**: Configured via `cors` middleware supporting credentialed requests from `http://localhost:5173`.
