@echo off
setlocal

REM Setup environment and run FastAPI server
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Install Playwright browser if not already installed
python -m playwright install chromium

REM Load backend secrets from .env if present (HF_API_KEY, HF_MODEL_URL)
if exist .env (
  for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
    if /I "%%A"=="HF_API_KEY" set HF_API_KEY=%%B
    if /I "%%A"=="HF_MODEL_URL" set HF_MODEL_URL=%%B
  )
)

echo HF_API_KEY is %HF_API_KEY:~0,6%****** (hidden)
if defined HF_MODEL_URL echo HF_MODEL_URL is %HF_MODEL_URL%
echo Starting FastAPI on http://localhost:8000 ...
uvicorn api:app --host 0.0.0.0 --port 8000 --reload
