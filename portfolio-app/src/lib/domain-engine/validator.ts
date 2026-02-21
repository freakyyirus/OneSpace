// Proof Validation Engine
import { ProofValidationResult, ProofRuleDefinition, ProofType } from './types';

export interface ProofObject {
    type: ProofType;
    url?: string;
    fileUrl?: string;
    metadata?: Record<string, unknown>;
}

export class ProofValidator {
    /**
     * Validates proof objects against domain rules
     */
    static validateProof(
        proofObjects: ProofObject[],
        rules: ProofRuleDefinition[]
    ): ProofValidationResult {
        const errors: string[] = [];
        const warnings: string[] = [];

        for (const rule of rules) {
            const validProofs = proofObjects.filter(proof =>
                rule.allowedTypes.includes(proof.type)
            );

            if (validProofs.length < rule.minCount) {
                const message = rule.message ||
                    `At least ${rule.minCount} proof object(s) required`;

                if (rule.severity === 'error') {
                    errors.push(message);
                } else {
                    warnings.push(message);
                }
            }

            // Validate individual proof objects
            for (const proof of validProofs) {
                const proofValidation = this.validateProofObject(proof);
                if (!proofValidation.isValid) {
                    if (rule.severity === 'error') {
                        errors.push(...proofValidation.errors);
                    } else {
                        warnings.push(...proofValidation.errors);
                    }
                }
            }
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
        };
    }

    /**
     * Validates individual proof object
     */
    private static validateProofObject(proof: ProofObject): ProofValidationResult {
        const errors: string[] = [];

        switch (proof.type) {
            case 'github':
                if (!proof.url || !this.isValidGitHubUrl(proof.url)) {
                    errors.push('Invalid GitHub URL');
                }
                break;

            case 'url':
                if (!proof.url || !this.isValidUrl(proof.url)) {
                    errors.push('Invalid URL');
                }
                break;

            case 'figma':
                if (!proof.url || !this.isValidFigmaUrl(proof.url)) {
                    errors.push('Invalid Figma URL');
                }
                break;

            case 'file':
            case 'image':
            case 'pdf':
            case 'video':
                if (!proof.fileUrl && !proof.url) {
                    errors.push(`${proof.type} proof must have a file or URL`);
                }
                break;

            case 'metric':
                if (!proof.metadata || typeof proof.metadata.value === 'undefined') {
                    errors.push('Metric proof must have a value');
                }
                break;

            case 'citation':
                if (!proof.url && !proof.metadata?.doi) {
                    errors.push('Citation must have URL or DOI');
                }
                break;
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings: [],
        };
    }

    /**
     * URL validation helpers
     */
    private static isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    private static isValidGitHubUrl(url: string): boolean {
        try {
            const parsed = new URL(url);
            return parsed.hostname === 'github.com' || parsed.hostname === 'www.github.com';
        } catch {
            return false;
        }
    }

    private static isValidFigmaUrl(url: string): boolean {
        try {
            const parsed = new URL(url);
            return parsed.hostname === 'figma.com' || parsed.hostname === 'www.figma.com';
        } catch {
            return false;
        }
    }

    /**
     * Check if portfolio is ready to publish
     */
    static canPublish(
        entries: Array<{ proofObjects: ProofObject[] }>,
        rules: ProofRuleDefinition[]
    ): { canPublish: boolean; blockers: string[] } {
        const blockers: string[] = [];

        if (entries.length === 0) {
            blockers.push('Portfolio must have at least one entry');
            return { canPublish: false, blockers };
        }

        for (const entry of entries) {
            const validation = this.validateProof(entry.proofObjects, rules);
            if (!validation.isValid) {
                blockers.push(...validation.errors);
            }
        }

        return {
            canPublish: blockers.length === 0,
            blockers,
        };
    }
}
