import React from 'react';
import {
  Sprout,
  ScanLine,
  Droplets,
  CloudSun,
  Wheat,
  Leaf,
  Bot,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Activity,
  Sparkles,
  Zap,
  Globe,
  LogIn,
  UserPlus,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import { translations } from '../translations';
import BackendStatusBadge from '../components/BackendStatusBadge';

export default function LandingPage({ setActivePage, language = 'en', setLanguage }) {
  const t = translations[language] || translations.en;

  const coreFeatures = [
    {
      id: 'disease',
      title: 'Plant Disease AI Detection',
      desc: 'Instant visual leaf diagnosis with actionable fungicide, bio-control, and cultural precautions.',
      icon: <ScanLine size={24} color="var(--color-primary)" />,
      badge: 'Vision AI v2.4',
      badgeClass: 'badge-primary',
      cta: 'Check Crop Health',
    },
    {
      id: 'crop-recommendation',
      title: 'Crop Suitability Advisor',
      desc: 'Optimizes seasonal crop selection based on soil pH, rainfall, temperature, and crop rotation history.',
      icon: <Wheat size={24} color="var(--color-warning)" />,
      badge: '98.2% Accuracy',
      badgeClass: 'badge-warning',
      cta: 'Find Best Crops',
    },
    {
      id: 'irrigation',
      title: 'Smart Irrigation Assistant',
      desc: 'Precision soil moisture advisories with rain-delay intelligence to prevent waterlogging and cut pump costs.',
      icon: <Droplets size={24} color="var(--color-sky)" />,
      badge: 'FAO-56 Method',
      badgeClass: 'badge-info',
      cta: 'Watering Guidance',
    },
    {
      id: 'weather',
      title: 'Hyperlocal Weather Intelligence',
      desc: '7-day agricultural forecasts, precipitation warnings, and safe foliar spraying time windows.',
      icon: <CloudSun size={24} color="var(--color-earth)" />,
      badge: 'Hourly Alerts',
      badgeClass: 'badge-secondary',
      cta: 'View Forecast',
    },
    {
      id: 'sustainability',
      title: 'Farm Sustainability Score',
      desc: '100-point regenerative farming evaluation for groundwater conservation, organic carbon, and soil health.',
      icon: <Leaf size={24} color="var(--color-success)" />,
      badge: 'Regenerative',
      badgeClass: 'badge-success',
      cta: 'Calculate Score',
    },
    {
      id: 'assistant',
      title: 'Conversational Farmer Assistant',
      desc: 'Multilingual agronomic AI assistant with 8-stage agentic decision synthesis for whole-farm advisory.',
      icon: <Bot size={24} color="var(--color-primary)" />,
      badge: 'Multilingual',
      badgeClass: 'badge-primary',
      cta: 'Ask Farm Assistant',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Capture or Enter Data',
      desc: 'Take a photo of any suspect crop leaf or select your soil and seasonal field parameters.',
      icon: <ScanLine size={20} color="var(--color-primary)" />,
    },
    {
      step: '02',
      title: 'Instant AI Evaluation',
      desc: 'Our PyTorch vision model & agronomic engine analyze symptoms and local weather telemetry.',
      icon: <BrainCircuit size={20} color="var(--color-primary)" />,
    },
    {
      step: '03',
      title: 'Apply Actionable Care',
      desc: 'Receive exact dosage, treatment timelines, and water conservation guidance tailored to your farm.',
      icon: <CheckCircle2 size={20} color="var(--color-success)" />,
    },
  ];

  const roles = [
    {
      role: 'Farmer',
      title: 'For Farmers & Producers',
      desc: 'Daily watering advice, rapid disease checks, and fertilizer optimization in your regional language.',
      badge: 'Smart Farming Hub',
      btnText: 'Enter Farmer Portal',
      action: () => setActivePage('dashboard'),
    },
    {
      role: 'Expert',
      title: 'For Agricultural Experts',
      desc: 'Triage field disease escalation requests, review pathological scans, and dispatch verified prescriptions.',
      badge: 'Agronomist Desk',
      btnText: 'Agronomist Login',
      action: () => setActivePage('login'),
    },
    {
      role: 'Admin',
      title: 'For Platform Admins',
      desc: 'Monitor real-time ML inference telemetry, regional disease outbreak analytics, and user directory.',
      badge: 'Administration',
      btnText: 'System Console',
      action: () => setActivePage('login'),
    },
  ];

  return (
    <div className="public-landing-container" style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* 1. Public Top Navigation Header */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '0.75rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Logo & Brand */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
            onClick={() => setActivePage('landing')}
          >
            <div
              style={{
                background: 'var(--color-primary)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sprout size={22} />
            </div>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                AgriSmart <span style={{ color: 'var(--color-primary)' }}>AI</span>
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  color: 'var(--text-subtle)',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                }}
              >
                INTELLIGENT AGRICULTURE
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav
            className="landing-desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
          >
            <button
              onClick={() => setActivePage('disease')}
              style={{ background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              Disease AI
            </button>
            <button
              onClick={() => setActivePage('crop-recommendation')}
              style={{ background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              Crop Choice
            </button>
            <button
              onClick={() => setActivePage('irrigation')}
              style={{ background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              Smart Irrigation
            </button>
            <button
              onClick={() => setActivePage('weather')}
              style={{ background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              Weather
            </button>
            <button
              onClick={() => setActivePage('sustainability')}
              style={{ background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              Sustainability
            </button>
          </nav>

          {/* Right Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <BackendStatusBadge />

            {/* Language Selector */}
            {setLanguage && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg-muted)', padding: '0.3rem 0.5rem', borderRadius: '8px' }}>
                <Globe size={14} color="var(--text-muted)" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label="Select Language"
                >
                  <option value="en">EN</option>
                  <option value="hi">हिन्दी</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>
            )}

            {/* Sign In Button */}
            <button
              className="btn-secondary"
              onClick={() => setActivePage('login')}
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>

            {/* Get Started / Register Button */}
            <button
              className="btn-primary"
              onClick={() => setActivePage('register')}
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <UserPlus size={15} />
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Hero Section */}
      <section style={{ maxWidth: 'var(--max-width)', margin: '1.75rem auto 2.5rem', padding: '0 1rem' }}>
        <div
          className="agri-card"
          style={{
            background: 'linear-gradient(135deg, #0d2818 0%, #1b4332 50%, #2d6a4f 100%)',
            color: 'white',
            padding: '3rem 2rem',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-elevated)',
            border: 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(183, 228, 199, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(255, 255, 255, 0.16)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0.3rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Sparkles size={14} color="#b7e4c7" />
              <span>Smart India Hackathon • Practical Agricultural AI</span>
            </div>

            <h1
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 4vw, 2.85rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              Intelligent Agriculture for a Sustainable Future
            </h1>

            <p
              style={{
                color: '#d8f3dc',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                marginBottom: '2rem',
                fontWeight: 400,
              }}
            >
              Empowering farmers, agronomists, and researchers with real-time leaf pathology diagnostics,
              smart irrigation scheduling, soil-tailored crop recommendations, and climate intelligence.
            </p>

            {/* Hero CTA Buttons */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                className="btn-primary"
                onClick={() => setActivePage('disease')}
                style={{
                  background: '#ffffff',
                  color: 'var(--color-primary-dark)',
                  borderColor: '#ffffff',
                  fontSize: '1rem',
                  padding: '0.85rem 1.75rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                }}
              >
                <ScanLine size={18} />
                <span>Check Crop Leaf Now (Free)</span>
              </button>

              <button
                className="btn-secondary"
                onClick={() => setActivePage('register')}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '1rem',
                  padding: '0.85rem 1.5rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                }}
              >
                <UserPlus size={18} />
                <span>Register Your Farm</span>
              </button>

              <button
                onClick={() => setActivePage('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b7e4c7',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.5rem 0.75rem',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                Already registered? Sign In →
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div
              style={{
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>38+</div>
                <div style={{ fontSize: '0.78rem', color: '#b7e4c7' }}>Crop Pathogen Classes</div>
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>98.2%</div>
                <div style={{ fontSize: '0.78rem', color: '#b7e4c7' }}>ML Diagnostic Precision</div>
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>40-50%</div>
                <div style={{ fontSize: '0.78rem', color: '#b7e4c7' }}>Water Savings Potential</div>
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: '#b7e4c7' }}>Free Open Science</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Agriculture Intelligence Modules */}
      <section style={{ maxWidth: 'var(--max-width)', margin: '0 auto 3rem', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              letterSpacing: '0.08em',
            }}
          >
            MODULAR AGRICULTURAL TOOLS
          </span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', fontWeight: 800, marginTop: '0.35rem' }}>
            Comprehensive Farm Advisory Suite
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '560px', margin: '0.4rem auto 0' }}>
            Each module provides validated, actionable recommendations grounded in real agronomic science.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {coreFeatures.map((tool) => (
            <div
              key={tool.id}
              className="agri-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onClick={() => setActivePage(tool.id)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div
                    style={{
                      background: 'var(--bg-muted)',
                      padding: '0.7rem',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {tool.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      background: 'var(--color-primary-tint)',
                      color: 'var(--color-primary)',
                      border: '1px solid var(--color-primary-border)',
                    }}
                  >
                    {tool.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.45rem' }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {tool.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                }}
              >
                <span>{tool.cta}</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How It Works Workflow */}
      <section style={{ maxWidth: 'var(--max-width)', margin: '0 auto 3.5rem', padding: '0 1rem' }}>
        <div
          className="agri-card"
          style={{
            background: 'var(--bg-surface)',
            padding: '2.5rem 2rem',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                letterSpacing: '0.08em',
              }}
            >
              SIMPLE 3-STEP PROCESS
            </span>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)', fontWeight: 800, marginTop: '0.25rem' }}>
              How AgriSmart AI Protects Your Yield
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {steps.map((s) => (
              <div
                key={s.step}
                style={{
                  background: 'var(--bg-muted)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: 'var(--color-primary)',
                    opacity: 0.8,
                    marginBottom: '0.5rem',
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Role-Based Portals Showcase */}
      <section style={{ maxWidth: 'var(--max-width)', margin: '0 auto 3.5rem', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              letterSpacing: '0.08em',
            }}
          >
            ROLE-BASED WORKSPACES
          </span>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)', fontWeight: 800, marginTop: '0.25rem' }}>
            Dedicated Portals for Every Stakeholder
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {roles.map((r, idx) => (
            <div
              key={idx}
              className="agri-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem 1.5rem',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    background: 'var(--bg-muted)',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {r.badge}
                </span>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {r.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {r.desc}
                </p>
              </div>

              <button
                className="btn-secondary"
                onClick={r.action}
                style={{
                  marginTop: '1.5rem',
                  width: '100%',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                }}
              >
                <span>{r.btnText}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Ready to Get Started Bottom Banner */}
      <section style={{ maxWidth: 'var(--max-width)', margin: '0 auto 2.5rem', padding: '0 1rem' }}>
        <div
          className="agri-card"
          style={{
            background: 'linear-gradient(180deg, #1b4332 0%, #2d6a4f 100%)',
            color: 'white',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            border: 'none',
            borderRadius: '16px',
          }}
        >
          <h2 style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Ready to Protect and Optimize Your Farm?
          </h2>
          <p style={{ color: '#d8f3dc', fontSize: '0.98rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
            Join thousands of producers leveraging AI for crop pathology diagnostics, water conservation, and soil health.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={() => setActivePage('register')}
              style={{
                background: '#ffffff',
                color: 'var(--color-primary-dark)',
                borderColor: '#ffffff',
                fontWeight: 700,
                padding: '0.75rem 1.75rem',
              }}
            >
              <span>Register Profile Now</span>
              <ArrowRight size={16} />
            </button>

            <button
              className="btn-secondary"
              onClick={() => setActivePage('login')}
              style={{
                background: 'transparent',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
              }}
            >
              <span>Sign In to Existing Account</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
