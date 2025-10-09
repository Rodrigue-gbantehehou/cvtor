#!/usr/bin/env python3
import json
import httpx

# Charger les données de test
with open("data/resume_test_professional.json", "r") as f:
    data = json.load(f)

# Tester le template Professional
payload = {
    "template_name": "professional",
    "data": data
}

response = httpx.post("http://localhost:8000/preview/html", json=payload)
print(f"Status: {response.status_code}")

if response.status_code == 200:
    result = response.json()
    html = result.get("html", "")
    print(f"HTML generated: {len(html)} chars")
    print(f"First 500 chars:\n{html[:500]}")
    
    # Sauvegarder pour inspection
    with open("_preview_professional.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("Saved to _preview_professional.html")
else:
    print(f"Error: {response.text}")

# Tester le template Tokyo
payload["template_name"] = "tokyo"
response = httpx.post("http://localhost:8000/preview/html", json=payload)
print(f"\nTokyo Status: {response.status_code}")

if response.status_code == 200:
    result = response.json()
    html = result.get("html", "")
    print(f"HTML generated: {len(html)} chars")
    
    # Sauvegarder pour inspection
    with open("_preview_tokyo.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("Saved to _preview_tokyo.html")
else:
    print(f"Error: {response.text}")
