import React from 'react';

export default function LoadingSpinner({ message = 'Analyzing leaf photo...' }) {
  return (
    <div className="state-container">
      <div className="spinner"></div>
      <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', marginBottom: '0.35rem' }}>
        {message}
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        This will only take a moment.
      </p>
    </div>
  );
}
