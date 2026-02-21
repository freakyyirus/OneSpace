import { prisma } from './prisma';
import { validatePortfolioForPublish } from './portfolio-proof-validate';
import type { Portfolio, PortfolioSection } from './types';

async function resolveDomainId(domainIdOrSlug: string): Promise<string | null> {
  const byId = await prisma.domain.findUnique({ where: { id: domainIdOrSlug } });
  if (byId) return byId.id;
  const bySlug = await prisma.domain.findUnique({ where: { slug: domainIdOrSlug } });
  return bySlug?.id ?? null;
}

export interface CreatePortfolioInput {
  userId: string;
  domainId: string;
  slug: string;
  title: string;
  overview: string;
  theme: 'light' | 'dark';
  sections: Array<{
    id?: string;
    sectionDefId: string;
    content: string;
    proofs: Array<{ type: string; title?: string; content: string }>;
    order: number;
  }>;
}

export interface UpdatePortfolioInput extends Partial<CreatePortfolioInput> {
  title?: string;
  overview?: string;
  theme?: 'light' | 'dark';
  sections?: CreatePortfolioInput['sections'];
  isPublished?: boolean;
}

function prismaToApiPortfolio(
  p: Awaited<ReturnType<typeof getPortfolioByIdPrisma>>
): Portfolio | null {
  if (!p) return null;
  const metadata = p.metadata;
  const sections: PortfolioSection[] = p.sections.map((ps) => {
    const entry = ps.entries[0];
    const content = (entry?.data as { content?: string })?.content ?? '';
    const proofs = (entry?.proofObjects ?? []).map((po) => ({
      id: po.id,
      sectionId: ps.id,
      type: po.type as PortfolioSection['proofs'][0]['type'],
      title: po.description ?? '',
      content: po.url ?? po.fileUrl ?? '',
      verificationStatus:
        (po.verificationStatus as 'pending' | 'verified' | 'failed') || undefined,
      urlHash: po.urlHash ?? undefined,
      createdAt: po.createdAt,
    }));
    return {
      id: ps.id,
      sectionDefId: ps.domainSection.slug,
      content,
      proofs,
      order: ps.order,
    };
  });
  return {
    id: p.id,
    userId: p.userId,
    domainId: p.domainId,
    slug: p.slug,
    title: metadata?.headline ?? '',
    overview: metadata?.bio ?? '',
    sections,
    theme: (p.theme as 'light' | 'dark') ?? 'light',
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    isPublished: p.isPublished,
  };
}

