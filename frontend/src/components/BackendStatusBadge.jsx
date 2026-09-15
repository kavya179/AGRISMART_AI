import React, { useState, useEffect } from 'react';
import { Database, Wifi, RefreshCw } from 'lucide-react';
import { isMockMode, setMockMode, subscribeToApiMode, DJANGO_BASE_URL } from '../services/apiConfig';
import { checkBackendHealth } from '../services/api';

export default function BackendStatusBadge() {
  const [mockActive, setMockActive] = useState(isMockMode());
  const [djangoOnline, setDjangoOnline] = useState(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToApiMode((isMock) => {
      setMockActive(isMock);
    });

    checkHealth();
    const interval = setInterval(checkHealth, 15000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const checkHealth = async () => {
    setChecking(true);
    const health = await checkBackendHealth();
    setDjangoOnline(health.djangoOnline);
    setChecking(false);
  };

  const handleToggle = () => {
    const nextMode = !mockActive;
    setMockMode(nextMode);
    setMockActive(nextMode);
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.25rem 0.6rem',
        borderRadius: '20px',
        fontSize: '0.74rem',
        fontWeight: 600,
        background: mockActive ? 'rgba(234, 179, 8, 0.12)' : djangoOnline ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
        color: mockActive ? '#854d0e' : djangoOnline ? '#15803d' : '#b91c1c',
        border: `1px solid ${mockActive ? 'rgba(234, 179, 8, 0.3)' : djangoOnline ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.2s ease',
      }}
      onClick={handleToggle}
      title={
        mockActive
          ? 'Mode: Mock Demo (Click to switch to Live Django REST Engine)'
          : `Mode: Live Django REST (${djangoOnline ? 'Online on :8000' : 'Offline'}). Click to switch to Mock Demo`
      }
    >
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: mockActive ? '#eab308' : djangoOnline ? '#22c55e' : '#ef4444',
          display: 'inline-block',
          boxShadow: mockActive ? '0 0 4px #eab308' : djangoOnline ? '0 0 5px #22c55e' : '0 0 4px #ef4444',
        }}
      />
      <span>{mockActive ? 'Mock Mode' : djangoOnline ? 'Live API (:8000)' : 'API Offline'}</span>
    </div>
  );
}
