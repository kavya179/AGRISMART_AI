import React, { useState } from 'react';
import {
  MessageSquareWarning,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  Phone,
  MapPin,
  Calendar,
  X,
  Eye,
} from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import { mockExpertData } from '../../data/mockData';

export default function ExpertRequests({ onBack, setActivePage }) {
  const [requests, setRequests] = useState(mockExpertData.farmerRequests);
  const [selectedReq, setSelectedReq] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [advisoryText, setAdvisoryText] = useState('');
  const [prescribedSpray, setPrescribedSpray] = useState('Mancozeb 75% WP @ 2.5g/L water');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const filtered = requests.filter((r) => {
    const matchesSeverity = filterSeverity === 'all' || r.severity.toLowerCase() === filterSeverity.toLowerCase();
    const matchesQuery =
      r.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.suspectedDisease.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesQuery;
  });

  const handleSendAdvisory = (e) => {
    e.preventDefault();
    if (!selectedReq) return;

    const updated = requests.map((r) => {
      if (r.id === selectedReq.id) {
        return {
          ...r,
          status: 'Advisory Dispatched',
          severity: 'Low',
        };
      }
      return r;
    });

    setRequests(updated);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="expert-requests-page">
      <SectionHeader
        title="Farmer Requests & Consultation Queue"
        subtitle="Manage and triage incoming diagnostic escalations from farmers"
        badge={{ text: `${filtered.length} Requests`, bg: 'var(--color-sky-tint)', color: 'var(--color-sky)', border: 'var(--color-sky-border)' }}
      />

      {/* Filters and Search Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by farmer name, crop, disease, or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'critical', 'high', 'medium', 'low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={filterSeverity === sev ? 'btn-primary' : 'btn-secondary'}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.85rem',
                minHeight: '38px',
                textTransform: 'capitalize',
              }}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Grid / Table */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
        {filtered.map((req) => (
          <div
            key={req.id}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {req.farmerName}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    <MapPin size={13} />
                    <span>{req.location}</span>
                  </div>
                </div>
                <StatusBadge
                  status={req.severity === 'Critical' ? 'critical' : req.severity === 'High' ? 'warning' : 'healthy'}
                  label={req.severity}
                  size="sm"
                />
              </div>

              <div style={{ background: 'var(--bg-muted)', padding: '0.75rem', borderRadius: 'var(--radius-md)', margin: '0.75rem 0', fontSize: '0.85rem' }}>
                <div><strong>Crop:</strong> {req.crop} ({req.cropAge})</div>
                <div><strong>AI Diagnosis:</strong> <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{req.suspectedDisease}</span> ({req.aiConfidence})</div>
                <div style={{ marginTop: '0.35rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  "{req.notes}"
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                {req.submittedAt}
              </span>
              <button
                className="btn-primary"
                onClick={() => {
                  setSelectedReq(req);
                  setAdvisoryText(`Dear ${req.farmerName}, based on leaf analysis for your ${req.crop}, we confirm ${req.suspectedDisease}. Follow the recommended treatment below.`);
                }}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', minHeight: '34px' }}
              >
                <span>Respond & Prescribe</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Advisory Dispatch Modal */}
      {selectedReq && (
        <Modal
          isOpen={Boolean(selectedReq)}
          onClose={() => setSelectedReq(null)}
          title={`Expert Advisory for ${selectedReq.farmerName}`}
          subtitle={`Case #${selectedReq.id} • ${selectedReq.crop} • ${selectedReq.location}`}
          maxWidth="600px"
        >
          <form onSubmit={handleSendAdvisory}>
            <div className="form-group">
              <label className="form-label">Farmer Observation & AI Summary</label>
              <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', fontSize: '0.88rem' }}>
                <p><strong>Suspected Pathogen:</strong> {selectedReq.suspectedDisease} ({selectedReq.aiConfidence} AI confidence)</p>
                <p style={{ marginTop: '0.25rem' }}><strong>Farmer Notes:</strong> {selectedReq.notes}</p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Agronomist Recommendation Note</label>
              <textarea
                rows={3}
                value={advisoryText}
                onChange={(e) => setAdvisoryText(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Chemical / Organic Prescription</label>
              <select
                value={prescribedSpray}
                onChange={(e) => setPrescribedSpray(e.target.value)}
              >
                <option value="Mancozeb 75% WP @ 2.5g/L water">Mancozeb 75% WP @ 2.5g/L water (Fungicide)</option>
                <option value="Copper Oxychloride 50% WP @ 3g/L">Copper Oxychloride 50% WP @ 3g/L (Broad Spectrum)</option>
                <option value="Neem Oil (10,000 ppm) @ 3ml/L water">Neem Oil (10,000 ppm) @ 3ml/L water (Organic)</option>
                <option value="Trichoderma viride @ 5g/kg seed / soil treatment">Trichoderma viride (Bio-agent)</option>
                <option value="Azoxystrobin 23% SC @ 1ml/L water">Azoxystrobin 23% SC @ 1ml/L water</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSelectedReq(null)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <Send size={16} />
                <span>Send SMS & App Advisory to Farmer</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setSelectedReq(null);
        }}
        title="Advisory Dispatched Successfully"
        subtitle="The farmer has been notified with your signed prescription"
        maxWidth="450px"
        footer={
          <button
            className="btn-primary"
            onClick={() => {
              setIsSuccessModalOpen(false);
              setSelectedReq(null);
            }}
          >
            Done
          </button>
        }
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 600 }}>
            Prescription for {selectedReq?.farmerName} has been recorded in the farm log.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Notification sent via AgriSmart Mobile App and SMS to {selectedReq?.farmerPhone}.
          </p>
        </div>
      </Modal>
    </div>
  );
}
