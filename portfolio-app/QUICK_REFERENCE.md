# Quick Reference - ProofPortfolio

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run linter

# Database
npx prisma migrate dev  # Create and run migration
npx prisma migrate deploy # Run migrations (production)
npx prisma db seed      # Seed domain data
npx prisma studio       # Open database GUI
npx prisma generate     # Generate Prisma Client

# TypeScript
npx tsc --noEmit        # Type check without building
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/lib/domain-engine/domains.ts` | Domain definitions (add new professions here) |
| `src/lib/domain-engine/validator.ts` | Proof validation logic |
| `prisma/schema.prisma` | Database schema |
| `src/app/page.tsx` | Landing page |
| `src/app/builder/[id]/page.tsx` | Portfolio builder |
| `src/app/globals.css` | Design system |

## 🎯 Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/auth/signup` | User signup |
| `/auth/login` | User login |
| `/dashboard` | User dashboard |
| `/builder/[id]` | Portfolio builder |
| `/p/[slug]` | Public portfolio view |

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| `users` | User accounts |
| `domains` | Profession definitions |
| `domain_sections` | Section templates |
| `entry_fields` | Field definitions |
| `portfolios` | User portfolios |
| `entries` | Work items |
| `proof_objects` | Verifiable proof |
| `validation_rules` | Proof requirements |

## 🔧 Environment Variables

```env
# Required
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# Optional
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET=""
```

## 📊 Domain Structure

```typescript
{
  slug: 'domain-slug',
  name: 'Display Name',
  description: 'Description',
  sections: [
    {
      slug: 'section-slug',
      name: 'Section Name',
      fields: [...],
      proofRules: [...]
    }
  ],
  validationRules: [...]
}
```

## ✅ Proof Types

- `github` - GitHub repositories
- `url` - Live URLs
- `figma` - Figma files
- `image` - Images
- `pdf` - PDF documents
- `video` - Videos
- `metric` - Metrics/numbers
- `citation` - Academic citations

## 🎨 CSS Variables

```css
--color-primary: #2563eb
--color-bg: #ffffff
--color-text: #0f172a
--spacing-md: 1rem
--font-size-base: 1rem
--radius-md: 0.5rem
```

## 📝 Adding a Domain (Quick)

1. Edit `src/lib/domain-engine/domains.ts`
2. Add domain definition
3. Add to `domainRegistry`
4. Run `npx prisma db seed`
5. Restart dev server

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Change port: `PORT=3001 npm run dev` |
| Database error | Check DATABASE_URL in `.env` |
| Prisma error | Run `npx prisma generate` |
| Build fails | Run `npx tsc --noEmit` to find errors |

## 📚 Documentation

- `README.md` - Main documentation
- `SETUP.md` - Setup guide
- `DEPLOYMENT.md` - Deployment guide
- `ADDING_DOMAINS.md` - Domain development
- `PROJECT_OVERVIEW.md` - Project summary
- `DELIVERY_SUMMARY.md` - Delivery notes

## 🎯 Key Principles

1. **Proof-first** - Every claim needs proof
2. **Domain-aware** - Profession-specific structures
3. **No fake content** - Real work only
4. **Trust-based** - Credible design
5. **Extensible** - Easy to add domains

## 🔗 Useful Links

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://prisma.io/docs
- TypeScript: https://typescriptlang.org/docs
- PostgreSQL: https://postgresql.org/docs

---

**Quick Start**: `npm run dev` → http://localhost:3000
