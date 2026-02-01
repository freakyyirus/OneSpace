import { Portfolio } from './types';

export function validateNewPortfolio(payload: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!payload) {
    errors.push('Payload is required');
    return { valid: false, errors };
  }
  if (!payload.title || typeof payload.title !== 'string') errors.push('title is required and must be a string');
  if (!payload.userId || typeof payload.userId !== 'string') errors.push('userId is required and must be a string');
  if (payload.overview && typeof payload.overview !== 'string') errors.push('overview must be a string');
  if (payload.sections && !Array.isArray(payload.sections)) errors.push('sections must be an array');
  if (payload.theme && !['light', 'dark'].includes(payload.theme)) errors.push('theme must be "light" or "dark"');
  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}

export function sanitizePortfolioForResponse(p: Portfolio) {
  return { ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() };
}