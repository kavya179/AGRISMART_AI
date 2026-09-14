import React from 'react';
import { Home, ScanLine, Droplets, CloudSun, HelpCircle } from 'lucide-react';
import { translations } from '../translations';

export default function MobileNav({ activePage, setActivePage, language }) {
  const t = translations[language] || translations.en;

  const items = [
    { id: 'dashboard', label: t.navFarm, icon: <Home size={20} /> },
    { id: 'disease', label: t.navCheckCrop, icon: <ScanLine size={20} /> },
    { id: 'irrigation', label: t.navWatering, icon: <Droplets size={20} /> },
    { id: 'weather', label: t.navWeather, icon: <CloudSun size={20} /> },
    { id: 'help', label: t.navHelp, icon: <HelpCircle size={20} /> },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={`mobile-nav-item ${activePage === item.id ? 'active' : ''}`}
          onClick={() => setActivePage(item.id)}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
