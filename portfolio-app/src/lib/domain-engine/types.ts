// Domain Engine Types - Core type definitions

export type ProofType = 
  | 'github'
  | 'url'
  | 'file'
  | 'image'
  | 'pdf'
  | 'figma'
  | 'metric'
  | 'citation'
  | 'video';

export type FieldType = 
  | 'text'
  | 'textarea'
  | 'url'
  | 'file'
  | 'metric'
  | 'date'
  | 'array'
  | 'select';

export type ValidationSeverity = 'error' | 'warning';

export type ValidationRuleType = 
  | 'proof_required'
  | 'min_proof_count'
  | 'url_valid'
  | 'github_valid'
  | 'metric_required'
  | 'date_required';

export interface DomainDefinition {
  slug: string;
  name: string;
  description: string;
  sections: SectionDefinition[];
  validationRules: ValidationRuleDefinition[];
}

export interface SectionDefinition {
  slug: string;
  name: string;
  description: string;
  isRequired: boolean;
  order: number;
  fields: FieldDefinition[];
  proofRules: ProofRuleDefinition[];
}

export interface FieldDefinition {
  slug: string;
  name: string;
  fieldType: FieldType;
  isRequired: boolean;
  order: number;
  placeholder?: string;
  helpText?: string;
  options?: string[]; // For select fields
}

export interface ProofRuleDefinition {
  allowedTypes: ProofType[];
  minCount: number;
  severity: ValidationSeverity;
  message: string;
}

export interface ValidationRuleDefinition {
  ruleType: ValidationRuleType;
  config: Record<string, any>;
  severity: ValidationSeverity;
  message: string;
  appliesTo?: string; // section slug
}

export interface ProofValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
