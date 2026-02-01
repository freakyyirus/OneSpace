import { NextResponse } from 'next/server';
import { getPortfolios, createPortfolio } from '@/lib/store';
import { validateNewPortfolio, sanitizePortfolioForResponse } from '@/lib/validate';

export async function GET() {
  const items = await getPortfolios();
  const sanitized = items.map(sanitizePortfolioForResponse);
  return NextResponse.json(sanitized);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { valid, errors } = validateNewPortfolio(body);
    if (!valid) return NextResponse.json({ errors }, { status: 400 });
    const created = await createPortfolio(body);
    return NextResponse.json(sanitizePortfolioForResponse(created), { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}