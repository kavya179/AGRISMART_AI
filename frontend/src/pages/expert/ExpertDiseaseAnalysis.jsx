import React, { useState } from 'react';
import {
  Stethoscope,
  Microscope,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ShieldCheck,
  FileCheck,
  Layers,
} from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import StatusBadge from '../../components/ui/StatusBadge';

export default function ExpertDiseaseAnalysis() {
  const [selectedDisease, setSelectedDisease] = useState('early-blight');

  const cases = {
    'early-blight': {
      title: 'Tomato Early Blight (Alternaria solani)',
      crop: 'Tomato (Solanum lycopersicum)',
      aiScore: '96.4%',
      pathogenType: 'Fungal Ascomycete',
      symptoms: [
        'Concentric dark rings (target-board pattern) on mature foliage',
        'Yellow chlorotic halos surrounding necrotic leaf spots',
        'Stem collar rot leading to premature leaf defoliation',
      ],
      differentialDiagnosis: [
        'Septoria Leaf Spot (smaller spots, dark margins with grey centers)',
        'Bacterial Spot (water-soaked lesions, less concentric zoning)',
      ],
      recommendedDosage: 'Azoxystrobin 23% SC @ 1 ml/litre OR Mancozeb 75% WP @ 2.5 g/litre',
      organicManagement: 'Spray Trichoderma harzianum @ 5g/L + copper hydroxide formulation',
    },
    'late-blight': {
      title: 'Potato / Tomato Late Blight (Phytophthora infestans)',
      crop: 'Potato & Tomato',
      aiScore: '94.8%',
      pathogenType: 'Oomycete Water Mold',
      symptoms: [
        'Rapidly spreading dark water-soaked lesions',
        'White fungal growth on undersides of leaves during high humidity (>90%)',
        'Foul odor in advanced tuber or foliage rot stages',
      ],
      differentialDiagnosis: [
        'Early Blight (lacks white sporulation on leaf underside)',
        'Frost Damage (generalized tissue collapse without sporulation)',
      ],
      recommendedDosage: 'Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/litre',
      organicManagement: 'Bordeaux Mixture (1%) preventative application before rain spells',
    },
  };

  const currentCase = cases[selectedDisease] || cases['early-blight'];

  return (
    <div className="expert-disease-analysis-page">
      <SectionHeader
        title="Pathology Diagnostic Lab & Deep Analysis"
        subtitle="Detailed microscopic breakdown, differential diagnoses, and verification protocols"
        badge={{ text: 'Research Grade', bg: 'var(--color-purple-tint)', color: 'var(--color-purple)', border: 'var(--color-purple-border)' }}
      />

      {/* Disease Case Switcher Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <button
          className={selectedDisease === 'early-blight' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setSelectedDisease('early-blight')}
        >
          <span>Tomato Early Blight</span>
        </button>
        <button
          className={selectedDisease === 'late-blight' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setSelectedDisease('late-blight')}
        >
          <span>Potato/Tomato Late Blight</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Case Analysis Overview */}
        <DashboardCard
          title={currentCase.title}
          subtitle={`Host: ${currentCase.crop} • Type: ${currentCase.pathogenType}`}
          icon={Microscope}
          badge={{ text: `AI Match: ${currentCase.aiScore}`, bg: 'var(--color-success-bg)', color: 'var(--color-success)', border: 'var(--color-success-border)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
                Key Diagnostic Markers & Pathology Signs
              </h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {currentCase.symptoms.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-warning)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                Differential Diagnostics (Avoid Misclassification)
              </h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {currentCase.differentialDiagnosis.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </DashboardCard>

        {/* Treatment Protocol & Dosing */}
        <DashboardCard
          title="Clinical Prescription Protocols"
          subtitle="Authorized ICAR & State Agriculture University standard guidelines"
          icon={ShieldCheck}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '0.85rem', background: 'var(--color-sky-tint)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-sky-border)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-sky)', textTransform: 'uppercase' }}>
                Chemical Fungicide Protocol
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {currentCase.recommendedDosage}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Apply during morning hours (07:00 - 10:00 AM) with hollow cone nozzle.
              </p>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-success-border)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase' }}>
                Organic & Bio-Control Alternative
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {currentCase.organicManagement}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <FileCheck size={16} />
                <span>Publish as Standard Advisory Template</span>
              </button>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
