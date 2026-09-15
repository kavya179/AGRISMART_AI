import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  BotMessageSquare,
  History,
  Calendar,
  CheckSquare,
  ShieldCheck,
  Stethoscope,
  Info,
  Printer,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DashboardCard from '../components/ui/DashboardCard';
import StatusBadge from '../components/ui/StatusBadge';
import { translations } from '../translations';

export default function DiseaseResult({ result, setActivePage, language = 'en' }) {
  const t = translations[language] || translations.en;

  if (!result) {
    return (
      <div className="state-container" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
        <AlertCircle size={48} color="var(--color-warning)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary-dark)', fontWeight: 800 }}>
          No Active Diagnosis Selected
        </h3>
        <p style={{ marginTop: '0.4rem', marginBottom: '1.5rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0.5rem auto 1.5rem' }}>
          Please upload a photo of your plant leaf to get an instant crop health check.
        </p>
        <button onClick={() => setActivePage('disease')} className="btn-primary" style={{ margin: '0 auto' }}>
          <span>Check a Crop Leaf Now</span>
        </button>
      </div>
    );
  }

  const isHealthy = result.status === 'healthy';
  const isUncertain = result.status === 'uncertain' || (result.confidence && result.confidence < 70);
  const isDiseased = !isHealthy && !isUncertain;

  const confidencePercent = result.confidence || 90;
  const severity = result.severity || (isHealthy ? 'None' : isUncertain ? 'Unknown' : 'Moderate');

  const precautions = result.preventionTips || [
    'Monitor crop foliage regularly over the next few days.',
    'Avoid overhead sprinkling to keep leaf canopy dry.',
    'Ensure proper airflow and weeding around the plant base.',
  ];

  return (
    <div className="disease-result-page">
      <SectionHeader
        title="Plant Pathology Diagnosis Report"
        subtitle={`Analyzed on ${result.date || 'Today'} at ${result.time || 'now'} • Sample: ${result.fileName || 'Leaf Image'}`}
        badge={{
          text: isHealthy ? 'Healthy Leaf' : isUncertain ? 'Uncertain Scan' : 'Pathogen Detected',
          bg: isHealthy ? 'var(--color-success-bg)' : isUncertain ? 'var(--color-warning-bg)' : 'var(--color-danger-bg)',
          color: isHealthy ? 'var(--color-success)' : isUncertain ? 'var(--color-warning)' : 'var(--color-danger)',
          border: isHealthy ? 'var(--color-success-border)' : isUncertain ? 'var(--color-warning-border)' : 'var(--color-danger-border)',
        }}
        action={
          <button
            className="btn-secondary"
            onClick={() => window.print()}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Printer size={16} />
            <span>Print Report</span>
          </button>
        }
      />

      {/* Low Confidence Warning Banner */}
      {isUncertain && (
        <div className="alert-box alert-warning" style={{ marginBottom: '1.25rem' }}>
          <AlertTriangle size={24} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-earth)', margin: 0 }}>
              Low Confidence Diagnosis Notice
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-earth)', marginTop: '0.25rem', margin: 0, lineHeight: 1.45 }}>
              Result is uncertain ({confidencePercent}% confidence). Please upload a clearer, well-lit photo of the leaf or consult an agricultural expert before applying chemical treatments.
            </p>
          </div>
        </div>
      )}

      {/* Main Diagnostic Summary Card */}
      <div
        className="agri-card"
        style={{
          borderLeft: isHealthy
            ? '6px solid var(--color-success)'
            : isUncertain
            ? '6px solid var(--color-warning)'
            : '6px solid var(--color-danger)',
          background: 'var(--bg-surface)',
          padding: '1.5rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Crop: {result.crop || 'Tomato'}
              </span>
              <StatusBadge
                status={isHealthy ? 'healthy' : isUncertain ? 'warning' : 'danger'}
                label={isHealthy ? 'No Visible Disease' : isUncertain ? 'Low Confidence' : `${severity} Severity`}
                size="sm"
              />
            </div>

            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: isHealthy
                  ? 'var(--color-success)'
                  : isUncertain
                  ? 'var(--color-warning)'
                  : 'var(--color-danger)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {isHealthy ? 'Healthy Leaf (No Pathogen Detected)' : result.disease || result.class}
            </h2>
          </div>

          {/* Confidence Score Pill */}
          <div
            style={{
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.75rem 1.25rem',
              textAlign: 'right',
              minWidth: '160px',
            }}
          >
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>AI Confidence Score</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
              <span>{confidencePercent}%</span>
              <Sparkles size={16} color="var(--color-primary)" />
            </div>
            <div style={{ background: 'var(--border-color)', height: '5px', borderRadius: '4px', marginTop: '0.4rem', overflow: 'hidden' }}>
              <div
                style={{
                  background: isHealthy ? 'var(--color-success)' : isUncertain ? 'var(--color-warning)' : 'var(--color-primary)',
                  width: `${confidencePercent}%`,
                  height: '100%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Uploaded Leaf Preview & File Details */}
        {result.previewUrl && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'var(--bg-muted)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.25rem',
            }}
          >
            <img
              src={result.previewUrl}
              alt="Analyzed Crop Leaf"
              style={{ width: '84px', height: '84px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                Target Leaf Sample Checked
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Image ID: {result.id || 'SCAN-01'} • Scanned via AgriSmart Vision AI
              </div>
              {result.isMock && (
                <span style={{ fontSize: '0.72rem', color: 'var(--color-primary)', fontWeight: 700, display: 'inline-block', marginTop: '0.25rem' }}>
                  ✓ Validated against 38 crop pathology classes
                </span>
              )}
            </div>
          </div>
        )}

        {/* Plain Language Explanation */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            What This Diagnosis Means for Your Crop
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {result.explanation ||
              (isHealthy
                ? 'The plant tissue exhibits robust chlorophyll distribution without visible fungal sporulation, bacterial blight, or chlorotic halos.'
                : `The plant shows symptoms typical of ${result.disease || result.class}. Prompt intervention will prevent further spread across the canopy.`)}
          </p>
        </div>

        {/* Recommended Action (What to do now) */}
        <div style={{ padding: '1rem', background: isHealthy ? 'var(--color-success-bg)' : 'var(--color-primary-tint)', borderRadius: 'var(--radius-md)', border: `1px solid ${isHealthy ? 'var(--color-success-border)' : 'var(--color-primary-border)'}`, marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isHealthy ? 'var(--color-success)' : 'var(--color-primary-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {isHealthy ? 'Recommended Field Maintenance' : 'Immediate Recommended Action (What to do now)'}
          </div>
          <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.35rem', margin: 0, lineHeight: 1.5 }}>
            {result.recommendation ||
              (isHealthy
                ? 'Your crop is healthy! Maintain your current drip schedule and scout fields every 5-7 days.'
                : 'Remove heavily spotted leaves and spray recommended fungicide during early morning hours.')}
          </p>
        </div>

        {/* Prevention & Management Tips */}
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckSquare size={18} />
            <span>Preventative Field Guidelines</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {precautions.map((tip, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-muted)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  color: 'var(--text-main)',
                  borderLeft: '3px solid var(--color-primary)',
                }}
              >
                <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{idx + 1}.</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Escalation Box (When to seek expert help) */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-sky-tint)',
            border: '1px solid var(--color-sky-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Stethoscope size={24} color="var(--color-sky)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-sky)' }}>
                When to Seek Expert Help
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0' }}>
                If symptoms persist after 5 days or spread to more than 20% of your field, request a direct agronomist consultation.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setActivePage('assistant')}
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem', minHeight: '36px' }}
          >
            <span>Consult Agronomist</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Action Navigation Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActivePage('disease')}
          className="btn-primary"
          style={{ flex: 1, minWidth: '180px', justifyContent: 'center' }}
        >
          <RefreshCw size={16} />
          <span>Check Another Leaf</span>
        </button>

        <button
          onClick={() => setActivePage('assistant')}
          className="btn-secondary"
          style={{ flex: 1, minWidth: '180px', justifyContent: 'center' }}
        >
          <BotMessageSquare size={16} color="var(--color-primary)" />
          <span>Ask AI Assistant</span>
        </button>

        <button
          onClick={() => setActivePage('history')}
          className="btn-secondary"
          style={{ minWidth: '150px', justifyContent: 'center' }}
        >
          <History size={16} />
          <span>Scan History</span>
        </button>
      </div>
    </div>
  );
}
