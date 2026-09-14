import React from 'react';
import { ScanLine, Droplets, CloudSun, CheckCircle2, AlertTriangle, ArrowRight, Calendar, User, ChevronRight } from 'lucide-react';
import { translations } from '../translations';

export default function Dashboard({ setActivePage, lastScan, userProfile, language = 'en' }) {
  const t = translations[language] || translations.en;

  const cropStatus = lastScan
    ? {
        title: lastScan.status === 'healthy' ? t.q1Healthy : `${t.headingDiseased} ${lastScan.class}`,
        isHealthy: lastScan.status === 'healthy',
        time: `${lastScan.date} at ${lastScan.time}`,
      }
    : {
        title: t.q1NoScans,
        isHealthy: null,
        time: t.q1ScanNow,
      };

  const getLocale = (lang) => {
    switch (lang) {
      case 'gu': return 'gu-IN';
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN';
      default: return 'en-IN';
    }
  };

  const getFallbackGreetingName = (lang) => {
    switch (lang) {
      case 'gu': return 'ખેડૂત મિત્ર';
      case 'hi': return 'किसान भाई';
      case 'mr': return 'शेतकरी मित्र';
      default: return 'Farmer';
    }
  };

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {new Date().toLocaleDateString(getLocale(language), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary-dark)', marginTop: '0.15rem' }}>
            {t.greeting}, {userProfile?.fullName || getFallbackGreetingName(language)}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            {t.farmLocation}: {userProfile?.district || 'Pune'}, {userProfile?.state || 'Maharashtra'} • {userProfile?.primaryCrop || 'Tomato'} ({userProfile?.farmSizeAcres || '4.5'} {t.acres})
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setActivePage('disease')}
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.95rem' }}
        >
          <ScanLine size={18} />
          <span>{t.btnCheckCrop}</span>
        </button>
      </div>

      {/* 5 Core Questions Farmer Answers Grid */}
      <div className="dashboard-questions-grid">
        
        {/* 1. Is my crop healthy? */}
        <div className="question-card">
          <div>
            <div className="question-label">{t.q1Label}</div>
            <div className="question-answer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {cropStatus.isHealthy === true && <CheckCircle2 size={20} color="var(--color-success)" />}
              {cropStatus.isHealthy === false && <AlertTriangle size={20} color="var(--color-danger)" />}
              <span>{cropStatus.title}</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{cropStatus.time}</p>
          </div>
          <button
            onClick={() => setActivePage('disease')}
            className="question-action-link"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <span>{lastScan ? t.q1ViewLast : t.q1ScanNow}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 2. Does my crop need water? */}
        <div className="question-card">
          <div>
            <div className="question-label">{t.q2Label}</div>
            <div className="question-answer" style={{ color: 'var(--color-sky)' }}>
              {t.q2Answer}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {t.q2Desc}
            </p>
          </div>
          <button
            onClick={() => setActivePage('irrigation')}
            className="question-action-link"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-sky)' }}
          >
            <span>{t.q2Action}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 3. What is the weather today? */}
        <div className="question-card">
          <div>
            <div className="question-label">{t.q3Label}</div>
            <div className="question-answer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CloudSun size={20} color="var(--color-earth)" />
              <span>28°C • {t.q3Condition}</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {t.q3Desc}
            </p>
          </div>
          <button
            onClick={() => setActivePage('weather')}
            className="question-action-link"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <span>{t.q3Action}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4. What should I do today? */}
        <div className="question-card" style={{ gridColumn: 'span 1' }}>
          <div>
            <div className="question-label">{t.q4Label}</div>
            <div className="question-answer" style={{ fontSize: '1rem' }}>
              {t.q4Answer}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {t.q4Desc}
            </p>
          </div>
          <button
            onClick={() => setActivePage('help')}
            className="question-action-link"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <span>{t.q4Action}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 5. Disease Warnings in your area */}
        <div className="question-card" style={{ gridColumn: 'span 1' }}>
          <div>
            <div className="question-label">{t.q5Label}</div>
            <div className="question-answer" style={{ fontSize: '1rem', color: 'var(--color-warning)' }}>
              {t.q5Answer}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {t.q5Desc}
            </p>
          </div>
          <button
            onClick={() => setActivePage('disease')}
            className="question-action-link"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-warning)' }}
          >
            <span>{t.q5Action}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Quick Assistant Callout */}
        <div className="question-card" style={{ background: 'var(--color-primary-tint)', borderColor: 'var(--color-primary-border)' }}>
          <div>
            <div className="question-label" style={{ color: 'var(--color-primary-dark)' }}>{t.helpBoxTitle}</div>
            <div className="question-answer" style={{ fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
              {t.helpBoxAnswer}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-primary-dark)' }}>
              {t.helpBoxDesc}
            </p>
          </div>
          <button
            onClick={() => setActivePage('assistant')}
            className="question-action-link"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-primary-dark)', fontWeight: 700 }}
          >
            <span>{t.helpBoxAction}</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="agri-card">
        <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>{t.shortcutsTitle}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <button
            onClick={() => setActivePage('disease')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ScanLine size={18} color="var(--color-primary)" />
              <span>{t.toolLeafCheck}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('irrigation')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Droplets size={18} color="var(--color-sky)" />
              <span>{t.toolWaterSchedule}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('crop-recommendation')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="var(--color-warning)" />
              <span>{t.toolSoilCrop}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('history')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} color="var(--text-secondary)" />
              <span>{t.toolPreviousScans}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>
        </div>
      </div>
    </div>
  );
}
