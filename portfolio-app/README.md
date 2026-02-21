# OneSpace – Portfolio App

Next.js application for OneSpace (proof-first portfolio platform).

**See the [root README](../README.md) for full documentation.**

## Quick start

```bash
npm install
cp .env.example .env
# Edit .env: DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET
npx prisma migrate deploy
npm run dev
```

## Production readiness

**Deployable now:** The app builds and runs in production (`npm run build` then `npm run start`). You can deploy to **Vercel** (app) with **Railway** (PostgreSQL), or run both on Railway.

| Area | Status | Notes |
|------|--------|--------|
| Build & run | ✅ Ready | Lint passes, TypeScript clean, build succeeds |
| Env & config | ✅ Ready | `.env.example` and `prisma.config.ts` in place |
| Auth (NextAuth) | ✅ Wired | `/api/auth/[...nextauth]`, signup API, session checks |
| API security | ✅ Protected | Portfolio API requires auth; routes protected |
| Data storage | ✅ DB | Portfolios in PostgreSQL via Prisma |
| Proof validation | ✅ Server-side | Publish gate; domain proof rules enforced |
| Recruiter view | ✅ By slug | `/p/[slug]` fetches from DB, proofs-first, signal summary |
| Hardening | ✅ In place | Rate limit (signup), security headers, input sanitization |

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for:

- **Vercel** (app) + **Railway** (PostgreSQL): step-by-step and env vars
- **Railway** (app + PostgreSQL): single-project setup
- Migrations, env summary, and troubleshooting

## Production run (local)

- Set `NODE_ENV=production`.
- Set env from `.env.example`: `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
- Run `npx prisma migrate deploy` then `npm run build` then `npm run start`.
