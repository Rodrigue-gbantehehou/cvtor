# CVtor - Professional Resume Builder with AI

## Overview

CVtor is a modern CV/resume builder application that combines template-based document generation with AI-powered content creation. The system allows users to create professional resumes through a visual editor with drag-and-drop functionality, real-time preview, and export capabilities to PDF and DOCX formats.

The application consists of:
- A **Next.js frontend** providing an interactive editor interface
- A **FastAPI backend** handling template rendering, document export, and AI integration
- **Jinja2-based templating** system for customizable CV layouts
- **AI content generation** capabilities (with optional integration)

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Updates

### October 10, 2025 - Refonte de la page d'accueil

**🎨 Nouvelle page d'accueil redesignée:**
- 🌓 **Mode clair/sombre** - Toggle pour basculer entre les thèmes avec Tailwind dark mode
- 🧭 **Navigation moderne** - Barre de navigation avec logo CVtor, menu (Modèles, IA, Tarifs, Contact) et bouton Connexion
- 🎯 **Section Hero** - Titre accrocheur "Crée ton CV professionnel en quelques clics" avec illustration de document
- 📋 **Section Modèles** - Présentation de 3 templates avec cartes cliquables
- ⚡ **Section Fonctionnalités** - Mise en avant des fonctionnalités clés avec icônes
- 💬 **Section Témoignages** - Citation utilisateur avec design gradient
- 🔗 **Footer** - Liens vers À propos, CGU, Confidentialité, Contact
- 📱 **Design responsive** - Adapté aux mobiles et tablettes

**🛠️ Améliorations techniques:**
- Configuration Tailwind avec `darkMode: 'class'` pour support du thème sombre
- Utilisation de composants React avec hooks (useState) pour la gestion du thème
- Navigation par ancres vers les sections de la page
- Dégradés et effets visuels modernes avec Tailwind CSS

### October 9, 2025

