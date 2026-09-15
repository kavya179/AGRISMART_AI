import React from 'react';

export default function DashboardCard({
  title,
  subtitle,
  icon: Icon,
  action,
  badge,
  children,
  className = '',
  style = {},
  headerStyle = {},
  footer,
}) {
  return (
    <div
      className={`agri-card ${className}`}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-subtle)',
        marginBottom: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {(title || Icon || action || badge) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            paddingBottom: '0.75rem',
            marginBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)',
            ...headerStyle,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {Icon && (
              <div style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
                <Icon size={20} />
              </div>
            )}
            <div>
              {title && (
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, marginTop: '0.15rem' }}>
                  {subtitle}
                </p>
              )}
            </div>
            {badge && (
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: badge.bg || 'var(--color-primary-tint)',
                  color: badge.color || 'var(--color-primary-dark)',
                  border: `1px solid ${badge.border || 'var(--color-primary-border)'}`,
                }}
              >
                {badge.text}
              </span>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      )}

      <div style={{ flex: 1 }}>{children}</div>

      {footer && (
        <div
          style={{
            marginTop: '1rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
