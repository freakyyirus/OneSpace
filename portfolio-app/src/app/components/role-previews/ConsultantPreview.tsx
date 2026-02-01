'use client';

import { motion } from 'framer-motion';

export default function ConsultantPreview() {
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
                        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                    }}>
                        📊
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Michael Torres</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Strategy Consultant</div>
                    </div>
                </div>
                <div style={{
                    padding: '6px 12px',
                    backgroundColor: '#eff6ff',
                    color: '#1e40af',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                }}>
                    ✓ 24 Engagements
                </div>
            </div>

            {/* McKinsey-style Engagement Timeline - DEEP BLUE */}
            <div style={{
                backgroundColor: '#0f172a',
                borderRadius: '14px',
                padding: '14px',
            }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#60a5fa', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    ENGAGEMENT TIMELINE
                </div>

                {/* Timeline */}
                <div style={{ position: 'relative', paddingLeft: '16px' }}>
                    <div style={{
                        position: 'absolute',
                        left: '4px',
                        top: '0',
                        bottom: '0',
                        width: '2px',
                        backgroundColor: '#1e3a8a',
                    }} />

                    {[
                        { phase: 'Discovery', duration: '2 weeks', status: 'complete' },
                        { phase: 'Analysis', duration: '4 weeks', status: 'complete' },
                        { phase: 'Strategy', duration: '3 weeks', status: 'current' },
                        { phase: 'Implementation', duration: '8 weeks', status: 'upcoming' },
                    ].map((item, i) => (
                        <div key={item.phase} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: i < 3 ? '10px' : '0',
                        }}>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: item.status === 'current' ? '#3b82f6' : item.status === 'complete' ? '#22c55e' : '#475569',
                                marginLeft: '-8px',
                                border: item.status === 'current' ? '2px solid #60a5fa' : 'none',
                            }} />
                            <span style={{ fontSize: '11px', color: item.status === 'current' ? 'white' : '#94a3b8', flex: 1 }}>
                                {item.phase}
                            </span>
                            <span style={{ fontSize: '10px', color: '#64748b' }}>{item.duration}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Frameworks Used */}
            <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #bfdbfe',
            }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#1e40af', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    FRAMEWORKS APPLIED
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Porter\'s 5 Forces', 'Value Chain', 'BCG Matrix', 'SWOT', 'McKinsey 7S', 'Blue Ocean'].map((framework) => (
                        <div key={framework} style={{
                            padding: '6px 10px',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: 600,
                            color: '#1e40af',
                            border: '1px solid #93c5fd',
                        }}>
                            {framework}
                        </div>
                    ))}
                </div>
            </div>

            {/* Impact Metrics */}
            <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '14px',
                padding: '14px',
            }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    CLIENT IMPACT
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    <div style={{
                        padding: '12px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        textAlign: 'center',
                        border: '1px solid #e2e8f0',
                    }}>
                        <div style={{ fontSize: '22px', fontWeight: 700, color: '#22c55e' }}>$4.2M</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>Cost Savings</div>
                    </div>
                    <div style={{
                        padding: '12px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        textAlign: 'center',
                        border: '1px solid #e2e8f0',
                    }}>
                        <div style={{ fontSize: '22px', fontWeight: 700, color: '#3b82f6' }}>32%</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>Efficiency Gain</div>
                    </div>
                    <div style={{
                        padding: '12px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        textAlign: 'center',
                        border: '1px solid #e2e8f0',
                    }}>
                        <div style={{ fontSize: '22px', fontWeight: 700, color: '#8b5cf6' }}>18</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>Recommendations</div>
                    </div>
                </div>
            </div>

            {/* Client Portfolio */}
            <div style={{
                display: 'flex',
                gap: '8px',
            }}>
                {[
                    { industry: 'Financial Services', projects: 8, color: '#1e40af' },
                    { industry: 'Healthcare', projects: 6, color: '#0891b2' },
                    { industry: 'Tech', projects: 10, color: '#7c3aed' },
                ].map((item) => (
                    <div key={item.industry} style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: `${item.color}10`,
                        borderRadius: '10px',
                        borderLeft: `3px solid ${item.color}`,
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: item.color }}>{item.projects}</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>{item.industry}</div>
                    </div>
                ))}
            </div>

            {/* Verification Footer */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                backgroundColor: '#f0fdf4',
                borderRadius: '10px',
                border: '1px solid #bbf7d0',
            }}>
                <span style={{ fontSize: '14px' }}>✓</span>
                <span style={{ fontSize: '11px', color: '#166534', fontWeight: 500 }}>
                    All engagements verified via client references
                </span>
            </div>
        </motion.div>
    );
}
