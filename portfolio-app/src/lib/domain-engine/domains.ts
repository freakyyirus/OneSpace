// Domain Definitions - Profession-specific portfolio structures
import { DomainDefinition } from './types';

// ============================================
// SOFTWARE ENGINEER DOMAIN
// ============================================

export const engineerDomain: DomainDefinition = {
    slug: 'engineer',
    name: 'Software Engineer',
    description: 'For full-stack, backend, frontend, AI/ML, and systems engineers',
    sections: [
        {
            slug: 'projects',
            name: 'Projects',
            description: 'Real software projects you\'ve built',
            isRequired: true,
            order: 1,
            fields: [
                {
                    slug: 'title',
                    name: 'Project Title',
                    fieldType: 'text',
                    isRequired: true,
                    order: 1,
                    placeholder: 'Real-time Analytics Dashboard',
                },
                {
                    slug: 'description',
                    name: 'Description',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 2,
                    placeholder: 'What does this project do? What problem does it solve?',
                    helpText: 'Be specific. Avoid buzzwords.',
                },
                {
                    slug: 'role',
                    name: 'Your Role',
                    fieldType: 'text',
                    isRequired: true,
                    order: 3,
                    placeholder: 'Lead Backend Engineer',
                },
                {
                    slug: 'tech_stack',
                    name: 'Tech Stack',
                    fieldType: 'array',
                    isRequired: true,
                    order: 4,
                    placeholder: 'React, Node.js, PostgreSQL, Redis',
                },
                {
                    slug: 'timeline',
                    name: 'Timeline',
                    fieldType: 'text',
                    isRequired: false,
                    order: 5,
                    placeholder: '6 months (Jan 2024 - Jun 2024)',
                },
                {
                    slug: 'impact',
                    name: 'Impact / Outcomes',
                    fieldType: 'textarea',
                    isRequired: false,
                    order: 6,
                    placeholder: 'Reduced query time by 60%, handles 10k concurrent users',
                    helpText: 'Quantifiable results preferred',
                },
            ],
            proofRules: [
                {
                    allowedTypes: ['github', 'url', 'video'],
                    minCount: 1,
                    severity: 'error',
                    message: 'Every project must have at least one proof link (GitHub repo, live URL, or demo video)',
                },
            ],
        },
        {
            slug: 'architecture',
            name: 'System Architecture',
            description: 'Systems you\'ve designed or significantly contributed to',
            isRequired: false,
            order: 2,
            fields: [
                {
                    slug: 'title',
                    name: 'System Name',
                    fieldType: 'text',
                    isRequired: true,
                    order: 1,
                },
                {
                    slug: 'description',
                    name: 'Architecture Description',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 2,
                    helpText: 'Describe the system design, key decisions, and trade-offs',
                },
                {
                    slug: 'scale',
                    name: 'Scale / Metrics',
                    fieldType: 'textarea',
                    isRequired: false,
                    order: 3,
                    placeholder: '1M daily active users, 50TB data processed daily',
                },
            ],
            proofRules: [
                {
                    allowedTypes: ['image', 'pdf', 'url'],
                    minCount: 1,
                    severity: 'error',
                    message: 'Include architecture diagrams or documentation',
                },
            ],
        },
    ],
    validationRules: [
        {
            ruleType: 'min_proof_count',
            config: { minCount: 3 },
            severity: 'warning',
            message: 'Portfolio should have at least 3 projects with proof',
            appliesTo: 'projects',
        },
    ],
};

// ============================================
// DESIGNER DOMAIN (UI/UX, Product)
// ============================================

