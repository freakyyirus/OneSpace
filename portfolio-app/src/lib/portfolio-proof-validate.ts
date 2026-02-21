/**
 * Server-side proof validation and publish gate.
 * Uses domain-engine ProofValidator and domain proof rules.
 */
import { getDomainBySlug } from '@/lib/domain-engine/domains';
import { ProofValidator, type ProofObject } from '@/lib/domain-engine/validator';

export type SectionForValidation = {
  sectionDefId: string;
  proofs: Array<{ type: string; title?: string; content?: string }>;
};

function mapProofToValidatorObject(proof: {
  type: string;
  title?: string;
  content?: string;
}): ProofObject {
  const type = proof.type === 'repo' ? 'github' : (proof.type as ProofObject['type']);
  const content = proof.content ?? '';
  const isUrl = content.startsWith('http://') || content.startsWith('https://');
  return {
    type,
    url: ['github', 'url', 'figma', 'citation'].includes(type) && isUrl ? content : undefined,
    fileUrl: ['file', 'image', 'pdf', 'video'].includes(type) ? content || undefined : undefined,
    metadata:
      type === 'metric' && content !== ''
        ? { value: Number.isNaN(Number(content)) ? content : Number(content) }
        : type === 'citation' && proof.content
          ? { doi: proof.content }
          : undefined,
  };
}

/**
 * Validates portfolio sections against domain proof rules.
 * Returns whether the portfolio can be published and any blocker messages.
 */
export function validatePortfolioForPublish(
  portfolio: { sections: SectionForValidation[] },
  domainSlug: string
): { canPublish: boolean; blockers: string[] } {
  const domain = getDomainBySlug(domainSlug);
  if (!domain) {
    return { canPublish: false, blockers: ['Unknown domain'] };
  }

  const blockers: string[] = [];

  for (const section of portfolio.sections) {
    const sectionDef = domain.sections.find((s) => s.slug === section.sectionDefId);
    if (!sectionDef || sectionDef.proofRules.length === 0) continue;

    const proofObjects: ProofObject[] = section.proofs.map(mapProofToValidatorObject);
    const result = ProofValidator.canPublish(
      [{ proofObjects }],
      sectionDef.proofRules
    );
    if (!result.canPublish) {
      blockers.push(...result.blockers);
    }
  }

  return {
    canPublish: blockers.length === 0,
    blockers,
  };
}
