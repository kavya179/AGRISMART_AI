import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No records found', message, actionText, onAction, icon }) {
  return (
    <div className="state-container">
      <div style={{ color: 'var(--text-subtle)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
        {icon || <Inbox size={42} />}
      </div>
      <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '450px', margin: '0 auto 1.25rem' }}>
        {message}
      </p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn-primary" style={{ margin: '0 auto' }}>
          {actionText}
        </button>
      )}
    </div>
  );
}
