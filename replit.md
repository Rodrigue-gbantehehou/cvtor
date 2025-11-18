# CV Generator (CVtor) - Replit Documentation

## Overview

CVtor is a professional CV/resume builder application with AI capabilities. It allows users to create, customize, and export professional resumes using multiple templates. The application features a drag-and-drop editor, real-time preview, and integration with Stripe for premium subscriptions.

**Tech Stack:**
- **Frontend:** Next.js 14 (React 18), TypeScript, Tailwind CSS
- **Backend:** FastAPI (Python), SQLAlchemy ORM
- **Database:** PostgreSQL (configured via DATABASE_URL)
- **Authentication:** Supabase Auth + JWT tokens
- **Payment:** Stripe
- **Export:** Playwright (PDF), python-docx (DOCX)
- **State Management:** Zustand
- **Templating:** Jinja2

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture (Next.js)

**App Router Structure:**
- Pages use the Next.js 14 App Router with client-side rendering (`'use client'`)
- Main routes: `/` (landing), `/login`, `/register`, `/dashboard`, `/editor`, `/modeles`, `/tarifs`
- Admin panel: `/admin/dashboard` with server-side Supabase integration

**Key Design Patterns:**
- **State Management:** Zustand store (`store/editor.ts`) manages template, resume data, section ordering, and selection state
- **Component Structure:** Separation between presentation (landing pages) and functional components (editor)
- **API Integration:** Centralized API client (`lib/api.ts`) for backend communication
- **Authentication Flow:** Supabase client-side auth with JWT tokens passed to backend via Authorization headers

**Rationale:**
- Next.js App Router chosen for better performance and modern React patterns
- Zustand selected for lightweight state management without Redux complexity
- Tailwind CSS provides rapid UI development with consistent design system

### Backend Architecture (FastAPI)

**Modular Router Design:**
- `/auth/*` - Authentication endpoints (register, login, token management)
- `/resumes/*` - CRUD operations for user resumes
- `/stripe/*` - Payment processing and subscription management
- Core endpoints in `api.py` for templates, preview, and export

**Service Layer:**
- `services/export_docx.py` - DOCX generation using python-docx
- `services/generate_pdf_from_html.py` - PDF generation using Playwright
- `services/render_cv.py` - Jinja2 template rendering

**Template System:**
- Templates stored in `backend/templates/{template_name}/`
- Each template has: `template.jinja2` (HTML), `style.css`, `template.json` (metadata)
- Available templates: classique, moderne, professional, tokyo

**Rationale:**
- FastAPI chosen for async capabilities, automatic API documentation, and Python ecosystem
- Jinja2 templating allows flexible HTML generation with good separation of concerns
- Service layer pattern keeps business logic separate from HTTP routing

### Database Design (PostgreSQL + SQLAlchemy)

**Schema:**

**Users Table:**
- Authentication data (email, hashed_password)
- Subscription info (subscription_plan enum: FREE/PREMIUM)
- Stripe integration fields (stripe_customer_id, stripe_subscription_id)

**Resumes Table:**
- Foreign key to users
- Template selection (template_name)
- JSON content stored as TEXT field
- Visibility control (is_public boolean)

**Rationale:**
- PostgreSQL chosen for reliability and JSON support
- SQLAlchemy ORM provides database abstraction and migration capabilities
- Storing resume data as JSON allows flexible schema-less content while maintaining relational integrity

**Alternatives Considered:**
- NoSQL (MongoDB) - Rejected due to need for relational integrity between users and resumes
- Embedded SQLite - Rejected for production scalability concerns

### Authentication & Authorization

**Dual Auth System:**
- **Supabase Auth:** Primary authentication for frontend (session management, email verification)
- **JWT Tokens:** Backend validation using python-jose with HS256 algorithm
- Token exchange: Supabase tokens validated and converted to backend JWT format

**Authorization Mechanisms:**
- Route protection via `get_current_active_user` dependency
- Subscription-based quotas enforced via `check_quota` function
- FREE plan: 1 resume limit
- PREMIUM plan: Unlimited resumes

**Security Measures:**
- Password hashing with bcrypt via passlib
- CORS middleware with configurable allowed origins
- Environment-based secret key management

**Rationale:**
- Supabase Auth chosen for comprehensive auth features (email verification, password reset) without building from scratch
- JWT tokens enable stateless backend authentication
- Dual system allows frontend flexibility while maintaining backend security

### External Dependencies

**Payment Processing:**
- **Stripe Integration:**
  - Checkout sessions for subscription purchases
  - Webhook handling for subscription events
  - Customer management linked to user accounts
  - Environment variables: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PREMIUM_PRICE_ID`

**Authentication Service:**
- **Supabase:**
  - User registration and login
  - Session management
  - Email verification
  - Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Export Services:**
- **Playwright:** Headless browser for HTML-to-PDF conversion with print CSS support
- **python-docx:** Native DOCX file generation for Word compatibility

**Third-Party APIs:**
- Optional AI content generation (HuggingFace/OpenAI) - stub implementation present
- Future integration planned for resume text generation

**Infrastructure:**
- **CORS Configuration:** Supports Replit dev domains and configurable production origins
- **Static File Serving:** FastAPI StaticFiles for templates and assets
- **Database:** PostgreSQL via `DATABASE_URL` environment variable

**Deployment Considerations:**
- Backend and frontend can run separately (configured via `NEXT_PUBLIC_API_BASE` and `BACKEND_URL`)
- Environment-based configuration for development vs production
- Playwright requires Chromium installation during deployment