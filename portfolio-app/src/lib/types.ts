// Universal Data Model for Proof-First Portfolio Platform

// Domain model (defines professions)
export interface Domain {
  id: string;
  name: string; // e.g., "Engineer", "Architect"
  description: string; // 1-line explanation
  requiredSections: SectionDefinition[]; // Enforced sections for this domain
}

// Section definition within a domain
export interface SectionDefinition {
  id: string;
  name: string; // e.g., "Projects", "Case Studies"
  description: string;
  proofRequirements: ProofRequirement[]; // What proofs are needed
  validationRules: ValidationRule[]; // Rules to enforce
  isRequired: boolean; // Cannot be removed
}

// Proof requirement for a section
export interface ProofRequirement {
  type: 'url' | 'repo' | 'file' | 'image' | 'metric' | 'citation' | 'outcome';
  description: string; // e.g., "Live demo URL", "GitHub repository"
  isMandatory: boolean;
}

// Validation rule
export interface ValidationRule {
  condition: string; // e.g., "Must include diagram for system design claims"
  errorMessage: string;
}

// User model
export interface User {
  id: string;
  email: string;
  name: string;
  domainId: string; // Chosen domain
  createdAt: Date;
}

// Portfolio model (one per user)
export interface Portfolio {
  id: string;
  userId: string;
  domainId: string;
  slug: string;
  title: string;
  overview: string;
  sections: PortfolioSection[]; // Ordered sections
  theme: 'light' | 'dark'; // Customization
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean; // Only if all validations pass
}

// Portfolio section (instance of SectionDefinition)
export interface PortfolioSection {
  id: string;
  sectionDefId: string;
  content: string; // User input
  proofs: Proof[]; // Attached proofs
  order: number; // For customization
}

// Proof model
export interface Proof {
  id: string;
  sectionId: string;
  type: ProofRequirement['type'];
  title: string;
  content: string; // URL, text, etc.
  verificationStatus?: 'pending' | 'verified' | 'failed';
  urlHash?: string | null;
  createdAt: Date;
}

// Note: Designed for PostgreSQL with relations.
// Domains are predefined.
// Users select domain.
// Portfolios enforce domain rules.
// Validation runs on publish.