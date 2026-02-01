# Setup Guide - ProofPortfolio

Complete guide to set up and run the ProofPortfolio platform locally.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ installed ([Download](https://www.postgresql.org/download/))
- **Git** installed
- A code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd portfolio-app
npm install
```

This will install all required packages including:
- Next.js 16
- Prisma ORM
- React 19
- TypeScript
- And all other dependencies

### 2. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

1. **Start PostgreSQL** (if not running)
   ```bash
   # Windows (if installed as service)
   # PostgreSQL should start automatically
   
   # Or start manually
   pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start
   ```

2. **Create Database**
   ```bash
   # Open PostgreSQL command line
   psql -U postgres
   
   # Create database
   CREATE DATABASE proofportfolio;
   
   # Exit
   \q
   ```

#### Option B: Use Docker

```bash
docker run --name proofportfolio-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=proofportfolio \
  -p 5432:5432 \
  -d postgres:15
```

### 3. Configure Environment Variables

Create a `.env` file in the `portfolio-app` directory:

```bash
# In portfolio-app directory
# Create .env file with the following content:
```

```env
# Database Connection
DATABASE_URL="postgresql://postgres:password@localhost:5432/proofportfolio"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

**Important**: 
- Replace `password` with your PostgreSQL password
- Generate a secure `NEXTAUTH_SECRET`:
  ```bash
  # On Windows PowerShell
  -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
  ```

### 4. Initialize Database

Run Prisma migrations to create all tables:

```bash
npx prisma migrate dev --name init
```

This will:
- Create all database tables
- Generate Prisma Client
- Set up the schema

### 5. Seed Domain Data

Populate the database with domain definitions:

```bash
npx prisma db seed
```

This creates:
- 6 profession domains (Engineer, Designer, Architect, etc.)
- Section templates for each domain
- Field definitions
- Validation rules

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the landing page!

## Verify Installation

### Check Database Connection

```bash
npx prisma studio
```

This opens Prisma Studio at `http://localhost:5555` where you can browse your database.

### Check Domain Data

In Prisma Studio, verify:
- `domains` table has 6 entries
- `domain_sections` table has sections for each domain
- `entry_fields` table has field definitions

## Development Workflow

### Making Schema Changes

1. Edit `prisma/schema.prisma`
2. Create migration:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```
3. Prisma Client is auto-generated

### Updating Domain Definitions

1. Edit `src/lib/domain-engine/domains.ts`
2. Re-run seed:
   ```bash
   npx prisma db seed
   ```

### Running Type Checks

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

## Troubleshooting

### Database Connection Failed

**Error**: `Can't reach database server`

**Solution**:
1. Verify PostgreSQL is running
2. Check DATABASE_URL in `.env`
3. Test connection:
   ```bash
   psql -U postgres -d proofportfolio
   ```

### Prisma Client Not Generated

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
npx prisma generate
```

### Port 3000 Already in Use

**Solution**: Use a different port
```bash
PORT=3001 npm run dev
```

### Migration Failed

**Solution**: Reset database (⚠️ deletes all data)
```bash
npx prisma migrate reset
```

## Next Steps

Once setup is complete:

1. **Explore the Landing Page** - `http://localhost:3000`
2. **Try Authentication** - Navigate to `/auth/signup`
3. **Access Dashboard** - `/dashboard` (after signup)
4. **Build a Portfolio** - Select a domain and start building
5. **View Example Portfolios** - Check `/p/alex-chen` (after creating sample data)

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup instructions.

## Getting Help

- Check the main [README.md](./README.md) for architecture details
- Review domain definitions in `src/lib/domain-engine/domains.ts`
- Examine database schema in `prisma/schema.prisma`

---

**You're ready to build proof-based portfolios!** 🚀
