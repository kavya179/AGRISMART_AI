import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Clock, Info, ShieldCheck } from 'lucide-react';

export default function StatusBadge({
  status = 'neutral',
  label,
  size = 'md', // 'sm' | 'md' | 'lg'
  showIcon = true,
  className = '',
}) {
  const norm = (status || '').toLowerCase();

  let bg = 'var(--bg-muted)';
  let color = 'var(--text-secondary)';
  let border = 'var(--border-color)';
  let Icon = Info;

  if (norm.includes('healthy') || norm.includes('active') || norm.includes('verified') || norm.includes('online') || norm.includes('resolved') || norm === 'success') {
    bg = 'var(--color-success-bg)';
    color = 'var(--color-success)';
    border = 'var(--color-success-border)';
    Icon = CheckCircle2;
  } else if (norm.includes('diseased') || norm.includes('critical') || norm.includes('danger') || norm.includes('offline') || norm.includes('error')) {
    bg = 'var(--color-danger-bg)';
    color = 'var(--color-danger)';
    border = 'var(--color-danger-border)';
    Icon = AlertTriangle;
  } else if (norm.includes('pending') || norm.includes('warning') || norm.includes('analysis') || norm.includes('review') || norm.includes('moderate')) {
    bg = 'var(--color-warning-bg)';
    color = 'var(--color-warning)';
    border = 'var(--color-warning-border)';
    Icon = Clock;
  } else if (norm.includes('expert') || norm.includes('admin') || norm.includes('info')) {
    bg = 'var(--color-sky-tint)';
    color = 'var(--color-sky)';
    border = 'var(--color-sky-border)';
    Icon = ShieldCheck;
  }

  const padding = size === 'sm' ? '0.15rem 0.45rem' : size === 'lg' ? '0.35rem 0.85rem' : '0.22rem 0.65rem';
  const fontSize = size === 'sm' ? '0.72rem' : size === 'lg' ? '0.9rem' : '0.8rem';
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  return (
    <span
      className={`badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding,
        fontSize,
        fontWeight: 700,
        borderRadius: 'var(--radius-full)',
        background: bg,
        color,
        border: `1px solid ${border}`,
        lineHeight: 1.2,
      }}
    >
      {showIcon && <Icon size={iconSize} />}
      <span>{label || status}</span>
    </span>
  );
}
