'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoreProfessionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DOMAINS = [
    {
        id: 'engineering',
        name: 'Engineering & Technology',
        icon: '💻',
        color: '#0066ff',
        categories: [
            {
                name: 'Software & IT',
                professions: [
                    'Software Engineer', 'Full-Stack Engineer', 'Frontend Engineer', 'Backend Engineer',
                    'Mobile App Developer', 'Game Developer', 'Embedded Systems Engineer', 'Systems Engineer'
                ]
            },
            {
                name: 'Data & AI',
                professions: [
                    'AI Engineer', 'Machine Learning Engineer', 'Data Scientist', 'Data Engineer',
                    'Analytics Engineer', 'Computer Vision Engineer', 'NLP Engineer', 'MLOps Engineer'
                ]
            },
            {
                name: 'Infrastructure',
                professions: [
                    'DevOps Engineer', 'Cloud Engineer', 'Site Reliability Engineer', 'Platform Engineer',
                    'Network Engineer', 'Security Engineer', 'Cybersecurity Analyst'
                ]
            },
            {
                name: 'Hardware',
                professions: [
                    'Hardware Engineer', 'Robotics Engineer', 'Mechatronics Engineer', 'IoT Engineer', 'Semiconductor Engineer'
                ]
            }
        ]
    },
    {
        id: 'design',
        name: 'Design & Creative',
        icon: '🎨',
        color: '#9333ea',
        categories: [
            {
                name: 'Digital Design',
                professions: [
                    'UI Designer', 'UX Designer', 'Product Designer', 'Interaction Designer',
                    'Visual Designer', 'Motion Designer', 'Game Designer'
                ]
            },
            {
                name: 'Visual & Brand',
                professions: [
                    'Graphic Designer', 'Brand Designer', 'Illustrator', 'Photographer', 'Creative Director'
                ]
            },
            {
                name: 'Media Production',
                professions: [
                    'Video Editor', 'Animator', 'Sound Designer', 'Film Director'
                ]
            },
            {
                name: 'Physical Design',
                professions: ['Industrial Designer']
            }
        ]
    },
    {
        id: 'architecture',
        name: 'Architecture & Construction',
        icon: '🏗️',
        color: '#0891b2',
        categories: [
            {
                name: 'Architecture',
                professions: [
                    'Architect', 'Interior Designer', 'Landscape Architect', 'Project Architect'
                ]
            },
            {
                name: 'Planning',
                professions: ['Urban Planner', 'City Planner']
            },
            {
                name: 'Construction',
                professions: [
                    'Construction Manager', 'Civil Engineer', 'Structural Engineer', 'Site Engineer', 'Quantity Surveyor'
                ]
            },
            {
                name: 'Real Estate',
                professions: ['Real Estate Developer']
            }
        ]
    },
    {
        id: 'business',
        name: 'Business & Consulting',
        icon: '📊',
        color: '#dc2626',
        categories: [
            {
                name: 'Consulting',
                professions: [
                    'Management Consultant', 'Strategy Consultant', 'Process Consultant', 'Change Management Consultant'
                ]
            },
            {
                name: 'Management',
                professions: [
                    'Business Analyst', 'Operations Manager', 'Program Manager', 'Project Manager', 'Delivery Manager'
                ]
            }
        ]
    },
    {
        id: 'product',
        name: 'Product & Operations',
        icon: '🗺️',
        color: '#ea580c',
        categories: [
            {
                name: 'Product',
                professions: [
                    'Product Manager', 'Technical Product Manager', 'Growth Product Manager', 'Product Owner'
                ]
            },
            {
                name: 'Startup',
                professions: ['Startup Founder', 'Co-founder']
            },
            {
                name: 'Operations',
                professions: ['Operations Lead', 'Chief of Staff']
            }
        ]
    },
    {
        id: 'marketing',
        name: 'Marketing & Sales',
        icon: '📈',
        color: '#ec4899',
        categories: [
            {
                name: 'Marketing',
                professions: [
                    'Digital Marketer', 'Growth Marketer', 'Performance Marketer', 'SEO Specialist',
                    'Content Strategist', 'Brand Manager', 'Social Media Manager', 'Influencer Marketer'
                ]
            },
            {
                name: 'Sales',
                professions: [
                    'Sales Engineer', 'Account Executive', 'Business Development Manager',
                    'Partnerships Manager', 'Customer Success Manager'
                ]
            }
        ]
    },
    {
        id: 'finance',
        name: 'Finance & Accounting',
        icon: '💰',
        color: '#22c55e',
        categories: [
            {
                name: 'Finance',
                professions: [
                    'Financial Analyst', 'Investment Analyst', 'Equity Research Analyst', 'Portfolio Manager',
                    'Risk Analyst', 'Quantitative Analyst', 'Trader', 'Wealth Manager'
                ]
            },
            {
                name: 'Accounting & Audit',
                professions: [
                    'Chartered Accountant', 'Cost Accountant', 'Management Accountant', 'Auditor', 'Tax Consultant'
                ]
            },
            {
                name: 'FinTech',
                professions: ['FinTech Product Manager', 'Payments Specialist', 'Blockchain Analyst']
            }
        ]
    },
    {
        id: 'science',
        name: 'Science & Research',
        icon: '🔬',
        color: '#6366f1',
        categories: [
            {
                name: 'Research',
                professions: [
                    'Research Scientist', 'Research Engineer', 'Data Researcher',
                    'Academic Researcher', 'PhD Scholar', 'Postdoctoral Researcher'
                ]
            },
            {
                name: 'Sciences',
                professions: [
                    'Physicist', 'Chemist', 'Biologist', 'Mathematician', 'Statistician', 'Environmental Scientist'
                ]
            }
        ]
    },
    {
        id: 'healthcare',
        name: 'Healthcare & Life Sciences',
        icon: '🧬',
        color: '#14b8a6',
        categories: [
            {
                name: 'Medical',
                professions: ['Doctor', 'Surgeon', 'Pharmacist']
            },
            {
                name: 'Research & Biotech',
                professions: [
                    'Medical Researcher', 'Clinical Research Associate', 'Biomedical Engineer', 'Biotechnologist'
                ]
            },
            {
                name: 'Healthcare Business',
                professions: ['Healthcare Consultant', 'Public Health Analyst']
            }
        ]
    },
    {
        id: 'education',
        name: 'Education & Teaching',
        icon: '👩‍🏫',
        color: '#f59e0b',
        categories: [
            {
                name: 'Teaching',
                professions: [
                    'School Teacher', 'University Professor', 'Lecturer', 'Teaching Assistant', 'Online Educator'
                ]
            },
            {
                name: 'Education Design',
                professions: [
                    'Instructional Designer', 'Curriculum Designer', 'Academic Advisor', 'Education Consultant'
                ]
            }
        ]
    },
    {
        id: 'legal',
        name: 'Legal & Policy',
        icon: '⚖️',
        color: '#78716c',
        categories: [
            {
                name: 'Legal',
                professions: ['Lawyer', 'Corporate Counsel', 'Legal Consultant']
            },
            {
                name: 'Policy & Compliance',
                professions: [
                    'Policy Analyst', 'Public Policy Researcher', 'Compliance Officer', 'Risk & Governance Specialist'
                ]
            }
        ]
    },
    {
        id: 'government',
        name: 'Government & Social Impact',
        icon: '🏛️',
        color: '#0e7490',
        categories: [
            {
                name: 'Government',
                professions: ['Civil Servant', 'Policy Officer', 'Public Administrator']
            },
            {
                name: 'Social Impact',
                professions: ['NGO Program Manager', 'Social Impact Consultant', 'Development Economist']
            }
        ]
    },
    {
        id: 'media',
        name: 'Media & Entertainment',
        icon: '🎮',
        color: '#a855f7',
        categories: [
            {
                name: 'Gaming',
                professions: ['Game Producer', 'Game Artist', 'Esports Analyst']
            },
            {
                name: 'Content Creation',
                professions: ['Streamer', 'Content Creator', 'YouTuber', 'Podcaster', 'Media Strategist']
            }
        ]
    },
    {
        id: 'hr',
        name: 'HR & Psychology',
        icon: '🧠',
        color: '#f472b6',
        categories: [
            {
                name: 'Psychology',
                professions: ['Psychologist', 'Behavioral Scientist']
            },
            {
                name: 'People Operations',
                professions: [
                    'HR Manager', 'Talent Acquisition Specialist', 'People Operations Manager',
                    'Organizational Development Consultant'
                ]
            }
        ]
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing & Industry',
        icon: '🏭',
        color: '#64748b',
        categories: [
            {
                name: 'Engineering',
                professions: [
                    'Manufacturing Engineer', 'Process Engineer', 'Quality Engineer', 'Industrial Engineer'
                ]
            },
            {
                name: 'Operations',
                professions: ['Supply Chain Manager', 'Logistics Manager', 'Operations Research Analyst']
            }
        ]
    }
];

