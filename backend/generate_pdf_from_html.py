#!/usr/bin/env python3
"""
Convertit un fichier HTML en PDF via Playwright (Chromium).
Usage:
  python generate_pdf_from_html.py --html cv.html --out CV.pdf
"""
import argparse
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright


async def html_to_pdf(html_path: Path, out_pdf: Path) -> Path:
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            await page.goto(f"file://{html_path.absolute()}", wait_until="networkidle")
            await page.wait_for_timeout(500)
            # cacher le bouton pdf s'il existe
            await page.evaluate("""
              const pdfButton = document.querySelector('.pdf-button-container');
              if (pdfButton) pdfButton.style.display = 'none';
            """)
            await page.pdf(
                path=str(out_pdf),
                format="A4",
                print_background=True,
                margin={"top": "0mm", "right": "0mm", "bottom": "0mm", "left": "0mm"},
                prefer_css_page_size=True,
                display_header_footer=False,
            )
            return out_pdf
        finally:
            await browser.close()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--html", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    html = Path(args.html)
    out = Path(args.out)
    if not html.exists():
        raise FileNotFoundError(f"HTML introuvable: {html}")

    pdf_path = asyncio.run(html_to_pdf(html, out))
    print(f"PDF généré: {pdf_path}")


if __name__ == "__main__":
    main()