async function getPortfolioByIdPrisma(id: string) {
  return prisma.portfolio.findUnique({
    where: { id },
    include: {
      metadata: true,
      sections: {
        include: {
          domainSection: true,
          entries: {
            include: { proofObjects: true },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });
}

async function getPortfolioWithDomainPrisma(id: string) {
  return prisma.portfolio.findUnique({
    where: { id },
    include: {
      domain: true,
      metadata: true,
      sections: {
        include: {
          domainSection: true,
          entries: {
            include: { proofObjects: true },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });
}

export async function listPortfoliosByUserId(userId: string): Promise<Portfolio[]> {
  const list = await prisma.portfolio.findMany({
    where: { userId },
    include: {
      metadata: true,
      sections: {
        include: {
          domainSection: true,
          entries: {
            include: { proofObjects: true },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });
  return list.map(prismaToApiPortfolio).filter((p): p is Portfolio => p !== null);
}

export async function getPortfolioById(id: string, userId: string): Promise<Portfolio | null> {
  const p = await getPortfolioByIdPrisma(id);
  if (!p || p.userId !== userId) return null;
  return prismaToApiPortfolio(p);
}

export async function createPortfolio(input: CreatePortfolioInput): Promise<Portfolio> {
  const { userId, domainId: domainIdOrSlug, slug, title, overview, theme, sections } = input;
  const domainId = await resolveDomainId(domainIdOrSlug);
  if (!domainId) throw new Error('Invalid domain');

  const portfolioId = await prisma.$transaction(async (tx) => {
    const port = await tx.portfolio.create({
      data: {
        userId,
        domainId,
        slug,
        theme,
        isPublished: false,
      },
    });
    await tx.portfolioMetadata.create({
      data: {
        portfolioId: port.id,
        headline: title,
        bio: overview,
      },
    });

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const domainSection = await tx.domainSection.findFirst({
        where: { domainId, slug: sec.sectionDefId },
      });
      if (!domainSection) continue;

      const ps = await tx.portfolioSection.create({
        data: {
          portfolioId: port.id,
          domainSectionId: domainSection.id,
          order: sec.order,
        },
      });
      const entry = await tx.entry.create({
        data: {
          portfolioSectionId: ps.id,
          title: sec.content.slice(0, 200) || 'Entry',
          data: { content: sec.content, proofs: sec.proofs },
          order: 0,
        },
      });
      for (const proof of sec.proofs) {
        await tx.proofObject.create({
          data: {
            entryId: entry.id,
            type: proof.type,
            url: proof.content?.startsWith('http') ? proof.content : null,
            description: proof.title ?? null,
          },
        });
      }
    }

    return port.id;
  });

  const result = await getPortfolioByIdPrisma(portfolioId);
  return prismaToApiPortfolio(result)!;
}

export async function updatePortfolio(
  id: string,
  userId: string,
  input: UpdatePortfolioInput
): Promise<Portfolio | null> {
  const existing = await prisma.portfolio.findUnique({
    where: { id },
    include: { metadata: true },
  });
  if (!existing || existing.userId !== userId) return null;

  if (input.isPublished === true) {
    const full = await getPortfolioWithDomainPrisma(id);
    if (!full || full.userId !== userId) return null;
    const domainSlug = full.domain?.slug;
    if (!domainSlug) return null;
    const targetSections =
      input.sections ?? prismaToApiPortfolio(full)?.sections ?? [];
    const { canPublish, blockers } = validatePortfolioForPublish(
      { sections: targetSections },
      domainSlug
    );
    if (!canPublish) {
      throw new Error(`Cannot publish: ${blockers.join('; ')}`);
    }
  }

  await prisma.$transaction(async (tx) => {
    if (input.title !== undefined || input.overview !== undefined) {
      await tx.portfolioMetadata.upsert({
        where: { portfolioId: id },
        create: {
          portfolioId: id,
          headline: input.title ?? '',
          bio: input.overview ?? '',
        },
        update: {
          ...(input.title !== undefined && { headline: input.title }),
          ...(input.overview !== undefined && { bio: input.overview }),
        },
      });
    }
    if (input.theme !== undefined) {
      await tx.portfolio.update({
        where: { id },
        data: { theme: input.theme },
      });
    }
    if (input.isPublished !== undefined) {
      await tx.portfolio.update({
        where: { id },
        data: {
          isPublished: input.isPublished,
          ...(input.isPublished && { publishedAt: new Date() }),
        },
      });
    }
    if (input.sections !== undefined) {
      await tx.portfolioSection.deleteMany({ where: { portfolioId: id } });
      for (let i = 0; i < input.sections.length; i++) {
        const sec = input.sections[i];
        const domainSection = await tx.domainSection.findFirst({
          where: { domainId: existing.domainId, slug: sec.sectionDefId },
        });
        if (!domainSection) continue;

        const ps = await tx.portfolioSection.create({
          data: {
            portfolioId: id,
            domainSectionId: domainSection.id,
            order: sec.order,
          },
        });
        const entry = await tx.entry.create({
          data: {
            portfolioSectionId: ps.id,
            title: sec.content.slice(0, 200) || 'Entry',
            data: { content: sec.content, proofs: sec.proofs },
            order: 0,
          },
        });
        for (const proof of sec.proofs) {
          await tx.proofObject.create({
            data: {
              entryId: entry.id,
              type: proof.type,
              url: proof.content?.startsWith('http') ? proof.content : null,
              description: proof.title ?? null,
            },
          });
        }
      }
    }
  });

  return getPortfolioById(id, userId);
}

export async function deletePortfolio(id: string, userId: string): Promise<boolean> {
  const existing = await prisma.portfolio.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) return false;
  await prisma.portfolio.delete({ where: { id } });
  return true;
}

export async function getPortfolioBySlug(slug: string) {
  return prisma.portfolio.findUnique({
    where: { slug, isPublished: true },
    include: {
      user: { select: { name: true } },
      metadata: true,
      domain: true,
      sections: {
        include: {
          domainSection: true,
          entries: {
            include: { proofObjects: true },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });
}

/** Shape for recruiter view: proofs-first, signal summary */
export type RecruiterPortfolioView = {
  name: string;
  domain: string;
  headline: string;
  location: string;
  github: string | null;
  linkedin: string | null;
  signalSummary: { entryCount: number; proofCount: number; domainName: string };
  entries: Array<{
    section: string;
    title: string;
    description: string;
    role?: string;
    techStack: string[];
    impact?: string;
    proofs: Array<{ type: string; url: string | null }>;
  }>;
};

export function toRecruiterView(
  p: Awaited<ReturnType<typeof getPortfolioBySlug>>
): RecruiterPortfolioView | null {
  if (!p) return null;
  const metadata = p.metadata;
  const entries: RecruiterPortfolioView['entries'] = [];
  let proofCount = 0;
  for (const ps of p.sections) {
    const sectionName = ps.domainSection.name;
    for (const entry of ps.entries) {
      const data = (entry.data as Record<string, unknown>) ?? {};
      const content = typeof data.content === 'string' ? data.content : '';
      const description =
        typeof data.description === 'string' ? data.description : content;
      const role = typeof data.role === 'string' ? data.role : undefined;
      const techStack = Array.isArray(data.tech_stack)
        ? (data.tech_stack as string[])
        : typeof data.tech_stack === 'string'
          ? (data.tech_stack as string).split(',').map((s) => s.trim())
          : [];
      const impact = typeof data.impact === 'string' ? data.impact : undefined;
      const proofs = (entry.proofObjects ?? []).map((po) => {
        proofCount += 1;
        return { type: po.type, url: po.url ?? po.fileUrl };
      });
      entries.push({
        section: sectionName,
        title: entry.title || 'Untitled',
        description,
        role,
        techStack,
        impact,
        proofs,
      });
    }
  }
  return {
    name: p.user?.name ?? metadata?.headline ?? 'Portfolio',
    domain: p.domain?.name ?? 'Portfolio',
    headline: metadata?.headline ?? '',
    location: metadata?.location ?? '',
    github: metadata?.github ?? null,
    linkedin: metadata?.linkedin ?? null,
    signalSummary: {
      entryCount: entries.length,
      proofCount,
      domainName: p.domain?.name ?? '',
    },
    entries,
  };
}
