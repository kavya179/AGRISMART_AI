import React, { useState } from 'react';
import {
  Wheat,
  Sprout,
  Droplets,
  Layers,
  Thermometer,
  CloudSun,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Printer,
  Calendar,
  MapPin,
  BotMessageSquare,
  ShieldCheck,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import DashboardCard from '../components/ui/DashboardCard';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import {
  getCropRecommendation,
  validateCropParameters,
  getFarmPresets,
} from '../services/cropRecommendationApi';
import { translations } from '../translations';

export default function CropRecommendation({ onBack, language = 'en', userProfile }) {
  const t = translations[language] || translations.en;
  const farmPresets = getFarmPresets();

  const [formData, setFormData] = useState({
    soil_type: userProfile?.soilType || 'Black Soil',
    ph: '6.8',
    temperature: '26',
    humidity: '65',
    rainfall: '140',
    water_availability: 'Moderate',
    season: 'Kharif (Monsoon)',
    location: userProfile?.district ? `${userProfile.district}, ${userProfile.state || 'Maharashtra'}` : 'Pune, Maharashtra',
    previous_crop: userProfile?.primaryCrop || 'Wheat',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedRankedCrop, setSelectedRankedCrop] = useState(0);

  const handleInputChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // Clear specific field error on change
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleApplyPreset = (preset) => {
    setFormData(preset.data);
    setErrors({});
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    const validation = validateCropParameters(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await getCropRecommendation(formData);
      if (response && response.success) {
        setResult(response.recommendation);
        setSelectedRankedCrop(0);
      } else if (response && response.validationErrors) {
        setErrors(response.validationErrors);
      }
    } catch (err) {
      setErrors({ general: 'Failed to compute crop recommendations. Please check inputs.' });
    } finally {
      setIsLoading(false);
    }
  };

  const currentCropView = result?.ranked_recommendations?.[selectedRankedCrop] || null;

  return (
    <div className="crop-recommendation-page">
      <SectionHeader
        title={t.cropChoiceTitle || 'Soil & Climate Crop Recommendation'}
        subtitle="Discover optimal crops tailored to your soil pH, climate conditions, water supply, and previous crop rotation."
        badge={{ text: 'Agronomic AI Engine', bg: 'var(--color-primary-tint)', color: 'var(--color-primary)', border: 'var(--color-primary-border)' }}
        action={
          result && (
            <button
              className="btn-secondary"
              onClick={() => window.print()}
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}
            >
              <Printer size={16} />
              <span>Print Report</span>
            </button>
          )
        }
      />

      {/* Quick Testing Presets */}
      <div className="agri-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', background: 'var(--bg-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            🌾 Quick Presets: Select a Farm Scenario
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1-Click Auto Fill</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
          {farmPresets.map((preset) => (
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
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary-dark)' }}>
                  {preset.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{preset.desc}</div>
              </div>
              <ArrowRight size={14} color="var(--color-primary)" />
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* ===================================================
            1. CROP RECOMMENDATION PARAMETERS FORM
           =================================================== */}
        <div className="agri-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Layers size={22} color="var(--color-primary)" />
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0 }}>
                Farm & Soil Parameters
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                9 agronomic variables used for multi-crop suitability analysis
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* SECTION 1: Soil Characteristics */}
            <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.75rem' }}>
                Section 1: Soil Characteristics
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">1. Soil Type</label>
                  <select
                    value={formData.soil_type}
                    onChange={(e) => handleInputChange('soil_type', e.target.value)}
                  >
                    <option value="Black Soil">Black Soil (काळी / કાળી)</option>
                    <option value="Alluvial Soil">Alluvial Soil (जलोढ़ / કાંપવાળી)</option>
                    <option value="Red Soil">Red Soil (लाल / લાલ)</option>
                    <option value="Sandy Loam">Sandy Loam (बलुई / રેતાળ)</option>
                    <option value="Clayey Loam">Clayey Soil (चिकनी / ચીકણી)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    2. Soil pH Level
                    {errors.ph && <span style={{ color: 'var(--color-danger)', marginLeft: '4px' }}>*</span>}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="3.5"
                    max="10.0"
                    placeholder="e.g. 6.8"
                    value={formData.ph}
                    onChange={(e) => handleInputChange('ph', e.target.value)}
                    style={{ borderColor: errors.ph ? 'var(--color-danger)' : undefined }}
                    required
                  />
                  {errors.ph ? (
                    <span className="form-help" style={{ color: 'var(--color-danger)', fontWeight: 600 }}>
                      {errors.ph}
                    </span>
                  ) : (
                    <span className="form-help">Ideal range: 6.0 - 7.5</span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: Climate & Weather */}
            <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.75rem' }}>
                Section 2: Climate & Rainfall
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">3. Temp (°C)</label>
                  <input
                    type="number"
                    min="5"
                    max="55"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    style={{ borderColor: errors.temperature ? 'var(--color-danger)' : undefined }}
                    required
                  />
                  {errors.temperature && (
                    <span className="form-help" style={{ color: 'var(--color-danger)', fontSize: '0.72rem' }}>
                      {errors.temperature}
                    </span>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">4. Humidity (%)</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange('humidity', e.target.value)}
                    style={{ borderColor: errors.humidity ? 'var(--color-danger)' : undefined }}
                    required
                  />
                  {errors.humidity && (
                    <span className="form-help" style={{ color: 'var(--color-danger)', fontSize: '0.72rem' }}>
                      {errors.humidity}
                    </span>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">5. Rainfall (mm)</label>
                  <input
                    type="number"
                    min="0"
                    max="3000"
                    value={formData.rainfall}
                    onChange={(e) => handleInputChange('rainfall', e.target.value)}
                    style={{ borderColor: errors.rainfall ? 'var(--color-danger)' : undefined }}
                    required
                  />
                  {errors.rainfall && (
                    <span className="form-help" style={{ color: 'var(--color-danger)', fontSize: '0.72rem' }}>
                      {errors.rainfall}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: Farm Resources & Rotation */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.75rem' }}>
                Section 3: Resources & Rotation History
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">6. Water Availability</label>
                  <select
                    value={formData.water_availability}
                    onChange={(e) => handleInputChange('water_availability', e.target.value)}
                  >
                    <option value="High">High (Canal / Continuous Borewell)</option>
                    <option value="Moderate">Moderate (Scheduled Drip / Tubewell)</option>
                    <option value="Low">Low (Rainfed / Dependent)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">7. Target Season</label>
                  <select
                    value={formData.season}
                    onChange={(e) => handleInputChange('season', e.target.value)}
                  >
                    <option value="Kharif (Monsoon)">Kharif (Monsoon / ચોમાસુ)</option>
                    <option value="Rabi (Winter)">Rabi (Winter / શિયાળુ)</option>
                    <option value="Zaid (Summer)">Zaid (Summer / ઉનાળુ)</option>
                    <option value="Annual (12 Months)">Annual (12 Months / વાર્ષિક)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    8. Farm Location
                    {errors.location && <span style={{ color: 'var(--color-danger)' }}>*</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g. Pune, Maharashtra"
                    style={{ borderColor: errors.location ? 'var(--color-danger)' : undefined }}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">9. Previous Harvested Crop</label>
                  <select
                    value={formData.previous_crop}
                    onChange={(e) => handleInputChange('previous_crop', e.target.value)}
                  >
                    <option value="Wheat">Wheat (गेहूं / ઘઉં)</option>
                    <option value="Rice (Paddy)">Rice / Paddy (धान / ડાંગર)</option>
                    <option value="Cotton">Cotton (कपास / કપાસ)</option>
                    <option value="Legumes / Pulses">Legumes / Pulses (दालें / કઠોળ)</option>
                    <option value="Maize">Maize / Corn (मक्का / મકાઈ)</option>
                    <option value="Sugarcane">Sugarcane (गन्ना / શેરડી)</option>
                    <option value="Vegetables">Vegetables / Tomato (सब्जियां)</option>
                    <option value="Fallow / None">Fallow / None (खाली खेत)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary btn-block"
              disabled={isLoading}
              style={{ padding: '0.9rem', fontSize: '1.05rem', fontWeight: 800, justifyContent: 'center' }}
            >
              <Wheat size={20} />
              <span>{isLoading ? 'Computing Agro-Suitability...' : (t.btnCalculateCrops || 'Calculate Best Crops for My Soil')}</span>
            </button>
          </form>
        </div>

        {/* ===================================================
            2. RECOMMENDATION RESULTS VIEW
           =================================================== */}
        <div>
          {isLoading ? (
            <div
              className="agri-card"
              style={{ padding: '3.5rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <div className="spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', fontWeight: 800, marginTop: '1rem' }}>
                Evaluating Soil, Climate & Rotation Fit...
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '380px', marginTop: '0.4rem' }}>
                Matching your soil pH ({formData.ph}), moisture profile, and seasonal temperature against Indian agricultural database models.
              </p>
            </div>
          ) : result ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Ranked Recommendation Tabs */}
              <div className="agri-card" style={{ padding: '1.25rem', borderLeft: '6px solid var(--color-primary)', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.8rem' }}>
                    Top Recommended Crops ({result.ranked_recommendations?.length || 3})
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                    {result.suitability_score}
                  </span>
                </div>

                {/* Ranked Selector Pills */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {result.ranked_recommendations?.map((item, idx) => {
                    const isSelected = selectedRankedCrop === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedRankedCrop(idx)}
                        className={isSelected ? 'btn-primary' : 'btn-secondary'}
                        style={{
                          padding: '0.55rem 0.65rem',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          minHeight: 'auto',
                          borderRadius: 'var(--radius-md)',
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Rank #{item.rank} Choice</div>
                        <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{item.crop.split(' ')[0]}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{item.suitability_score}% Match</div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Selected Crop Card */}
                {currentCropView && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Category: {currentCropView.category}
                        </span>
                        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: '0.15rem 0 0' }}>
                          🌾 {currentCropView.crop}
                        </h2>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <StatusBadge
                          status="healthy"
                          label={`${currentCropView.suitability_label} (${currentCropView.suitability_score}%)`}
                          size="md"
                        />
                      </div>
                    </div>

                    {/* Suitability Reasons (Why this crop was recommended) */}
                    <div style={{ background: 'var(--color-primary-tint)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary-border)', margin: '1rem 0' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary-dark)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        Why This Crop Was Recommended:
                      </h4>
                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-main)', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {currentCropView.matched_reasons?.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Expected Optimal Conditions & Water Requirement */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-sky)' }}>
                          <Droplets size={14} />
                          <span>Water Requirement</span>
                        </div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                          {currentCropView.water_requirement}
                        </div>
                      </div>

                      <div style={{ padding: '0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          <CloudSun size={14} />
                          <span>Expected Conditions</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                          {currentCropView.expected_conditions}
                        </div>
                      </div>
                    </div>

                    {/* Basic Farming Guidance & Steps */}
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Sparkles size={16} color="var(--color-primary)" />
                        <span>Basic Farming Guidance & Agronomic Steps</span>
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {currentCropView.farming_guidance?.map((step, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.5rem',
                              padding: '0.65rem 0.85rem',
                              background: 'var(--bg-surface)',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-color)',
                              fontSize: '0.85rem',
                              color: 'var(--text-main)',
                            }}
                          >
                            <span style={{ fontWeight: 800, color: 'var(--color-primary)', minWidth: '18px' }}>
                              {idx + 1}.
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Next Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setResult(null);
                        }}
                        className="btn-secondary"
                        style={{ fontSize: '0.85rem', flex: 1 }}
                      >
                        <RefreshCw size={15} />
                        <span>Re-test Parameters</span>
                      </button>

                      {onBack && (
                        <button
                          type="button"
                          onClick={onBack}
                          className="btn-primary"
                          style={{ fontSize: '0.85rem', flex: 1 }}
                        >
                          <span>Back to Farm Dashboard</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="agri-card" style={{ background: 'var(--bg-muted)', textAlign: 'center', padding: '3.5rem 1.5rem', border: '2px dashed var(--border-color)' }}>
              <Wheat size={52} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
                Calculate Best Crops for Your Soil
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '360px', margin: '0 auto 1.25rem' }}>
                Fill in your soil pH, climate, and crop history on the left or choose a quick preset to see ranked recommendations.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
