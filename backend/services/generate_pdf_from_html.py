#!/usr/bin/env python3
"""
Convertit un fichier HTML en PDF via Playwright.
Usage:
  python generate_pdf_from_html.py --html cv.html --out CV.pdf
"""
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright


def html_to_pdf(html_path: Path, out_pdf: Path) -> Path:
    """Convertit un fichier HTML en PDF en utilisant Playwright"""
    print(f"[PDF Generator] Converting HTML to PDF using Playwright")
    print(f"[PDF Generator] Input: {html_path}")
    print(f"[PDF Generator] Output: {out_pdf}")
    
    # Lire le HTML
    html_content = html_path.read_text(encoding='utf-8')
    
    # Cacher le bouton PDF dans le HTML avant de générer
    html_content = html_content.replace(
        '<div class="pdf-button-container">',
        '<div class="pdf-button-container" style="display: none !important;">'
    )
    
    # Générer le PDF avec Playwright
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content(html_content)
        page.pdf(path=str(out_pdf), format='A4', print_background=True)
        browser.close()
    
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
