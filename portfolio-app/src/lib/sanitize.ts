/**
 * Sanitize user input for storage and display to prevent XSS.
 */

const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const ON_EVENT_REGEX = /\s+on\w+\s*=\s*["'][^"']*["']/gi;
const DEFAULT_MAX_LEN = 50_000;

export function sanitizeString(
  value: unknown,
  maxLen: number = DEFAULT_MAX_LEN
): string {
  if (value == null) return '';
  const s = String(value).trim();
  let out = s
    .replace(SCRIPT_REGEX, '')
    .replace(ON_EVENT_REGEX, '');
  if (out.length > maxLen) out = out.slice(0, maxLen);
  return out;
}

export function sanitizeUrl(value: unknown): string | null {
  if (value == null || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    if (!['http:', 'https:'].includes(u.protocol)) return null;
    return u.href;
  } catch {
    return null;
  }
}
