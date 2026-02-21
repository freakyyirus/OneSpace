# OneSpace – Deployment (Vercel + Railway)

This document describes how to deploy the OneSpace portfolio app to **Vercel** (frontend + API) with **Railway** (PostgreSQL), or both on Railway.

## Prerequisites

- GitHub repo with this codebase
- [Vercel](https://vercel.com) and/or [Railway](https://railway.app) account

---

## Option A: Vercel (App) + Railway (PostgreSQL)

### 1. Create PostgreSQL on Railway

1. Go to [Railway](https://railway.app) → New Project → **Add PostgreSQL**.
2. After the database is created, open it and go to **Variables** or **Connect**.
3. Copy **`DATABASE_URL`** (or build it from `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`).

### 2. Run migrations against Railway DB

From your machine (or CI), point Prisma at the production DB and run migrations:

```bash
cd portfolio-app
# Set DATABASE_URL to your Railway Postgres URL (e.g. from Railway Variables)
export DATABASE_URL="postgresql://..."  # or use .env
npx prisma migrate deploy
```

Keep `prisma/migrations` in git so future deploys can run the same migrations.

### 3. Deploy app to Vercel

1. **Import project**: Vercel → Add New → Project → Import your GitHub repo. Root directory: **`portfolio-app`** (or repo root if the app is at root).
2. **Build**: Vercel detects Next.js. Build command is already `prisma generate && next build` in `package.json`.
3. **Environment variables** (Vercel → Project → Settings → Environment Variables):

   | Variable          | Value                    | Notes                          |
   |-------------------|---------------------------|--------------------------------|
   | `DATABASE_URL`    | Railway Postgres URL      | From Railway Variables         |
   | `NEXTAUTH_URL`    | `https://your-app.vercel.app` | Your production app URL    |
   | `NEXTAUTH_SECRET` | Long random string        | e.g. `openssl rand -base64 32` |
   | `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional | Only if using Google OAuth |

4. Deploy. After the first deploy, re-run migrations if you added new ones:  
   `DATABASE_URL="..." npx prisma migrate deploy`.

---

## Option B: All on Railway (App + PostgreSQL)

1. **New Project** → **Deploy from GitHub** and select your repo.
2. **Add PostgreSQL**: In the same project, Add Service → **PostgreSQL**. Railway will set `DATABASE_URL` for the app service when you link them.
3. **Configure the app service**:
   - **Root directory**: `portfolio-app` (if the app lives in that subfolder).
   - **Build command**: `prisma generate && next build`
   - **Start command**: `next start` (or leave default if it runs `npm start`).
4. **Environment variables** (Railway → App service → Variables):
   - `DATABASE_URL`: Usually provided by linking the Postgres service; otherwise paste the Postgres URL from the Postgres service variables.
   - `NEXTAUTH_URL`: Your public app URL (e.g. `https://your-app.up.railway.app`).
   - `NEXTAUTH_SECRET`: Long random string.
5. **Migrations**: Run once (from your machine or a one-off Railway job):
   ```bash
   DATABASE_URL="<railway-postgres-url>" npx prisma migrate deploy
   ```
6. Redeploy the app after migrations.

---

## Env summary

| Variable           | Required | Description |
|-------------------|----------|-------------|
| `DATABASE_URL`    | Yes      | PostgreSQL connection string (Railway or any Postgres). |
| `NEXTAUTH_URL`    | Yes      | Full URL of the app (e.g. `https://onespace.vercel.app`). |
| `NEXTAUTH_SECRET` | Yes      | Secret for signing cookies/sessions; use a long random value. |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | No | For Google OAuth login. |

---

## Post-deploy checks

- **Auth**: Visit `/auth/login` and `/auth/signup`; sign up and sign in.
- **Dashboard**: After login, `/dashboard` should list portfolios (or empty).
- **Public portfolio**: Publish a portfolio and open `/p/<slug>`; it should load from the DB with proofs-first and signal summary.
- **API**: `GET /api/domains` should return domain list; `GET /api/portfolios` should require auth and return 401 when logged out.

---

## Troubleshooting

- **Prisma / “Unknown database”**: Ensure `DATABASE_URL` is set in the deployment env and migrations were run (`prisma migrate deploy`).
- **NextAuth / redirect / cookie issues**: Set `NEXTAUTH_URL` to the exact production URL (no trailing slash) and use a strong `NEXTAUTH_SECRET`.
- **Build fails**: Ensure `prisma generate` runs before `next build` (already in `package.json` build script). On Vercel, you can override Build Command to `prisma generate && next build` if needed.
