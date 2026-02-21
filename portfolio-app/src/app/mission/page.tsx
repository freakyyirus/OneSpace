import Link from 'next/link';
import OneSpaceLogo from '../components/Logo';

export default function MissionPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#fafafa', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
            {/* Navigation Layer */}
            <nav style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <OneSpaceLogo style={{ fontSize: '20px', color: '#0f172a' }} />
                </Link>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <Link href="/pricing" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Pricing</Link>
                    <Link href="/discover" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Discover Talent</Link>
                    <Link href="/auth/login" style={{ textDecoration: 'none', color: '#0f172a', fontSize: '14px', fontWeight: 600 }}>Log in</Link>
                    <Link href="/auth/signup" style={{ padding: '8px 16px', background: '#0f172a', color: 'white', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
                </div>
            </nav>

            {/* Hero */}
            <header style={{ padding: '100px 24px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
                    The Resume is Broken. <br /> <span style={{ color: '#10b981' }}>Proof is the future.</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.6 }}>
                    For decades, hiring has relied on self-reported claims padded with keywords. We believe the future of professional opportunity belongs to those who can prove what they build.
                </p>
            </header>

            {/* Content Body */}
            <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px 80px' }}>
                <article style={{ backgroundColor: 'white', padding: '60px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '24px' }}>Our Methodology: Proof-First</h2>
                    <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
                        At OneSpace, we operate on a strict principle: <strong>No claim without evidence.</strong> If you cannot link a piece of work — a GitHub repository, a Figma file, a deployed URL, or a peer-reviewed publication — it doesn't belong on your portfolio.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '16px', color: '#0f172a' }}>Domain-Aware Structure</h3>
                    <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
                        Engineers, designers, architects, and product managers all build differently. Why should they use the same generic resume template? OneSpace provides tailored schemas for every major discipline. We don't just host your work; we structure it so recruiters can verify exactly what they are looking for in 30 seconds.
                    </p>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '16px', color: '#0f172a' }}>Zero AI Hallucinations</h3>
                    <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '40px' }}>
                        While AI can help you draft cleaner descriptions, we strictly prohibit generating fake accomplishments. Our systems perform multi-factor validation on all submitted proofs to ensure the work belongs to you and actually exists.
                    </p>

                    <div style={{ backgroundColor: '#f8fafc', padding: '32px', borderRadius: '16px', borderLeft: '4px solid #0f172a' }}>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Transparency Report: Our Standards</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: '#475569' }}>
                            <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#10b981' }}>✓</span> <strong>We verify:</strong> Public repositories, live URLs, collaborative documents, cryptographic signatures, citations.</li>
                            <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#dc2626' }}>✗</span> <strong>We reject:</strong> Unlinked "skills" lists, keyword blobs, unverified endorsements, broken links.</li>
                        </ul>
                    </div>
                </article>
            </section>

            {/* CTA */}
            <section style={{ backgroundColor: '#0f172a', color: 'white', padding: '100px 24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Stop claiming. Start proving.</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <Link href="/auth/signup" style={{ padding: '16px 32px', backgroundColor: '#10b981', color: 'white', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', fontSize: '1.1rem' }}>
                        Build your portfolio
                    </Link>
                </div>
            </section>

            <footer style={{ padding: '40px 24px', textAlign: 'center', color: '#94a3b8', backgroundColor: 'white' }}>
                <p>© {new Date().getFullYear()} OneSpace. The Proof-First Platform.</p>
            </footer>
        </main>
    );
}
