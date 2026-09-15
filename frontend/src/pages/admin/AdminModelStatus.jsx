import React from 'react';
import {
  Cpu,
  Database,
  Layers,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  FileCode,
} from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { mockAdminData } from '../../data/mockData';

export default function AdminModelStatus() {
  const telemetry = mockAdminData.modelTelemetry;

  return (
    <div className="admin-model-status-page">
      <SectionHeader
        title="Dataset & AI Model Telemetry"
        subtitle="Inference runtime architecture, neural weights configuration, and classification accuracy"
        badge={{ text: 'Model Engine Online', bg: 'var(--color-success-bg)', color: 'var(--color-success)', border: 'var(--color-success-border)' }}
        action={
          <button
            className="btn-primary"
            onClick={() => alert('Triggering hot-reload of model weights on Django server...')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
          >
            <RefreshCw size={16} />
            <span>Reload Model Pipeline</span>
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Model Architecture Spec */}
        <DashboardCard
          title="Vision Classifier Architecture"
          subtitle="Convolutional Backbone & Preprocessing Pipeline"
          icon={Cpu}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
              <strong>Backbone Architecture:</strong> ResNet-50 Fine-tuned on Agricultural Leaf Dataset
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
              <strong>Input Resolution:</strong> 224 × 224 RGB (Normalized with ImageNet mean/std)
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
              <strong>Inference Framework:</strong> PyTorch 2.x + TorchVision JIT Scripting
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
              <strong>Confidence Threshold:</strong> Minimum 70% confidence for automated confirmation
            </div>
          </div>
        </DashboardCard>

        {/* Supported Classes Breakdown */}
        <DashboardCard
          title="Disease & Pathology Classes (38 Total)"
          subtitle="Taxonomy coverage across major Indian crops"
          icon={Layers}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {telemetry.classesBreakdown.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-muted)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                }}
              >
                <span>{item}</span>
                <StatusBadge status="verified" label="Active in Weights" size="sm" />
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
