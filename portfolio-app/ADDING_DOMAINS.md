# Adding a New Domain - Developer Guide

This guide shows how to extend ProofPortfolio with a new professional domain.

## Example: Adding "Marketing Manager" Domain

### Step 1: Define the Domain

Edit `src/lib/domain-engine/domains.ts` and add your domain definition:

```typescript
export const marketingManagerDomain: DomainDefinition = {
  slug: 'marketing-manager',
  name: 'Marketing Manager',
  description: 'For performance marketing and growth marketing professionals',
  
  sections: [
    {
      slug: 'campaigns',
      name: 'Marketing Campaigns',
      description: 'Campaigns you\'ve planned and executed',
      isRequired: true,
      order: 1,
      
      fields: [
        {
          slug: 'title',
          name: 'Campaign Name',
          fieldType: 'text',
          isRequired: true,
          order: 1,
          placeholder: 'Q4 2024 Product Launch Campaign',
        },
        {
          slug: 'objective',
          name: 'Campaign Objective',
          fieldType: 'textarea',
          isRequired: true,
          order: 2,
          placeholder: 'What was the goal?',
          helpText: 'Be specific about what you were trying to achieve',
        },
        {
          slug: 'channels',
          name: 'Marketing Channels',
          fieldType: 'array',
          isRequired: true,
          order: 3,
          placeholder: 'Google Ads, Facebook, Email, Content Marketing',
        },
        {
          slug: 'budget',
          name: 'Budget',
          fieldType: 'text',
          isRequired: false,
          order: 4,
          placeholder: '$50,000',
        },
        {
          slug: 'results',
          name: 'Results / Metrics',
          fieldType: 'textarea',
          isRequired: true,
          order: 5,
          placeholder: '150% ROI, 10k new customers, $500k revenue',
          helpText: 'Quantifiable results required',
        },
      ],
      
      proofRules: [
        {
          allowedTypes: ['url', 'pdf', 'image', 'metric'],
          minCount: 2,
          severity: 'error',
          message: 'Provide campaign documentation, analytics screenshots, or landing pages',
        },
      ],
    },
  ],
  
  validationRules: [
    {
      ruleType: 'min_proof_count',
      config: { minCount: 2 },
      severity: 'warning',
      message: 'Portfolio should have at least 2 campaigns with proof',
      appliesTo: 'campaigns',
    },
  ],
};
```

### Step 2: Register the Domain

Add to the `domainRegistry` in the same file:

```typescript
export const domainRegistry: Record<string, DomainDefinition> = {
  engineer: engineerDomain,
  designer: designerDomain,
  architect: architectDomain,
  consultant: consultantDomain,
  researcher: researcherDomain,
  'product-manager': productManagerDomain,
  'marketing-manager': marketingManagerDomain, // ← Add this
};
```

### Step 3: Update Landing Page

Edit `src/app/page.tsx` - the domain will automatically appear in the "Built for Your Profession" section since it uses `getAllDomains()`.

### Step 4: Seed Database

Run the seed script to add the new domain to the database:

```bash
npx prisma db seed
```

This will:
- Create the domain record
- Create all sections
- Create all fields
- Create validation rules

### Step 5: Test

1. **Restart dev server** (if running)
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```

2. **Visit landing page**
   - Should see "Marketing Manager" in professions grid

3. **Test signup flow**
   - Go to `/auth/signup`
   - Select "Marketing Manager" from dropdown

4. **Test builder**
   - Create a portfolio
   - Verify "Marketing Campaigns" section appears
   - Verify all fields are present
   - Test proof validation

## Domain Design Best Practices

### 1. Proof-First Thinking

Every section MUST have proof requirements:

```typescript
proofRules: [
  {
    allowedTypes: ['url', 'github', 'pdf'], // What types of proof?
    minCount: 1,                             // How many required?
    severity: 'error',                       // Block publishing?
    message: 'Clear message about what proof is needed',
  },
]
```

### 2. Field Design

**Required fields** should be:
- Essential to understanding the work
- Verifiable through proof
- Not redundant

**Optional fields** should be:
- Nice-to-have context
- Not critical for evaluation

### 3. Field Types

Choose the right field type:

- `text` - Short single-line (names, titles)
- `textarea` - Multi-line descriptions
- `url` - Links (must be valid URL)
- `array` - Lists (comma-separated in UI)
- `select` - Predefined options
- `date` - Dates
- `metric` - Numbers with units

### 4. Help Text

Always provide helpful guidance:

```typescript
{
  slug: 'impact',
  name: 'Impact',
  fieldType: 'textarea',
  helpText: 'Quantifiable results preferred. Include metrics like revenue, users, or efficiency gains.',
}
```

### 5. Validation Rules

Add domain-level rules for quality:

```typescript
validationRules: [
  {
    ruleType: 'min_proof_count',
    config: { minCount: 3 },
    severity: 'warning',
    message: 'Strong portfolios have at least 3 projects',
    appliesTo: 'projects', // section slug
  },
]
```

## Proof Type Guidelines

### When to use each proof type:

- **`github`** - Source code repositories
- **`url`** - Live websites, demos, public links
- **`figma`** - Design files
- **`image`** - Screenshots, diagrams, photos
- **`pdf`** - Documents, reports, presentations
- **`video`** - Demos, walkthroughs
- **`metric`** - Quantifiable data points
- **`citation`** - Academic papers, publications

## Example Domains by Profession

### Technical Roles
- Software Engineer ✅
- Data Scientist
- DevOps Engineer
- Security Engineer

### Design Roles
- Product Designer ✅
- UX Researcher
- Graphic Designer
- Motion Designer

### Business Roles
- Product Manager ✅
- Marketing Manager
- Sales Engineer
- Business Analyst

### Creative Roles
- Content Writer
- Video Producer
- Photographer
- Illustrator

### Professional Services
- Consultant ✅
- Architect ✅
- Researcher ✅
- Lawyer

## Testing Checklist

When adding a new domain:

- [ ] Domain appears on landing page
- [ ] Domain appears in signup dropdown
- [ ] Dashboard shows domain correctly
- [ ] Builder loads all sections
- [ ] All fields render correctly
- [ ] Proof validation works
- [ ] Required fields are enforced
- [ ] Help text displays
- [ ] Validation messages appear
- [ ] Can save entries (when API implemented)
- [ ] Portfolio viewer displays correctly

## Common Mistakes

### ❌ Too many required fields
Keep it focused. 3-5 required fields per section is ideal.

### ❌ Vague proof requirements
Be specific about what proof is acceptable.

### ❌ No help text
Always guide users on what to enter.

### ❌ Wrong field types
Use `textarea` for descriptions, not `text`.

### ❌ Weak validation
Every section needs proof requirements.

## Need Help?

- Review existing domains in `domains.ts`
- Check type definitions in `types.ts`
- Test with the validator in `validator.ts`
- See examples in `src/data/examples.ts`

---

**Remember**: The goal is proof-first portfolios. Every domain must enforce verifiable evidence.