export const designerDomain: DomainDefinition = {
    slug: 'designer',
    name: 'Product Designer',
    description: 'For UI/UX, product, and visual designers',
    sections: [
        {
            slug: 'case-studies',
            name: 'Case Studies',
            description: 'Design projects with process and outcomes',
            isRequired: true,
            order: 1,
            fields: [
                {
                    slug: 'title',
                    name: 'Project Title',
                    fieldType: 'text',
                    isRequired: true,
                    order: 1,
                },
                {
                    slug: 'problem',
                    name: 'Problem Statement',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 2,
                    helpText: 'What user problem were you solving?',
                },
                {
                    slug: 'role',
                    name: 'Your Role',
                    fieldType: 'text',
                    isRequired: true,
                    order: 3,
                },
                {
                    slug: 'process',
                    name: 'Design Process',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 4,
                    helpText: 'Research, ideation, prototyping, testing',
                },
                {
                    slug: 'outcome',
                    name: 'Outcome / Impact',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 5,
                    placeholder: 'Increased conversion by 25%, reduced support tickets by 40%',
                },
            ],
            proofRules: [
                {
                    allowedTypes: ['figma', 'image', 'url', 'pdf'],
                    minCount: 2,
                    severity: 'error',
                    message: 'Include design artifacts (Figma files, mockups, or live product)',
                },
            ],
        },
    ],
    validationRules: [
        {
            ruleType: 'min_proof_count',
            config: { minCount: 2 },
            severity: 'error',
            message: 'At least 2 case studies with design artifacts required',
            appliesTo: 'case-studies',
        },
    ],
};

// ============================================
// ARCHITECT DOMAIN
// ============================================

export const architectDomain: DomainDefinition = {
    slug: 'architect',
    name: 'Architect',
    description: 'For building architects and urban designers',
    sections: [
        {
            slug: 'projects',
            name: 'Projects',
            description: 'Architectural projects and designs',
            isRequired: true,
            order: 1,
            fields: [
                {
                    slug: 'title',
                    name: 'Project Name',
                    fieldType: 'text',
                    isRequired: true,
                    order: 1,
                },
                {
                    slug: 'type',
                    name: 'Project Type',
                    fieldType: 'select',
                    isRequired: true,
                    order: 2,
                    options: ['Residential', 'Commercial', 'Institutional', 'Urban Planning', 'Interior'],
                },
                {
                    slug: 'description',
                    name: 'Project Description',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 3,
                },
                {
                    slug: 'constraints',
                    name: 'Design Constraints',
                    fieldType: 'textarea',
                    isRequired: false,
                    order: 4,
                    helpText: 'Budget, site, regulations, client requirements',
                },
                {
                    slug: 'outcome',
                    name: 'Outcome',
                    fieldType: 'textarea',
                    isRequired: false,
                    order: 5,
                },
            ],
            proofRules: [
                {
                    allowedTypes: ['image', 'pdf'],
                    minCount: 3,
                    severity: 'error',
                    message: 'Include drawings, renderings, or photos',
                },
            ],
        },
    ],
    validationRules: [],
};

// ============================================
// CONSULTANT DOMAIN
// ============================================

export const consultantDomain: DomainDefinition = {
    slug: 'consultant',
    name: 'Consultant',
    description: 'For strategy, management, and technical consultants',
    sections: [
        {
            slug: 'engagements',
            name: 'Client Engagements',
            description: 'Consulting projects and outcomes',
            isRequired: true,
            order: 1,
            fields: [
                {
                    slug: 'title',
                    name: 'Engagement Title',
                    fieldType: 'text',
                    isRequired: true,
                    order: 1,
                    placeholder: 'Digital Transformation for Fortune 500 Retailer',
                },
                {
                    slug: 'client_type',
                    name: 'Client Type',
                    fieldType: 'text',
                    isRequired: false,
                    order: 2,
                    placeholder: 'Fortune 500 Retail Company',
                    helpText: 'Keep confidential if needed',
                },
                {
                    slug: 'problem',
                    name: 'Problem / Challenge',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 3,
                },
                {
                    slug: 'approach',
                    name: 'Your Approach',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 4,
                },
                {
                    slug: 'impact',
                    name: 'Impact / Results',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 5,
                    placeholder: '$5M cost savings, 30% efficiency improvement',
                },
            ],
            proofRules: [
                {
                    allowedTypes: ['pdf', 'url', 'metric'],
                    minCount: 1,
                    severity: 'warning',
                    message: 'Include case study, report, or quantifiable metrics',
                },
            ],
        },
    ],
    validationRules: [],
};

