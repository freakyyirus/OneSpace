// Example portfolio viewer - Recruiter/Reviewer Mode
// This is a read-only, optimized view for recruiters

export default function PortfolioViewPage({ params }: { params: { slug: string } }) {
    // In production, fetch portfolio from database by slug
    const portfolio = {
        name: 'Alex Chen',
        domain: 'Software Engineer',
        headline: 'Full-Stack Engineer specializing in scalable web applications',
        location: 'San Francisco, CA',
        github: 'https://github.com/alexchen',
        linkedin: 'https://linkedin.com/in/alexchen',
        entries: [
            {
                section: 'Projects',
                title: 'Real-time Analytics Dashboard',
                description: 'Built a real-time analytics platform processing 1M+ events per day',
                role: 'Lead Backend Engineer',
                techStack: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'WebSocket'],
                impact: 'Reduced query time by 60%, handles 10k concurrent users',
                proofs: [
                    { type: 'github', url: 'https://github.com/alexchen/analytics-dashboard' },
                    { type: 'url', url: 'https://demo.analytics-dashboard.com' },
                ],
            },
        ],
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
            {/* Clean Header */}
            <header style={{
                borderBottom: '1px solid var(--color-border)',
                padding: 'var(--spacing-2xl) 0',
                backgroundColor: 'var(--color-bg)',
            }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h1 className="mb-sm">{portfolio.name}</h1>
                    <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                        {portfolio.headline}
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ color: 'var(--color-text-secondary)' }}>
                            📍 {portfolio.location}
                        </div>
                        <a href={portfolio.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            GitHub →
                        </a>
                        <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            LinkedIn →
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ padding: 'var(--spacing-3xl) 0' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    {/* Projects Section */}
                    <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
                        <h2 className="mb-xl">Projects</h2>

                        {portfolio.entries.map((entry, idx) => (
                            <article key={idx} className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                                {/* Proof First - Most Important */}
                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--spacing-md)',
                                    marginBottom: 'var(--spacing-lg)',
                                    padding: 'var(--spacing-md)',
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                }}>
                                    {entry.proofs.map((proof, proofIdx) => (
                                        <a
                                            key={proofIdx}
                                            href={proof.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-secondary"
                                            style={{ fontSize: 'var(--font-size-sm)' }}
                                        >
                                            {proof.type === 'github' && '📦 View Code'}
                                            {proof.type === 'url' && '🔗 Live Demo'}
                                            {proof.type === 'figma' && '🎨 Figma File'}
                                        </a>
                                    ))}
                                </div>

                                {/* Content */}
                                <h3 className="mb-md">{entry.title}</h3>
                                <div className="badge mb-md">{entry.role}</div>

                                <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    {entry.description}
                                </p>

                                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-sm)', fontSize: 'var(--font-size-sm)' }}>
                                        Tech Stack
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                        {entry.techStack.map((tech) => (
                                            <span key={tech} className="badge">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                {entry.impact && (
                                    <div style={{
                                        padding: 'var(--spacing-md)',
                                        backgroundColor: '#ecfdf5',
                                        borderLeft: '3px solid var(--color-success)',
                                        borderRadius: 'var(--radius-sm)',
                                    }}>
                                        <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)' }}>
                                            Impact
                                        </div>
                                        <div style={{ fontSize: 'var(--font-size-sm)' }}>
                                            {entry.impact}
                                        </div>
                                    </div>
                                )}
                            </article>
                        ))}
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid var(--color-border)',
                padding: 'var(--spacing-xl) 0',
                backgroundColor: 'var(--color-bg-secondary)',
                textAlign: 'center',
            }}>
                <div className="container">
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                        This portfolio is powered by ProofPortfolio
                    </p>
                    <a href="/" style={{ fontWeight: 500 }}>
                        Create your own proof-based portfolio →
                    </a>
                </div>
            </footer>
        </div>
    );
}
