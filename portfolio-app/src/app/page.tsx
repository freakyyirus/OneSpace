'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OneSpaceLogo from './components/Logo';
import AIReviewPanel from './components/AIReviewPanel';
import MoreProfessionsModal from './components/MoreProfessionsModal';
import EngineerPreview from './components/role-previews/EngineerPreview';
import DesignerPreview from './components/role-previews/DesignerPreview';
import ArchitectPreview from './components/role-previews/ArchitectPreview';
import ConsultantPreview from './components/role-previews/ConsultantPreview';
import ProductManagerPreview from './components/role-previews/ProductManagerPreview';

const ROLES = [
  { id: 'engineer', name: 'Software Engineer', color: '#0066ff', icon: '💻', proof: 'GitHub • LeetCode • Live Apps' },
  { id: 'designer', name: 'Product Designer', color: '#9333ea', icon: '🎨', proof: 'Figma • Case Studies • Outcomes' },
  { id: 'architect', name: 'Architect', color: '#0891b2', icon: '📐', proof: 'Drawings • Photos • Permits' },
  { id: 'consultant', name: 'Consultant', color: '#dc2626', icon: '📊', proof: 'Engagements • Frameworks • ROI' },
  { id: 'pm', name: 'Product Manager', color: '#ea580c', icon: '🗺️', proof: 'Roadmaps • KPIs • Launches' },
];

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState(0);
  const [showMoreProfessions, setShowMoreProfessions] = useState(false);
  const [direction, setDirection] = useState(1);

  const goToPrevious = () => {
    setDirection(-1);
    setActiveRole(prev => prev > 0 ? prev - 1 : ROLES.length - 1);
  };

  const goToNext = () => {
    setDirection(1);
    setActiveRole(prev => prev < ROLES.length - 1 ? prev + 1 : 0);
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveRole(prev => (prev + 1) % ROLES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentRole = ROLES[activeRole];

  const renderRolePreview = () => {
    switch (activeRole) {
      case 0: return <EngineerPreview />;
      case 1: return <DesignerPreview />;
      case 2: return <ArchitectPreview />;
      case 3: return <ConsultantPreview />;
      case 4: return <ProductManagerPreview />;
      default: return <EngineerPreview />;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <main style={{
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #fefefe 0%, #f8f9fa 50%, #f3f4f6 100%)',
      minHeight: '100vh',
    }}>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          padding: '14px 0',
          zIndex: 100,
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <OneSpaceLogo style={{ fontSize: '20px', color: '#0f172a' }} />
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="#how" style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', textDecoration: 'none' }}>
              How It Works
            </Link>
            <Link href="#ai" style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', textDecoration: 'none' }}>
              AI Review
            </Link>
            <Link
              href="/auth/signup"
              style={{
                padding: '10px 22px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: 'white',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Build Your OneSpace
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '100px',
        paddingBottom: '40px',
      }}>
        {/* Hero Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '60px',
            alignItems: 'center',
            width: '100%',
          }}>
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 style={{
                fontSize: 'clamp(40px, 5vw, 60px)',
                fontWeight: 800,
                lineHeight: 1.05,
                marginBottom: '24px',
                letterSpacing: '-0.03em',
                color: '#0f172a',
              }}>
                Resumes describe.<br />
                <motion.span
                  key={currentRole.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, color: currentRole.color }}
                  transition={{ duration: 0.4 }}
                >
                  OneSpace proves.
                </motion.span>
              </h1>

              <p style={{
                fontSize: '19px',
                lineHeight: 1.65,
                color: '#64748b',
                marginBottom: '36px',
                maxWidth: '460px',
              }}>
                An AI portfolio that adapts to your profession and verifies real work.
              </p>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Link
                  href="/auth/signup"
                  style={{
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    color: 'white',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.2)',
                  }}
                >
                  Build Your OneSpace
                  <span>→</span>
                </Link>
                <button
                  onClick={() => goToNext()}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: 'white',
                    color: '#0f172a',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: 600,
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  See It Change
                </button>
              </div>
            </motion.div>

            {/* Right: Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ height: '600px', position: 'relative' }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeRole}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  style={{ height: '100%', position: 'absolute', width: '100%' }}
                >
                  {renderRolePreview()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Profession Navigator - Bottom */}
        <div style={{
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
        }}>
          {/* Previous Button */}
          <motion.button
            onClick={goToPrevious}
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '14px 24px',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            }}
          >
            ←
          </motion.button>

          {/* Current Role Indicator */}
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{
              padding: '14px 28px',
              backgroundColor: currentRole.color + '10',
              border: `2px solid ${currentRole.color}`,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minWidth: '220px',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '20px' }}>{currentRole.icon}</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: currentRole.color }}>
              {currentRole.name}
            </span>
          </motion.div>

          {/* Next Button */}
          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '14px 24px',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            }}
          >
            →
          </motion.button>

          {/* Divider */}
          <div style={{
            width: '1px',
            height: '32px',
            backgroundColor: '#e2e8f0',
            margin: '0 8px',
          }} />

          {/* More Button */}
          <motion.button
            onClick={() => setShowMoreProfessions(true)}
            whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '14px 24px',
              backgroundColor: 'white',
              border: '2px dashed #e2e8f0',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            }}
          >
            <span style={{ fontSize: '16px' }}>✨</span>
            More
            <span style={{
              padding: '2px 8px',
              backgroundColor: '#0066ff',
              color: 'white',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 700,
            }}>
              150+
            </span>
          </motion.button>
        </div>
      </section>



      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{
              fontSize: '42px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#0f172a',
              marginBottom: '14px',
            }}>
              How it works
            </h2>
            <p style={{ fontSize: '17px', color: '#64748b' }}>
              Four steps from idea to trusted portfolio
            </p>
          </motion.div>

          <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
            {[
              { step: 1, title: 'Choose profession', desc: 'UI morphs to your role', icon: '👤' },
              { step: 2, title: 'Add real work', desc: 'Proof slots appear', icon: '📝' },
              { step: 3, title: 'AI validates', desc: 'Live feedback', icon: '🤖' },
              { step: 4, title: 'Share link', desc: 'One trusted view', icon: '🔗' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  textAlign: 'center',
                  flex: 1,
                  padding: '28px',
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  margin: '0 auto 16px',
                  position: 'relative',
                }}>
                  {item.icon}
                  <div style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}>
                    {item.step}
                  </div>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px', color: '#0f172a' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section id="ai" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
          >
            <h2 style={{
              fontSize: '42px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#0f172a',
              marginBottom: '14px',
            }}>
              AI that reviews your work — not writes it
            </h2>
            <p style={{ fontSize: '17px', color: '#64748b' }}>
              Watch AI scan and validate your portfolio in real-time
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            alignItems: 'stretch',
          }}>
            {/* Editor */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{
                fontSize: '11px',
                color: '#94a3b8',
                marginBottom: '20px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                Portfolio Editor
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#0f172a' }}>
                    Project
                  </label>
                  <div style={{ padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '14px' }}>
                    Real-time Analytics Dashboard
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#0f172a' }}>
                    Description
                  </label>
                  <div style={{ padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '13px', color: '#64748b' }}>
                    Built a high-performance analytics system processing millions of events...
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#0f172a' }}>
                    Results
                  </label>
                  <div style={{
                    padding: '12px 14px',
                    backgroundColor: '#fffbeb',
                    borderRadius: '10px',
                    fontSize: '13px',
                    border: '1px solid #fde68a',
                    color: '#92400e',
                  }}>
                    &quot;Improved team productivity&quot; ⚠️
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#0f172a' }}>
                    Proof
                  </label>
                  <div style={{
                    padding: '12px 14px',
                    backgroundColor: '#ecfdf5',
                    borderRadius: '10px',
                    fontSize: '13px',
                    border: '1px solid #a7f3d0',
                    color: '#065f46',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    📦 github.com/yuvraj/analytics-engine
                    <span style={{ marginLeft: 'auto', fontSize: '11px' }}>✓ Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ borderRadius: '24px', overflow: 'hidden' }}
            >
              <AIReviewPanel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOR / NOT FOR */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '18px', color: '#10b981' }}>
                ✓ Built For
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Real experience', 'Builders', 'Serious professionals'].map((item) => (
                  <div key={item} style={{
                    padding: '12px 16px',
                    backgroundColor: '#ecfdf5',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#065f46',
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '18px', color: '#94a3b8' }}>
                ✗ Not For
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Fake projects', 'Keyword stuffing', 'Auto-generated portfolios'].map((item) => (
                  <div key={item} style={{
                    padding: '12px 16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#94a3b8',
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - Soft Gradient */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 800,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#0f172a',
            }}
          >
            Your experience deserves<br />more than a PDF.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: '18px',
              marginBottom: '40px',
              color: '#64748b',
            }}
          >
            One space. All your work. Proven.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/auth/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '18px 44px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: 'white',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.2)',
              }}
            >
              Create Your OneSpace
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER - Minimal */}
      <footer style={{
        padding: '40px 0',
        backgroundColor: 'white',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <OneSpaceLogo style={{ fontSize: '18px', color: '#94a3b8' }} />
          <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#94a3b8' }}>
            <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
            <Link href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms</Link>
          </div>
        </div>
      </footer>

      {/* More Professions Modal */}
      <MoreProfessionsModal
        isOpen={showMoreProfessions}
        onClose={() => setShowMoreProfessions(false)}
      />
    </main>
  );
}
