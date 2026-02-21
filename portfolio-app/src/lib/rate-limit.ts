/**
 * Simple in-memory rate limiter for API routes.
 * For production at scale, use Redis or Vercel KV.
 */

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

function getKey(prefix: string, id: string): string {
  return `${prefix}:${id}`;
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  let entry = store.get(key);
  if (!entry) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count <= limit) return { ok: true };
  const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
  return { ok: false, retryAfter };
}

export function getClientId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}
