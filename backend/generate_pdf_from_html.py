#!/usr/bin/env python3
"""
Convertit un fichier HTML en PDF via WeasyPrint.
Usage:
  python generate_pdf_from_html.py --html cv.html --out CV.pdf
"""
import argparse
from pathlib import Path
from weasyprint import HTML


def html_to_pdf(html_path: Path, out_pdf: Path) -> Path:
    """Convertit un fichier HTML en PDF en utilisant WeasyPrint"""
    print(f"[PDF Generator] Converting HTML to PDF using WeasyPrint")
    print(f"[PDF Generator] Input: {html_path}")
    print(f"[PDF Generator] Output: {out_pdf}")
    
    # Lire le HTML
    html_content = html_path.read_text(encoding='utf-8')
    
    # Cacher le bouton PDF dans le HTML avant de générer
    html_content = html_content.replace(
        '<div class="pdf-button-container">',
        '<div class="pdf-button-container" style="display: none !important;">'
    )
    
    # Générer le PDF avec WeasyPrint
    HTML(string=html_content, base_url=str(html_path.parent)).write_pdf(
        str(out_pdf),
        presentational_hints=True
    )
    
    print(f"[PDF Generator] PDF created successfully: {out_pdf}")
    return out_pdf


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--html", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    html = Path(args.html)
    out = Path(args.out)
    if not html.exists():
        raise FileNotFoundError(f"HTML introuvable: {html}")

    pdf_path = html_to_pdf(html, out)
    print(f"PDF généré: {pdf_path}")


if __name__ == "__main__":
    main()
