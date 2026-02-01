import { PrismaClient } from '@prisma/client';
import { getAllDomains } from '../src/lib/domain-engine/domains';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Get all domain definitions
    const domains = getAllDomains();

    for (const domainDef of domains) {
        console.log(`📋 Creating domain: ${domainDef.name}`);

        // Create or update domain
        const domain = await prisma.domain.upsert({
            where: { slug: domainDef.slug },
            update: {
                name: domainDef.name,
                description: domainDef.description,
                isActive: true,
            },
            create: {
                slug: domainDef.slug,
                name: domainDef.name,
                description: domainDef.description,
                isActive: true,
            },
        });

        // Create sections for this domain
        for (const sectionDef of domainDef.sections) {
            console.log(`  ├─ Section: ${sectionDef.name}`);

            const section = await prisma.domainSection.upsert({
                where: {
                    domainId_slug: {
                        domainId: domain.id,
                        slug: sectionDef.slug,
                    },
                },
                update: {
                    name: sectionDef.name,
                    description: sectionDef.description,
                    isRequired: sectionDef.isRequired,
                    order: sectionDef.order,
                },
                create: {
                    domainId: domain.id,
                    slug: sectionDef.slug,
                    name: sectionDef.name,
                    description: sectionDef.description,
                    isRequired: sectionDef.isRequired,
                    order: sectionDef.order,
                },
            });

            // Create fields for this section
            for (const fieldDef of sectionDef.fields) {
                await prisma.entryField.upsert({
                    where: {
                        domainSectionId_slug: {
                            domainSectionId: section.id,
                            slug: fieldDef.slug,
                        },
                    },
                    update: {
                        name: fieldDef.name,
                        fieldType: fieldDef.fieldType,
                        isRequired: fieldDef.isRequired,
                        order: fieldDef.order,
                        placeholder: fieldDef.placeholder,
                        helpText: fieldDef.helpText,
                    },
                    create: {
                        domainSectionId: section.id,
                        slug: fieldDef.slug,
                        name: fieldDef.name,
                        fieldType: fieldDef.fieldType,
                        isRequired: fieldDef.isRequired,
                        order: fieldDef.order,
                        placeholder: fieldDef.placeholder,
                        helpText: fieldDef.helpText,
                    },
                });
            }

            // Create validation rules for this section
            for (const proofRule of sectionDef.proofRules) {
                await prisma.validationRule.create({
                    data: {
                        domainId: domain.id,
                        domainSectionId: section.id,
                        ruleType: 'proof_required',
                        config: {
                            allowedTypes: proofRule.allowedTypes,
                            minCount: proofRule.minCount,
                        },
                        severity: proofRule.severity,
                        message: proofRule.message,
                    },
                });
            }
        }

        // Create domain-level validation rules
        for (const validationRule of domainDef.validationRules) {
            const appliedSection = validationRule.appliesTo
                ? await prisma.domainSection.findFirst({
                    where: {
                        domainId: domain.id,
                        slug: validationRule.appliesTo,
                    },
                })
                : null;

            await prisma.validationRule.create({
                data: {
                    domainId: domain.id,
                    domainSectionId: appliedSection?.id,
                    ruleType: validationRule.ruleType,
                    config: validationRule.config,
                    severity: validationRule.severity,
                    message: validationRule.message,
                },
            });
        }
    }

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
