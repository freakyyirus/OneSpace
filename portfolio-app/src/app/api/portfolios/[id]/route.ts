import { NextResponse } from 'next/server';
import {
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from '@/lib/portfolio-db';
import { sanitizePortfolioForResponse, sanitizePortfolioPayload } from '@/lib/validate';
import { requireAuth, getUserId } from '@/lib/auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionOr401 = await requireAuth();
  if (sessionOr401 instanceof NextResponse) return sessionOr401;
  const userId = getUserId(sessionOr401);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const item = await getPortfolioById(id, userId);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(sanitizePortfolioForResponse(item));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionOr401 = await requireAuth();
  if (sessionOr401 instanceof NextResponse) return sessionOr401;
  const userId = getUserId(sessionOr401);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const sanitized = sanitizePortfolioPayload(body);
    const isPublished =
      typeof body.isPublished === 'boolean' ? body.isPublished : undefined;
    const updated = await updatePortfolio(id, userId, {
      ...(body.title !== undefined && { title: sanitized.title }),
      ...(body.overview !== undefined && { overview: sanitized.overview }),
      ...(body.theme === 'dark' && { theme: 'dark' as const }),
      ...(body.theme === 'light' && { theme: 'light' as const }),
      ...(Array.isArray(body.sections) && body.sections.length > 0 && { sections: sanitized.sections }),
      ...(isPublished !== undefined && { isPublished }),
    });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(sanitizePortfolioForResponse(updated));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.startsWith('Cannot publish:')) {
      const blockers = message.replace(/^Cannot publish:\s*/, '').split('; ');
      return NextResponse.json(
        { error: 'Publish validation failed', blockers },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionOr401 = await requireAuth();
  if (sessionOr401 instanceof NextResponse) return sessionOr401;
  const userId = getUserId(sessionOr401);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const ok = await deletePortfolio(id, userId);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
