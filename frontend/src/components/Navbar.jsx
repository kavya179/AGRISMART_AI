import React from 'react';
import { Sprout, User } from 'lucide-react';
import { translations } from '../translations';

export default function Navbar({ activePage, setActivePage, language, setLanguage }) {
  const t = translations[language] || translations.en;

  const mainNavItems = [
    { id: 'dashboard', label: t.navFarm },
    { id: 'disease', label: t.navCheckCrop },
    { id: 'crop-recommendation', label: t.navCropChoice },
    { id: 'irrigation', label: t.navWatering },
    { id: 'weather', label: t.navWeather },
    { id: 'assistant', label: t.navAssistant },
    { id: 'history', label: t.navHistory },
    { id: 'help', label: t.navHelp },
  ];

  return (
    <header className="top-navbar">
      <div className="nav-content">
        <div className="brand-section" onClick={() => setActivePage('dashboard')}>
          <div className="brand-icon">
            <Sprout size={28} />
          </div>
          <div>
            <span>{t.appName}</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.85rem', marginLeft: '6px' }}>
              {t.portalTitle}
            </span>
          </div>
        </div>

        <nav className="desktop-nav-links">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link-btn ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-right-tools">
          <select
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            title="Select Language"
            aria-label="Select Language"
          >
            <option value="en">English</option>
            <option value="gu">ગુજરાતી (Gujarati)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>

          <button
            className={`btn-secondary ${activePage === 'profile' ? 'active' : ''}`}
            style={{ padding: '0.4rem 0.75rem', minHeight: '36px', fontSize: '0.85rem' }}
            onClick={() => setActivePage('profile')}
            title={t.navProfile}
          >
            <User size={16} />
            <span style={{ display: 'none' }}>{t.navProfile}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
