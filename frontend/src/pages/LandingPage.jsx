import React from 'react';
import { ScanLine, Droplets, CloudSun, Wheat, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LandingPage({ setActivePage }) {
  const tools = [
    {
      id: 'disease',
      title: 'Check Crop Health',
      desc: 'Take a photo of a leaf to find out if your crop has a disease and how to treat it.',
      icon: <ScanLine size={24} color="var(--color-primary)" />,
      badge: 'Most Used',
    },
    {
      id: 'irrigation',
      title: 'Watering Advice',
      desc: 'Check if your soil needs water today based on recent rainfall and crop stage.',
      icon: <Droplets size={24} color="var(--color-sky)" />,
    },
    {
      id: 'weather',
      title: 'Farming Weather',
      desc: '7-day local forecast with rain warnings and best spraying hours.',
      icon: <CloudSun size={24} color="var(--color-earth)" />,
    },
    {
      id: 'crop-recommendation',
      title: 'Best Crop for Your Soil',
      desc: 'Enter your soil test values to see which crops will give the highest yield.',
      icon: <Wheat size={24} color="var(--color-warning)" />,
    },
  ];

  return (
    <div>
      {/* Hero Welcome Banner */}
      <div
        className="agri-card"
        style={{
          background: 'linear-gradient(180deg, #1b4332 0%, #2d6a4f 100%)',
          color: 'white',
          padding: '2.5rem 1.5rem',
          marginBottom: '2rem',
          border: 'none',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.18)',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '1rem',
          }}
        >
          <ShieldCheck size={14} /> Practical Farming Advisory
        </span>

        <h1 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '0.75rem' }}>
          Simple crop care advice for your farm.
        </h1>
        <p style={{ color: '#d8f3dc', fontSize: '1.05rem', maxWidth: '620px', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          Take a photo of any damaged leaf to identify plant diseases, know when to water, and choose the most profitable crop for your soil.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            onClick={() => setActivePage('disease')}
            style={{
              background: '#ffffff',
              color: 'var(--color-primary-dark)',
              borderColor: '#ffffff',
              fontSize: '1rem',
              padding: '0.75rem 1.5rem',
            }}
          >
            <ScanLine size={18} />
            <span>Check Your Crop Now</span>
          </button>

          <button
            className="btn-secondary"
            onClick={() => setActivePage('dashboard')}
            style={{
              background: 'transparent',
              color: '#ffffff',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              fontSize: '1rem',
              padding: '0.75rem 1.5rem',
            }}
          >
            <span>Open Farm Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Agriculture Tools */}
      <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
        Farming Tools Available Today
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {tools.map((t) => (
          <div
            key={t.id}
            className="agri-card"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
            onClick={() => setActivePage(t.id)}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <div style={{ background: 'var(--bg-muted)', padding: '0.6rem', borderRadius: '8px' }}>
                  {t.icon}
                </div>
                {t.badge && (
                  <span className="badge badge-success">{t.badge}</span>
                )}
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{t.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t.desc}</p>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.88rem' }}>
              <span>Open Tool</span>
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Simplicity Guide */}
      <div className="agri-card" style={{ background: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
        <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
          🌱 How AgriSmart Helps You
        </h3>
        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          <li><strong>Accurate Leaf Checks:</strong> Detect fungal, bacterial, or pest attacks in seconds.</li>
          <li><strong>Clear Precautions:</strong> Get 2–4 simple, actionable steps you can do on your farm today.</li>
          <li><strong>Water Conservation:</strong> Avoid over-watering to protect roots and save electricity.</li>
        </ul>
      </div>
    </div>
  );
}
