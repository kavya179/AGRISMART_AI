import React, { useState } from 'react';
import {
  ClipboardList,
  Sparkles,
  Send,
  Plus,
  Trash2,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import Modal from '../../components/ui/Modal';

export default function ExpertAdvisory() {
  const [targetCrop, setTargetCrop] = useState('Tomato');
  const [region, setRegion] = useState('Pune & Western Maharashtra');
  const [advisoryTitle, setAdvisoryTitle] = useState('Proactive Early Blight Precaution Notice');
  const [severity, setSeverity] = useState('Medium');
  const [treatmentSteps, setTreatmentSteps] = useState([
    'Inspect lower 30cm of plant foliage for brown concentric leaf spots.',
    'Ensure 15% reduction in drip duration to lower root-zone humidity.',
    'Spray Mancozeb 75% WP @ 2.5g/litre or Copper Oxychloride 50% WP @ 3g/litre.',
  ]);
  const [newStep, setNewStep] = useState('');
  const [isBroadcastSent, setIsBroadcastSent] = useState(false);

  const handleAddStep = () => {
    if (newStep.trim()) {
      setTreatmentSteps([...treatmentSteps, newStep.trim()]);
      setNewStep('');
    }
  };

  const handleRemoveStep = (idx) => {
    setTreatmentSteps(treatmentSteps.filter((_, i) => i !== idx));
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    setIsBroadcastSent(true);
  };

  return (
    <div className="expert-advisory-page">
      <SectionHeader
        title="Advisory & Prescription Builder"
        subtitle="Author standardized agronomic alerts and broadcast to regional farmer clusters"
        badge={{ text: 'Agronomist Broadcast', bg: 'var(--color-primary-tint)', color: 'var(--color-primary)', border: 'var(--color-primary-border)' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Builder Form */}
        <DashboardCard
          title="Compose Advisory Notice"
          subtitle="Formulate guidance to dispatch via SMS and AgriSmart App"
          icon={ClipboardList}
        >
          <form onSubmit={handleBroadcast}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Target Crop</label>
                <select value={targetCrop} onChange={(e) => setTargetCrop(e.target.value)}>
                  <option value="Tomato">Tomato</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Soybean">Soybean</option>
                  <option value="Onion">Onion</option>
                  <option value="Potato">Potato</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Region</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="Pune & Western Maharashtra">Pune & Western Maharashtra</option>
                  <option value="Nashik & North Maharashtra">Nashik & North Maharashtra</option>
                  <option value="Vidarbha Zone">Vidarbha Zone</option>
                  <option value="Marathwada Zone">Marathwada Zone</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Advisory Headline</label>
              <input
                type="text"
                value={advisoryTitle}
                onChange={(e) => setAdvisoryTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Urgency Level</label>
              <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                <option value="Low">Low (Informational)</option>
                <option value="Medium">Medium (Preventative)</option>
                <option value="High">High (Immediate Action Required)</option>
                <option value="Critical">Critical (Outbreak Alert)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Actionable Steps for Farmers</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {treatmentSteps.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      background: 'var(--bg-muted)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <span>{idx + 1}. {step}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', padding: '0.2rem', cursor: 'pointer', minHeight: 'auto' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Add another instruction step..."
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                />
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleAddStep}
                  style={{ minHeight: '40px', padding: '0.5rem 0.85rem' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary btn-block" style={{ marginTop: '1rem' }}>
              <Send size={16} />
              <span>Broadcast Advisory to {region}</span>
            </button>
          </form>
        </DashboardCard>

        {/* Live Preview Card */}
        <DashboardCard
          title="Farmer Feed Preview"
          subtitle="How this alert will appear on farmer phones"
          icon={FileText}
        >
          <div
            style={{
              border: '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              background: 'var(--bg-surface)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                🌾 AgriSmart Verified Advisory
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Just now</span>
            </div>

            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {advisoryTitle}
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Target: <strong>{targetCrop}</strong> growers in <strong>{region}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {treatmentSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              Signed by Dr. Anita Deshmukh (MH Agro Research Center)
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isBroadcastSent}
        onClose={() => setIsBroadcastSent(false)}
        title="Broadcast Dispatched Successfully"
        subtitle="Your agronomic alert has reached the registered farmer group"
        maxWidth="440px"
        footer={
          <button className="btn-primary" onClick={() => setIsBroadcastSent(false)}>
            Close
          </button>
        }
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '0.95rem', fontWeight: 700 }}>
            Broadcast delivered to 342 active {targetCrop} farmers in {region}.
          </p>
        </div>
      </Modal>
    </div>
  );
}
