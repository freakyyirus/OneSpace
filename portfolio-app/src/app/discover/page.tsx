'use client';

import { useState } from 'react';
import Link from 'next/link';
import OneSpaceLogo from '../components/Logo';

const DOMAINS = ['All Profiles', 'Engineering', 'Design', 'Product', 'Research'];
const SORTS = ['Highest Proof Score', 'Most Verified', 'Recently Updated'];

const MOCK_PROFILES = [
    { id: 1, name: 'Alex C.', role: 'Senior Software Engineer', domain: 'Engineering', score: 96, verifiedCount: 14, lastUpdated: '2h ago', preview: ['GitHub Repo', 'Live Frontend', 'System Design PDF'] },
    { id: 2, name: 'Taylor S.', role: 'Product Designer', domain: 'Design', score: 92, verifiedCount: 9, lastUpdated: '1d ago', preview: ['Figma File', 'Case Study', 'Usability Metrics'] },
    { id: 3, name: 'Jordan B.', role: 'Technical PM', domain: 'Product', score: 88, verifiedCount: 7, lastUpdated: '3d ago', preview: ['Notion Roadmap', 'Launch Metrics', 'PRD'] },
    { id: 4, name: 'Sam R.', role: 'Frontend Developer', domain: 'Engineering', score: 94, verifiedCount: 11, lastUpdated: '4h ago', preview: ['CodeSandbox', 'GitHub', 'Live URL'] },
    { id: 5, name: 'Casey D.', role: 'UX Researcher', domain: 'Research', score: 91, verifiedCount: 8, lastUpdated: '2d ago', preview: ['Interview Scripts', 'Synthesis Deck', 'Survey Data'] },
    { id: 6, name: 'Drew W.', role: 'Staff Engineer', domain: 'Engineering', score: 99, verifiedCount: 22, lastUpdated: '1h ago', preview: ['Architecture Diagram', 'Open Source PRs', 'Tech Talk Video'] },
];

export default function DiscoverPage() {
    const [activeDomain, setActiveDomain] = useState('All Profiles');
    const [activeSort, setActiveSort] = useState('Highest Proof Score');

    const filtered = MOCK_PROFILES.filter(p => activeDomain === 'All Profiles' || p.domain === activeDomain);

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
            {/* Navigation */}
            <nav style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 10 }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <OneSpaceLogo style={{ fontSize: '20px', color: '#0f172a' }} />
                </Link>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <Link href="/pricing" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Recruiter Pricing</Link>
                    <Link href="/auth/login" style={{ textDecoration: 'none', color: '#0f172a', fontSize: '14px', fontWeight: 600 }}>Log in</Link>
                </div>
            </nav>

            {/* Header */}
            <header style={{ padding: '60px 24px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>Verified Talent Pool</h1>
                        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '500px' }}>
                            Discover professionals ranked by cryptographic proof and verified work history, not resume keywords.
                        </p>
                    </div>
                    <div>
                        <Link href="/auth/signup?role=recruiter" style={{ padding: '12px 24px', backgroundColor: '#0f172a', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
                            Request Recruiter Access
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

                {/* Filters Sidebar */}
                <aside style={{ width: '250px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Domain</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {DOMAINS.map(d => (
                                <li key={d}>
                                    <button
                                        onClick={() => setActiveDomain(d)}
                                        style={{
                                            width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                            fontSize: '14px', fontWeight: 500,
                                            backgroundColor: activeDomain === d ? '#eff6ff' : 'transparent',
                                            color: activeDomain === d ? '#2563eb' : '#475569',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {d}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Sort By</h3>
                        <select
                            value={activeSort}
                            onChange={(e) => setActiveSort(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: 'white', cursor: 'pointer' }}
                        >
                            {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div style={{ padding: '20px', backgroundColor: '#ecfdf5', borderRadius: '12px', border: '1px solid #10b981' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#065f46', marginBottom: '8px' }}>Recruiter Pro</h4>
                        <p style={{ fontSize: '13px', color: '#065f46', marginBottom: '16px', lineHeight: 1.5 }}>
                            Unlock full names, unblur portfolios, and access advanced ATS integration.
                        </p>
                        <Link href="/pricing" style={{ fontSize: '13px', fontWeight: 600, color: '#059669', textDecoration: 'underline' }}>View Pricing</Link>
                    </div>
                </aside>

                {/* Results Grid */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                        {filtered.map(profile => (
                            <div key={profile.id} style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div>
                                            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{profile.name}</h4>
                                            <p style={{ fontSize: '14px', color: '#64748b' }}>{profile.role}</p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                                                {profile.score} Score
                                            </div>
                                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{profile.lastUpdated}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#f1f5f9', borderRadius: '6px', color: '#475569', fontWeight: 500 }}>
                                            ✓ {profile.verifiedCount} Verified Proofs
                                        </span>
                                        <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#f1f5f9', borderRadius: '6px', color: '#475569', fontWeight: 500 }}>
                                            {profile.domain}
                                        </span>
                                    </div>
                                </div>

                                {/* Blurred Preview */}
                                <div style={{ padding: '24px', backgroundColor: '#fafafa', flex: 1, position: 'relative' }}>
                                    <div style={{ filter: 'blur(4px)', opacity: 0.7, pointerEvents: 'none', userSelect: 'none' }}>
                                        <h5 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '12px' }}>Recent Work Structure</h5>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {profile.preview.map((p, i) => (
                                                <div key={i} style={{ padding: '12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', color: '#475569' }}>
                                                    Attachment: <span style={{ fontWeight: 600 }}>{p}</span>
                                                    <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', width: '80%', marginTop: '8px' }} />
                                                    <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', width: '60%', marginTop: '6px' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Overlay CTA */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to top, rgba(250,250,250,0.9), rgba(250,250,250,0.4))' }}>
                                        <Link href="/auth/signup?role=recruiter" style={{ padding: '10px 20px', backgroundColor: 'white', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                            Unlock Profile
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
