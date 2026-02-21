'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OneSpaceLogo from '../components/Logo';

const TIERS = [
    {
        name: 'Starter',
        for: 'Individual professionals',
        priceId: 'free',
        monthlyPrice: 0,
        annualPrice: 0,
        features: ['1 portfolio', '3 proof types', 'Public URL', 'Basic analytics'],
        cta: 'Get Started',
        href: '/auth/signup',
        highlight: false,
    },
    {
        name: 'Professional',
        for: 'Serious job seekers',
        priceId: 'pro',
        monthlyPrice: 12,
        annualPrice: 10,
        features: ['Unlimited portfolios', 'Custom domain', 'All proof types', 'Priority search ranking', 'Detailed analytics'],
        cta: 'Start Free Trial',
        href: '/auth/signup?plan=pro',
        highlight: true,
    },
    {
        name: 'Teams',
        for: 'Agencies & consultancies',
        priceId: 'teams',
        monthlyPrice: 49,
        annualPrice: 39,
        features: ['5+ seats', 'Shared templates', 'Team analytics', 'White-label option'],
        cta: 'Create Team',
        href: '/auth/signup?plan=teams',
        highlight: false,
    },
    {
        name: 'Recruiter Pro',
        for: 'Hiring managers & HR',
        priceId: 'recruiter',
        monthlyPrice: 199,
        annualPrice: 159,
        features: ['Advanced search filters', 'Verified-only pool', 'ATS integration', 'Outreach tools', 'Candidate comparison'],
        cta: 'Start Sourcing',
        href: '/auth/signup?role=recruiter',
        highlight: true,
        stripe: true,
    },
    {
        name: 'Enterprise',
        for: 'Large organizations',
        priceId: 'enterprise',
        monthlyPrice: 'Custom',
        annualPrice: 'Custom',
        features: ['Custom domains', 'API access', 'Dedicated success manager', 'Custom verification rules'],
        cta: 'Contact Sales',
        href: '/contact',
        highlight: false,
    }
];

