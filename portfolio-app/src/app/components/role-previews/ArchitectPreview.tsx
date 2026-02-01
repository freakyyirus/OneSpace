'use client';

import { motion } from 'framer-motion';

export default function ArchitectPreview() {
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
                        background: 'linear-gradient(135deg, #78716c 0%, #57534e 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                    }}>
                        📐
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>James Wright</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Architect, RIBA</div>
                    </div>
                </div>
                <div style={{
                    padding: '6px 12px',
                    backgroundColor: '#fafaf9',
                    color: '#78716c',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                }}>
                    ✓ 15 Projects Built
                </div>
            </div>

            {/* AutoCAD / Revit - EARTH TONES */}
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
                        backgroundColor: '#dc2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: 'white',
                    }}>
                        A
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>AutoCAD / Revit</span>
                    <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#22c55e', fontWeight: 600 }}>✓ Verified</span>
                </div>

                {/* Floor Plan Preview */}
                <div style={{
                    backgroundColor: '#292524',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '10px',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gridTemplateRows: 'repeat(3, 20px)',
                        gap: '2px',
                    }}>
                        {/* Simplified floor plan representation */}
                        <div style={{ gridColumn: '1 / 3', gridRow: '1 / 3', backgroundColor: '#44403c', borderRadius: '2px' }} />
                        <div style={{ gridColumn: '3 / 5', gridRow: '1 / 2', backgroundColor: '#57534e', borderRadius: '2px' }} />
                        <div style={{ gridColumn: '3 / 4', gridRow: '2 / 4', backgroundColor: '#44403c', borderRadius: '2px' }} />
                        <div style={{ gridColumn: '4 / 5', gridRow: '2 / 4', backgroundColor: '#57534e', borderRadius: '2px' }} />
                        <div style={{ gridColumn: '1 / 3', gridRow: '3 / 4', backgroundColor: '#57534e', borderRadius: '2px' }} />
                    </div>
                </div>
                <div style={{ fontSize: '10px', color: '#a8a29e' }}>
                    Latest: 4-Story Mixed Use • 12,000 sqft
                </div>
            </div>

            {/* Site Constraints */}
            <div style={{
                background: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #e7e5e4',
            }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#78716c', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    SITE CONSTRAINTS MASTERED
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                        { label: 'Lot Coverage', value: '65%', limit: 'Max 70%' },
                        { label: 'Height', value: '48 ft', limit: 'Max 50 ft' },
                        { label: 'Setback', value: '15 ft', limit: 'Min 12 ft' },
                    ].map((constraint) => (
                        <div key={constraint.label} style={{
                            padding: '10px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{constraint.value}</div>
                            <div style={{ fontSize: '9px', color: '#78716c' }}>{constraint.label}</div>
                            <div style={{ fontSize: '8px', color: '#22c55e', marginTop: '2px' }}>✓ {constraint.limit}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Built Projects Gallery */}
            <div style={{
                borderRadius: '14px',
                overflow: 'hidden',
            }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#78716c', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    BUILT PROJECTS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                        { name: 'Urban Loft', type: 'Residential', color: '#d6d3d1' },
                        { name: 'Tech Campus', type: 'Commercial', color: '#a8a29e' },
                        { name: 'Art Museum', type: 'Cultural', color: '#78716c' },
                    ].map((project) => (
                        <div key={project.name} style={{
                            aspectRatio: '1',
                            backgroundColor: project.color,
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '8px',
                        }}>
                            <div style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>{project.name}</div>
                            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.7)' }}>{project.type}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Metrics Footer */}
            <div style={{
                display: 'flex',
                gap: '8px',
            }}>
                {[
                    { label: 'Permits Approved', value: '23', icon: '📋' },
                    { label: 'Sq Ft Designed', value: '180K', icon: '📏' },
                    { label: 'On Budget', value: '94%', icon: '💰' },
                ].map((item) => (
                    <div key={item.label} style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#fafaf9',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span style={{ fontSize: '14px' }}>{item.icon}</span>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{item.value}</div>
                            <div style={{ fontSize: '8px', color: '#78716c' }}>{item.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
