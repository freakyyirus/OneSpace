import { NextResponse } from 'next/server';
import { getPortfolioById, updatePortfolio, deletePortfolio } from '@/lib/store';
import { validateNewPortfolio, sanitizePortfolioForResponse } from '@/lib/validate';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const item = await getPortfolioById(params.id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(sanitizePortfolioForResponse(item));
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { valid, errors } = validateNewPortfolio(body);
    if (!valid) return NextResponse.json({ errors }, { status: 400 });
    const updated = await updatePortfolio(params.id, body);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(sanitizePortfolioForResponse(updated));
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const ok = await deletePortfolio(params.id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}