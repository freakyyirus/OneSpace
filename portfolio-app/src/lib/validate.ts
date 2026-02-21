import { Portfolio } from './types';
import { sanitizeString, sanitizeUrl } from './sanitize';

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null;
}

const TITLE_MAX = 500;
const OVERVIEW_MAX = 10_000;
const SECTION_CONTENT_MAX = 50_000;

export function sanitizePortfolioPayload(payload: {
  title?: unknown;
  overview?: unknown;
  sections?: Array<{
    sectionDefId?: string;
    content?: unknown;
    proofs?: Array<{ type?: string; title?: string; content?: unknown }>;
    order?: number;
  }>;
}) {
  const title = sanitizeString(payload.title, TITLE_MAX);
  const overview = sanitizeString(payload.overview, OVERVIEW_MAX);
  const sections = Array.isArray(payload.sections)
    ? payload.sections.map((s) => ({
        sectionDefId: typeof s.sectionDefId === 'string' ? s.sectionDefId : 'projects',
        content: sanitizeString(s.content, SECTION_CONTENT_MAX),
        proofs: Array.isArray(s.proofs)
          ? (s.proofs as Array<{ type?: string; title?: string; content?: unknown }>).map((p) => {
              const urlOrContent = sanitizeUrl(p.content) ?? sanitizeString(p.content, 2048);
              return {
                type: typeof p.type === 'string' ? p.type : 'url',
                title: sanitizeString(p.title, 500),
                content: urlOrContent,
              };
            })
          : [],
        order: typeof s.order === 'number' ? s.order : 0,
      }))
    : [];
  return { title, overview, sections };
}

export function validateNewPortfolio(payload: unknown): {
  valid: boolean;
  errors?: string[];
} {
  const errors: string[] = [];
  if (!isRecord(payload)) {
    errors.push('Payload is required');
    return { valid: false, errors };
  }
  if (!payload.title || typeof payload.title !== 'string')
    errors.push('title is required and must be a string');
  if (!payload.userId || typeof payload.userId !== 'string')
    errors.push('userId is required and must be a string');
  if (payload.domainId != null && typeof payload.domainId !== 'string')
    errors.push('domainId must be a string');
  if (payload.slug != null && typeof payload.slug !== 'string')
    errors.push('slug must be a string');
  if (payload.overview != null && typeof payload.overview !== 'string')
    errors.push('overview must be a string');
  if (payload.sections != null && !Array.isArray(payload.sections))
    errors.push('sections must be an array');
  if (
    payload.theme != null &&
    (typeof payload.theme !== 'string' || !['light', 'dark'].includes(payload.theme))
  )
    errors.push('theme must be "light" or "dark"');
  return {
    valid: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}

export function sanitizePortfolioForResponse(p: Portfolio) {
  return { ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() };
}