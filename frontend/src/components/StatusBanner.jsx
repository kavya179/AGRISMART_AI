import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function StatusBanner({ type = 'info', title, message, actionText, onAction }) {
  const icons = {
    info: <Info size={20} color="var(--color-sky)" style={{ flexShrink: 0, marginTop: '2px' }} />,
    warning: <AlertTriangle size={20} color="var(--color-earth)" style={{ flexShrink: 0, marginTop: '2px' }} />,
    danger: <AlertCircle size={20} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />,
    success: <CheckCircle size={20} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />,
  };

  const classMap = {
    info: 'alert-info',
    warning: 'alert-warning',
    danger: 'alert-danger',
    success: 'alert-success',
  };

  return (
    <div className={`alert-box ${classMap[type] || 'alert-info'}`}>
      {icons[type] || icons.info}
      <div style={{ flex: 1 }}>
        {title && <strong style={{ display: 'block', marginBottom: '0.2rem' }}>{title}</strong>}
        <div>{message}</div>
        {actionText && onAction && (
          <button
            onClick={onAction}
            style={{
              marginTop: '0.5rem',
              padding: '0.25rem 0.6rem',
              fontSize: '0.8rem',
              background: 'white',
              border: '1px solid currentColor',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'inherit',
            }}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
