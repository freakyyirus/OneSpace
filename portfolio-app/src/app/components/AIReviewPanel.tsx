'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIMessage {
    id: string;
    type: 'warning' | 'suggestion' | 'success';
    message: string;
    field?: string;
}

interface AIReviewPanelProps {
    content?: string;
    isAnalyzing?: boolean;
}

const DEMO_MESSAGES: AIMessage[] = [
    {
        id: '1',
        type: 'warning',
        message: 'This claim lacks verifiable evidence',
        field: 'Project Description',
    },
    {
        id: '2',
        type: 'suggestion',
        message: 'Add a metric or link to prove impact',
        field: 'Results',
    },
    {
        id: '3',
        type: 'success',
        message: 'GitHub repo verified • 234 stars',
        field: 'Proof',
    },
];

export default function AIReviewPanel({ isAnalyzing = false }: AIReviewPanelProps) {
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [typingIndex, setTypingIndex] = useState(0);

    useEffect(() => {
        // Simulate AI messages appearing one by one
        if (typingIndex < DEMO_MESSAGES.length) {
            const timer = setTimeout(() => {
                setMessages(prev => [...prev, DEMO_MESSAGES[typingIndex]]);
                setTypingIndex(prev => prev + 1);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [typingIndex]);

    // Reset animation every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setMessages([]);
            setTypingIndex(0);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            backgroundColor: '#0a0e14',
            borderRadius: '16px',
            padding: '24px',
            height: '100%',
            minHeight: '400px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                }}>
                    🤖
                </div>
                <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>AI Review Panel</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                        {isAnalyzing || typingIndex < DEMO_MESSAGES.length ? 'Analyzing...' : 'Review complete'}
                    </div>
                </div>
                <div style={{
                    marginLeft: 'auto',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: typingIndex < DEMO_MESSAGES.length ? '#f59e0b' : '#10b981',
                    animation: typingIndex < DEMO_MESSAGES.length ? 'pulse 1.5s infinite' : 'none',
                }} />
            </div>

            {/* Messages */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: -20, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: 'auto' }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{
                                padding: '16px',
                                borderRadius: '12px',
                                backgroundColor: msg.type === 'warning'
                                    ? 'rgba(239, 68, 68, 0.15)'
                                    : msg.type === 'suggestion'
                                        ? 'rgba(245, 158, 11, 0.15)'
                                        : 'rgba(16, 185, 129, 0.15)',
                                border: `1px solid ${msg.type === 'warning'
                                        ? 'rgba(239, 68, 68, 0.3)'
                                        : msg.type === 'suggestion'
                                            ? 'rgba(245, 158, 11, 0.3)'
                                            : 'rgba(16, 185, 129, 0.3)'
                                    }`,
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                            }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: msg.type === 'warning'
                                        ? '#ef4444'
                                        : msg.type === 'suggestion'
                                            ? '#f59e0b'
                                            : '#10b981',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    flexShrink: 0,
                                }}>
                                    {msg.type === 'warning' ? '!' : msg.type === 'suggestion' ? '?' : '✓'}
                                </div>
                                <div style={{ flex: 1 }}>
                                    {msg.field && (
                                        <div style={{
                                            fontSize: '10px',
                                            color: 'rgba(255,255,255,0.5)',
                                            marginBottom: '4px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}>
                                            {msg.field}
                                        </div>
                                    )}
                                    <div style={{ fontSize: '13px', lineHeight: 1.5 }}>
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {typingIndex < DEMO_MESSAGES.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            display: 'flex',
                            gap: '4px',
                            padding: '16px',
                        }}
                    >
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#64748b' }}
                        />
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#64748b' }}
                        />
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#64748b' }}
                        />
                    </motion.div>
                )}
            </div>

            {/* Summary */}
            {messages.length === DEMO_MESSAGES.length && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginTop: '16px',
                        padding: '16px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                        Portfolio strength
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                style={{
                                    width: '20px',
                                    height: '6px',
                                    borderRadius: '3px',
                                    backgroundColor: i <= 3 ? '#10b981' : 'rgba(255,255,255,0.2)',
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
