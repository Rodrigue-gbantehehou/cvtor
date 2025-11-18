#!/usr/bin/env python3
import os
import json
from pathlib import Path
from typing import Optional, Dict, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from jinja2 import Environment, FileSystemLoader, select_autoescape

from services.export_docx import export_docx
from services.generate_pdf_from_html import html_to_pdf
from auth.routes_auth import router as auth_router
from services.routes_resumes import router as resumes_router
from services.routes_stripe import router as stripe_router

BASE_DIR = Path(__file__).parent.resolve()
TEMPLATES_DIR = BASE_DIR / "templates"
DATA_DIR = BASE_DIR / "data"

app = FastAPI(title="CV Generator API", version="1.0.0")

app.include_router(auth_router)
app.include_router(resumes_router)
app.include_router(stripe_router)

# === CORS ===
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5000").split(",")
if os.getenv("REPLIT_DEV_DOMAIN"):
    allowed_origins.append(f"https://{os.getenv('REPLIT_DEV_DOMAIN')}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Static ===
app.mount("/static", StaticFiles(directory=str(BASE_DIR)), name="static")

# --- MODELS ---
class PreviewRequest(BaseModel):
    template_name: str
    data: Dict[str, Any]

class ExportRequest(BaseModel):
    template_name: str
    data: Dict[str, Any]
    out: Optional[str] = None

class GenerateRequest(BaseModel):
    prompt: Optional[str] = None
    data: Optional[Dict[str, Any]] = None
    role: Optional[str] = None

# --- UTILS ---
def load_template_env(template_name: str):
    # Normalize to lowercase for folder lookup
    template_folder = template_name.lower()
    tpl_dir = TEMPLATES_DIR / template_folder
    if not tpl_dir.exists():
        raise HTTPException(status_code=404, detail=f"Template '{template_name}' introuvable")
    return Environment(
        loader=FileSystemLoader(str(tpl_dir)),
        autoescape=select_autoescape(["html", "jinja2"])
    )

def render_html(template_name: str, data: Dict[str, Any]) -> str:
    # Normalize template name to lowercase for folder lookup
    template_folder = template_name.lower()
    env = load_template_env(template_folder)
    template_file = "template.jinja2"
    template = env.get_template(template_file)

    css_path = TEMPLATES_DIR / template_folder / "style.css"
    css_content = css_path.read_text(encoding="utf-8") if css_path.exists() else ""

    # Extract @import statements from CSS and convert to <link> tags
    import re
    font_links = []
    css_without_imports = css_content
    
    # Find all @import url(...) statements
    import_pattern = r"@import\s+url\(['\"]?([^'\"]+)['\"]?\);"
    imports = re.findall(import_pattern, css_content)
    for url in imports:
        font_links.append(f'<link rel="stylesheet" href="{url}" />')
    
    # Remove @import statements from CSS
    css_without_imports = re.sub(import_pattern, '', css_content)

    # Load template metadata for rendering
    template_json_path = TEMPLATES_DIR / template_folder / "template.json"
    template_metadata = {}
    if template_json_path.exists():
        import json
        template_metadata = json.loads(template_json_path.read_text(encoding="utf-8"))

    html_body = template.render(data=data, template=template_metadata)
    font_links_html = '\n  '.join(font_links)
    html_full = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>CV Preview</title>
  {font_links_html}
  <style>{css_without_imports}</style>
</head>
<body>
{html_body}
</body>
</html>"""
    return html_full

# === ROUTES ===

# Liste des modèles disponibles
@app.get("/templates")
def list_templates():
    templates = []
    for d in TEMPLATES_DIR.iterdir():
        if d.is_dir() and (d / "template.json").exists():
            templates.append(d.name)
    return {"templates": templates}

# Récupère le JSON d’un modèle
@app.get("/templates/{name}")
def get_template(name: str):
    tpl_dir = TEMPLATES_DIR / name
    json_file = tpl_dir / "template.json"
    if not json_file.exists():
        raise HTTPException(status_code=404, detail=f"Template '{name}' not found")
    return JSONResponse(json.loads(json_file.read_text(encoding="utf-8")))

@app.post("/preview/html")
def preview_html(req: PreviewRequest):
    try:
        html = render_html(req.template_name, req.data)
        return {"html": html}
    except Exception as e:
        import traceback
        error_detail = f"{str(e)}\n{traceback.format_exc()}"
        print(f"Preview error: {error_detail}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/export/pdf")
def export_pdf(req: ExportRequest):
    import uuid
    import re
    
    try:
        # Générer un ID unique pour cette requête
        request_id = str(uuid.uuid4())
        
        # Rendre le HTML
        html = render_html(req.template_name, req.data)
        
        # Fichier HTML temp unique
        tmp_html = BASE_DIR / f"_tmp_render_{request_id}.html"
        tmp_html.write_text(html, encoding="utf-8")

        # Toujours générer un nom de fichier unique (ignorer req.out pour la sécurité)
        # Cela empêche les collisions et les fuites de données entre utilisateurs
        safe_filename = f"CV_{request_id}.pdf"
        
        # Construire le chemin de sortie sécurisé (toujours dans BASE_DIR)
        out_pdf = BASE_DIR / safe_filename
        
        # Générer le PDF
        html_to_pdf(tmp_html, out_pdf)
        
        # Nettoyer le fichier temp
        tmp_html.unlink(missing_ok=True)

        url = f"/static/{out_pdf.name}" if out_pdf.exists() else None
        return {"file": str(out_pdf), "url": url}
    except Exception as e:
        import traceback
        error_detail = f"{str(e)}\n{traceback.format_exc()}"
        print(f"PDF export error: {error_detail}")
        # Nettoyer en cas d'erreur
        if 'tmp_html' in locals():
            tmp_html.unlink(missing_ok=True)
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/export/docx")
def export_docx_endpoint(req: ExportRequest):
    import uuid
    try:
        # Generate unique filename to prevent path traversal
        request_id = str(uuid.uuid4())
        safe_filename = f"CV_{request_id}.docx"
        out_path = BASE_DIR / safe_filename
        
        tmp_json = BASE_DIR / f"_tmp_data_{request_id}.json"
        tmp_json.write_text(json.dumps(req.data, ensure_ascii=False, indent=2), encoding="utf-8")

        export_docx(tmp_json, out_path)
        tmp_json.unlink(missing_ok=True)

        url = f"/static/{out_path.name}" if out_path.exists() else None
        return {"file": str(out_path), "url": url}
    except Exception as e:
        if 'tmp_json' in locals():
            tmp_json.unlink(missing_ok=True)
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/generate")
async def generate_content(req: GenerateRequest):
    """
    Génère du contenu de CV en utilisant l'API gratuite de Hugging Face.
    Modèle utilisé: mistralai/Mistral-7B-Instruct-v0.2
    API gratuite avec limite de quelques centaines de requêtes par heure
    """
    
    base = req.data or {}
    fallback = {
        "profile": base.get("profile") or {"name": "Prénom Nom", "title": req.role or "Candidat"},
        "summary": base.get("summary") or "Professionnel(le) motivé(e) avec des résultats mesurables.",
        "experience": base.get("experience") or [],
        "education": base.get("education") or [],
        "skills": base.get("skills") or {"groups": []},
    }

    try:
        from huggingface_hub import InferenceClient
        
        # Utiliser l'API gratuite de Hugging Face avec le token
        hf_token = os.getenv("HF_TOKEN")
        client = InferenceClient(token=hf_token) if hf_token else InferenceClient()
        
        # Construire le prompt basé sur les données existantes
        user_description = req.prompt or f"Poste: {req.role or 'Candidat professionnel'}"
        
        prompt = f"""Génère un CV professionnel complet en français au format JSON valide.

Description du candidat: {user_description}

Le JSON doit avoir cette structure exacte:
{{
  "profile": {{
    "name": "Prénom Nom",
    "title": "Titre professionnel",
    "contacts": {{
      "envelope": "email@exemple.com",
      "phone": "+33 6 12 34 56 78",
      "map-marker-alt": "Ville, Pays",
      "linkedin": "linkedin.com/in/profil"
    }}
  }},
  "summary": "Résumé professionnel impactant de 2-3 phrases avec des compétences clés",
  "experience": [
    {{
      "company": "Nom de l'entreprise",
      "role": "Poste occupé",
      "start": "Mois Année",
      "end": "Mois Année",
      "bullets": [
        "Réalisation quantifiable avec impact mesurable",
        "Projet technique avec résultats concrets",
        "Initiative avec amélioration mesurée"
      ]
    }}
  ],
  "education": [
    {{
      "school": "Nom de l'établissement",
      "degree": "Diplôme obtenu",
      "year": "Année"
    }}
  ],
  "skills": {{
    "groups": [
      {{
        "label": "Développement",
        "items": ["Python", "JavaScript", "React", "Node.js"]
      }},
      {{
        "label": "Outils",
        "items": ["Git", "Docker", "AWS", "CI/CD"]
      }}
    ]
  }}
}}

Réponds UNIQUEMENT avec le JSON valide, sans texte avant ou après."""

        # Utiliser le modèle Mistral-7B-Instruct-v0.2 (gratuit)
        response = client.chat.completions.create(
            model="mistralai/Mistral-7B-Instruct-v0.2",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=1500,
            temperature=0.7
        )
        
        generated_text = response.choices[0].message.content.strip()
        
        # Extraire le JSON de la réponse (parfois il y a du texte autour)
        json_start = generated_text.find('{')
        json_end = generated_text.rfind('}') + 1
        if json_start >= 0 and json_end > json_start:
            json_text = generated_text[json_start:json_end]
            generated_data = json.loads(json_text)
        else:
            generated_data = json.loads(generated_text)
        
        # Fusionner avec les données existantes
        result = {
            "profile": generated_data.get("profile", fallback["profile"]),
            "summary": generated_data.get("summary", fallback["summary"]),
            "experience": generated_data.get("experience", fallback["experience"]),
            "education": generated_data.get("education", fallback["education"]),
            "skills": generated_data.get("skills", fallback["skills"]),
        }
        
        return {"data": result, "source": "huggingface", "message": "✅ Contenu généré avec succès par l'IA Hugging Face (gratuit)"}
    except Exception as e:
        error_msg = str(e)
        print(f"[generate] Hugging Face error: {error_msg}")
        import traceback
        traceback.print_exc()
        
        # Retourner un message d'erreur explicite avec fallback
        return {
            "data": fallback, 
            "source": "stub", 
            "error": error_msg,
            "message": f"⚠️ Génération IA indisponible: {error_msg[:100]}... Données d'exemple utilisées."
        }

@app.get("/", response_class=HTMLResponse)
def root():
    return HTMLResponse("<h1>✅ CV Generator API</h1><p><a href='/docs'>Swagger UI</a></p>")

@app.get("/healthz")
def healthz():
    return JSONResponse({"status": "ok"})