// ============================================
// RESEARCHER DOMAIN
// ============================================

export const researcherDomain: DomainDefinition = {
    slug: 'researcher',
    name: 'Researcher',
    description: 'For academic and industry researchers',
    sections: [
        {
            slug: 'publications',
            name: 'Publications',
            description: 'Published research papers and articles',
            isRequired: true,
            order: 1,
            fields: [
                {
                    slug: 'title',
                    name: 'Paper Title',
                    fieldType: 'text',
                    isRequired: true,
                    order: 1,
                },
                {
                    slug: 'authors',
                    name: 'Authors',
                    fieldType: 'text',
                    isRequired: true,
                    order: 2,
                },
                {
                    slug: 'venue',
                    name: 'Publication Venue',
                    fieldType: 'text',
                    isRequired: true,
                    order: 3,
                    placeholder: 'NeurIPS 2024, Nature, ACM SIGCHI',
                },
                {
                    slug: 'abstract',
                    name: 'Abstract',
                    fieldType: 'textarea',
                    isRequired: false,
                    order: 4,
                },
                {
                    slug: 'citations',
                    name: 'Citation Count',
                    fieldType: 'metric',
                    isRequired: false,
                    order: 5,
                },
            ],
            proofRules: [
                {
                    allowedTypes: ['url', 'pdf', 'citation'],
                    minCount: 1,
                    severity: 'error',
                    message: 'Link to published paper (DOI, arXiv, Google Scholar)',
                },
            ],
        },
    ],
    validationRules: [],
};

// ============================================
// PRODUCT MANAGER DOMAIN
// ============================================

export const productManagerDomain: DomainDefinition = {
    slug: 'product-manager',
    name: 'Product Manager',
    description: 'For product managers and product leaders',
    sections: [
        {
            slug: 'products',
            name: 'Products',
            description: 'Products you\'ve shipped or managed',
            isRequired: true,
            order: 1,
            fields: [
                {
                    slug: 'title',
                    name: 'Product Name',
                    fieldType: 'text',
                    isRequired: true,
                    order: 1,
                },
                {
                    slug: 'description',
                    name: 'Product Description',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 2,
                },
                {
                    slug: 'role',
                    name: 'Your Role',
                    fieldType: 'text',
                    isRequired: true,
                    order: 3,
                },
                {
                    slug: 'strategy',
                    name: 'Product Strategy',
                    fieldType: 'textarea',
                    isRequired: false,
                    order: 4,
                },
                {
                    slug: 'metrics',
                    name: 'Key Metrics / Impact',
                    fieldType: 'textarea',
                    isRequired: true,
                    order: 5,
                    placeholder: '100k MAU, $2M ARR, 4.8 App Store rating',
                },
            ],
            proofRules: [
                {
                    allowedTypes: ['url', 'image', 'pdf'],
                    minCount: 1,
                    severity: 'error',
                    message: 'Link to live product or product documentation',
                },
            ],
        },
    ],
    validationRules: [],
};

// ============================================
// DOMAIN REGISTRY
// ============================================

export const domainRegistry: Record<string, DomainDefinition> = {
    engineer: engineerDomain,
    designer: designerDomain,
    architect: architectDomain,
    consultant: consultantDomain,
    researcher: researcherDomain,
    'product-manager': productManagerDomain,
};

export const getAllDomains = (): DomainDefinition[] => {
    return Object.values(domainRegistry);
};

export const getDomainBySlug = (slug: string): DomainDefinition | undefined => {
    return domainRegistry[slug];
};
