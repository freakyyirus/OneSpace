import Link from 'next/link';
import OneSpaceLogo from '../components/Logo';

export default function DashboardPage() {
    // In production, this would fetch user's portfolios from the database
    const hasPortfolio = false;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
            {/* Dashboard Navigation */}
            <nav style={{
                borderBottom: '1px solid var(--color-border)',
                padding: 'var(--spacing-lg) 0',
                backgroundColor: 'var(--color-bg)',
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <OneSpaceLogo style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text)' }} />
                    </Link>
                    <div style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
                        <Link href="/dashboard">My Portfolios</Link>
                        <div style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                        }}>
                            A
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container section">
                {!hasPortfolio ? (
                    // Empty state - first time user
                    <div style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        textAlign: 'center',
                        padding: 'var(--spacing-3xl) 0',
                    }}>
                        <h1 className="mb-lg">Create Your First OneSpace</h1>
                        <p className="mb-2xl" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
                            Choose your profession to get started with an AI-powered, proof-based portfolio.
                        </p>

                        <div className="grid grid-2" style={{ textAlign: 'left', gap: 'var(--spacing-md)' }}>
                            <DomainCard
                                name="Software Engineer"
                                description="Projects, architecture, tech stack"
                                slug="engineer"
                            />
                            <DomainCard
                                name="Product Designer"
                                description="Case studies, process, outcomes"
                                slug="designer"
                            />
                            <DomainCard
                                name="Architect"
                                description="Projects, drawings, constraints"
                                slug="architect"
                            />
                            <DomainCard
                                name="Consultant"
                                description="Engagements, approach, impact"
                                slug="consultant"
                            />
                            <DomainCard
                                name="Researcher"
                                description="Publications, citations, methodology"
                                slug="researcher"
                            />
                            <DomainCard
                                name="Product Manager"
                                description="Products, strategy, metrics"
                                slug="product-manager"
                            />
                        </div>
                    </div>
                ) : (
                    // User has portfolios
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 'var(--spacing-2xl)',
                        }}>
                            <h1>My Portfolios</h1>
                            <Link href="/dashboard/new" className="btn btn-primary">
                                Create New Portfolio
                            </Link>
                        </div>

                        <div className="grid grid-2">
                            {/* Portfolio cards would go here */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DomainCard({ name, description, slug }: { name: string; description: string; slug: string }) {
    return (
        <Link
            href={`/builder/new?domain=${slug}`}
            className="card"
            style={{
                textDecoration: 'none',
                cursor: 'pointer',
            }}
        >
            <h3 className="mb-sm" style={{ fontSize: 'var(--font-size-lg)' }}>{name}</h3>
            <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 0, color: 'var(--color-text-secondary)' }}>
                {description}
            </p>
        </Link>
    );
}
