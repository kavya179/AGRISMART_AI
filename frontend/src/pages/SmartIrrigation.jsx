import React, { useState, useEffect } from 'react';
import {
  Droplets,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  CloudRain,
  Info,
  Send,
  Zap,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import DashboardCard from '../components/ui/DashboardCard';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import {
  getSmartIrrigationAdvice,
  getIrrigationPresets,
} from '../services/irrigationApi';
import { translations } from '../translations';

export default function SmartIrrigation({ onBack, language = 'en', userProfile }) {
  const t = translations[language] || translations.en;
  const presets = getIrrigationPresets();

  const [formData, setFormData] = useState({
    crop_type: userProfile?.primaryCrop || 'Tomato',
    soil_moisture: 38,
    growth_stage: 'Flowering / Reproductive',
    weather_forecast: 'Partly Sunny',
    expected_rainfall_mm: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [adviceResult, setAdviceResult] = useState(null);

  const fetchAdvice = async (params = formData) => {
    setIsLoading(true);
    try {
      const response = await getSmartIrrigationAdvice(params);
      if (response && response.success) {
        setAdviceResult(response.irrigation_advice);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const handleApplyPreset = (preset) => {
    setFormData(preset.data);
    fetchAdvice(preset.data);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchAdvice(formData);
  };

  const moisture = Number(formData.soil_moisture);

  return (
    <div className="smart-irrigation-page">
      <SectionHeader
        title={t.waterTitle || 'Smart Irrigation & Water Scheduling'}
        subtitle="Precision soil moisture intelligence to optimize watering cycles, prevent fungal root rot, and conserve water and electricity."
        badge={{ text: 'Moisture AI v2.4', bg: 'var(--color-sky-tint)', color: 'var(--color-sky)', border: 'var(--color-sky-border)' }}
      />

      {/* Quick Testing Presets */}
      <div className="agri-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', background: 'var(--bg-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            💧 Quick Irrigation Presets: Select Scenario
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1-Click Simulation</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="btn-secondary"
              onClick={() => handleApplyPreset(preset)}
              style={{
                textAlign: 'left',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                minHeight: 'auto',
                background: 'var(--bg-surface)',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-sky)' }}>
                  {preset.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{preset.desc}</div>
              </div>
              <ArrowRight size={14} color="var(--color-sky)" />
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* ===================================================
            1. IRRIGATION PARAMETERS FORM
           =================================================== */}
        <div className="agri-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Sliders size={20} color="var(--color-sky)" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Sensor & Farm Inputs
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Adjust soil moisture or weather forecast to update watering guidance
              </p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit}>
            {/* Soil Moisture Slider & Value */}
            <div className="form-group" style={{ background: 'var(--bg-muted)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ marginBottom: 0, fontWeight: 700, color: 'var(--text-main)' }}>
                  Current Soil Moisture Level
                </label>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: moisture < 35 ? 'var(--color-warning)' : 'var(--color-sky)' }}>
                  {moisture}%
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="90"
                value={moisture}
                onChange={(e) => setFormData({ ...formData, soil_moisture: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--color-sky)', cursor: 'pointer' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                <span>10% (Dry / Wilt)</span>
                <span>40% - 60% (Optimal Zone)</span>
                <span>90% (Saturated)</span>
              </div>
            </div>

            {/* Crop Type & Growth Stage */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Crop Type</label>
                <select
                  value={formData.crop_type}
                  onChange={(e) => setFormData({ ...formData, crop_type: e.target.value })}
                >
                  <option value="Tomato">Tomato (टमाटर)</option>
                  <option value="Wheat">Wheat (गेहूं)</option>
                  <option value="Cotton">Cotton (कपास)</option>
                  <option value="Sugarcane">Sugarcane (गन्ना)</option>
                  <option value="Soybean">Soybean (सोयाबीन)</option>
                  <option value="Potato">Potato (आलू)</option>
                  <option value="Rice">Rice (धान / Paddy)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Growth Stage</label>
                <select
                  value={formData.growth_stage}
                  onChange={(e) => setFormData({ ...formData, growth_stage: e.target.value })}
                >
                  <option value="Germination / Seedling">Germination / Seedling</option>
                  <option value="Vegetative Growth">Vegetative Growth</option>
                  <option value="Flowering / Reproductive">Flowering / Reproductive</option>
                  <option value="Fruit / Grain Formation">Fruit / Grain Formation</option>
                  <option value="Maturity / Ripening">Maturity / Ripening</option>
                </select>
              </div>
            </div>

            {/* Weather Forecast & Expected Rainfall */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Weather Forecast</label>
                <select
                  value={formData.weather_forecast}
                  onChange={(e) => setFormData({ ...formData, weather_forecast: e.target.value })}
                >
                  <option value="Sunny & Clear">Sunny & Clear</option>
                  <option value="Partly Sunny">Partly Sunny</option>
                  <option value="Partly Cloudy">Partly Cloudy</option>
                  <option value="Rain / Showers Expected">Rain / Showers Expected</option>
                  <option value="Heavy Rain Alert">Heavy Rain Alert</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Expected Rainfall (mm)</label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={formData.expected_rainfall_mm}
                  onChange={(e) => setFormData({ ...formData, expected_rainfall_mm: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary btn-block"
              disabled={isLoading}
              style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: 800, justifyContent: 'center' }}
            >
              <Droplets size={18} />
              <span>{isLoading ? 'Computing Schedule...' : 'Calculate Irrigation Advice'}</span>
            </button>
          </form>
        </div>

        {/* ===================================================
            2. IRRIGATION DECISION & ADVICE RESULT
           =================================================== */}
        <div>
          {isLoading && !adviceResult ? (
            <div className="agri-card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
              <div className="spinner" style={{ width: '44px', height: '44px', borderWidth: '4px' }} />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', fontWeight: 800, marginTop: '1rem' }}>
                Analyzing Soil Moisture & Crop Water Balance...
              </h3>
            </div>
          ) : adviceResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Primary Decision Card */}
              <div
                className="agri-card"
                style={{
                  borderLeft: adviceResult.irrigation_required
                    ? '6px solid var(--color-warning)'
                    : adviceResult.badge_severity === 'warning'
                    ? '6px solid var(--color-sky)'
                    : '6px solid var(--color-success)',
                  background: 'var(--bg-surface)',
                  padding: '1.5rem',
                  marginBottom: 0,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                      <StatusBadge
                        status={adviceResult.badge_severity}
                        label={adviceResult.irrigation_required ? 'Action Needed' : 'Water Conserved'}
                        size="sm"
                      />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {formData.crop_type} ({formData.growth_stage})
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        color: adviceResult.irrigation_required
                          ? 'var(--color-warning)'
                          : adviceResult.badge_severity === 'warning'
                          ? 'var(--color-sky)'
                          : 'var(--color-success)',
                        margin: 0,
                      }}
                    >
                      {adviceResult.status_title}
                    </h2>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Next Cycle</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {adviceResult.next_irrigation_time}
                    </span>
                  </div>
                </div>

                {/* Plain-Language Explanation of WHY */}
                <div style={{ background: 'var(--bg-muted)', padding: '1rem', borderRadius: 'var(--radius-md)', margin: '1rem 0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Why This Advice:
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {adviceResult.reason}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Moisture</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-sky)', marginTop: '0.15rem' }}>
                      {adviceResult.metrics.soil_moisture_level}
                    </div>
                  </div>

                  <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Suggested Duration</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.15rem' }}>
                      {adviceResult.metrics.suggested_duration_mins > 0 ? `${adviceResult.metrics.suggested_duration_mins} mins` : '0 mins'}
                    </div>
                  </div>

                  <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Water Volume</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.15rem' }}>
                      {adviceResult.metrics.water_volume_liters_per_sqm > 0 ? `${adviceResult.metrics.water_volume_liters_per_sqm} L/m²` : 'None'}
                    </div>
                  </div>
                </div>

                {/* Practical Irrigation Guidelines */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={15} color="var(--color-primary)" />
                    <span>Agronomic Water Management Guidelines</span>
                  </h4>

                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: 0 }}>
                    {adviceResult.guidelines?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
