import React from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, Server, Database } from 'lucide-react';

export default function ServiceStatusCard({ title, serviceName, port, statusObj, onRefresh, roleDesc }) {
  const isOnline = statusObj?.online;
  const isChecking = statusObj === null || statusObj === undefined;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <div
            className="card-icon-box"
            style={{
              background: isOnline ? '#ecfdf5' : '#fef2f2',
              color: isOnline ? '#059669' : '#dc2626',
            }}
          >
            {title.toLowerCase().includes('database') || title.toLowerCase().includes('node') ? (
              <Database size={22} />
            ) : (
              <Server size={22} />
            )}
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{title}</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{serviceName} • Port {port}</span>
          </div>
        </div>

        <div>
          {isChecking ? (
            <span className="status-badge status-checking">Checking...</span>
          ) : isOnline ? (
            <span className="status-badge status-online">
              <CheckCircle2 size={14} /> Online
            </span>
          ) : (
            <span className="status-badge status-offline">
              <AlertCircle size={14} /> Offline
            </span>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', color: '#475569', minHeight: '38px' }}>
        {roleDesc}
      </p>

      <div className="card-metrics">
        <div className="metric-row">
          <span className="metric-label">Latency / Response</span>
          <span className="metric-value">
            {isOnline ? `${statusObj.latency} ms` : 'N/A'}
          </span>
        </div>
        <div className="metric-row">
          <span className="metric-label">API Endpoint</span>
          <span className="metric-value" style={{ fontSize: '0.78rem' }}>
            http://localhost:{port}/api/health
          </span>
        </div>
        <div className="metric-row">
          <span className="metric-label">Service Health</span>
          <span className="metric-value">
            {isOnline ? statusObj?.data?.status || 'OK' : 'Unreachable'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button
          onClick={onRefresh}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#f1f5f9',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            color: '#334155',
            fontWeight: 600,
          }}
        >
          <RefreshCw size={12} /> Ping Service
        </button>
      </div>
    </div>
  );
}
