import { NextResponse } from 'next/server';
import { listPortfoliosByUserId, createPortfolio } from '@/lib/portfolio-db';
import { validateNewPortfolio, sanitizePortfolioForResponse, sanitizePortfolioPayload } from '@/lib/validate';
import { requireAuth, getUserId } from '@/lib/auth';

export async function GET() {
  const sessionOr401 = await requireAuth();
  if (sessionOr401 instanceof NextResponse) return sessionOr401;
  const userId = getUserId(sessionOr401);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const items = await listPortfoliosByUserId(userId);
  const sanitized = items.map(sanitizePortfolioForResponse);
  return NextResponse.json(sanitized);
}

export async function POST(request: Request) {
  const sessionOr401 = await requireAuth();
  if (sessionOr401 instanceof NextResponse) return sessionOr401;
  const userId = getUserId(sessionOr401);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const payload = { ...body, userId };
    const { valid, errors } = validateNewPortfolio(payload);
    if (!valid) return NextResponse.json({ errors }, { status: 400 });
    if (!payload.domainId || !payload.slug) {
      return NextResponse.json(
        { error: 'domainId and slug are required for create' },
        { status: 400 }
      );
    }
    const { title, overview, sections } = sanitizePortfolioPayload(payload);
    const slug = typeof payload.slug === 'string' ? payload.slug.trim().slice(0, 200) : '';
    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }
    const created = await createPortfolio({
      userId,
      domainId: payload.domainId,
      slug,
      title,
      overview,
      theme: payload.theme === 'dark' ? 'dark' : 'light',
      sections,
    });
    return NextResponse.json(sanitizePortfolioForResponse(created), { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
