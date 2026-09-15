import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'var(--color-primary)',
  iconBg = 'var(--color-primary-tint)',
  trend,
  trendDirection = 'neutral', // 'up' | 'down' | 'neutral'
  trendLabel,
  onClick,
  badge,
}) {
  return (
    <div
      className="stat-card"
      onClick={onClick}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            {title}
          </span>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem', lineHeight: 1.2 }}>
            {value}
          </div>
        </div>
        {Icon && (
          <div
            style={{
              background: iconBg,
              color: iconColor,
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem', fontSize: '0.82rem' }}>
        {subtitle && <span style={{ color: 'var(--text-secondary)' }}>{subtitle}</span>}

        {trend && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem',
              fontWeight: 700,
              color:
                trendDirection === 'up'
                  ? 'var(--color-success)'
                  : trendDirection === 'down'
                  ? 'var(--color-danger)'
                  : 'var(--text-muted)',
            }}
          >
            {trendDirection === 'up' && <ArrowUpRight size={14} />}
            {trendDirection === 'down' && <ArrowDownRight size={14} />}
            {trendDirection === 'neutral' && <Minus size={14} />}
            <span>{trend}</span>
            {trendLabel && <span style={{ fontWeight: 400, color: 'var(--text-subtle)', marginLeft: '2px' }}>{trendLabel}</span>}
          </span>
        )}

        {badge && (
          <span
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: badge.bg || 'var(--bg-muted)',
              color: badge.color || 'var(--text-main)',
            }}
          >
            {badge.text}
          </span>
        )}
      </div>
    </div>
  );
}
