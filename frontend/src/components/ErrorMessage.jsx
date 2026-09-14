import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="state-container" style={{ borderColor: '#fca5a5', background: '#fffafa' }}>
      <AlertCircle size={40} color="var(--color-danger)" style={{ margin: '0 auto 0.75rem' }} />
      <h3 style={{ fontSize: '1.2rem', color: 'var(--color-danger)', marginBottom: '0.4rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.25rem' }}>
        {message || 'Unable to complete the operation. Please try again.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary" style={{ margin: '0 auto' }}>
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
