'use client';

import { motion } from 'framer-motion';

export default function ProductManagerPreview() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f1f5f9',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                    }}>
                        🗺️
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Priya Sharma</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Product Manager</div>
                    </div>
                </div>
                <div style={{
                    padding: '6px 12px',
                    backgroundColor: '#fff7ed',
                    color: '#ea580c',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                }}>
                    ✓ 6 Products Shipped
                </div>
            </div>

            {/* Product Roadmap - ORANGE THEME */}
            <div style={{
                backgroundColor: '#1c1917',
                borderRadius: '14px',
                padding: '14px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        📋
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>Product Roadmap</span>
                    <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#22c55e', fontWeight: 600 }}>✓ Verified</span>
                </div>

                {/* Roadmap Visualization */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                    {[
                        { quarter: 'Q1', features: 3, status: 'shipped', color: '#22c55e' },
                        { quarter: 'Q2', features: 5, status: 'shipped', color: '#22c55e' },
                        { quarter: 'Q3', features: 4, status: 'current', color: '#f97316' },
                        { quarter: 'Q4', features: 6, status: 'planned', color: '#64748b' },
                    ].map((q) => (
                        <div key={q.quarter} style={{
                            flex: 1,
                            padding: '10px 8px',
                            backgroundColor: '#292524',
                            borderRadius: '8px',
                            textAlign: 'center',
                            borderTop: `3px solid ${q.color}`,
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'white' }}>{q.quarter}</div>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: q.color, marginTop: '4px' }}>{q.features}</div>
                            <div style={{ fontSize: '8px', color: '#a8a29e' }}>features</div>
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: '10px', color: '#a8a29e' }}>
                    12 features shipped on time • 0 delays
                </div>
            </div>

            {/* Key Product Decisions */}
            <div style={{
                background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #fed7aa',
            }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#ea580c', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    KEY DECISIONS DOCUMENTED
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                        { decision: 'Pivoted to B2B model', impact: '+340% revenue', type: 'Strategy' },
                        { decision: 'Sunset legacy features', impact: '-60% tech debt', type: 'Product' },
                        { decision: 'Launched freemium tier', impact: '+12K signups', type: 'Growth' },
                    ].map((item) => (
                        <div key={item.decision} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 10px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                        }}>
                            <span style={{
                                padding: '3px 6px',
                                backgroundColor: '#ea580c',
                                color: 'white',
                                borderRadius: '4px',
                                fontSize: '8px',
                                fontWeight: 600,
                            }}>
                                {item.type}
                            </span>
                            <span style={{ fontSize: '11px', color: '#0f172a', flex: 1 }}>{item.decision}</span>
                            <span style={{ fontSize: '10px', fontWeight: 600, color: '#22c55e' }}>{item.impact}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* KPIs Dashboard */}
            <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '14px',
                padding: '14px',
            }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    PRODUCT KPIS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {[
                        { label: 'MAU', value: '2.4M', change: '+18%', color: '#22c55e' },
                        { label: 'DAU', value: '890K', change: '+24%', color: '#22c55e' },
                        { label: 'Retention', value: '72%', change: '+5%', color: '#22c55e' },
                        { label: 'NPS', value: '68', change: '+12', color: '#22c55e' },
                    ].map((kpi) => (
                        <div key={kpi.label} style={{
                            padding: '10px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            textAlign: 'center',
                            border: '1px solid #e2e8f0',
                        }}>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{kpi.value}</div>
                            <div style={{ fontSize: '9px', color: '#64748b' }}>{kpi.label}</div>
                            <div style={{ fontSize: '9px', color: kpi.color, marginTop: '2px' }}>{kpi.change}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Research & Specs */}
            <div style={{
                display: 'flex',
                gap: '8px',
            }}>
                {[
                    { label: 'User Interviews', count: '156', icon: '🎤' },
                    { label: 'PRDs Written', count: '34', icon: '📄' },
                    { label: 'A/B Tests', count: '28', icon: '🧪' },
                ].map((item) => (
                    <div key={item.label} style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#fff7ed',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1px solid #fed7aa',
                    }}>
                        <span style={{ fontSize: '14px' }}>{item.icon}</span>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ea580c' }}>{item.count}</div>
                            <div style={{ fontSize: '8px', color: '#78716c' }}>{item.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stakeholder Quote */}
            <div style={{
                padding: '12px',
                backgroundColor: '#f0fdf4',
                borderRadius: '10px',
                border: '1px solid #bbf7d0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
            }}>
                <span style={{ fontSize: '16px' }}>&quot;</span>
                <div>
                    <div style={{ fontSize: '11px', color: '#166534', fontStyle: 'italic' }}>
                        Delivered 3 major launches with zero scope creep
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>— VP Engineering</div>
                </div>
            </div>
        </motion.div>
    );
}
