import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="app-footer">
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.88rem' }}>
          <button onClick={() => setActivePage('dashboard')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)' }}>Your Farm</button>
          <span>•</span>
          <button onClick={() => setActivePage('disease')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)' }}>Check Crop</button>
          <span>•</span>
          <button onClick={() => setActivePage('irrigation')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)' }}>Watering Advice</button>
          <span>•</span>
          <button onClick={() => setActivePage('weather')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)' }}>Weather</button>
          <span>•</span>
          <button onClick={() => setActivePage('help')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)' }}>Help & Advisory</button>
        </div>
        <p style={{ margin: 0, color: 'var(--text-subtle)', fontSize: '0.8rem' }}>
          AgriSmart AI — Practical Agricultural Assistance for Farmers • Built for Smart India Hackathon
        </p>
      </div>
    </footer>
  );
}
