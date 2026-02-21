# OneSpace — Progress Report

**Project:** OneSpace  
**Version:** 1.0.0  
**Report date:** January 2026  
**Status:** Deployable; full production requires auth + DB wiring

---

## 1. What OneSpace Is

OneSpace is a **proof-first portfolio platform** for professionals. The idea: **“If work cannot be proven, it does not belong in the portfolio.”** It is not a resume builder or a generic website builder — it is built around verifiable proof (repos, URLs, case studies, metrics) and profession-specific structures.

### Core philosophy

- **Proof-first:** Every claim should link to proof (GitHub, live URL, Figma, PDF, metrics).
- **Domain-aware:** Different professions (Engineer, Designer, Architect, Consultant, PM, Researcher) get different section templates and proof rules.
- **Recruiter-optimized:** Read-only “recruiter mode” and clean, scannable layouts.

---

## 2. What It Has

### 2.1 Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19, Framer Motion, Tailwind CSS 4 |
| Forms | React Hook Form, Zod |
| Database (schema) | PostgreSQL + Prisma 7 (schema + seed; API not using DB yet) |
| Auth (deps only) | NextAuth.js, bcryptjs (not wired in app) |
| AI (deps) | Vercel AI SDK, OpenAI (e.g. for future AI review) |

### 2.2 Repo structure

```
OneSpace/
├── README.md                 # Main docs
├── PROGRESS_REPORT.md        # This file
└── portfolio-app/            # Next.js app
    ├── .env.example          # Env template
    ├── prisma.config.ts      # Prisma 7 config (DB URL)
    ├── prisma/
    │   ├── schema.prisma     # Full schema (User, Domain, Portfolio, Proof, etc.)
    │   └── seed.ts           # Seed domains/sections from domain-engine
    ├── public/               # favicon, logo
    └── src/
        ├── app/
        │   ├── page.tsx              # Landing
        │   ├── layout.tsx, globals.css
        │   ├── auth/login, auth/signup
        │   ├── dashboard/
        │   ├── builder/[id]/          # Portfolio builder UI
        │   ├── p/[slug]/              # Public portfolio view (by slug)
        │   ├── api/portfolios/       # REST API (GET/POST, GET/PUT/DELETE by id)
        │   └── components/           # Logo, AIReviewPanel, MoreProfessionsModal, role-previews
        ├── data/
        │   ├── portfolios.json       # Current portfolio storage (file-based)
        │   └── examples.ts
        └── lib/
            ├── domain-engine/        # domains.ts, types.ts, validator.ts
            ├── store.ts              # CRUD for portfolios (file)
            ├── validate.ts            # Payload validation + sanitize
            ├── types.ts               # App-level types
            ├── env.ts                 # Production env helpers
            └── prisma.ts              # Prisma client singleton
```

### 2.3 Features (current)

- **Landing page:** Hero, profession carousel (Engineer, Designer, Architect, Consultant, PM), role-specific preview cards, “More professions” modal, CTA to sign up.
- **Auth UI:** Login and Signup pages (UI only; no NextAuth API route or session).
- **Dashboard:** Placeholder dashboard page (shell).
- **Portfolio builder:** `/builder/[id]` — domain-driven builder using Engineer domain as example (sections: Projects, etc.).
- **Public portfolio:** `/p/[slug]` — read-only portfolio view (currently demo data).
- **Portfolios API:**  
  - `GET /api/portfolios` — list all  
  - `POST /api/portfolios` — create  
  - `GET /api/portfolios/[id]` — get one  
  - `PUT /api/portfolios/[id]` — update  
  - `DELETE /api/portfolios/[id]` — delete  
  All use JSON file store; no auth.
- **Domain engine:** Six domains defined (Engineer, Designer, Architect, Consultant, Researcher, Product Manager) with sections, fields, and proof rules; used by builder and seed.
- **Proof validation:** Domain-engine validator (proof types, min counts, severity); not yet hooked to API persistence.
- **Production helpers:** `.env.example`, `prisma.config.ts`, `src/lib/env.ts` for required env in production.

### 2.4 Domain engine (professions)

