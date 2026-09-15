import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { mockExpertData } from '../../data/mockData';

export default function ExpertReports() {
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const trends = mockExpertData.diseaseTrends;

  return (
    <div className="expert-reports-page">
      <SectionHeader
        title="Pathology Epidemiology & Outbreak Reports"
        subtitle="Regional disease incidence trends, pathogen mapping, and agronomic case registries"
        action={
          <button
            className="btn-primary"
            onClick={() => alert('Exporting monthly pathology report as PDF/CSV...')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
          >
            <Download size={16} />
            <span>Export Full Report (PDF)</span>
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Outbreak Clusters Table */}
        <DashboardCard
          title="Active Disease Outbreak Clusters"
          subtitle="Monitored surveillance across agricultural zones"
          icon={FileSpreadsheet}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Disease / Pathogen</th>
                  <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Region</th>
                  <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Cases</th>
                  <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Severity</th>
                  <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Weekly Trend</th>
                </tr>
              </thead>
              <tbody>
                {trends.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {item.name}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text-secondary)' }}>
                      {item.region}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700 }}>
                      {item.cases}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <StatusBadge status={item.severity === 'Critical' ? 'critical' : item.severity === 'High' ? 'warning' : 'info'} label={item.severity} size="sm" />
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: item.trend.includes('+') ? 'var(--color-danger)' : 'var(--color-success)' }}>
                      {item.trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Advisory Effectiveness Metrics */}
        <DashboardCard
          title="Advisory Response Metrics"
          subtitle="Evaluation of intervention outcomes"
          icon={TrendingUp}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Treatment Adherence Rate</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>92%</span>
              </div>
              <div style={{ background: 'var(--border-color)', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--color-primary)', width: '92%', height: '100%' }} />
              </div>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Crop Recovery Rate</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-success)' }}>87.4%</span>
              </div>
              <div style={{ background: 'var(--border-color)', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--color-success)', width: '87.4%', height: '100%' }} />
              </div>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Average Escalation Resolution</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-sky)' }}>2.4 hours</span>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
