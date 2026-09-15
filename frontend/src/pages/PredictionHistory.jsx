import React, { useState, useEffect } from 'react';
import {
  History,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Trash2,
  ArrowRight,
  ScanLine,
  Search,
  Filter,
  Calendar,
  Sparkles,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DashboardCard from '../components/ui/DashboardCard';
import StatusBadge from '../components/ui/StatusBadge';
import EmptyState from '../components/EmptyState';
import { getStoredScanHistory, clearStoredHistory } from '../services/historyStorage';
import { mockFarmerData } from '../data/mockData';

export default function PredictionHistory({ onBack, setActivePage, setSelectedResult }) {
  const [historyList, setHistoryList] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const stored = getStoredScanHistory();
    if (stored && stored.length > 0) {
      setHistoryList(stored);
    } else {
      // Seed with initial mock scans if history is empty
      setHistoryList(mockFarmerData.recentScans);
    }
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your local crop scan history?')) {
      clearStoredHistory();
      setHistoryList([]);
    }
  };

  const handleOpenRecord = (record) => {
    setSelectedResult(record);
    setActivePage('disease-result');
  };

  const filtered = historyList.filter((item) => {
    const isHealthy = item.status === 'healthy';
    const isUncertain = item.status === 'uncertain' || (item.confidence && item.confidence < 70);
    const isDiseased = !isHealthy && !isUncertain;

    let matchesStatus = true;
    if (filterStatus === 'healthy') matchesStatus = isHealthy;
    else if (filterStatus === 'diseased') matchesStatus = isDiseased;
    else if (filterStatus === 'uncertain') matchesStatus = isUncertain;

    const query = searchQuery.toLowerCase();
    const matchesQuery =
      (item.crop || '').toLowerCase().includes(query) ||
      (item.disease || item.class || '').toLowerCase().includes(query) ||
      (item.date || '').toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });

  return (
    <div className="prediction-history-page">
      <SectionHeader
        title="Crop Health & Disease Scan History"
        subtitle="Review past AI diagnoses, compare leaf symptoms over time, and verify treatment effectiveness."
        badge={{ text: `${historyList.length} Records`, bg: 'var(--color-primary-tint)', color: 'var(--color-primary)', border: 'var(--color-primary-border)' }}
        action={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {historyList.length > 0 && (
              <button
                onClick={handleClear}
                className="btn-secondary"
                style={{ color: 'var(--color-danger)', fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
              >
                <Trash2 size={15} />
                <span>Clear History</span>
              </button>
            )}

            <button
              onClick={() => setActivePage('disease')}
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              <ScanLine size={16} />
              <span>New Scan</span>
            </button>
          </div>
        }
      />

      {/* Filter and Search Controls */}
      {historyList.length > 0 && (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by crop, disease, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[
              { id: 'all', label: 'All Scans' },
              { id: 'diseased', label: 'Diseased' },
              { id: 'healthy', label: 'Healthy' },
              { id: 'uncertain', label: 'Uncertain' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={filterStatus === tab.id ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem', minHeight: '38px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scan History Records List */}
      {historyList.length === 0 ? (
        <EmptyState
          title="No Crop Scans Recorded"
          message="Capture or upload photos of your crop leaves to diagnose plant diseases and track your farm health history here."
          actionText="Take a Leaf Photo Now"
          onAction={() => setActivePage('disease')}
          icon={<ScanLine size={48} color="var(--color-primary)" />}
        />
      ) : filtered.length === 0 ? (
        <div className="state-container" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No scans match your current search or filter criteria.</p>
          <button onClick={() => { setSearchQuery(''); setFilterStatus('all'); }} className="btn-secondary" style={{ marginTop: '0.75rem' }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filtered.map((item) => {
            const isHealthy = item.status === 'healthy';
            const isUncertain = item.status === 'uncertain' || (item.confidence && item.confidence < 70);
            const isDiseased = !isHealthy && !isUncertain;
            const confidencePercent = item.confidence || 90;

            return (
              <div
                key={item.id}
                className="agri-card"
                onClick={() => handleOpenRecord(item)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  cursor: 'pointer',
                  borderLeft: isHealthy
                    ? '5px solid var(--color-success)'
                    : isUncertain
                    ? '5px solid var(--color-warning)'
                    : '5px solid var(--color-danger)',
                  marginBottom: 0,
                  transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt="Thumbnail"
                      style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--bg-muted)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-subtle)',
                      }}
                    >
                      <ScanLine size={28} />
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        {item.crop || 'Crop'}
                      </span>
                      <StatusBadge
                        status={isHealthy ? 'healthy' : isUncertain ? 'warning' : 'danger'}
                        label={isHealthy ? 'Healthy' : isUncertain ? 'Low Confidence' : item.severity ? `${item.severity} Severity` : 'Diseased'}
                        size="sm"
                      />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item.date} {item.time ? `at ${item.time}` : ''}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: isHealthy ? 'var(--color-success)' : isUncertain ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                      {isHealthy ? 'Healthy Leaf' : item.disease || item.class}
                    </h4>

                    {item.recommendation && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0', maxWidth: '520px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.recommendation}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block' }}>
                      AI Confidence
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {confidencePercent}%
                    </span>
                  </div>

                  <div
                    style={{
                      background: 'var(--bg-muted)',
                      padding: '0.4rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                    }}
                  >
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
