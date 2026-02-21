'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const DOMAINS = [
    { id: 'software-engineer', name: 'Software Engineer', icon: '💻', desc: 'GitHub, LeetCode, deployed apps' },
    { id: 'product-designer', name: 'Product Designer', icon: '🎨', desc: 'Figma, case studies, live designs' },
    { id: 'product-manager', name: 'Product Manager', icon: '🗺️', desc: 'Roadmaps, metrics, PRDs' },
    { id: 'researcher', name: 'Researcher', icon: '🔬', desc: 'Publications, ORCID, citations' },
];

function OnboardingWizard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get('role');

    const [step, setStep] = useState(role === 'recruiter' ? 'recruiter-setup' : 1);
    const [domainId, setDomainId] = useState('');
    const [slug, setSlug] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        if (step === 1 && !domainId) return;
        if (step === 2 && !slug) return;
        if (typeof step === 'number') setStep(step + 1);
    };

    const handleCreate = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/portfolios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    domainId,
                    slug,
                    title: title || 'My Portfolio',
                    overview: '',
                    sections: []
                }),
            });
            if (res.ok) {
                router.push('/dashboard');
            } else {
                alert('Failed to create portfolio. Slug might be taken.');
                setLoading(false);
            }
        } catch {
            alert('Error creating portfolio');
            setLoading(false);
        }
    };

    if (step === 'recruiter-setup') {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '24px' }}>
                <div style={{ maxWidth: '500px', width: '100%', backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Recruiter Setup</h1>
                    <p style={{ color: '#64748b', marginBottom: '32px' }}>Let's verify your company to access talent.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Company Email</label>
                            <input type="email" placeholder="you@company.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>LinkedIn Profile URL</label>
                            <input type="url" placeholder="https://linkedin.com/in/..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                        </div>
                    </div>

                    <button onClick={() => router.push('/recruiter')} style={{ width: '100%', padding: '14px', backgroundColor: '#0f172a', color: 'white', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', border: 'none' }}>
                        Verify & Continue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ height: '4px', backgroundColor: '#e2e8f0', width: '100%' }}>
                <div style={{ height: '100%', backgroundColor: '#0f172a', width: `${((step as number) / 4) * 100}%`, transition: 'width 0.3s' }} />
            </div>

            <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 24px' }}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>What's your domain?</h1>
                            <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '32px' }}>We tailor your proof modules and validations based on your profession.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {DOMAINS.map(d => (
                                    <button
                                        key={d.id}
                                        onClick={() => setDomainId(d.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: 'white',
                                            border: domainId === d.id ? '2px solid #0f172a' : '1px solid #e2e8f0', borderRadius: '16px', cursor: 'pointer', textAlign: 'left',
                                            boxShadow: domainId === d.id ? '0 4px 12px rgba(15,23,42,0.05)' : 'none', transition: 'all 0.2s'
                                        }}
                                    >
                                        <span style={{ fontSize: '24px' }}>{d.icon}</span>
                                        <div>
                                            <div style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>{d.name}</div>
                                            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>{d.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={handleNext}
                                    disabled={!domainId}
                                    style={{ padding: '14px 32px', backgroundColor: domainId ? '#0f172a' : '#cbd5e1', color: 'white', borderRadius: '10px', fontWeight: 600, cursor: domainId ? 'pointer' : 'not-allowed', border: 'none' }}
                                >
                                    Continue →
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>Claim your URL</h1>
                            <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '32px' }}>This will be your public OneSpace link.</p>

                            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Portfolio URL</label>
                                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden' }}>
                                    <span style={{ padding: '14px', color: '#64748b', backgroundColor: '#f1f5f9', borderRight: '1px solid #cbd5e1', fontSize: '15px' }}>onespace.com/p/</span>
                                    <input
                                        type="text"
                                        value={slug}
                                        onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                        placeholder="alex-chen"
                                        style={{ padding: '14px', border: 'none', background: 'transparent', flex: 1, fontSize: '15px', outline: 'none', color: '#0f172a', fontWeight: 500 }}
                                    />
                                </div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>Only letters, numbers, and dashes.</p>
                            </div>

                            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={() => setStep(1)} style={{ padding: '14px 24px', backgroundColor: 'transparent', color: '#64748b', fontWeight: 600, cursor: 'pointer', border: 'none' }}>
                                    ← Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!slug}
                                    style={{ padding: '14px 32px', backgroundColor: slug ? '#0f172a' : '#cbd5e1', color: 'white', borderRadius: '10px', fontWeight: 600, cursor: slug ? 'pointer' : 'not-allowed', border: 'none' }}
                                >
                                    Continue →
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>Connect Integrations</h1>
                            <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '32px' }}>To verify your work, connect your professional tools.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { name: 'GitHub', desc: 'For code verification', connected: false, color: '#24292e' },
                                    { name: 'Figma', desc: 'For design files', connected: false, color: '#f24e1e' },
                                    { name: 'LinkedIn', desc: 'For basic profile import', connected: true, color: '#0a66c2' },
                                ].map(tool => (
                                    <div key={tool.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: tool.color }} />
                                            <div>
                                                <div style={{ fontSize: '15px', fontWeight: 600 }}>{tool.name}</div>
                                                <div style={{ fontSize: '13px', color: '#64748b' }}>{tool.desc}</div>
                                            </div>
                                        </div>
                                        <button style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, backgroundColor: tool.connected ? '#ecfdf5' : '#f1f5f9', color: tool.connected ? '#10b981' : '#475569', border: 'none', cursor: 'pointer' }}>
                                            {tool.connected ? 'Connected' : 'Connect'}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={() => setStep(2)} style={{ padding: '14px 24px', backgroundColor: 'transparent', color: '#64748b', fontWeight: 600, cursor: 'pointer', border: 'none' }}>
                                    ← Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    style={{ padding: '14px 32px', backgroundColor: '#0f172a', color: 'white', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', border: 'none' }}
                                >
                                    Continue →
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>✨</div>
                                <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>You're all set!</h1>
                                <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '40px' }}>Your environment is ready. Let's start building your proof portfolio.</p>

                                <button
                                    onClick={handleCreate}
                                    disabled={loading}
                                    style={{ padding: '16px 40px', backgroundColor: '#10b981', color: 'white', borderRadius: '12px', fontSize: '18px', fontWeight: 700, cursor: loading ? 'wait' : 'pointer', border: 'none', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}
                                >
                                    {loading ? 'Creating...' : 'Enter Dashboard'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function OnboardingPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
            <OnboardingWizard />
        </Suspense>
    );
}
