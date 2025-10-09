@echo off
setlocal

python -m pip install --upgrade pip
pip install -r requirements.txt
python -m playwright install chromium

python render_cv.py --template templates/moderne.json --data data/resume_marlyse.json --out cv.html
python generate_pdf_from_html.py --html cv.html --out CV_Marlyse.pdf

echo PDF genere: CV_Marlyse.pdf
pause
