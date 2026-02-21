/**
 * Production env validation.
 * Use getRequiredEnv in app code; fail fast if missing.
 */

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (value == null || value === '') {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return '';
  }
  return value;
}

/** Use when you need DATABASE_URL (e.g. Prisma, seed). */
export function getDatabaseUrl(): string {
  return getRequiredEnv('DATABASE_URL');
}

/** Use for NextAuth. */
export function getNextAuthUrl(): string {
  return getRequiredEnv('NEXTAUTH_URL');
}

/** Use for NextAuth secret. */
export function getNextAuthSecret(): string {
  return getRequiredEnv('NEXTAUTH_SECRET');
}