| Domain | Slug | Purpose |
|--------|------|--------|
| Software Engineer | engineer | Projects, tech stack, GitHub/URL proof |
| Product Designer | designer | Case studies, process, Figma/artifacts |
| Architect | architect | Projects, drawings, constraints, outcomes |
| Consultant | consultant | Engagements, problem/approach/impact |
| Researcher | researcher | Publications, methodology, citations |
| Product Manager | pm | Products, strategy, metrics, launches |

Each domain has sections, fields (text, textarea, url, array, etc.), and proof rules (allowed types, min count, severity).

---

## 3. How It Works

### 3.1 User flows (current)

1. **Visitor:** Lands on `/` → sees profession carousel and previews → can open “More professions” → CTA to Sign up.
2. **Auth:** Clicks Sign up / Login → `/auth/signup` or `/auth/login` (forms only; no backend auth).
3. **Builder:** User can open `/builder/[id]` → sees domain-based sections (e.g. Engineer: Projects) → form UI driven by domain-engine; data is not yet persisted to DB.
4. **Public portfolio:** `/p/[slug]` shows a single portfolio view (currently demo data).
5. **API:** Any client can call `/api/portfolios` (list/create) and `/api/portfolios/[id]` (get/update/delete). No authentication; data read/written to `src/data/portfolios.json`.

### 3.2 Data flow

- **Portfolios:** API → `store.ts` → read/write `src/data/portfolios.json`. Validation via `validate.ts` (title, userId, overview, sections, theme).
- **Domains:** In-memory definitions in `domain-engine/domains.ts`; Prisma seed can sync them to DB (Domain, DomainSection, EntryField, ValidationRule). API does not use Prisma for portfolios yet.
- **Prisma:** Used for schema and seed only. `prisma.ts` exports a singleton client; app code currently uses file store for portfolio CRUD.

### 3.3 Build and run

- **Dev:** `npm run dev` (Next.js dev server).
- **Build:** `npm run build` (Next.js production build; TypeScript and lint clean).
- **Start:** `npm run start` (production server).
- **DB (optional):** `npx prisma migrate dev`, `npx prisma db seed` (for domain data; app still uses file for portfolios).

---

## 4. Production Readiness

### 4.1 Summary

| Area | Status | Notes |
|------|--------|--------|
| **Build & run** | ✅ Ready | Lint passes, TypeScript clean, `npm run build` succeeds |
| **Deploy** | ✅ Deployable | Can be deployed to Vercel, Railway, Fly.io, or any Node host |
| **Config** | ✅ Ready | `.env.example`, `prisma.config.ts`, `src/lib/env.ts` |
| **Auth** | ⚠️ Not wired | NextAuth + bcrypt in package.json; no `/api/auth/[...nextauth]`, no session |
| **API security** | ⚠️ Unprotected | No auth on `/api/portfolios`; anyone can create/update/delete |
| **Data storage** | ⚠️ File-based | Portfolios in `portfolios.json`; Prisma/PostgreSQL not used by API |

**Verdict:** **Deployable now** for demos, staging, or internal use. **Not fully production-ready** for a public, multi-user product until auth is wired, API is protected, and portfolio storage is moved to the database.

### 4.2 To be “production ready” (checklist)

1. **Auth:** Add NextAuth API route (`/api/auth/[...nextauth]`), configure provider(s) (e.g. credentials + Google), use `getServerSession` in pages/API that need a user.
2. **API security:** In portfolio API routes, require a valid session; scope GET/PUT/DELETE by `userId` (or equivalent).
3. **Storage:** Switch portfolio CRUD from `store.ts` (file) to Prisma (PostgreSQL) using existing `Portfolio` (and related) models; keep validation and sanitization.
4. **Env:** Set `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, and `DATABASE_URL` in production; use `getNextAuthSecret()` / `getDatabaseUrl()` where appropriate.
5. **Optional:** Rate limiting, CORS, and security headers (e.g. in `next.config.ts`) for production.

---

## 5. Summary

- **What it is:** Proof-first, domain-aware portfolio platform for professionals.
- **What it has:** Next.js 16 app, landing, auth UI, builder, public portfolio page, portfolios REST API, domain engine (6 professions), file-based portfolio store, Prisma schema + seed, env and config for production.
- **How it works:** Visitors see landing and profession previews; builder and public view use domain definitions; API reads/writes a JSON file; Prisma is used for schema/seed only.
- **Production:** Build and deploy are ready; for full production, add auth, protect the API, and move portfolio storage to the database.