// Get total profession count
const getTotalCount = () => {
    return DOMAINS.reduce((total, domain) => {
        return total + domain.categories.reduce((catTotal, cat) => catTotal + cat.professions.length, 0);
    }, 0);
};

export default function MoreProfessionsModal({ isOpen, onClose }: MoreProfessionsModalProps) {
    const [activeDomain, setActiveDomain] = useState(0);

    const currentDomain = DOMAINS[activeDomain];
    const totalCount = getTotalCount();

    const goToPrevious = () => {
        setActiveDomain(prev => prev > 0 ? prev - 1 : DOMAINS.length - 1);
    };

    const goToNext = () => {
        setActiveDomain(prev => prev < DOMAINS.length - 1 ? prev + 1 : 0);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(12px)',
                            zIndex: 1000,
                        }}
                    />

                    {/* Modal */}
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1001,
                        padding: '20px',
                        pointerEvents: 'none',
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: '950px',
                                maxHeight: '88vh',
                                backgroundColor: 'white',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                boxShadow: '0 30px 100px rgba(0, 0, 0, 0.25)',
                                pointerEvents: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Header */}
                            <div style={{
                                padding: '24px 28px',
                                borderBottom: '1px solid #f1f5f9',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <div>
                                    <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                                        All Professions
                                    </h2>
                                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                                        {totalCount}+ roles across {DOMAINS.length} domains
                                    </p>
                                </div>
                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        backgroundColor: '#f8fafc',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#64748b',
                                    }}
                                >
                                    ×
                                </motion.button>
                            </div>

                            {/* Domain Navigator */}
                            <div style={{
                                padding: '16px 28px',
                                borderBottom: '1px solid #f1f5f9',
                                display: 'flex',
                                gap: '8px',
                                overflowX: 'auto',
                                scrollbarWidth: 'none',
                            }}>
                                {DOMAINS.map((domain, index) => (
                                    <motion.button
                                        key={domain.id}
                                        onClick={() => setActiveDomain(index)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            padding: '8px 14px',
                                            borderRadius: '10px',
                                            border: activeDomain === index ? `2px solid ${domain.color}` : '1px solid #e2e8f0',
                                            backgroundColor: activeDomain === index ? `${domain.color}10` : 'white',
                                            color: activeDomain === index ? domain.color : '#64748b',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <span style={{ fontSize: '14px' }}>{domain.icon}</span>
                                        {domain.name.split(' & ')[0]}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Domain Content */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDomain}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {/* Domain Header */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px',
                                            marginBottom: '24px',
                                        }}>
                                            <div style={{
                                                width: '52px',
                                                height: '52px',
                                                borderRadius: '16px',
                                                backgroundColor: `${currentDomain.color}15`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '26px',
                                            }}>
                                                {currentDomain.icon}
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
                                                    {currentDomain.name}
                                                </h3>
                                                <p style={{ fontSize: '13px', color: '#64748b' }}>
                                                    {currentDomain.categories.reduce((t, c) => t + c.professions.length, 0)} professions
                                                </p>
                                            </div>
                                        </div>

                                        {/* Categories */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            {currentDomain.categories.map((category, catIndex) => (
                                                <motion.div
                                                    key={category.name}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: catIndex * 0.05 }}
                                                >
                                                    <div style={{
                                                        fontSize: '11px',
                                                        fontWeight: 700,
                                                        color: '#94a3b8',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        marginBottom: '10px',
                                                        paddingLeft: '2px',
                                                    }}>
                                                        {category.name}
                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: '8px',
                                                    }}>
                                                        {category.professions.map((profession) => (
                                                            <motion.button
                                                                key={profession}
                                                                whileHover={{
                                                                    scale: 1.02,
                                                                    backgroundColor: `${currentDomain.color}12`,
                                                                    borderColor: currentDomain.color,
                                                                }}
                                                                whileTap={{ scale: 0.98 }}
                                                                style={{
                                                                    padding: '10px 16px',
                                                                    borderRadius: '10px',
                                                                    border: '1px solid #e2e8f0',
                                                                    backgroundColor: '#fafbfc',
                                                                    fontSize: '13px',
                                                                    fontWeight: 500,
                                                                    color: '#374151',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.15s ease',
                                                                }}
                                                            >
                                                                {profession}
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* AI Badge */}
                                        <div style={{
                                            marginTop: '24px',
                                            padding: '14px 18px',
                                            backgroundColor: '#f0fdf4',
                                            borderRadius: '12px',
                                            border: '1px solid #bbf7d0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}>
                                            <span style={{ fontSize: '16px' }}>🤖</span>
                                            <span style={{ fontSize: '13px', color: '#166534' }}>
                                                AI validation adapts to <strong>{currentDomain.name}</strong> standards
                                            </span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Navigation Footer */}
                            <div style={{
                                padding: '18px 28px',
                                borderTop: '1px solid #f1f5f9',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '20px',
                                backgroundColor: '#fafbfc',
                            }}>
                                <motion.button
                                    onClick={goToPrevious}
                                    whileHover={{ scale: 1.05, x: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '12px 24px',
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: 'white',
                                        color: '#64748b',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    ← Previous Domain
                                </motion.button>

                                <div style={{
                                    fontSize: '13px',
                                    color: '#94a3b8',
                                    fontWeight: 500,
                                }}>
                                    {activeDomain + 1} / {DOMAINS.length}
                                </div>

                                <motion.button
                                    onClick={goToNext}
                                    whileHover={{ scale: 1.05, x: 3 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '12px 24px',
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: 'white',
                                        color: '#64748b',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Next Domain →
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
