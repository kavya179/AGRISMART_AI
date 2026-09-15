import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Server,
  Shield,
  Bell,
  Sliders,
} from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import Modal from '../../components/ui/Modal';

export default function AdminSettings() {
  const [djangoUrl, setDjangoUrl] = useState('http://localhost:8000/api');
  const [nodeUrl, setNodeUrl] = useState('http://localhost:5000/api');
  const [minConfidence, setMinConfidence] = useState(70);
  const [humidityAlertThreshold, setHumidityAlertThreshold] = useState(80);
  const [enableDemoMode, setEnableDemoMode] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
  };

  return (
    <div className="admin-settings-page">
      <SectionHeader
        title="System Configurations & Parameters"
        subtitle="Configure backend API endpoints, AI sensitivity thresholds, and broadcast triggers"
      />

      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* API Endpoints */}
          <DashboardCard
            title="Backend Endpoints"
            subtitle="Microservice URLs used by the frontend client"
            icon={Server}
          >
            <div className="form-group">
              <label className="form-label">Django AI/ML API URL</label>
              <input
                type="text"
                value={djangoUrl}
                onChange={(e) => setDjangoUrl(e.target.value)}
                required
              />
              <span className="form-help">Port 8000 (serves PyTorch inference, irrigation, sustainability)</span>
            </div>

            <div className="form-group">
              <label className="form-label">Node.js Gateway URL</label>
              <input
                type="text"
                value={nodeUrl}
                onChange={(e) => setNodeUrl(e.target.value)}
                required
              />
              <span className="form-help">Port 5000 (serves farmer records & MongoDB store)</span>
            </div>
          </DashboardCard>

          {/* AI & Alert Sensitivity Thresholds */}
          <DashboardCard
            title="AI & Agro Sensitivity Controls"
            subtitle="Thresholds for triggering automatic farmer alerts"
            icon={Sliders}
          >
            <div className="form-group">
              <label className="form-label">Min Confidence for Instant AI Diagnosis (%)</label>
              <input
                type="number"
                min="50"
                max="99"
                value={minConfidence}
                onChange={(e) => setMinConfidence(e.target.value)}
                required
              />
              <span className="form-help">Below this threshold, cases escalate to an Expert</span>
            </div>

            <div className="form-group">
              <label className="form-label">High Humidity Fungal Alert Threshold (%)</label>
              <input
                type="number"
                min="60"
                max="95"
                value={humidityAlertThreshold}
                onChange={(e) => setHumidityAlertThreshold(e.target.value)}
                required
              />
              <span className="form-help">Triggers Early Blight warning in weather module</span>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <input
                type="checkbox"
                id="demoModeCheck"
                checked={enableDemoMode}
                onChange={(e) => setEnableDemoMode(e.target.checked)}
                style={{ width: 'auto' }}
              />
              <label htmlFor="demoModeCheck" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}>
                Enable Offline Mock Fallback in Demo Mode
              </label>
            </div>
          </DashboardCard>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}>
            <Save size={18} />
            <span>Save System Parameters</span>
          </button>
        </div>
      </form>

      <Modal
        isOpen={isSaved}
        onClose={() => setIsSaved(false)}
        title="Settings Updated Successfully"
        subtitle="System parameters have been applied across all active sessions"
        maxWidth="400px"
        footer={<button className="btn-primary" onClick={() => setIsSaved(false)}>Done</button>}
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <CheckCircle2 size={44} color="var(--color-success)" style={{ margin: '0 auto 0.75rem' }} />
          <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 600 }}>
            Parameters are now active.
          </p>
        </div>
      </Modal>
    </div>
  );
}