const FAQS = [
    {
        q: 'Why charge recruiters instead of candidates?',
        a: 'Candidates build the value of the platform by providing their verified work history. We charge the entities deriving value from discovering trusted talent. This ensures candidates never pay for basic access.',
    },
    {
        q: 'What happens to my data?',
        a: 'You own your data. We store your proofs securely, and you can export or delete your entire portfolio at any time. We never sell your data to third parties.',
    },
    {
        q: 'Can I switch from Monthly to Annual later?',
        a: 'Yes, you can upgrade to annual billing at any time to take advantage of the 20% discount.',
    }
];

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#fafafa', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
            {/* Navigation Layer */}
            <nav style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <OneSpaceLogo style={{ fontSize: '20px', color: '#0f172a' }} />
                </Link>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <Link href="/mission" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Mission</Link>
                    <Link href="/discover" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Discover Talent</Link>
                    <Link href="/auth/login" style={{ textDecoration: 'none', color: '#0f172a', fontSize: '14px', fontWeight: 600 }}>Log in</Link>
                    <Link href="/auth/signup" style={{ padding: '8px 16px', background: '#0f172a', color: 'white', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
                </div>
            </nav>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
                <header style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px' }}>Transparent pricing. <br /> Built for trust.</h1>
                    <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 40px' }}>
                        Whether you are proving your skills or sourcing elite talent, we have a plan designed for you.
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: isAnnual ? 400 : 600, color: isAnnual ? '#64748b' : '#0f172a' }}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            style={{
                                width: '60px', height: '32px', borderRadius: '16px', backgroundColor: '#0f172a', padding: '4px',
                                display: 'flex', justifyContent: isAnnual ? 'flex-end' : 'flex-start', cursor: 'pointer', border: 'none',
                                transition: 'justify-content 0.3s'
                            }}
                        >
                            <motion.div layout style={{ width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%' }} />
                        </button>
                        <span style={{ fontSize: '14px', fontWeight: isAnnual ? 600 : 400, color: isAnnual ? '#0f172a' : '#64748b' }}>
                            Annually <span style={{ color: '#10b981', background: '#ecfdf5', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', marginLeft: '6px' }}>Save 20%</span>
                        </span>
                    </div>
                </header>

                {/* Pricing Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '100px' }}>
                    {TIERS.map((tier) => (
                        <div key={tier.name} style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '32px 24px',
                            border: tier.highlight ? '2px solid #0f172a' : '1px solid #e2e8f0',
                            boxShadow: tier.highlight ? '0 10px 30px rgba(15,23,42,0.1)' : '0 4px 6px rgba(0,0,0,0.02)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {tier.stripe && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>Most Popular for Hiring</div>}

                            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{tier.name}</h3>
                            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px', minHeight: '40px' }}>{tier.for}</p>

                            <div style={{ marginBottom: '32px' }}>
                                {typeof tier.monthlyPrice === 'number' ? (
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                        <span style={{ fontSize: '36px', fontWeight: 800 }}>${isAnnual ? tier.annualPrice : tier.monthlyPrice}</span>
                                        <span style={{ color: '#64748b', fontSize: '14px' }}>/mo</span>
                                    </div>
                                ) : (
                                    <div style={{ fontSize: '36px', fontWeight: 800 }}>{tier.monthlyPrice}</div>
                                )}
                                {typeof tier.monthlyPrice === 'number' && typeof tier.annualPrice === 'number' && isAnnual && tier.monthlyPrice > 0 && (
                                    <div style={{ fontSize: '13px', color: '#10b981', marginTop: '4px' }}>Billed ${tier.annualPrice * 12} yearly</div>
                                )}
                            </div>

                            <div style={{ flex: 1 }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {tier.features.map((feature, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#334155' }}>
                                            <span style={{ color: '#10b981' }}>✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link href={tier.href} style={{
                                display: 'block', textAlign: 'center', padding: '14px', borderRadius: '10px',
                                backgroundColor: tier.highlight ? '#0f172a' : '#f1f5f9',
                                color: tier.highlight ? 'white' : '#0f172a',
                                fontWeight: 600, fontSize: '15px', textDecoration: 'none',
                                transition: 'background 0.2s'
                            }}>
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Comparison Table */}
                <section style={{ marginBottom: '100px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>How we compare</h2>
                    <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px 32px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '16px', color: '#64748b', fontWeight: 600 }}>Feature</th>
                                    <th style={{ padding: '16px', fontWeight: 700, fontSize: '18px' }}>OneSpace</th>
                                    <th style={{ padding: '16px', color: '#64748b', fontWeight: 600 }}>LinkedIn</th>
                                    <th style={{ padding: '16px', color: '#64748b', fontWeight: 600 }}>Behance / GitHub</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Proof Verification', 'Yes - Cryptographic & manual', 'No - Self-reported', 'No - Just hosting'],
                                    ['Domain Specific Schemas', 'Yes - Tailored to role', 'No - One size fits all', 'Only for specific niche'],
                                    ['Recruiter Trust Score', 'Proprietary algorithm', 'None', 'None'],
                                    ['Custom Branding', 'Yes (Pro)', 'No', 'No'],
                                ].map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px', fontWeight: 500 }}>{row[0]}</td>
                                        <td style={{ padding: '16px', fontWeight: 600, color: '#10b981' }}>{row[1]}</td>
                                        <td style={{ padding: '16px', color: '#64748b' }}>{row[2]}</td>
                                        <td style={{ padding: '16px', color: '#64748b' }}>{row[3]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>Frequently Asked Questions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>{faq.q}</h4>
                                <p style={{ color: '#475569', lineHeight: 1.6 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <footer style={{ borderTop: '1px solid #e2e8f0', padding: '40px 24px', textAlign: 'center', color: '#94a3b8', backgroundColor: 'white' }}>
                <p>© {new Date().getFullYear()} OneSpace. The Proof-First Platform.</p>
            </footer>
        </main>
    );
}
