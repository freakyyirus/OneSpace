'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const STREAK_SIZE = 35;
function stableIntensities(): number[] {
  const out: number[] = [];
  let s = 0.314;
  for (let i = 0; i < STREAK_SIZE; i++) {
    s = (s * 9301 + 49297) % 233280;
    out.push(s / 233280);
  }
  return out;
}

function StreakGrid() {
  const intensities = useMemo(() => stableIntensities(), []);
  return (
    <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
      {intensities.map((intensity, i) => (
        <div
          key={i}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '2px',
            backgroundColor:
              intensity > 0.7
                ? '#22c55e'
                : intensity > 0.4
                  ? '#4ade80'
                  : intensity > 0.2
                    ? '#bbf7d0'
                    : '#374151',
          }}
        />
      ))}
    </div>
  );
}

export default function EngineerPreview() {
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
                gap: '16px',
            }}
        >
            {/* Header - Yuvraj Singh */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 700,
                    }}>
                        YS
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Yuvraj Singh</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Software Developer</div>
                    </div>
                </div>
                <div style={{
                    padding: '6px 12px',
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                }}>
                    ✓ 12 Proofs Verified
                </div>
            </div>

            {/* Subtext */}
            <div style={{
                fontSize: '13px',
                color: '#64748b',
                fontStyle: 'italic',
                paddingBottom: '8px',
                borderBottom: '1px solid #f1f5f9',
            }}>
                &quot;Building real systems, not resumes.&quot;
            </div>

            {/* LeetCode - AUTHENTIC GREEN */}
            <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '14px',
                padding: '14px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        backgroundColor: '#ffa116',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: 'black',
                    }}>
                        LC
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>LeetCode</span>
                    <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#22c55e', fontWeight: 600 }}>✓ Verified</span>
                </div>

                {/* Problems Solved - GREEN THEME */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#22c55e' }}>287</div>
                        <div style={{ fontSize: '9px', color: '#6b7280' }}>Easy</div>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#fbbf24' }}>143</div>
                        <div style={{ fontSize: '9px', color: '#6b7280' }}>Medium</div>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#ef4444' }}>42</div>
                        <div style={{ fontSize: '9px', color: '#6b7280' }}>Hard</div>
                    </div>
                </div>

                {/* Streak Calendar - GREEN */}
                <StreakGrid />
                <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '8px' }}>
                    🔥 45 day streak
                </div>
            </div>

            {/* GitHub - DARK/NEUTRAL */}
            <div style={{
                backgroundColor: '#0d1117',
                borderRadius: '14px',
                padding: '14px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>GitHub</span>
                    <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#22c55e', fontWeight: 600 }}>✓ Verified</span>
                </div>

                {/* Contribution Graph - Neutral greens */}
                <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                    {Array.from({ length: 52 }).map((_, weekIndex) => (
                        <div key={weekIndex} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                const intensity = Math.random();
                                return (
                                    <div
                                        key={dayIndex}
                                        style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '1px',
                                            backgroundColor: intensity > 0.7
                                                ? '#39d353'
                                                : intensity > 0.4
                                                    ? '#26a641'
                                                    : intensity > 0.2
                                                        ? '#0e4429'
                                                        : '#161b22',
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: '10px', color: '#8b949e' }}>
                    842 contributions in the last year
                </div>
            </div>

            {/* Browniee - Live Project */}
            <div style={{
                backgroundColor: '#faf5ff',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #e9d5ff',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                    }}>
                        🧁
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Browniee</div>
                        <div style={{ fontSize: '11px', color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                            Live Project
                        </div>
                    </div>
                    <a
                        href="https://browniee.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '8px 14px',
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                    >
                        View →
                    </a>
                </div>
            </div>

            {/* Architecture */}
            <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '14px',
                padding: '12px',
            }}>
                <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>SYSTEM ARCHITECTURE</div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ padding: '4px 8px', backgroundColor: '#0f172a', color: 'white', borderRadius: '4px', fontSize: '9px', fontWeight: 600 }}>Next.js</span>
                    <span style={{ color: '#94a3b8', fontSize: '10px' }}>→</span>
                    <span style={{ padding: '4px 8px', backgroundColor: '#0f172a', color: 'white', borderRadius: '4px', fontSize: '9px', fontWeight: 600 }}>TypeScript</span>
                    <span style={{ color: '#94a3b8', fontSize: '10px' }}>→</span>
                    <span style={{ padding: '4px 8px', backgroundColor: '#0f172a', color: 'white', borderRadius: '4px', fontSize: '9px', fontWeight: 600 }}>PostgreSQL</span>
                    <span style={{ color: '#94a3b8', fontSize: '10px' }}>→</span>
                    <span style={{ padding: '4px 8px', backgroundColor: '#0f172a', color: 'white', borderRadius: '4px', fontSize: '9px', fontWeight: 600 }}>Vercel</span>
                </div>
            </div>
        </motion.div>
    );
}
