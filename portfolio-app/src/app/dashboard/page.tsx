import { redirect } from 'next/navigation';
import Link from 'next/link';
import OneSpaceLogo from '../components/Logo';
import { getServerSession, getUserId } from '@/lib/auth';
import { listPortfoliosByUserId } from '@/lib/portfolio-db';

export default async function DashboardPage() {
  const session = await getServerSession();
  const userId = getUserId(session);
  if (!session?.user?.email || !userId) {
    redirect('/auth/login?callbackUrl=/dashboard');
  }

  const portfolios = await listPortfoliosByUserId(userId);
  const hasPortfolio = portfolios.length > 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
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
            <Link href="/api/auth/signout" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Sign out
            </Link>
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
              {(session.user.name ?? session.user.email ?? 'U').charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div className="container section">
        {!hasPortfolio ? (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            padding: 'var(--spacing-3xl) 0',
          }}>
            <h1 className="mb-lg">Create Your First OneSpace</h1>
            <p className="mb-2xl" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
              Choose your profession to get started with a proof-based portfolio.
            </p>

            <div className="grid grid-2" style={{ textAlign: 'left', gap: 'var(--spacing-md)' }}>
              <DomainCard name="Software Engineer" description="Projects, architecture, tech stack" slug="engineer" />
              <DomainCard name="Product Designer" description="Case studies, process, outcomes" slug="designer" />
              <DomainCard name="Architect" description="Projects, drawings, constraints" slug="architect" />
              <DomainCard name="Consultant" description="Engagements, approach, impact" slug="consultant" />
              <DomainCard name="Researcher" description="Publications, citations, methodology" slug="researcher" />
              <DomainCard name="Product Manager" description="Products, strategy, metrics" slug="product-manager" />
            </div>
          </div>
        ) : (
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
              {portfolios.map(p => (
                <Link key={p.id} href={`/builder/${p.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{p.title || 'Untitled Portfolio'}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
                    {p.sections.length} sections • Last updated {new Date(p.updatedAt).toLocaleDateString()}
                  </p>
                  <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '4px' }}>
                    {p.isPublished ? '🌐 Published' : '📝 Draft'}
                  </span>
                </Link>
              ))}
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