**✨ Nouvelles Fonctionnalités Implémentées:**
- 🤖 **Intégration IA Gratuite Hugging Face** - Génération automatique de contenu professionnel pour CV avec Mistral-7B-Instruct-v0.2 (100% gratuit)
- 🎨 **Interface Moderne Tailwind** - Design professionnel avec gradients et animations
- 🏠 **Landing Page Commerciale** - Page d'accueil attractive présentant les fonctionnalités
- ✏️ **Éditeur de Contenu Complet** - Édition inline de profil, résumé, expériences, compétences
- 📑 **Templates CSS Stylisés Premium** - Styles professionnels avec typographies Google Fonts
  - **Classique**: Palette or élégant (#d4af37) avec Playfair Display et Crimson Text
  - **Moderne**: Gradients indigo (#4f46e5/#7c3aed) avec Inter
  - **Professional**: Design turquoise/teal (#00A19C) avec photo circulaire, layout 2 colonnes, barres de compétences
  - **Tokyo**: Style minimaliste bleu/gris (#5B6B8C) avec typographie Montserrat, design épuré
- 🔄 **Preview en Temps Réel** - Prévisualisation instantanée agrandie au format A4
- 📥 **Export PDF/DOCX** - Export professionnel vers formats standards
- 🎯 **Drag & Drop Avancé** - Réorganisation intuitive des sections
- ⚡ **Gestion d'Erreurs** - Messages explicites pour debugging IA
- 📄 **Format A4 Standard** - Prévisualisation au format A4 (210mm x 297mm) centré et scrollable
- 🖥️ **Interface Optimisée** - Disposition améliorée avec prévisualisation agrandie
- 📸 **Support Photo de Profil** - Nouveaux templates avec support pour photos circulaires
- 🌐 **Réseaux Sociaux** - Affichage des profils sociaux (Facebook, Twitter, Instagram, LinkedIn)
- 🗣️ **Langues** - Section dédiée pour les compétences linguistiques avec niveaux

**🔧 Améliorations Techniques:**
- **Migration vers Hugging Face API gratuite** (remplacement d'OpenAI)
  - Modèle utilisé: mistralai/Mistral-7B-Instruct-v0.2
  - Token gratuit requis: HF_TOKEN (obtenir sur https://huggingface.co/settings/tokens)
  - Limite gratuite: plusieurs centaines de requêtes/heure
- **Nouvelle disposition de l'éditeur** (October 9, 2025)
  - Réorganisation verticale: "Édition de Contenu" déplacée au-dessus de "Configuration"
  - Grille optimisée: 3 colonnes → 2 colonnes (340px sidebar + prévisualisation élargie)
  - Prévisualisation agrandie pour meilleure expérience utilisateur
- **Design Premium des Templates CSS** (October 9, 2025)
  - Template Classique: palette dorée cohérente, imports Google Fonts (Playfair Display + Crimson Text)
  - Template Moderne: gradients indigo modernisés, imports Google Fonts (Inter)
  - Padding optimisé à 30mm en haut pour compatibilité impression A4
  - Hiérarchie typographique améliorée et contrastes renforcés
- Installation de Playwright avec dépendances système pour génération PDF
- Amélioration de la gestion d'erreurs côté backend avec messages explicites
- Interface utilisateur responsive et moderne
- Migration complète vers l'environnement Replit (Node.js 20, Python avec uv)
- Correction des types TypeScript pour supporter les sources IA multiples

## System Architecture

### Frontend Architecture (Next.js 14)

**Framework Choice**: Next.js 14 with TypeScript and Tailwind CSS
- **Rationale**: Provides server-side rendering capabilities, excellent developer experience, and built-in optimization
- **State Management**: Zustand for global editor state (template, data, selections)
- **Pros**: Lightweight state management, TypeScript support, minimal boilerplate
- **Cons**: Less suitable for very complex state scenarios (acceptable for this use case)

**Drag-and-Drop Interface**: React DnD with HTML5 backend
- **Purpose**: Enable users to reorder CV sections visually
- **Implementation**: Custom `DndList` component wrapping section items with drag/drop hooks

**Component Structure**:
- `/app` - Next.js App Router pages (home, editor)
- `/components/editor` - Modular editor components (Canvas, ContentEditor, StylePanel, etc.)
- `/lib` - API client and utilities
- `/store` - Zustand state management

### Backend Architecture (FastAPI + Python)

**Framework Choice**: FastAPI for REST API
- **Rationale**: High performance, automatic OpenAPI documentation, async support, Python ecosystem access
- **Pros**: Type validation via Pydantic, excellent for JSON APIs, fast execution
- **Cons**: Requires Python runtime (acceptable trade-off for template rendering needs)

**Template Rendering Pipeline**:
1. **Jinja2 Templates** - Stored in `/backend/templates/{template_name}/`
   - `template.jinja2` - HTML structure with template variables
   - `style.css` - Template-specific styling
   - `template.json` - Metadata (sections, fonts, colors, layout config)
   - **Rationale**: Separation of content, presentation, and configuration

2. **Rendering Flow**:
   - API receives template name + JSON data
   - Jinja2 loads template and renders HTML with data
   - CSS is linked via static file serving
   - HTML returned to frontend or used for export

**Export Mechanisms**:
- **PDF Generation**: Playwright (Chromium) for HTML-to-PDF conversion
  - **Rationale**: Pixel-perfect rendering matching preview, supports CSS print styles
  - **Alternative Considered**: WeasyPrint (rejected due to limited CSS support)
  
- **DOCX Generation**: python-docx for structured document creation
  - **Rationale**: Native Office format support for editable exports
  - **Limitation**: Layout fidelity lower than PDF (acceptable for editable use case)

### Data Model

**Resume Data Structure** (JSON):
```json
{
  "profile": { "name": "", "title": "", "contacts": {} },
  "summary": "",
  "experience": [{ "company": "", "role": "", "dates": "", "bullets": [] }],
  "education": [{ "institution": "", "degree": "", "dates": "" }],
  "skills": { "categories": [{ "name": "", "items": [] }] }
}
```

**Template Definition**:
```json
{
  "templateName": "",
  "fonts": { "heading": "", "body": "" },
  "colors": { "primary": "", "accent": "" },
  "layout": { "twoColumn": bool, "margins": "" },
  "sections": [{ "type": "", "label": "", "columns": 1, "style": {} }]
}
```

**Architectural Decision**: Schema-less JSON approach
- **Rationale**: Flexibility for rapid template iteration, simpler than database schema
- **Trade-off**: No compile-time validation (mitigated by runtime Pydantic validation)

### Real-time Preview System

**Implementation**: iframe-based rendering with asset path rewriting
- **Problem**: Templates reference local CSS files that need backend resolution
- **Solution**: `rewriteAssets()` utility rewrites relative paths to backend static URLs
- **Flow**: 
  1. Frontend triggers preview on data/template change
  2. Backend renders HTML via Jinja2
  3. Frontend patches asset URLs and injects into iframe
  4. Result: Live preview matching export output

### API Design

**RESTful Endpoints**:
- `GET /templates` - List available templates
- `GET /templates/{name}` - Get template definition
- `POST /preview/html` - Generate HTML preview
- `POST /export/pdf` - Export to PDF
- `POST /export/docx` - Export to DOCX
- `POST /generate/content` - AI content generation (optional)

**CORS Configuration**: Permissive (`allow_origins=["*"]`) for development
- **Production Consideration**: Should be restricted to frontend domain

## External Dependencies

### Third-party Services

**Supabase** (Optional):
- **Purpose**: Cloud persistence for templates and resumes
- **Integration**: `@supabase/supabase-js` client library
- **Schema**: 
  - `templates` table - User-created template definitions
  - `resumes` table - Saved CV data
- **Configuration**: Environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Fallback**: Application works without Supabase (local-only editing)

### Key Libraries

**Frontend**:
- `next@14.2.5` - React framework
- `zustand@4.5.2` - State management
- `react-dnd@16.0.1` - Drag-and-drop interface
- `axios@1.7.4` - HTTP client
- `tailwindcss@3.4.10` - Utility-first CSS

**Backend**:
- `fastapi@0.115.0` - Web framework
- `jinja2@3.1.4` - Template engine
- `playwright@1.40.0` - Browser automation for PDF
- `python-docx@0.8.11` - DOCX generation
- `pydantic@2.9.2` - Data validation
- `uvicorn@0.30.6` - ASGI server

**Optional AI Dependencies** (commented in requirements.txt):
- `transformers` - Hugging Face models
- `accelerate` - GPU acceleration
- **Note**: Require Rust/Cargo, may lack Python 3.13 wheels

### Development Infrastructure

**Port Configuration**:
- Frontend: 5000 (Next.js dev server)
- Backend: 8000 (FastAPI/Uvicorn)

**Proxy Setup**: Next.js rewrites `/backend/*` to `http://localhost:8000/*`
- **Purpose**: Avoid CORS during development, unified URL space

**Static File Serving**: Backend serves `/static` directory for templates, CSS, and sample data