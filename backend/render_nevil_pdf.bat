@echo off
setlocal

python -m pip install --upgrade pip
pip install -r requirements.txt
python -m playwright install chromium

python render_cv.py --template templates/classique.json --data data/resume_nevil.json --out cv_nevil_render.html
python generate_pdf_from_html.py --html cv_nevil_render.html --out CV_Paqui_Nevil_Ezechias.pdf

echo PDF genere: CV_Paqui_Nevil_Ezechias.pdf
pause
