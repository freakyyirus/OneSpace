# ProofPortfolio - Universal Proof-First Portfolio Platform

A production-ready platform for creating structured, verifiable, domain-specific portfolios that replace traditional resumes.

## 🎯 Core Philosophy

**If work cannot be proven, it does not belong in the portfolio.**

This is NOT:
- ❌ A resume builder
- ❌ A website builder
- ❌ A template gallery
- ❌ AI auto-generated content

This IS:
- ✅ Proof-first
- ✅ Domain-aware
- ✅ Recruiter-optimized
- ✅ Customizable within professional rules

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16 (App Router), TypeScript, CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js (Email + Google OAuth)
- **Storage**: S3-compatible for proof files

### Core Systems

#### 1. Domain Engine
Defines profession-specific portfolio structures:
- **Engineers**: Projects, Architecture, Tech Stack, Proof
- **Designers**: Case Studies, Process, Artifacts, Results
- **Architects**: Projects, Drawings, Constraints, Outcomes
- **Consultants**: Engagements, Problem, Approach, Impact
- **Researchers**: Publications, Methodology, Citations
- **Product Managers**: Products, Strategy, Metrics

#### 2. Proof Validation System
Every claim must link to proof:
- GitHub repositories
- Live URLs
- Figma files
- PDFs/Images
- Metrics
- Citations

**No proof → warning. Critical proof missing → publishing blocked.**

#### 3. User Modes

**Builder Mode**
- Guided, domain-aware inputs
- Structured forms (no blank dumping)
- AI assists only with clarity and structure
- AI NEVER invents work

**Recruiter Mode**
- Read-only
- Optimized for 3–5 minute scan
- Proof visible before claims
- Clean, distraction-free UI

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and install dependencies**
```bash
cd portfolio-app
npm install
```

2. **Set up database**
```bash
# Create a PostgreSQL database
createdb proofportfolio

# Copy environment variables
# Create a .env file with:
# DATABASE_URL="postgresql://user:password@localhost:5432/proofportfolio"
# NEXTAUTH_URL="http://localhost:3000"
# NEXTAUTH_SECRET="your-secret-key"

# Run migrations
npx prisma migrate dev
```

3. **Seed domain data (optional)**
```bash
npx prisma db seed
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio-app/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── builder/           # Portfolio builder
│   │   └── p/[slug]/          # Public portfolio viewer
│   └── lib/
│       └── domain-engine/     # Core domain system
│           ├── types.ts       # Type definitions
│           ├── domains.ts     # Domain definitions
│           └── validator.ts   # Proof validation
└── README.md
```

## 🎨 Design Principles

### Visual Style
- Modern SaaS aesthetic
- Neutral, professional colors
- High readability
- No flashy animations
- Credible to recruiters

### Landing Page Structure
1. Hero with clear value proposition
2. Problem statement (reality, no hype)
3. Solution explanation
4. Professions supported
5. How it works (3 steps)
6. Sample portfolios
7. Who it's for / not for
8. Final CTA

## 🔒 Non-Negotiable Guardrails

- ❌ No generic templates
- ❌ No fake AI content
- ❌ No resume keywords
- ❌ No unverified claims
- ❌ No "growth hacks"

**If a feature weakens trust → REMOVE IT.**

## 📊 Database Schema

The schema is designed around **proof, not skills**:

### Core Entities
- `User` - User accounts
- `Domain` - Profession definitions
- `DomainSection` - Section templates per domain
- `EntryField` - Field definitions for entries
- `Portfolio` - User's actual portfolio
- `Entry` - Work items (projects, case studies, etc.)
- `ProofObject` - Verifiable proof links
- `ValidationRule` - Proof requirements
- `ValidationStatus` - Proof quality tracking

## 🚢 Deployment

### Environment Variables
Required for production:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Secret for session encryption
- `GOOGLE_CLIENT_ID` - (Optional) Google OAuth
- `GOOGLE_CLIENT_SECRET` - (Optional) Google OAuth

### Deployment Platforms
- **Vercel** (Recommended for Next.js)
- **Railway** (Database + App)
- **Fly.io** (Full control)

### Build Command
```bash
npm run build
```

### Database Migrations
```bash
npx prisma migrate deploy
```

## 🧪 Development

### Adding a New Domain

1. Define domain in `src/lib/domain-engine/domains.ts`
2. Specify sections, fields, and proof rules
3. Add to `domainRegistry`
4. Run database migration if needed

### Extending Proof Types

1. Add type to `ProofType` in `types.ts`
2. Update validation logic in `validator.ts`
3. Update UI components to handle new type

## ✅ Success Criteria

This product should make recruiters think:

**"I trust this more than a resume."**

If it doesn't meet this bar, it needs revision.

## 📝 License

Proprietary - All rights reserved

## 🤝 Contributing

This is a production application. All contributions must:
1. Maintain proof-first philosophy
2. Not weaken trust
3. Be domain-extensible
4. Include proper validation

---

**Built with the philosophy: Stop claiming skills. Start proving them.**
