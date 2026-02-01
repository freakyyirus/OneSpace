'use client';

import { motion } from 'framer-motion';

export default function DesignerPreview() {
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
                        background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                    }}>
                        🎨
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Sarah Chen</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Product Designer</div>
                    </div>
                </div>
                <div style={{
                    padding: '6px 12px',
                    backgroundColor: '#faf5ff',
                    color: '#9333ea',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                }}>
                    ✓ 8 Proofs Verified
                </div>
            </div>

            {/* Figma - AUTHENTIC PURPLE */}
            <div style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '14px',
                padding: '14px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <svg width="18" height="18" viewBox="0 0 38 57" fill="none">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
                    </svg>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>Figma</span>
                    <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#0ACF83', fontWeight: 600 }}>✓ Verified</span>
                </div>

                {/* Design Files */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    {['Mobile App', 'Web Dashboard', 'Design System'].map((file, i) => (
                        <div key={file} style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: '#2d2d2d',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}>
                            <div style={{
                                width: '100%',
                                height: '40px',
                                borderRadius: '4px',
                                backgroundColor: i === 0 ? '#A259FF' : i === 1 ? '#1ABCFE' : '#0ACF83',
                                opacity: 0.3,
                                marginBottom: '6px',
                            }} />
                            <div style={{ fontSize: '9px', color: '#a0a0a0' }}>{file}</div>
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: '10px', color: '#a0a0a0' }}>
                    24 design files • 156 components
                </div>
            </div>

            {/* Case Study with Before/After */}
            <div style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #f3e8ff',
            }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#9333ea', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    FEATURED CASE STUDY
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '10px' }}>
                    E-commerce Checkout Redesign
                </div>

                {/* Before / After */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                    <div style={{
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '9px', color: '#ef4444', fontWeight: 600, marginBottom: '4px' }}>BEFORE</div>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>2.3%</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>Conversion</div>
                    </div>
                    <div style={{
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '9px', color: '#22c55e', fontWeight: 600, marginBottom: '4px' }}>AFTER</div>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#22c55e' }}>6.8%</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>Conversion</div>
                    </div>
                </div>

                {/* Process Timeline */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {['Research', 'Wireframes', 'UI Design', 'Testing'].map((step, i) => (
                        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{
                                padding: '4px 8px',
                                backgroundColor: '#9333ea',
                                color: 'white',
                                borderRadius: '4px',
                                fontSize: '8px',
                                fontWeight: 600,
                            }}>
                                {step}
                            </div>
                            {i < 3 && <span style={{ color: '#d8b4fe', fontSize: '10px' }}>→</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Dribbble Stats */}
            <div style={{
                backgroundColor: '#ea4c89',
                borderRadius: '14px',
                padding: '14px',
                color: 'white',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm7.753 5.997a10.156 10.156 0 012.006 5.937c-.293-.06-3.227-.654-6.18-.284-.065-.145-.127-.292-.192-.438-.201-.468-.423-.936-.66-1.388 3.257-1.33 4.737-3.238 5.026-3.827zM12 1.756c2.45 0 4.692.887 6.427 2.352-.24.542-1.583 2.327-4.69 3.509-1.467-2.69-3.094-4.9-3.342-5.23A10.234 10.234 0 0112 1.756zM8.394 2.959c.238.315 1.833 2.53 3.323 5.164-4.195 1.115-7.894 1.1-8.3 1.098a10.228 10.228 0 014.977-6.262zM1.756 12c0-.052.001-.104.002-.156.396.008 4.683.072 9.128-1.274.254.5.493 1.01.715 1.519-.095.026-.19.053-.284.082-4.628 1.494-7.088 5.568-7.376 6.048a10.193 10.193 0 01-2.185-6.219zm4.066 7.424c.2-.33 2.13-3.974 7.103-5.32.019-.006.037-.011.056-.016 1.273 3.307 1.8 6.078 1.936 6.893a10.195 10.195 0 01-9.095-1.557zm11.093.566c-.093-.542-.569-3.182-1.754-6.434 2.77-.443 5.201.283 5.511.376a10.196 10.196 0 01-3.757 6.058z" />
                    </svg>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>Dribbble</span>
                    <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 600 }}>✓ Verified</span>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: 700 }}>3.2K</div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>Followers</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: 700 }}>48</div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>Shots</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: 700 }}>12K</div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>Likes</div>
                    </div>
                </div>
            </div>

            {/* Design Artifacts */}
            <div style={{
                display: 'flex',
                gap: '8px',
            }}>
                {[
                    { label: 'Components', count: '156', color: '#A259FF' },
                    { label: 'Prototypes', count: '12', color: '#1ABCFE' },
                    { label: 'Handoffs', count: '8', color: '#0ACF83' },
                ].map((item) => (
                    <div key={item.label} style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: item.color }}>{item.count}</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>{item.label}</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
