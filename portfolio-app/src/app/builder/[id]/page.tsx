'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { getDomainBySlug } from '@/lib/domain-engine/domains';
import type { Portfolio } from '@/lib/types';

export default function BuilderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/portfolios/${id}`)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setPortfolio(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const domain = portfolio ? getDomainBySlug(portfolio.domainId) : null;

    useEffect(() => {
        if (domain && domain.sections.length > 0 && !activeSection) {
            setActiveSection(domain.sections[0].slug);
        }
    }, [domain, activeSection]);

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Builder...</div>;
    if (!portfolio || !domain) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Portfolio or Domain not found</div>;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Builder Header */}
            <header style={{
                borderBottom: '1px solid var(--color-border)',
                padding: 'var(--spacing-md) 0',
                backgroundColor: 'var(--color-bg)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                        <Link href="/dashboard" style={{ color: 'var(--color-text-secondary)' }}>
                            ← Back
                        </Link>
                        <div>
                            <div style={{ fontWeight: 600 }}>My Portfolio</div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                {domain.name}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <button className="btn btn-secondary">Save Draft</button>
                        <button className="btn btn-primary">Publish</button>
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1 }}>
                {/* Sidebar - Section Navigation */}
                <aside style={{
                    width: '250px',
                    borderRight: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    padding: 'var(--spacing-xl)',
                }}>
                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
                            SECTIONS
                        </h3>
                        {domain.sections.map((section) => (
                            <button
                                key={section.slug}
                                onClick={() => setActiveSection(section.slug)}
                                style={{
                                    width: '100%',
                                    padding: 'var(--spacing-md)',
                                    textAlign: 'left',
                                    border: 'none',
                                    background: activeSection === section.slug ? 'var(--color-bg)' : 'transparent',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    marginBottom: 'var(--spacing-sm)',
                                    fontWeight: activeSection === section.slug ? 600 : 400,
                                    color: activeSection === section.slug ? 'var(--color-primary)' : 'var(--color-text)',
                                }}
                            >
                                {section.name}
                                {section.isRequired && (
                                    <span style={{ color: 'var(--color-error)', marginLeft: 'var(--spacing-xs)' }}>*</span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div style={{
                        padding: 'var(--spacing-md)',
                        backgroundColor: 'var(--color-bg)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--font-size-sm)',
                    }}>
                        <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>
                            Validation Status
                        </div>
                        <div style={{ color: 'var(--color-text-secondary)' }}>
                            <div>✓ 0 entries added</div>
                            <div>⚠ Proof required</div>
                        </div>
                    </div>
                </aside>

                {/* Main Content - Entry Editor */}
                <main style={{ flex: 1, padding: 'var(--spacing-xl)', backgroundColor: 'var(--color-bg)' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {domain.sections
                            .filter(section => section.slug === activeSection)
                            .map((section) => (
                                <div key={section.slug}>
                                    <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                                        <h2 className="mb-sm">{section.name}</h2>
                                        <p style={{ color: 'var(--color-text-secondary)' }}>
                                            {section.description}
                                        </p>
                                    </div>

                                    {/* Proof Requirements Alert */}
                                    {section.proofRules.length > 0 && (
                                        <div style={{
                                            padding: 'var(--spacing-lg)',
                                            backgroundColor: '#fef3c7',
                                            border: '1px solid #fbbf24',
                                            borderRadius: 'var(--radius-md)',
                                            marginBottom: 'var(--spacing-2xl)',
                                        }}>
                                            <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-sm)', color: '#92400e' }}>
                                                Proof Required
                                            </div>
                                            {section.proofRules.map((rule, idx) => (
                                                <div key={idx} style={{ fontSize: 'var(--font-size-sm)', color: '#92400e' }}>
                                                    {rule.message}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Entry Form */}
                                    <div className="card">
                                        <h3 className="mb-lg">Add New Entry</h3>

                                        <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                            {section.fields.map((field) => (
                                                <div key={field.slug}>
                                                    <label style={{
                                                        display: 'block',
                                                        marginBottom: 'var(--spacing-sm)',
                                                        fontWeight: 500,
                                                    }}>
                                                        {field.name}
                                                        {field.isRequired && <span style={{ color: 'var(--color-error)' }}> *</span>}
                                                    </label>

                                                    {field.fieldType === 'textarea' ? (
                                                        <textarea
                                                            name={field.slug}
                                                            required={field.isRequired}
                                                            placeholder={field.placeholder}
                                                            rows={4}
                                                            style={{
                                                                width: '100%',
                                                                padding: '0.75rem',
                                                                border: '1px solid var(--color-border)',
                                                                borderRadius: 'var(--radius-md)',
                                                                fontSize: 'var(--font-size-base)',
                                                                fontFamily: 'inherit',
                                                                resize: 'vertical',
                                                            }}
                                                        />
                                                    ) : field.fieldType === 'select' ? (
                                                        <select
                                                            name={field.slug}
                                                            required={field.isRequired}
                                                            style={{
                                                                width: '100%',
                                                                padding: '0.75rem',
                                                                border: '1px solid var(--color-border)',
                                                                borderRadius: 'var(--radius-md)',
                                                                fontSize: 'var(--font-size-base)',
                                                                backgroundColor: 'white',
                                                            }}
                                                        >
                                                            <option value="">Select...</option>
                                                            {field.options?.map(option => (
                                                                <option key={option} value={option}>{option}</option>
                                                            ))}
                                                        </select>
                                                    ) : field.fieldType === 'array' ? (
                                                        <input
                                                            type="text"
                                                            name={field.slug}
                                                            required={field.isRequired}
                                                            placeholder={field.placeholder}
                                                            style={{
                                                                width: '100%',
                                                                padding: '0.75rem',
                                                                border: '1px solid var(--color-border)',
                                                                borderRadius: 'var(--radius-md)',
                                                                fontSize: 'var(--font-size-base)',
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            type={field.fieldType === 'url' ? 'url' : 'text'}
                                                            name={field.slug}
                                                            required={field.isRequired}
                                                            placeholder={field.placeholder}
                                                            style={{
                                                                width: '100%',
                                                                padding: '0.75rem',
                                                                border: '1px solid var(--color-border)',
                                                                borderRadius: 'var(--radius-md)',
                                                                fontSize: 'var(--font-size-base)',
                                                            }}
                                                        />
                                                    )}

                                                    {field.helpText && (
                                                        <div style={{
                                                            fontSize: 'var(--font-size-sm)',
                                                            color: 'var(--color-text-muted)',
                                                            marginTop: 'var(--spacing-xs)',
                                                        }}>
                                                            {field.helpText}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Proof Objects Section */}
                                            <div style={{
                                                marginTop: 'var(--spacing-lg)',
                                                padding: 'var(--spacing-lg)',
                                                backgroundColor: 'var(--color-bg-secondary)',
                                                borderRadius: 'var(--radius-md)',
                                            }}>
                                                <h4 className="mb-md">Add Proof</h4>
                                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                                                    Every entry must have verifiable proof. Add links, files, or metrics.
                                                </p>

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                                        <select style={{
                                                            padding: '0.75rem',
                                                            border: '1px solid var(--color-border)',
                                                            borderRadius: 'var(--radius-md)',
                                                            fontSize: 'var(--font-size-base)',
                                                            backgroundColor: 'white',
                                                        }}>
                                                            <option value="github">GitHub Repo</option>
                                                            <option value="url">Live URL</option>
                                                            <option value="figma">Figma File</option>
                                                            <option value="image">Image</option>
                                                            <option value="pdf">PDF</option>
                                                            <option value="video">Video</option>
                                                        </select>
                                                        <input
                                                            type="url"
                                                            placeholder="https://github.com/username/project"
                                                            style={{
                                                                flex: 1,
                                                                padding: '0.75rem',
                                                                border: '1px solid var(--color-border)',
                                                                borderRadius: 'var(--radius-md)',
                                                                fontSize: 'var(--font-size-base)',
                                                            }}
                                                        />
                                                        <button type="button" className="btn btn-secondary">
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end', marginTop: 'var(--spacing-lg)' }}>
                                                <button type="button" className="btn btn-secondary">
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary">
                                                    Save Entry
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Existing Entries List */}
                                    <div style={{ marginTop: 'var(--spacing-2xl)' }}>
                                        <h3 className="mb-lg">Your Entries (0)</h3>
                                        <div style={{
                                            padding: 'var(--spacing-2xl)',
                                            textAlign: 'center',
                                            border: '2px dashed var(--color-border)',
                                            borderRadius: 'var(--radius-lg)',
                                            color: 'var(--color-text-secondary)',
                                        }}>
                                            No entries yet. Add your first entry above.
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
