# Deployment Guide - ProofPortfolio

Production deployment guide for the ProofPortfolio platform.

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Database migrations tested
- [ ] Environment variables documented
- [ ] Build succeeds without errors
- [ ] Domain data seeded
- [ ] Authentication configured
- [ ] File storage configured (S3)

## Deployment Options

### Option 1: Vercel (Recommended)

**Best for**: Quick deployment, automatic scaling, Next.js optimization

#### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure Environment Variables**
   
   In Vercel dashboard, add:
   ```
   DATABASE_URL=<your-production-postgres-url>
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=<generate-secure-secret>
   GOOGLE_CLIENT_ID=<optional>
   GOOGLE_CLIENT_SECRET=<optional>
   AWS_ACCESS_KEY_ID=<for-file-uploads>
   AWS_SECRET_ACCESS_KEY=<for-file-uploads>
   AWS_S3_BUCKET=<your-bucket-name>
   AWS_REGION=<your-region>
   ```

4. **Set Up Database**
   
   Use **Vercel Postgres** or external provider:
   - [Neon](https://neon.tech) - Serverless Postgres (Recommended)
   - [Supabase](https://supabase.com) - Postgres + Auth
   - [Railway](https://railway.app) - Postgres hosting

5. **Run Migrations**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Pull environment variables
   vercel env pull
   
   # Run migrations
   npx prisma migrate deploy
   
   # Seed database
   npx prisma db seed
   ```

6. **Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: Railway

**Best for**: Full-stack deployment with database included

#### Steps

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   railway init
   ```

4. **Add PostgreSQL**
   ```bash
   railway add postgresql
   ```

5. **Set Environment Variables**
   ```bash
   railway variables set NEXTAUTH_URL=https://your-app.railway.app
   railway variables set NEXTAUTH_SECRET=<your-secret>
   ```

6. **Deploy**
   ```bash
   railway up
   ```

7. **Run Migrations**
   ```bash
   railway run npx prisma migrate deploy
   railway run npx prisma db seed
   ```

### Option 3: Fly.io

**Best for**: Full control, edge deployment

#### Steps

1. **Install Fly CLI**
   ```bash
   # Windows
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **Login**
   ```bash
   fly auth login
   ```

3. **Create App**
   ```bash
   fly launch
   ```

4. **Add PostgreSQL**
   ```bash
   fly postgres create
   fly postgres attach <postgres-app-name>
   ```

5. **Set Secrets**
   ```bash
   fly secrets set NEXTAUTH_SECRET=<your-secret>
   fly secrets set NEXTAUTH_URL=https://your-app.fly.dev
   ```

6. **Deploy**
   ```bash
   fly deploy
   ```

## Database Setup

### Recommended: Neon (Serverless Postgres)

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Add to environment variables as `DATABASE_URL`

### Alternative: Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Get connection string from Settings > Database
3. Use "Connection Pooling" URL for production

## File Storage Setup (S3)

### AWS S3

1. **Create S3 Bucket**
   - Go to AWS Console > S3
   - Create bucket (e.g., `proofportfolio-uploads`)
   - Enable CORS

2. **Create IAM User**
   - Create user with S3 access
   - Save Access Key ID and Secret

3. **Configure CORS**
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["https://your-domain.com"],
       "ExposeHeaders": []
     }
   ]
   ```

### Alternative: Cloudflare R2

1. Create R2 bucket
2. Generate API token
3. Use S3-compatible endpoint

## Post-Deployment

### 1. Run Migrations

```bash
npx prisma migrate deploy
```

### 2. Seed Domain Data

```bash
npx prisma db seed
```

### 3. Verify Deployment

- [ ] Landing page loads
- [ ] Authentication works
- [ ] Database connection successful
- [ ] File uploads work (if configured)

### 4. Set Up Monitoring

**Vercel**: Built-in analytics and monitoring

**Railway**: Built-in metrics

**Custom**: Use services like:
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay
- [Datadog](https://datadoghq.com) - Full monitoring

## Environment Variables Reference

### Required

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<32-char-random-string>
```

### Optional - OAuth

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Optional - File Storage

```env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

## Security Checklist

- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] DATABASE_URL uses SSL (`?sslmode=require`)
- [ ] CORS configured correctly for S3
- [ ] Environment variables never committed to Git
- [ ] OAuth redirect URIs configured
- [ ] Rate limiting enabled (if needed)

## Performance Optimization

### 1. Enable Caching

Add to `next.config.ts`:
```typescript
const nextConfig = {
  images: {
    domains: ['your-s3-bucket.s3.amazonaws.com'],
  },
  experimental: {
    optimizeCss: true,
  },
};
```

### 2. Database Connection Pooling

Use Prisma Data Proxy or connection pooling for serverless:
```env
DATABASE_URL="prisma://..."
```

### 3. CDN for Static Assets

Vercel automatically uses CDN. For others, use Cloudflare.

## Rollback Strategy

### Vercel
- Go to Deployments
- Click "..." on previous deployment
- Click "Promote to Production"

### Railway
```bash
railway rollback
```

### Manual
```bash
git revert HEAD
git push
```

## Troubleshooting

### Build Fails

Check:
- All dependencies in `package.json`
- TypeScript errors: `npx tsc --noEmit`
- Build locally: `npm run build`

### Database Connection Issues

- Verify DATABASE_URL format
- Check SSL mode
- Test connection: `npx prisma db pull`

### Authentication Not Working

- Verify NEXTAUTH_URL matches deployment URL
- Check OAuth redirect URIs
- Ensure NEXTAUTH_SECRET is set

## Maintenance

### Database Backups

**Neon**: Automatic backups included

**Supabase**: Automatic backups

**Custom**: Set up pg_dump cron job

### Updates

```bash
# Update dependencies
npm update

# Update Prisma
npm install prisma@latest @prisma/client@latest

# Run migrations
npx prisma migrate deploy
```

---

**Your production deployment is ready!** 🎉
