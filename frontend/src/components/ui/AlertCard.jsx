import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2, Info, ArrowRight } from 'lucide-react';

export default function AlertCard({
  severity = 'info', // 'warning' | 'danger' | 'success' | 'info'
  title,
  message,
  timestamp,
  actionLabel,
  onAction,
  style = {},
}) {
  const configs = {
    warning: {
      bg: 'var(--color-warning-bg)',
      border: 'var(--color-warning-border)',
      color: 'var(--color-warning)',
      textColor: '#78350f',
      Icon: AlertTriangle,
    },
    danger: {
      bg: 'var(--color-danger-bg)',
      border: 'var(--color-danger-border)',
      color: 'var(--color-danger)',
      textColor: '#991b1b',
      Icon: AlertCircle,
    },
    success: {
      bg: 'var(--color-success-bg)',
      border: 'var(--color-success-border)',
      color: 'var(--color-success)',
      textColor: '#14532d',
      Icon: CheckCircle2,
    },
    info: {
      bg: 'var(--color-sky-tint)',
      border: 'var(--color-sky-border)',
      color: 'var(--color-sky)',
      textColor: '#0c4a6e',
      Icon: Info,
    },
  };

  const cfg = configs[severity] || configs.info;
  const Icon = cfg.Icon;

  return (
    <div
      className="alert-card"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.15rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem',
        marginBottom: '0.85rem',
        ...style,
      }}
    >
      <div style={{ color: cfg.color, marginTop: '2px', flexShrink: 0 }}>
        <Icon size={20} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: cfg.textColor, margin: 0 }}>
            {title}
          </h4>
          {timestamp && (
            <span style={{ fontSize: '0.75rem', color: cfg.textColor, opacity: 0.8 }}>
              {timestamp}
            </span>
          )}
        </div>

        {message && (
          <p style={{ fontSize: '0.85rem', color: cfg.textColor, opacity: 0.9, marginTop: '0.25rem', margin: 0, lineHeight: 1.45 }}>
            {message}
          </p>
        )}

        {actionLabel && onAction && (
          <button
            onClick={onAction}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              marginTop: '0.5rem',
              color: cfg.color,
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              cursor: 'pointer',
              minHeight: 'auto',
            }}
          >
            <span>{actionLabel}</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
