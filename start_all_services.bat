@echo off
echo ================================================================
echo   AgriSmart AI – Launching All 3 Full-Stack Services
echo ================================================================
echo.
echo [1/3] Launching Django REST Backend (AI Engine @ Port 8000)...
start "AgriSmart AI - Django Backend (Port 8000)" cmd /k "cd django_backend && python manage.py migrate && python manage.py runserver 8000"

timeout /t 2 >nul

echo [2/3] Launching Node.js Express Backend (App Data @ Port 5000)...
start "AgriSmart AI - Node.js Express Backend (Port 5000)" cmd /k "cd node_backend && node server.js"

timeout /t 2 >nul

echo [3/3] Launching React Vite Frontend (Client @ Port 5173)...
start "AgriSmart AI - React Frontend (Port 5173)" cmd /k "cd frontend && npm run dev"

echo.
echo ================================================================
echo   All 3 services are starting!
echo   - Frontend:        http://localhost:5173
echo   - Node.js API:     http://localhost:5000/api/health
echo   - Django REST API: http://localhost:8000/api/health/
echo ================================================================
pause
