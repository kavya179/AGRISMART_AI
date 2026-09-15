import React from 'react';
import {
  Users,
  Activity,
  Cpu,
  Server,
  Database,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Clock,
  ScanLine,
  TrendingUp,
  Settings,
  ChevronRight,
  UserCheck,
  Sprout,
  Flame,
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import DashboardCard from '../../components/ui/DashboardCard';
import SectionHeader from '../../components/ui/SectionHeader';
import StatusBadge from '../../components/ui/StatusBadge';
import { mockAdminData } from '../../data/mockData';

export default function AdminDashboard({ setActivePage, userProfile }) {
  const summary = mockAdminData.systemSummary;
  const services = mockAdminData.serviceHealth;
  const logs = mockAdminData.auditLogs;
  const telemetry = mockAdminData.modelTelemetry;

  return (
    <div className="admin-dashboard-container">
      {/* Section Header */}
      <SectionHeader
        date={new Date().toLocaleDateString('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        title="Platform Administration & System Health"
        subtitle={`Administrator: ${userProfile?.fullName || mockAdminData.profile.fullName} • System Status: All 3 Microservices Operational`}
        badge={{
          text: 'Admin Privileges',
          bg: 'var(--role-admin-bg)',
          color: 'var(--role-admin-text)',
          border: 'var(--role-admin-border)',
        }}
        action={
          <button
            className="btn-primary"
            onClick={() => setActivePage('admin-users')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
          >
            <Users size={18} />
            <span>Manage Users ({summary.totalUsers})</span>
          </button>
        }
      />

      {/* High-Level Platform KPIs */}
      <div className="dashboard-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard
          title="Total Registered Farmers"
          value={summary.activeFarmers.toLocaleString()}
          subtitle="1,420 Active Farms"
          icon={Sprout}
          iconColor="var(--color-primary)"
          iconBg="var(--color-primary-tint)"
          trend="+28 this week"
          trendDirection="up"
        />

        <StatCard
          title="Certified Agronomists"
          value={summary.certifiedExperts}
          subtitle="Covering 14 Agro-zones"
          icon={UserCheck}
          iconColor="var(--color-sky)"
          iconBg="var(--color-sky-tint)"
          trend="100% Active"
          trendDirection="neutral"
        />

        <StatCard
          title="AI Disease Scans Today"
          value={summary.totalScansToday}
          subtitle={`${summary.totalScansAllTime} All-Time`}
          icon={ScanLine}
          iconColor="var(--color-gold)"
          iconBg="var(--color-gold-tint)"
          trend="142ms Latency"
          trendDirection="up"
        />

        <StatCard
          title="API Platform Uptime"
          value={summary.apiUptime}
          subtitle="3 Microservices Live"
          icon={Activity}
          iconColor="var(--color-success)"
          iconBg="var(--color-success-bg)"
          trend="Healthy"
          trendDirection="up"
        />
      </div>

      {/* Two Column Layout: Microservice Infrastructure & System Activity Log */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Live Backend Services Health */}
        <DashboardCard
          title="Microservices & Infrastructure Status"
          subtitle="Real-time daemon ping and gateway connectivity"
          icon={Server}
          action={
            <button
              onClick={() => setActivePage('system-status')}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Full Architecture →
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {services.map((srv) => (
              <div
                key={srv.id}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-muted)',
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
                      {srv.name}
                    </span>
                    <StatusBadge status="online" label="Online" size="sm" />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Port: <strong>{srv.port}</strong> • Protocol: {srv.protocol} • Latency: <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{srv.latency}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                  Mem: {srv.memory}
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Real-Time System Audit Logs */}
        <DashboardCard
          title="System Audit & Security Logs"
          subtitle="Chronological platform event records"
          icon={FileText}
          action={
            <button
              onClick={() => setActivePage('admin-reports')}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              View Full Logs →
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {logs.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: '0.75rem',
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
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      {log.user}
                    </span>
                    <StatusBadge status="success" label={log.status} size="sm" />
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                    {log.action}
                  </p>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Model Telemetry & Dataset Status Banner */}
      <DashboardCard
        title="AI Vision Model Runtime Status"
        subtitle={`Current Active Weights: ${telemetry.currentVersion} • ${telemetry.inferenceEngine}`}
        icon={Cpu}
        badge={{ text: 'Production Model', bg: 'var(--color-primary-tint)', color: 'var(--color-primary)', border: 'var(--color-primary-border)' }}
        action={
          <button
            onClick={() => setActivePage('admin-model-status')}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Model Details →
          </button>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supported Plant Classes</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {telemetry.supportedClasses} Disease Categories
            </div>
          </div>

          <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quantization Optimization</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.2rem' }}>
              {telemetry.quantization}
            </div>
          </div>

          <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Model Size in Memory</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {telemetry.modelSizeMb}
            </div>
          </div>

          <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Weights Last Synced</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-sky)', marginTop: '0.2rem' }}>
              {telemetry.lastWeightsUpdated}
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* Quick Navigation Admin Shortcuts */}
      <DashboardCard title="Administrative Controls & Tools">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <button
            onClick={() => setActivePage('admin-users')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="var(--color-primary)" />
              <span>User Directory</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('admin-analytics')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} color="var(--color-sky)" />
              <span>System Analytics</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('admin-model-status')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} color="var(--color-purple)" />
              <span>Model Telemetry</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('admin-settings')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={18} color="var(--color-gold)" />
              <span>System Settings</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>
        </div>
      </DashboardCard>
    </div>
  );
}
