import React from 'react';
import {
  Activity,
  TrendingUp,
  ScanLine,
  Droplets,
  Sprout,
  Bot,
  BrainCircuit,
  BarChart2,
  PieChart,
} from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import StatCard from '../../components/ui/StatCard';

export default function AdminAnalytics() {
  const moduleUsage = [
    { name: 'Crop Disease Vision Diagnostics', calls: '18,450', share: '47%', color: 'var(--color-primary)' },
    { name: 'Smart Irrigation Estimator', calls: '8,210', share: '21%', color: 'var(--color-sky)' },
    { name: 'Soil & Climate Crop Recommendation', calls: '6,420', share: '16%', color: 'var(--color-gold)' },
    { name: 'Farmer Assistant & Agentic Loop', calls: '4,120', share: '11%', color: 'var(--color-purple)' },
    { name: 'Farm Sustainability Calculator', calls: '1,740', share: '5%', color: 'var(--color-success)' },
  ];

  return (
    <div className="admin-analytics-page">
      <SectionHeader
        title="Platform & Feature Telemetry Analytics"
        subtitle="Aggregated usage distribution, API throughput, and response latency breakdowns"
      />

      {/* Top Telemetry Stats */}
      <div className="dashboard-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard
          title="Total API Calls (30 Days)"
          value="38,940"
          subtitle="Avg 1,298 daily requests"
          icon={Activity}
          trend="+18.4%"
          trendDirection="up"
        />

        <StatCard
          title="Avg Inference Time"
          value="142ms"
          subtitle="PyTorch FP16 on Django"
          icon={TrendingUp}
          trend="-24ms"
          trendDirection="up"
          trendLabel="optimized"
        />

        <StatCard
          title="Peak Concurrent Users"
          value="248"
          subtitle="Occurs 07:00 - 09:30 AM"
          icon={BarChart2}
          trend="Capacity 2,000"
          trendDirection="neutral"
        />

        <StatCard
          title="Error Rate"
          value="0.06%"
          subtitle="Well below 0.5% SLA"
          icon={Activity}
          trend="Healthy"
          trendDirection="up"
        />
      </div>

      {/* Feature Breakdown Table & Progress Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        <DashboardCard
          title="Module Consumption Distribution"
          subtitle="API calls handled by Django AI engine & Node gateway"
          icon={PieChart}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {moduleUsage.map((mod, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{mod.name}</span>
                  <span style={{ fontWeight: 700, color: mod.color }}>{mod.calls} calls ({mod.share})</span>
                </div>
                <div style={{ background: 'var(--border-subtle)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: mod.color, width: mod.share, height: '100%', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Regional Activity Distribution */}
        <DashboardCard
          title="Geographic Farming Hubs"
          subtitle="Active farmer concentration and scan frequency"
          icon={BarChart2}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>Pune & Satara Region:</strong> 642 active farms</span>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>45% of traffic</span>
            </div>

            <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>Nashik & Ahmednagar:</strong> 385 active farms</span>
              <span style={{ fontWeight: 700, color: 'var(--color-sky)' }}>27% of traffic</span>
            </div>

            <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>Vidarbha & Marathwada:</strong> 298 active farms</span>
              <span style={{ fontWeight: 700, color: 'var(--color-gold)' }}>21% of traffic</span>
            </div>

            <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>Other Zones (Gujarat / MP):</strong> 95 active farms</span>
              <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>7% of traffic</span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
