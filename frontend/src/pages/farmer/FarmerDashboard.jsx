import React from 'react';
import {
  ScanLine,
  Droplets,
  CloudSun,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calendar,
  User,
  ChevronRight,
  Leaf,
  Bot,
  BrainCircuit,
  TrendingUp,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import DashboardCard from '../../components/ui/DashboardCard';
import SectionHeader from '../../components/ui/SectionHeader';
import AlertCard from '../../components/ui/AlertCard';
import RecommendationCard from '../../components/ui/RecommendationCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { mockFarmerData } from '../../data/mockData';
import { translations } from '../../translations';

export default function FarmerDashboard({
  setActivePage,
  lastScan,
  userProfile,
  language = 'en',
}) {
  const t = translations[language] || translations.en;

  const farmData = mockFarmerData.farmSummary;
  const recentScans = mockFarmerData.recentScans;
  const agroAlerts = mockFarmerData.agroAlerts;
  const recommendations = mockFarmerData.recommendations;

  const cropStatus = lastScan
    ? {
        title: lastScan.status === 'healthy' ? t.q1Healthy : `${t.headingDiseased} ${lastScan.class}`,
        isHealthy: lastScan.status === 'healthy',
        time: `${lastScan.date} at ${lastScan.time}`,
      }
    : {
        title: recentScans[0] ? recentScans[0].disease : t.q1NoScans,
        isHealthy: recentScans[0] ? recentScans[0].status === 'healthy' : null,
        time: recentScans[0] ? `${recentScans[0].date} at ${recentScans[0].time}` : t.q1ScanNow,
      };

  const getLocale = (lang) => {
    switch (lang) {
      case 'gu': return 'gu-IN';
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN';
      default: return 'en-IN';
    }
  };

  return (
    <div className="farmer-dashboard-container">
      {/* Welcome Banner / Header */}
      <SectionHeader
        date={new Date().toLocaleDateString(getLocale(language), {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        title={`${t.greeting || 'Namaste'}, ${userProfile?.fullName || 'Farmer'}`}
        subtitle={`${t.farmLocation || 'Farm'}: ${userProfile?.district || 'Pune'}, ${userProfile?.state || 'Maharashtra'} • ${userProfile?.primaryCrop || 'Tomato'} (${userProfile?.farmSizeAcres || '4.5'} ${t.acres || 'Acres'})`}
        badge={{ text: 'Farm Active', bg: 'var(--color-success-bg)', color: 'var(--color-success)', border: 'var(--color-success-border)' }}
        action={
          <button
            className="btn-primary"
            onClick={() => setActivePage('disease')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.95rem' }}
          >
            <ScanLine size={18} />
            <span>{t.btnCheckCrop || 'Check Crop Health'}</span>
          </button>
        }
      />

      {/* Top 4 Key Farming Metrics */}
      <div className="dashboard-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard
          title="Overall Crop Health"
          value="88%"
          subtitle="Tomato & Soybean"
          icon={Leaf}
          iconColor="var(--color-success)"
          iconBg="var(--color-success-bg)"
          trend="+4%"
          trendDirection="up"
          trendLabel="vs last week"
        />

        <StatCard
          title="Soil Moisture"
          value="34%"
          subtitle="Optimal Zone (30-40%)"
          icon={Droplets}
          iconColor="var(--color-sky)"
          iconBg="var(--color-sky-tint)"
          trend="Adequate"
          trendDirection="neutral"
        />

        <StatCard
          title="Today's Weather"
          value="28°C"
          subtitle="Partly Cloudy • 12 km/h"
          icon={CloudSun}
          iconColor="var(--color-gold)"
          iconBg="var(--color-gold-tint)"
          trend="Humidity 62%"
          trendDirection="neutral"
        />

        <StatCard
          title="Sustainability Index"
          value="84 / 100"
          subtitle="Eco-Friendly Tier A"
          icon={TrendingUp}
          iconColor="var(--color-primary)"
          iconBg="var(--color-primary-tint)"
          trend="+6 pts"
          trendDirection="up"
          trendLabel="this season"
        />
      </div>

      {/* Active Alerts Banner Section */}
      <div style={{ marginBottom: '1.5rem' }}>
        {agroAlerts.slice(0, 2).map((alert) => (
          <AlertCard
            key={alert.id}
            severity={alert.severity}
            title={alert.title}
            message={alert.message}
            timestamp={alert.timestamp}
            actionLabel={alert.actionLabel}
            onAction={() => setActivePage(alert.actionPage)}
          />
        ))}
      </div>

      {/* 5 Core Questions Farmer Answers Grid */}
      <DashboardCard
        title="Daily Farm Decision Assistant"
        subtitle="Key questions answered automatically from your IoT and AI sensors"
        icon={BrainCircuit}
      >
        <div className="dashboard-questions-grid">
          {/* 1. Is my crop healthy? */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q1Label || '1. Is my crop healthy?'}</div>
              <div className="question-answer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {cropStatus.isHealthy === true && <CheckCircle2 size={20} color="var(--color-success)" />}
                {cropStatus.isHealthy === false && <AlertTriangle size={20} color="var(--color-danger)" />}
                <span>{cropStatus.title}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{cropStatus.time}</p>
            </div>
            <button
              onClick={() => setActivePage('disease')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <span>{lastScan ? t.q1ViewLast : t.q1ScanNow || 'Scan Leaf'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 2. Does my crop need water? */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q2Label || '2. Does my crop need water?'}</div>
              <div className="question-answer" style={{ color: 'var(--color-sky)' }}>
                {t.q2Answer || 'No watering needed today'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {t.q2Desc || 'Soil moisture is 34%. Next drip cycle tomorrow at 06:00 AM.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('irrigation')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-sky)' }}
            >
              <span>{t.q2Action || 'Irrigation Schedule'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 3. What is the weather today? */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q3Label || '3. What is the weather today?'}</div>
              <div className="question-answer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CloudSun size={20} color="var(--color-gold)" />
                <span>28°C • {t.q3Condition || 'Clear Skies'}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {t.q3Desc || 'Favorable spray window between 07:00 AM - 10:00 AM.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('weather')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <span>{t.q3Action || 'Weather Intelligence'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4. What should I do today? */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q4Label || '4. What should I do today?'}</div>
              <div className="question-answer" style={{ fontSize: '1rem' }}>
                {t.q4Answer || 'Inspect tomato foliage for blight'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {t.q4Desc || 'High humidity warning active in Pune region.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('disease')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <span>{t.q4Action || 'Take Action'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 5. Disease Warnings in your area */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q5Label || '5. Disease warnings in your area'}</div>
              <div className="question-answer" style={{ fontSize: '1rem', color: 'var(--color-warning)' }}>
                {t.q5Answer || 'Early Blight reported in Khed'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {t.q5Desc || '48 neighboring farms reported similar fungal spots.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('disease')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-warning)' }}
            >
              <span>{t.q5Action || 'View Advisory'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick Assistant Callout */}
          <div className="question-card" style={{ background: 'var(--color-primary-tint)', borderColor: 'var(--color-primary-border)' }}>
            <div>
              <div className="question-label" style={{ color: 'var(--color-primary-dark)' }}>
                {t.helpBoxTitle || 'Ask AgriSmart AI Assistant'}
              </div>
              <div className="question-answer" style={{ fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
                {t.helpBoxAnswer || 'Instant Agricultural Voice & Text Advice'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-primary-dark)' }}>
                {t.helpBoxDesc || 'Speak in Hindi, Marathi, Gujarati, or English.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('assistant')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-primary-dark)', fontWeight: 700 }}
            >
              <span>{t.helpBoxAction || 'Chat with Assistant'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </DashboardCard>

      {/* Two Column Layout: Recommendations & Recent Scans */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* AI Recommendations */}
        <DashboardCard
          title="Recommended Actions"
          subtitle="Personalized agronomic steps for your farm"
          icon={CheckCircle2}
          action={
            <button
              onClick={() => setActivePage('assistant')}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Ask Advisor →
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                category={rec.category}
                title={rec.title}
                desc={rec.desc}
                priority={rec.priority}
              />
            ))}
          </div>
        </DashboardCard>

        {/* Recent Leaf Diagnoses */}
        <DashboardCard
          title="Recent Crop Scans"
          subtitle="Latest AI image diagnosis results"
          icon={ScanLine}
          action={
            <button
              onClick={() => setActivePage('history')}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              View All History →
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                onClick={() => setActivePage('history')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-muted)',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      {scan.crop}
                    </span>
                    <StatusBadge status={scan.status} label={scan.status === 'healthy' ? 'Healthy' : 'Diseased'} size="sm" />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                    {scan.disease}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block' }}>
                    {scan.date}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {scan.confidence}% Conf.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Quick Navigation Shortcuts */}
      <DashboardCard title={t.shortcutsTitle || 'Farm Tools & Modules'}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <button
            onClick={() => setActivePage('disease')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ScanLine size={18} color="var(--color-primary)" />
              <span>{t.toolLeafCheck || 'Check Plant Disease'}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('irrigation')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Droplets size={18} color="var(--color-sky)" />
              <span>{t.toolWaterSchedule || 'Smart Irrigation'}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('crop-recommendation')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="var(--color-warning)" />
              <span>{t.toolSoilCrop || 'Crop Recommendation'}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('assistant')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BrainCircuit size={18} color="var(--color-purple)" />
              <span>Agentic Advisor</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>
        </div>
      </DashboardCard>
    </div>
  );
}
