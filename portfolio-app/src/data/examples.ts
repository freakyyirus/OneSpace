// Example Portfolio Data - For demonstration purposes
// This shows what a complete portfolio looks like in the system

export const exampleEngineerPortfolio = {
    user: {
        name: 'Alex Chen',
        email: 'alex@example.com',
    },
    portfolio: {
        domain: 'engineer',
        slug: 'alex-chen',
        isPublic: true,
        isPublished: true,
        theme: 'light',
    },
    metadata: {
        headline: 'Full-Stack Engineer specializing in scalable web applications',
        bio: 'I build production systems that handle millions of users. Focused on performance, reliability, and clean architecture.',
        location: 'San Francisco, CA',
        github: 'https://github.com/alexchen',
        linkedin: 'https://linkedin.com/in/alexchen',
    },
    entries: [
        {
            section: 'projects',
            title: 'Real-time Analytics Dashboard',
            data: {
                description: 'Built a real-time analytics platform that processes over 1 million events per day. The system provides instant insights to business teams with sub-second query latency.',
                role: 'Lead Backend Engineer',
                tech_stack: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'WebSocket', 'Docker'],
                timeline: '6 months (Jan 2024 - Jun 2024)',
                impact: 'Reduced query time by 60%, handles 10k concurrent users, decreased infrastructure costs by 40%',
            },
            proofObjects: [
                {
                    type: 'github',
                    url: 'https://github.com/alexchen/analytics-dashboard',
                    description: 'Full source code',
                    metadata: {
                        stars: 245,
                        language: 'TypeScript',
                    },
                },
                {
                    type: 'url',
                    url: 'https://demo.analytics-dashboard.com',
                    description: 'Live demo',
                },
                {
                    type: 'video',
                    url: 'https://youtube.com/watch?v=demo',
                    description: 'Product walkthrough',
                },
            ],
            isHighlighted: true,
        },
        {
            section: 'projects',
            title: 'E-commerce Payment Gateway Integration',
            data: {
                description: 'Integrated Stripe payment processing for a high-volume e-commerce platform. Implemented fraud detection, webhook handling, and reconciliation systems.',
                role: 'Backend Engineer',
                tech_stack: ['Python', 'FastAPI', 'PostgreSQL', 'Stripe API', 'Celery'],
                timeline: '3 months (Oct 2023 - Dec 2023)',
                impact: 'Processed $2M+ in transactions, 99.99% uptime, zero payment failures',
            },
            proofObjects: [
                {
                    type: 'github',
                    url: 'https://github.com/alexchen/payment-gateway',
                    description: 'Source code',
                },
                {
                    type: 'pdf',
                    fileUrl: 'https://s3.example.com/architecture-doc.pdf',
                    description: 'Architecture documentation',
                },
            ],
            isHighlighted: false,
        },
        {
            section: 'architecture',
            title: 'Microservices Migration',
            data: {
                description: 'Led the migration from monolith to microservices architecture for a SaaS platform serving 50k+ businesses. Designed service boundaries, API contracts, and deployment strategy.',
                scale: '50k+ businesses, 500k+ end users, 10TB+ data',
            },
            proofObjects: [
                {
                    type: 'image',
                    fileUrl: 'https://s3.example.com/architecture-diagram.png',
                    description: 'System architecture diagram',
                },
                {
                    type: 'pdf',
                    fileUrl: 'https://s3.example.com/migration-plan.pdf',
                    description: 'Migration strategy document',
                },
            ],
            isHighlighted: false,
        },
    ],
};

export const exampleDesignerPortfolio = {
    user: {
        name: 'Sarah Martinez',
        email: 'sarah@example.com',
    },
    portfolio: {
        domain: 'designer',
        slug: 'sarah-martinez',
        isPublic: true,
        isPublished: true,
        theme: 'light',
    },
    metadata: {
        headline: 'Product Designer focused on user-centered design and measurable outcomes',
        bio: 'I design digital products that solve real problems. Every design decision is backed by research and validated with users.',
        location: 'New York, NY',
        website: 'https://sarahdesigns.com',
        linkedin: 'https://linkedin.com/in/sarahmartinez',
    },
    entries: [
        {
            section: 'case-studies',
            title: 'SaaS Onboarding Redesign',
            data: {
                problem: 'Users were dropping off during onboarding. Only 35% completed setup, leading to high churn.',
                role: 'Lead Product Designer',
                process: 'Conducted 20+ user interviews, analyzed drop-off points, created prototypes, ran A/B tests with 5,000 users.',
                outcome: 'Increased completion rate from 35% to 78%, reduced time-to-value from 15 minutes to 3 minutes, decreased support tickets by 45%',
            },
            proofObjects: [
                {
                    type: 'figma',
                    url: 'https://figma.com/file/abc123/onboarding-redesign',
                    description: 'Complete design files',
                },
                {
                    type: 'image',
                    fileUrl: 'https://s3.example.com/before-after.png',
                    description: 'Before/after comparison',
                },
                {
                    type: 'pdf',
                    fileUrl: 'https://s3.example.com/user-research.pdf',
                    description: 'User research findings',
                },
            ],
            isHighlighted: true,
        },
    ],
};
