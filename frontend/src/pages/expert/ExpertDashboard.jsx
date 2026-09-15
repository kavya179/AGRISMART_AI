import React from 'react';
import {
  Stethoscope,
  ClipboardList,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  BrainCircuit,
  MessageSquareWarning,
  Eye,
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import DashboardCard from '../../components/ui/DashboardCard';
import SectionHeader from '../../components/ui/SectionHeader';
import StatusBadge from '../../components/ui/StatusBadge';
import { mockExpertData } from '../../data/mockData';

export default function ExpertDashboard({ setActivePage, userProfile }) {
  const stats = mockExpertData.workloadStats;
  const requests = mockExpertData.farmerRequests;
  const trends = mockExpertData.diseaseTrends;

  return (
    <div className="expert-dashboard-container">
      {/* Section Header */}
      <SectionHeader
        date={new Date().toLocaleDateString('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        title={`Agronomist Desk: ${userProfile?.fullName || mockExpertData.profile.fullName}`}
        subtitle={`${userProfile?.title || mockExpertData.profile.title} • ${mockExpertData.profile.assignedRegion}`}
        badge={{
          text: 'Expert Certified',
          bg: 'var(--role-expert-bg)',
          color: 'var(--role-expert-text)',
          border: 'var(--role-expert-border)',
        }}
        action={
          <button
            className="btn-primary"
            onClick={() => setActivePage('expert-requests')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
          >
            <MessageSquareWarning size={18} />
            <span>Review Pending Requests ({stats.pendingReviews})</span>
          </button>
        }
      />

      {/* Caseload & Triage Metrics */}
      <div className="dashboard-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard
          title="Pending Triage Queue"
          value={stats.pendingReviews}
          subtitle="Farmer submissions awaiting sign-off"
          icon={Clock}
          iconColor="var(--color-warning)"
          iconBg="var(--color-warning-bg)"
          trend="3 Urgent"
          trendDirection="down"
        />

        <StatCard
          title="Critical Cases"
          value={stats.criticalTriage}
          subtitle="High pathogen risk / spreading"
          icon={AlertTriangle}
          iconColor="var(--color-danger)"
          iconBg="var(--color-danger-bg)"
          trend="Action needed"
          trendDirection="down"
        />

        <StatCard
          title="Avg Turnaround Time"
          value={stats.avgResponseTime}
          subtitle="Target: under 4.0 hrs"
          icon={TrendingUp}
          iconColor="var(--color-sky)"
          iconBg="var(--color-sky-tint)"
          trend="-18 mins"
          trendDirection="up"
          trendLabel="this week"
        />

        <StatCard
          title="Advisories Issued"
          value={stats.advisoriesIssuedThisMonth}
          subtitle="This month • 98.5% accuracy"
          icon={CheckCircle2}
          iconColor="var(--color-primary)"
          iconBg="var(--color-primary-tint)"
          trend="+12%"
          trendDirection="up"
        />
      </div>

      {/* Main Content Layout: Priority Farmer Consultations & Regional Outbreak Trends */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Pending Farmer Cases */}
        <DashboardCard
          title="Priority Farmer Diagnoses for Expert Review"
          subtitle="AI pre-classified cases awaiting agronomist confirmation"
          icon={Stethoscope}
          action={
            <button
              onClick={() => setActivePage('expert-requests')}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-sky)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              View All ({requests.length}) →
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {requests.map((req) => (
              <div
                key={req.id}
                onClick={() => setActivePage('expert-requests')}
                style={{
                  padding: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-muted)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {req.farmerName}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {req.location}</span>
                    <StatusBadge
                      status={req.severity === 'Critical' ? 'critical' : req.severity === 'High' ? 'warning' : 'healthy'}
                      label={`${req.severity} Urgency`}
                      size="sm"
                    />
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Crop: <strong>{req.crop}</strong> ({req.cropAge}) • Suspected: <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{req.suspectedDisease}</span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                    "{req.notes}"
                  </p>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block' }}>
                    {req.submittedAt}
                  </span>
                  <button
                    className="btn-primary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: '30px', marginTop: '0.35rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage('expert-requests');
                    }}
                  >
                    <Eye size={13} />
                    <span>Review</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Regional Outbreak Intelligence */}
        <DashboardCard
          title="Regional Pathology Surveillance"
          subtitle="Monitored disease spikes across western Maharashtra"
          icon={TrendingUp}
          action={
            <button
              onClick={() => setActivePage('expert-reports')}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Epidemiology Report →
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {trends.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      {item.name}
                    </span>
                    <StatusBadge status={item.severity === 'Critical' ? 'critical' : item.severity === 'High' ? 'warning' : 'info'} label={item.severity} size="sm" />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Cluster: {item.region} • {item.cases} active reported cases
                  </span>
                </div>

                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: item.trend.includes('+') ? 'var(--color-danger)' : 'var(--color-success)' }}>
                  {item.trend}
                </span>
              </div>
            ))}

            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.75rem',
                background: 'var(--color-sky-tint)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-sky-border)',
                fontSize: '0.82rem',
                color: 'var(--color-sky)',
              }}
            >
              💡 <strong>Agronomist Action Item:</strong> Broadcast preventative spray alert for Mancozeb 75% WP to registered tomato growers in Pune & Satara.
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Expert Quick Actions Grid */}
      <DashboardCard title="Agronomist Tools & Actions">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <button
            onClick={() => setActivePage('expert-requests')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquareWarning size={18} color="var(--color-warning)" />
              <span>Farmer Requests Queue</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('expert-disease-analysis')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stethoscope size={18} color="var(--color-sky)" />
              <span>Disease Analysis Lab</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('expert-advisory')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ClipboardList size={18} color="var(--color-primary)" />
              <span>Prescription Builder</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('expert-reports')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileSpreadsheet size={18} color="var(--color-purple)" />
              <span>Outbreak Reports</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>
        </div>
      </DashboardCard>
    </div>
  );
}
