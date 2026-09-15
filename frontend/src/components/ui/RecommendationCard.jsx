import React from 'react';
import { Lightbulb, CheckCircle2, ChevronRight } from 'lucide-react';

export default function RecommendationCard({
  category = 'Agronomic Advice',
  title,
  desc,
  priority = 'Medium',
  onApply,
  style = {},
}) {
  const isHigh = priority.toLowerCase() === 'high' || priority.toLowerCase() === 'critical';

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        borderLeft: isHigh ? '4px solid var(--color-warning)' : '4px solid var(--color-primary)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {category}
        </span>
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            background: isHigh ? 'var(--color-warning-bg)' : 'var(--color-primary-tint)',
            color: isHigh ? 'var(--color-warning)' : 'var(--color-primary)',
          }}
        >
          {priority} Priority
        </span>
      </div>

      <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>
        {title}
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
        {desc}
      </p>

      {onApply && (
        <button
          onClick={onApply}
          className="btn-secondary"
          style={{
            alignSelf: 'flex-start',
            marginTop: '0.4rem',
            padding: '0.35rem 0.75rem',
            fontSize: '0.82rem',
            minHeight: '32px',
          }}
        >
          <CheckCircle2 size={14} color="var(--color-primary)" />
          <span>Mark as Implemented</span>
        </button>
      )}
    </div>
  );
}
