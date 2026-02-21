// Recruiter/Reviewer Mode: read-only, proofs-first view by slug
import Link from 'next/link';
import { getPortfolioBySlug, toRecruiterView } from '@/lib/portfolio-db';
import { notFound } from 'next/navigation';

export default async function PortfolioViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = await getPortfolioBySlug(slug);
  const portfolio = toRecruiterView(raw);
  if (!portfolio) notFound();

  const { signalSummary } = portfolio;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Clean Header + Signal Summary */}
      <header
        style={{
          borderBottom: '1px solid var(--color-border)',
          padding: 'var(--spacing-2xl) 0',
          backgroundColor: 'var(--color-bg)',
        }}
      >
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 className="mb-sm">{portfolio.name}</h1>
          <p
            style={{
              fontSize: 'var(--font-size-xl)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            {portfolio.headline}
          </p>
          {/* Signal summary: proofs-first signal */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-lg)',
              flexWrap: 'wrap',
              marginBottom: 'var(--spacing-lg)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <span>{signalSummary.entryCount} entries</span>
            <span>{signalSummary.proofCount} proofs</span>
            {signalSummary.domainName && (
              <span className="badge">{signalSummary.domainName}</span>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-xl)',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {portfolio.location && (
              <div style={{ color: 'var(--color-text-secondary)' }}>
                📍 {portfolio.location}
              </div>
            )}
            {portfolio.github && (
              <a
                href={portfolio.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                }}
              >
                GitHub →
              </a>
            )}
            {portfolio.linkedin && (
              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                }}
              >
                LinkedIn →
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content: proofs-first per entry */}
      <main style={{ padding: 'var(--spacing-3xl) 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {portfolio.entries.map((entry, idx) => (
            <article
              key={idx}
              className="card"
              style={{ marginBottom: 'var(--spacing-xl)' }}
            >
              {/* Proofs first */}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-md)',
                  marginBottom: 'var(--spacing-lg)',
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {entry.proofs.map((proof, proofIdx) => (
                  <a
                    key={proofIdx}
                    href={proof.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ fontSize: 'var(--font-size-sm)' }}
                  >
                    {proof.type === 'github' && '📦 View Code'}
                    {proof.type === 'url' && '🔗 Live Demo'}
                    {proof.type === 'figma' && '🎨 Figma File'}
                    {!['github', 'url', 'figma'].includes(proof.type) &&
                      `${proof.type}`}
                  </a>
                ))}
              </div>

              {/* Content */}
              <h3 className="mb-md">{entry.title}</h3>
              {entry.role && <div className="badge mb-md">{entry.role}</div>}

              <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                {entry.description}
              </p>

              {entry.techStack.length > 0 && (
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: 'var(--spacing-sm)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    Tech Stack
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--spacing-sm)',
                      flexWrap: 'wrap',
                    }}
                  >
                    {entry.techStack.map((tech) => (
                      <span key={tech} className="badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.impact && (
                <div
                  style={{
                    padding: 'var(--spacing-md)',
                    backgroundColor: '#ecfdf5',
                    borderLeft: '3px solid var(--color-success)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: 'var(--spacing-xs)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    Impact
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)' }}>
                    {entry.impact}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          padding: 'var(--spacing-xl) 0',
          backgroundColor: 'var(--color-bg-secondary)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <p
            style={{
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            This portfolio is powered by OneSpace
          </p>
          <Link href="/" style={{ fontWeight: 500 }}>
            Create your own proof-based portfolio →
          </Link>
        </div>
      </footer>
    </div>
  );
}
