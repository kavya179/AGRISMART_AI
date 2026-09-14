import React, { useState, useEffect } from 'react';
import { History, CheckCircle2, AlertTriangle, Trash2, ArrowRight, ScanLine } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { getStoredScanHistory, clearStoredHistory } from '../services/historyStorage';

export default function PredictionHistory({ onBack, setActivePage, setSelectedResult }) {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    setHistoryList(getStoredScanHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your local scan history?')) {
      clearStoredHistory();
      setHistoryList([]);
    }
  };

  const handleOpenRecord = (record) => {
    setSelectedResult(record);
    setActivePage('disease-result');
  };

  return (
    <div>
      <PageHeader
        title="Crop Health Scan History"
        description="Review previous leaf diagnoses, track disease progression, and verify if treatments were effective."
        onBack={onBack}
      />

      {historyList.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            onClick={handleClear}
            className="btn-danger"
            style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem', minHeight: '34px' }}
          >
            <Trash2 size={14} />
            <span>Clear History</span>
          </button>
        </div>
      )}

      {historyList.length === 0 ? (
        <EmptyState
          title="No Crop Scans Yet"
          message="Take a photo of a leaf in the 'Check Crop' tool to diagnose plant diseases and save your records here."
          actionText="Take a Leaf Photo Now"
          onAction={() => setActivePage('disease')}
          icon={<ScanLine size={44} color="var(--color-primary)" />}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {historyList.map((item) => {
            const isHealthy = item.status === 'healthy';
            return (
              <div
                key={item.id}
                className="agri-card"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  cursor: 'pointer',
                  borderLeft: isHealthy ? '5px solid var(--color-success)' : '5px solid var(--color-danger)',
                }}
                onClick={() => handleOpenRecord(item)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt="Thumbnail"
                      style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  ) : (
                    <div style={{ width: '56px', height: '56px', background: 'var(--bg-muted)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ScanLine size={24} color="var(--text-subtle)" />
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span className={`badge ${isHealthy ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.75rem' }}>
                        {isHealthy ? 'Healthy' : 'Diseased'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {item.date} at {item.time}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>
                      {isHealthy ? 'Healthy Leaf' : item.class}
                    </h4>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Confidence: {Math.round((item.confidence || 0.9) * 100)}%
                  </span>
                  <ArrowRight size={18} color="var(--color-primary)" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
