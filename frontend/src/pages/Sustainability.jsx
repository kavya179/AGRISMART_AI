import React, { useState, useEffect } from 'react';
import {
  Leaf,
  ShieldCheck,
  Droplets,
  Recycle,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  Info,
  Check,
  TrendingUp,
  Award,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import DashboardCard from '../components/ui/DashboardCard';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/ui/Modal';
import { calculateSustainabilityScore } from '../services/sustainabilityApi';
import { translations } from '../translations';

export default function Sustainability({ onBack, language = 'en' }) {
  const t = translations[language] || translations.en;

  const [practices, setPractices] = useState({
    irrigation_method: 'drip',
    rainwater_harvesting: false,
    moisture_sensor_timing: true,
    organic_manure_used: true,
    soil_tested: true,
    mulching_or_cover_crop: false,
    crop_residue_burned: false,
    legume_crop_rotation: true,
    bio_pesticides_used: true,
    regular_disease_monitoring: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  const fetchScore = async () => {
    setIsLoading(true);
    try {
      const response = await calculateSustainabilityScore(practices);
      if (response && response.success && response.sustainability) {
        setResult(response.sustainability);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScore();
  }, [practices]);

  const togglePractice = (field) => {
    setPractices((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleIrrigationChange = (method) => {
    setPractices((prev) => ({ ...prev, irrigation_method: method }));
  };

  const score = result?.sustainability_score || 78;
  const breakdown = result?.score_breakdown;

  return (
    <div className="sustainability-page">
      <SectionHeader
        title="Farm Sustainability & Soil Health Dashboard"
        subtitle="Transparent evaluation of your farm's regenerative practices, resource efficiency, and soil carbon retention."
        badge={{ text: result?.tier_badge || 'Tier A (High Eco-Standard)', bg: 'var(--color-primary-tint)', color: 'var(--color-primary)', border: 'var(--color-primary-border)' }}
        action={
          <button
            className="btn-secondary"
            onClick={() => setShowFormulaModal(true)}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
          >
            <BookOpen size={16} color="var(--color-primary)" />
            <span>Formula & Scoring Rules</span>
          </button>
        }
      />

      {/* Main Score Hero Card */}
      <div
        className="agri-card"
        style={{
          borderLeft: '6px solid var(--color-primary)',
          background: 'var(--bg-surface)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ maxWidth: '560px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-success" style={{ fontSize: '0.82rem' }}>
                <Leaf size={14} />
                <span>{result?.rating_grade || 'Eco-Leader (Grade A+)'}</span>
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                • 10 Verified Field Indicators
              </span>
            </div>

            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0, lineHeight: 1.2 }}>
              Sustainability Score: {score} / 100
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginTop: '0.4rem', margin: 0 }}>
              Your farm implements proven water-conservation and organic soil restoration practices, operating well above regional baseline thresholds.
            </p>
          </div>

          {/* 3 Core Pillar Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
            <div style={{ background: 'var(--color-sky-tint)', border: '1px solid var(--color-sky-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 0.85rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-sky)', display: 'block' }}>WATER</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-sky)', marginTop: '0.1rem' }}>
                {breakdown?.water_efficiency?.score || 25} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>/ 35</span>
              </div>
            </div>

            <div style={{ background: 'var(--color-primary-tint)', border: '1px solid var(--color-primary-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 0.85rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary-dark)', display: 'block' }}>SOIL</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginTop: '0.1rem' }}>
                {breakdown?.resource_and_soil_health?.score || 27} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>/ 35</span>
              </div>
            </div>

            <div style={{ background: 'var(--color-gold-tint)', border: '1px solid var(--color-gold-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 0.85rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-gold)', display: 'block' }}>CROP</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-gold)', marginTop: '0.1rem' }}>
                {breakdown?.crop_health_and_biodiversity?.score || 25} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>/ 30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Interactive Field Practices & Score Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* ===================================================
            1. INTERACTIVE FARM PRACTICES CHECKLIST
           =================================================== */}
        <DashboardCard
          title="Interactive Farm Practices Checklist"
          subtitle="Toggle practices active on your farm to update your score in real time"
          icon={CheckCircle2}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            {/* Irrigation Method Selector */}
            <div style={{ padding: '0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
              <label className="form-label" style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Irrigation System in Use
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
                {[
                  { id: 'drip', label: 'Drip (15 pts)' },
                  { id: 'sprinkler', label: 'Sprinkler (10 pts)' },
                  { id: 'flood', label: 'Flood (5 pts)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleIrrigationChange(item.id)}
                    className={practices.irrigation_method === item.id ? 'btn-primary' : 'btn-secondary'}
                    style={{ padding: '0.4rem', fontSize: '0.78rem', minHeight: '34px', justifyContent: 'center' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checklist Toggle Items */}
            {[
              { id: 'rainwater_harvesting', label: 'Rainwater Harvesting / Farm Pond Installed', points: '+10 pts (Water)' },
              { id: 'moisture_sensor_timing', label: 'Soil Moisture or Weather Scheduled Watering', points: '+10 pts (Water)' },
              { id: 'organic_manure_used', label: 'Farmyard Manure / Vermicompost Applied', points: '+10 pts (Soil)' },
              { id: 'soil_tested', label: 'Laboratory Soil Health Card Completed This Season', points: '+8 pts (Soil)' },
              { id: 'mulching_or_cover_crop', label: 'Organic Straw Mulching or Cover Cropping', points: '+9 pts (Soil)' },
              { id: 'legume_crop_rotation', label: 'Legume Crop Rotation (Nitrogen-Fixing)', points: '+10 pts (Crop)' },
              { id: 'bio_pesticides_used', label: 'Neem / Trichoderma Bio-Pesticides Used', points: '+10 pts (Crop)' },
              { id: 'regular_disease_monitoring', label: 'Routine Digital Crop Disease Scouting', points: '+10 pts (Crop)' },
            ].map((item) => {
              const isActive = practices[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => togglePractice(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    background: isActive ? 'var(--color-primary-tint)' : 'var(--bg-surface)',
                    border: `1px solid ${isActive ? 'var(--color-primary-border)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: isActive ? 'var(--color-primary)' : 'var(--bg-muted)',
                        border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--border-color)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                      }}
                    >
                      {isActive && <Check size={14} />}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {item.label}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isActive ? 'var(--color-primary-dark)' : 'var(--text-subtle)' }}>
                    {item.points}
                  </span>
                </div>
              );
            })}
          </div>
        </DashboardCard>

        {/* ===================================================
            2. 3 PILLARS PROGRESS & IMPROVEMENTS
           =================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Progress Indicators */}
          <DashboardCard
            title="Core Sustainability Pillars"
            subtitle="Breakdown across water, soil carbon, and biodiversity"
            icon={TrendingUp}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* 1. Water Efficiency */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>💧 Water Efficiency</span>
                  <span style={{ fontWeight: 800, color: 'var(--color-sky)' }}>
                    {breakdown?.water_efficiency?.score} / 35 ({breakdown?.water_efficiency?.percentage})
                  </span>
                </div>
                <div style={{ background: 'var(--border-subtle)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--color-sky)', width: breakdown?.water_efficiency?.percentage, height: '100%', borderRadius: '4px' }} />
                </div>
              </div>

              {/* 2. Resource & Soil Health */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>🌱 Resource & Soil Health</span>
                  <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>
                    {breakdown?.resource_and_soil_health?.score} / 35 ({breakdown?.resource_and_soil_health?.percentage})
                  </span>
                </div>
                <div style={{ background: 'var(--border-subtle)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--color-primary)', width: breakdown?.resource_and_soil_health?.percentage, height: '100%', borderRadius: '4px' }} />
                </div>
              </div>

              {/* 3. Crop Health & Biodiversity */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>🌿 Crop Health & Biodiversity</span>
                  <span style={{ fontWeight: 800, color: 'var(--color-gold)' }}>
                    {breakdown?.crop_health_and_biodiversity?.score} / 30 ({breakdown?.crop_health_and_biodiversity?.percentage})
                  </span>
                </div>
                <div style={{ background: 'var(--border-subtle)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--color-gold)', width: breakdown?.crop_health_and_biodiversity?.percentage, height: '100%', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Improvement Opportunities */}
          <DashboardCard
            title="Improvement Opportunities"
            subtitle="Actionable steps to increase your regenerative farm score"
            icon={Sparkles}
          >
            {result?.improvement_opportunities?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-success)', fontWeight: 600 }}>
                🎉 Outstanding! You have implemented all major regenerative practices.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {result?.improvement_opportunities?.map((opp, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.85rem',
                      background: 'var(--color-gold-tint)',
                      border: '1px solid var(--color-gold-border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-earth)', margin: 0 }}>
                        {opp.title}
                      </h4>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-earth)', background: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
                        {opp.gain}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-earth)', margin: 0, lineHeight: 1.4 }}>
                      {opp.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </DashboardCard>
        </div>

      </div>

      {/* Formula Transparency Modal */}
      <Modal
        isOpen={showFormulaModal}
        onClose={() => setShowFormulaModal(false)}
        title="AgriSmart Sustainability Scoring Formula"
        subtitle="Mathematical formulation and field practice weighting"
        maxWidth="580px"
        footer={
          <button className="btn-primary" onClick={() => setShowFormulaModal(false)}>
            Close Specification
          </button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          <div style={{ padding: '0.85rem', background: 'var(--color-primary-tint)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary-border)' }}>
            <strong>Master Equation:</strong>
            <code style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginTop: '0.25rem' }}>
              S = W(max 35) + R(max 35) + C(max 30) = 100 Points
            </code>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>1. Water Efficiency (Max 35 pts)</h4>
            <p>Drip micro-irrigation (+15), Rainwater harvesting (+10), Moisture sensor scheduling (+10).</p>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>2. Resource & Soil Health (Max 35 pts)</h4>
            <p>Organic manure (+10), Soil testing card (+8), Straw mulching (+9), Zero crop burning (+8).</p>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>3. Crop Health & Biodiversity (Max 30 pts)</h4>
            <p>Legume crop rotation (+10), Bio-pesticides (+10), Regular disease scouting (+10).</p>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem' }}>
            Note: Prototype score is calculated via rule-based scoring engine in <code>sustainabilityApi.js</code> and connects to Django REST API in production.
          </div>
        </div>
      </Modal>
    </div>
  );
}
