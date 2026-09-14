import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PageHeader({ title, description, onBack }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div className="page-top-header">
        {onBack && (
          <button onClick={onBack} className="btn-back" title="Go back">
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}
        <h1 style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)' }}>{title}</h1>
      </div>
      {description && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginTop: '-0.5rem', maxWidth: '720px' }}>
          {description}
        </p>
      )}
    </div>
  );
}
