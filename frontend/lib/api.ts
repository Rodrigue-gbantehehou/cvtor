export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export type Template = {
  templateName: string;
  sections: any[];
  fonts?: any;
  colors?: any;
  layout?: any;
};

export type ResumeData = any;

interface PreviewResponse {
  html: string;
}

interface ExportResponse {
  file: string;
  url?: string;
}

// === Prévisualisation HTML ===
export async function previewHtml(template: Template, data: ResumeData): Promise<PreviewResponse> {
  const res = await fetch(`${API_BASE}/preview/html`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      template_name: template.templateName,
      data
    })
  });
  if (!res.ok) throw new Error(`Preview failed: ${await res.text()}`);
  return res.json();
}

// === Export PDF ===
export async function exportPdf(template: Template, data: ResumeData, out?: string): Promise<ExportResponse> {
  const res = await fetch(`${API_BASE}/export/pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      template_name: template.templateName,
      data,
      out
    })
  });
  if (!res.ok) throw new Error(`Export PDF failed: ${await res.text()}`);
  return res.json();
}

// === Export DOCX ===
export async function exportDocx(template: Template, data: ResumeData, out?: string): Promise<ExportResponse> {
  const res = await fetch(`${API_BASE}/export/docx`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      template_name: template.templateName,
      data,
      out
    })
  });
  if (!res.ok) throw new Error(`Export DOCX failed: ${await res.text()}`);
  return res.json();
}

// === Génération de contenu IA ===
interface GenerateRequest {
  prompt?: string;
  data?: ResumeData;
  role?: string;
}

interface GenerateResponse {
  data: ResumeData;
  source: 'huggingface' | 'stub';
}

export async function generateContent(req: GenerateRequest): Promise<GenerateResponse> {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req)
  });
  if (!res.ok) throw new Error(`Generate failed: ${await res.text()}`);
  return res.json();
}
