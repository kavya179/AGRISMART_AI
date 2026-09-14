import React from 'react';
import { CheckCircle2, AlertTriangle, RefreshCw, BotMessageSquare, History, Calendar, CheckSquare } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { translations } from '../translations';

export default function DiseaseResult({ result, setActivePage, language = 'en' }) {
  const t = translations[language] || translations.en;

  if (!result) {
    return (
      <div className="state-container">
        <h3>{language === 'hi' ? 'कोई जांच परिणाम उपलब्ध नहीं है' : language === 'mr' ? 'कोणताही तपासणी निकाल उपलब्ध नाही' : 'No Diagnosis Available'}</h3>
        <p style={{ marginTop: '0.4rem', marginBottom: '1.25rem' }}>
          {language === 'hi' ? 'कृपया फसल स्वास्थ्य जांच के लिए पत्ती का फोटो अपलोड करें।' : language === 'mr' ? 'कृपया पीक आरोग्य तपासणीसाठी पानाचा फोटो अपलोड करा.' : 'Please upload a leaf photo to get a crop health check.'}
        </p>
        <button onClick={() => setActivePage('disease')} className="btn-primary">
          {t.btnChoosePhoto}
        </button>
      </div>
    );
  }

  const isHealthy = result.status === 'healthy';
  const confidencePercent = Math.round((result.confidence || 0.9) * 100);
  
  let confidenceLevel = t.confidenceHigh;
  if (confidencePercent < 70) {
    confidenceLevel = t.confidenceModerate;
  } else if (confidencePercent < 50) {
    confidenceLevel = t.confidenceLow;
  }

  const precautions = result.guidance?.precautions || [
    'Monitor the crop regularly over the next few days.',
    'Avoid excess overhead watering to keep foliage dry.',
    'Ensure proper airflow and weeding around the plant base.',
  ];

  return (
    <div>
      <PageHeader
        title={t.resultTitle}
        description={t.resultDesc}
        onBack={() => setActivePage('disease')}
      />

      {/* Main Diagnosis Summary Card */}
      <div
        className="agri-card"
        style={{
          borderLeft: isHealthy ? '6px solid var(--color-success)' : '6px solid var(--color-danger)',
          background: isHealthy ? '#f7fdf9' : '#fffcfc',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span
              className={`badge ${isHealthy ? 'badge-success' : 'badge-danger'}`}
              style={{ marginBottom: '0.5rem' }}
            >
              {isHealthy ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              <span>{isHealthy ? t.badgeHealthy : t.badgeDiseased}</span>
            </span>

            <h2 style={{ fontSize: '1.6rem', color: isHealthy ? 'var(--color-success)' : 'var(--color-danger)' }}>
              {isHealthy ? t.headingHealthy : `${t.headingDiseased} ${result.class}`}
            </h2>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.6rem 1rem', textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.confidenceLabel}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {confidenceLevel} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-subtle)' }}>({confidencePercent}%)</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Preview */}
        {result.previewUrl && (
          <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <img
              src={result.previewUrl}
              alt="Analyzed Leaf"
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                {language === 'hi' ? 'जांची गई पत्ती का फोटो' : language === 'mr' ? 'तपासलेले पान फोटो' : 'Leaf Image Checked'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {result.date || 'Today'} • {result.fileName || 'Camera Photo'}
              </div>
            </div>
          </div>
        )}

        {/* What this means */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            {t.whatMeansTitle}
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isHealthy ? t.whatMeansHealthy : `${t.whatMeansDiseased} (${result.class})`}
          </p>
        </div>

        {/* What you can do (Precautions) */}
        <div>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckSquare size={18} />
            <span>{t.whatToDoTitle}</span>
          </h3>

          <ul className="precaution-list">
            {precautions.map((step, idx) => (
              <li key={idx} className="precaution-item">
                <span style={{ fontWeight: 700, color: 'var(--color-primary)', minWidth: '20px' }}>{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* When to check again */}
        <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Calendar size={18} color="var(--color-primary)" />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <strong>{t.whenCheckTitle}</strong> {t.whenCheckDesc}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActivePage('disease')}
          className="btn-primary"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <RefreshCw size={16} />
          <span>{t.btnCheckAnother}</span>
        </button>

        <button
          onClick={() => setActivePage('assistant')}
          className="btn-secondary"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <BotMessageSquare size={16} />
          <span>{t.btnAskAssistant}</span>
        </button>

        <button
          onClick={() => setActivePage('history')}
          className="btn-secondary"
          style={{ justifyContent: 'center' }}
        >
          <History size={16} />
          <span>{t.btnViewHistory}</span>
        </button>
      </div>
    </div>
  );
}
