import { NextResponse } from 'next/server';
import { getAllDomains } from '@/lib/domain-engine/domains';

/**
 * GET /api/domains
 * Returns all domains with their sections (primary and secondary).
 * Used for domain flexibility: clients can show required + optional sections.
 */
export async function GET() {
  const domains = getAllDomains();
  const payload = domains.map((d) => ({
    slug: d.slug,
    name: d.name,
    description: d.description,
    sections: d.sections.map((s) => ({
      slug: s.slug,
      name: s.name,
      description: s.description,
      isRequired: s.isRequired,
      order: s.order,
    })),
  }));
  return NextResponse.json(payload);
}
