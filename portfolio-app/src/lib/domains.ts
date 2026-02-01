import { Domain } from './types';

// Domain Definition Engine
// Predefined domains with enforced structure, proof requirements, and validation rules

export const DOMAINS: Domain[] = [
  {
    id: 'engineer',
    name: 'Engineer',
    description: 'Full-Stack, Backend, Frontend, AI/ML engineers with technical projects',
    requiredSections: [
      {
        id: 'projects',
        name: 'Projects',
        description: 'Technical projects with code and architecture',
        isRequired: true,
        proofRequirements: [
          { type: 'url', description: 'Live demo URL', isMandatory: true },
          { type: 'repo', description: 'GitHub repository', isMandatory: true },
          { type: 'file', description: 'Architecture diagram', isMandatory: true },
        ],
        validationRules: [
          { condition: 'Must have at least one project', errorMessage: 'Add at least one project to publish' },
          { condition: 'System design claims require diagram', errorMessage: 'Include architecture diagram for design claims' },
        ],
      },
      {
        id: 'tech-stack',
        name: 'Tech Stack',
        description: 'Technologies and tools used',
        isRequired: true,
        proofRequirements: [
          { type: 'url', description: 'Project links showing usage', isMandatory: false },
        ],
        validationRules: [],
      },
      {
        id: 'performance',
        name: 'Performance & Scalability',
        description: 'System performance notes',
        isRequired: false,
        proofRequirements: [
          { type: 'metric', description: 'Performance metrics', isMandatory: false },
        ],
        validationRules: [],
      },
    ],
  },
  {
    id: 'architect',
    name: 'Architect',
    description: 'Building and system architects with design and construction work',
    requiredSections: [
      {
        id: 'case-studies',
        name: 'Case Studies',
        description: 'Completed projects with outcomes',
        isRequired: true,
        proofRequirements: [
          { type: 'file', description: 'Drawings or plans', isMandatory: true },
          { type: 'image', description: 'Photos of completed work', isMandatory: true },
          { type: 'outcome', description: 'Project outcomes', isMandatory: true },
        ],
        validationRules: [
          { condition: 'Must include site constraints', errorMessage: 'Document site constraints for each project' },
        ],
      },
    ],
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'UI/UX, Product, Graphic designers with visual work',
    requiredSections: [
      {
        id: 'case-studies',
        name: 'Case Studies',
        description: 'Design projects with process and results',
        isRequired: true,
        proofRequirements: [
          { type: 'file', description: 'Figma or design files', isMandatory: true },
          { type: 'image', description: 'Final designs', isMandatory: true },
          { type: 'outcome', description: 'Results or metrics', isMandatory: false },
        ],
        validationRules: [
          { condition: 'Process must be documented', errorMessage: 'Include design process for each case study' },
        ],
      },
    ],
  },
  {
    id: 'consultant',
    name: 'Consultant',
    description: 'Business and strategy consultants with engagements',
    requiredSections: [
      {
        id: 'engagements',
        name: 'Engagements',
        description: 'Consulting projects with impact',
        isRequired: true,
        proofRequirements: [
          { type: 'outcome', description: 'Client outcomes', isMandatory: true },
          { type: 'file', description: 'Reports or presentations', isMandatory: false },
        ],
        validationRules: [
          { condition: 'Must frame the problem', errorMessage: 'Document problem framing for each engagement' },
        ],
      },
    ],
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    description: 'Product managers with strategy and execution',
    requiredSections: [
      {
        id: 'products',
        name: 'Products',
        description: 'Products launched or managed',
        isRequired: true,
        proofRequirements: [
          { type: 'metric', description: 'Success metrics', isMandatory: true },
          { type: 'url', description: 'Product links', isMandatory: false },
        ],
        validationRules: [
          { condition: 'Must include user impact', errorMessage: 'Document user impact for each product' },
        ],
      },
    ],
  },
  {
    id: 'researcher',
    name: 'Researcher',
    description: 'Academic and industry researchers with publications',
    requiredSections: [
      {
        id: 'publications',
        name: 'Publications',
        description: 'Research papers and findings',
        isRequired: true,
        proofRequirements: [
          { type: 'citation', description: 'Citations or links', isMandatory: true },
          { type: 'file', description: 'Full paper or abstract', isMandatory: false },
        ],
        validationRules: [
          { condition: 'Must describe methodology', errorMessage: 'Include research methodology' },
        ],
      },
    ],
  },
  {
    id: 'marketer',
    name: 'Marketer',
    description: 'Performance and strategy marketers with campaigns',
    requiredSections: [
      {
        id: 'campaigns',
        name: 'Campaigns',
        description: 'Marketing campaigns with results',
        isRequired: true,
        proofRequirements: [
          { type: 'metric', description: 'Performance metrics', isMandatory: true },
          { type: 'url', description: 'Campaign links', isMandatory: false },
        ],
        validationRules: [
          { condition: 'Must include timeframe', errorMessage: 'Specify campaign timeframe' },
        ],
      },
    ],
  },
];

// Helper functions
export function getDomainById(id: string): Domain | undefined {
  return DOMAINS.find(d => d.id === id);
}

export function validatePortfolio(portfolio: any, domain: Domain): string[] {
  const errors: string[] = [];
  // Implement validation logic based on domain rules
  // For now, placeholder
  return errors;
}