@echo off
echo ===================================================
echo   Starting AgriSmart AI - Django REST AI Backend
echo   Port: 8000
echo ===================================================
cd django_backend
python manage.py migrate
python manage.py runserver 8000
pause
