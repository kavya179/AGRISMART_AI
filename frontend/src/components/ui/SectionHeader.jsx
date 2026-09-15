import React from 'react';

export default function SectionHeader({
  title,
  subtitle,
  date,
  badge,
  action,
  style = {},
}) {
  return (
    <div
      className="section-header"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        ...style,
      }}
    >
      <div>
        {date && (
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
            {date}
          </span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0 }}>
            {title}
          </h1>
          {badge && (
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: badge.bg || 'var(--color-primary-tint)',
                color: badge.color || 'var(--color-primary)',
                border: `1px solid ${badge.border || 'var(--color-primary-border)'}`,
              }}
            >
              {badge.text}
            </span>
          )}
        </div>
        {subtitle && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem', margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {action}
        </div>
      )}
    </div>
  );
}
