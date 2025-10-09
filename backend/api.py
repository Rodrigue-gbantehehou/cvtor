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

from export_docx import export_docx
from generate_pdf_from_html import html_to_pdf

BASE_DIR = Path(__file__).parent.resolve()
TEMPLATES_DIR = BASE_DIR / "templates"
DATA_DIR = BASE_DIR / "data"

app = FastAPI(title="CV Generator API", version="1.0.0")

# === CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

    # Load template metadata for rendering
    template_json_path = TEMPLATES_DIR / template_folder / "template.json"
    template_metadata = {}
    if template_json_path.exists():
        import json
        template_metadata = json.loads(template_json_path.read_text(encoding="utf-8"))

    html_body = template.render(data=data, template=template_metadata)
    html_full = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>CV Preview</title>
  <style>{css_content}</style>
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
async def export_pdf(req: ExportRequest):
    try:
        html = render_html(req.template_name, req.data)
        tmp_html = BASE_DIR / "_tmp_render.html"
        tmp_html.write_text(html, encoding="utf-8")

        out_pdf = BASE_DIR / (req.out or "CV_preview.pdf")
        await html_to_pdf(tmp_html, out_pdf)
        tmp_html.unlink(missing_ok=True)

        url = f"/static/{out_pdf.name}" if out_pdf.exists() else None
        return {"file": str(out_pdf), "url": url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/export/docx")
def export_docx_endpoint(req: ExportRequest):
    try:
        out_path = BASE_DIR / (req.out or "CV_preview.docx")
        tmp_json = BASE_DIR / "_tmp_data.json"
        tmp_json.write_text(json.dumps(req.data, ensure_ascii=False, indent=2), encoding="utf-8")

        export_docx(tmp_json, out_path)
        tmp_json.unlink(missing_ok=True)

        url = f"/static/{out_path.name}" if out_path.exists() else None
        return {"file": str(out_path), "url": url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/generate")
async def generate_content(req: GenerateRequest):
    # Reference: blueprint:python_openai
    # the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    
    base = req.data or {}
    fallback = {
        "profile": base.get("profile") or {"name": "Prénom Nom", "title": req.role or "Candidat"},
        "summary": base.get("summary") or "Professionnel(le) motivé(e) avec des résultats mesurables.",
        "experience": base.get("experience") or [],
        "education": base.get("education") or [],
        "skills": base.get("skills") or {"groups": []},
    }

    openai_key = os.getenv("OPENAI_API_KEY")
    if not openai_key:
        return {"data": fallback, "source": "stub", "message": "OpenAI API key not configured"}

    try:
        from openai import OpenAI
        client = OpenAI(api_key=openai_key)
        
        # Construire le prompt basé sur les données existantes
        user_prompt = req.prompt or f"Poste visé: {req.role or 'Candidat'}"
        
        system_prompt = """Tu es un expert en rédaction de CV professionnel. 
Génère un CV complet et professionnel en français au format JSON.
Le JSON doit contenir:
- profile: {name, title, contacts: {envelope: email, phone, map-marker-alt: location, linkedin}}
- summary: un résumé professionnel convaincant de 2-3 phrases
- experience: liste d'objets {company, role, start, end, bullets: [liste de réalisations]}
- education: liste d'objets {school, degree, year}
- skills: {groups: [{label, items: [liste de compétences]}]}

Retourne UNIQUEMENT le JSON, sans texte explicatif."""

        response = client.chat.completions.create(
            model="gpt-5",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        generated_text = response.choices[0].message.content
        generated_data = json.loads(generated_text)
        
        # Fusionner avec les données existantes
        result = {
            "profile": generated_data.get("profile", fallback["profile"]),
            "summary": generated_data.get("summary", fallback["summary"]),
            "experience": generated_data.get("experience", fallback["experience"]),
            "education": generated_data.get("education", fallback["education"]),
            "skills": generated_data.get("skills", fallback["skills"]),
        }
        
        return {"data": result, "source": "openai", "message": "Contenu généré avec succès par l'IA"}
    except Exception as e:
        error_msg = str(e)
        print(f"[generate] OpenAI error: {error_msg}")
        import traceback
        traceback.print_exc()
        
        # Retourner un message d'erreur explicite
        return {
            "data": fallback, 
            "source": "stub", 
            "error": error_msg,
            "message": f"Impossible de générer avec l'IA: {error_msg}. Données d'exemple utilisées."
        }

@app.get("/", response_class=HTMLResponse)
def root():
    return HTMLResponse("<h1>✅ CV Generator API</h1><p><a href='/docs'>Swagger UI</a></p>")

@app.get("/healthz")
def healthz():
    return JSONResponse({"status": "ok"})
