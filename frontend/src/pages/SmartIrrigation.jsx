import React, { useState, useEffect } from 'react';
import { Droplets, Calendar, Clock, AlertTriangle, CheckCircle2, CloudRain, Info, Send } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSmartIrrigationAdvice } from '../services/api';
import { translations } from '../translations';

export default function SmartIrrigation({ onBack, language, currentLang, userProfile }) {
  const activeLang = language || currentLang || 'en';
  const t = translations[activeLang] || translations.en;

  const [cropType, setCropType] = useState(userProfile?.primaryCrop || 'Tomato');
  const [soilMoisture, setSoilMoisture] = useState(38);
  const [growthStage, setGrowthStage] = useState('Flowering');
  const [weatherForecast, setWeatherForecast] = useState('Partly Sunny');

  const [isLoading, setIsLoading] = useState(false);
  const [adviceResult, setAdviceResult] = useState(null);

  // Fetch advice automatically or upon parameter change
  const fetchAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await getSmartIrrigationAdvice({
        soil_moisture: Number(soilMoisture),
        weather_forecast: weatherForecast,
        crop_type: cropType,
        growth_stage: growthStage,
      });

      if (response && response.success) {
        setAdviceResult(response.irrigation_advice);
      } else {
        // Deterministic fallback matching backend rules
        const isRain = weatherForecast.toLowerCase().includes('rain');
        if (isRain && soilMoisture >= 25) {
          setAdviceResult({
            irrigation_required: false,
            priority: 'High (Conservation)',
            recommended_action: 'Delay watering',
            reason: 'Rain is likely within the next 24 hours. Natural rainfall will replenish root-zone moisture.',
            metrics: {
              soil_moisture_level: `${soilMoisture}%`,
              optimal_threshold: '50%',
              suggested_duration_mins: 0,
              water_volume_liters_per_sqm: 0,
            }
          });
        } else if (soilMoisture < 45) {
          setAdviceResult({
            irrigation_required: true,
            priority: growthStage === 'Flowering' ? 'Critical / Urgent' : 'High',
            recommended_action: 'Irrigate for 45-60 minutes (Drip / Furrow)',
            reason: `Soil moisture (${soilMoisture}%) is below the critical threshold for ${cropType} during ${growthStage} stage.`,
            metrics: {
              soil_moisture_level: `${soilMoisture}%`,
              optimal_threshold: '50%',
              suggested_duration_mins: 50,
              water_volume_liters_per_sqm: 14.5,
            }
          });
        } else {
          setAdviceResult({
            irrigation_required: false,
            priority: 'Low',
            recommended_action: 'No irrigation needed today',
            reason: `Soil moisture level is adequate for current growth stage.`,
            metrics: {
              soil_moisture_level: `${soilMoisture}%`,
              optimal_threshold: '50%',
              suggested_duration_mins: 0,
              water_volume_liters_per_sqm: 0,
            }
          });
        }
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchAdvice();
  };

  return (
    <div>
      <PageHeader
        title={t.waterTitle || "Smart Watering Advice"}
        description={t.waterDesc || "Optimize your irrigation timing to conserve water, save electricity, and prevent fungal root diseases."}
        onBack={onBack}
      />

      {/* Main Watering Decision Card */}
      {isLoading && !adviceResult ? (
        <LoadingSpinner message="Evaluating soil moisture and agro-meteorological conditions..." />
      ) : adviceResult ? (
        <div
          className="agri-card"
          style={{
            borderLeft: adviceResult.irrigation_required ? '6px solid var(--color-warning)' : '6px solid var(--color-primary)',
            background: adviceResult.irrigation_required ? '#fffbf5' : '#f7fcf9',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ maxWidth: '650px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span
                  className="badge"
                  style={{
                    background: adviceResult.irrigation_required ? '#fef3c7' : '#dcfce7',
                    color: adviceResult.irrigation_required ? '#92400e' : '#166534',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Droplets size={14} />
                  <span>
                    Status: {adviceResult.irrigation_required ? 'Watering Required' : 'Adequate Moisture'}
                  </span>
                </span>

                <span
                  className="badge"
                  style={{
                    background: adviceResult.priority?.toLowerCase().includes('critical') ? '#fee2e2' : '#f1f5f9',
                    color: adviceResult.priority?.toLowerCase().includes('critical') ? '#991b1b' : '#334155',
                  }}
                >
                  Priority: {adviceResult.priority}
                </span>
              </div>

              <h2 style={{ fontSize: '1.6rem', color: adviceResult.irrigation_required ? '#b45309' : 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
                {adviceResult.recommended_action}
              </h2>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginTop: '0.2rem', lineHeight: 1.5 }}>
                {adviceResult.reason}
              </p>
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.85rem 1.4rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.soilMoistureLabel || 'Soil Moisture Level'}</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: adviceResult.irrigation_required ? 'var(--color-warning)' : 'var(--color-primary)' }}>
                {soilMoisture}%
              </div>
              <span style={{ fontSize: '0.78rem', color: adviceResult.irrigation_required ? '#b45309' : 'var(--color-success)', fontWeight: 600 }}>
                {adviceResult.irrigation_required ? 'Below Threshold' : (t.optimalRange || 'Optimal Range')}
              </span>
            </div>
          </div>

          {/* Schedule Recommendation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '1.25rem' }}>
            <div style={{ background: 'white', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                <Calendar size={15} />
                <span>Recommended Timing</span>
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {adviceResult.irrigation_required ? 'Early Morning (6:00 - 8:30 AM)' : 'Re-check in 24-48 Hours'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Prevents solar evaporation loss</div>
            </div>

            <div style={{ background: 'white', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                <Clock size={15} />
                <span>{t.durationLabel || 'Recommended Duration'}</span>
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {adviceResult.metrics?.suggested_duration_mins > 0 ? `${adviceResult.metrics.suggested_duration_mins} Minutes (Drip)` : '0 Minutes'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                {adviceResult.metrics?.water_volume_liters_per_sqm > 0 ? `Approx ${adviceResult.metrics.water_volume_liters_per_sqm} L / m²` : 'Zero water consumed'}
              </div>
            </div>

            <div style={{ background: 'white', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                <CloudRain size={15} />
                <span>{t.weatherImpactLabel || 'Weather Forecast Impact'}</span>
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {weatherForecast}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                {weatherForecast.toLowerCase().includes('rain') ? 'Rain override active' : 'Standard FAO-56 evaporation'}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* 4 Interactive Field Condition Inputs */}
      <div className="agri-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
          Field & Weather Inputs (4 Parameters)
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          Adjust your field conditions and click "Get Irrigation Advice" to recalculate water requirements.
        </p>

        <form onSubmit={handleFormSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
            {/* 1. Soil Moisture */}
            <div>
              <label className="form-label">
                1. Soil Moisture: <strong>{soilMoisture}%</strong>
              </label>
              <input
                type="range"
                min="5"
                max="95"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.5rem' }}
              />
              <span className="form-help">
                {soilMoisture < 40 ? 'Dry / Deficit' : soilMoisture < 70 ? 'Adequate / Moist' : 'Wet / Saturated'}
              </span>
            </div>

            {/* 2. Weather Forecast */}
            <div>
              <label className="form-label">2. Weather Forecast</label>
              <select value={weatherForecast} onChange={(e) => setWeatherForecast(e.target.value)}>
                <option value="Partly Sunny">Partly Sunny / Mild</option>
                <option value="Sunny / Dry">Sunny / Dry & Clear</option>
                <option value="Rain likely within 24 hours">Rain likely within 24 hours (बारिश की संभावना)</option>
                <option value="Heavy Rain expected">Heavy Rain Expected (भारी वर्षा)</option>
                <option value="High Heatwave / Windy">High Heatwave / Hot Winds</option>
                <option value="Overcast / High Humidity">Overcast / High Humidity</option>
              </select>
            </div>

            {/* 3. Crop Type */}
            <div>
              <label className="form-label">3. Crop Type</label>
              <select value={cropType} onChange={(e) => setCropType(e.target.value)}>
                <option value="Tomato">Tomato (टमाटर / ટામેટા)</option>
                <option value="Wheat">Wheat (गेहूं / ઘઉં)</option>
                <option value="Rice (Paddy)">Rice / Paddy (धान / ડાંગર)</option>
                <option value="Cotton">Cotton (कपास / કપાસ)</option>
                <option value="Sugarcane">Sugarcane (गन्ना / શેરડી)</option>
                <option value="Maize">Maize / Corn (मक्का / મકાઈ)</option>
                <option value="Groundnut">Groundnut (मूंगफली / મગફળી)</option>
                <option value="Potato">Potato (आलू / બટાકા)</option>
                <option value="Chickpea">Chickpea / Gram (चना / ચણા)</option>
              </select>
            </div>

            {/* 4. Growth Stage */}
            <div>
              <label className="form-label">4. Current Growth Stage</label>
              <select value={growthStage} onChange={(e) => setGrowthStage(e.target.value)}>
                <option value="Seedling / Germination">Seedling / Germination (0-3 Weeks)</option>
                <option value="Vegetative">Vegetative Growth (3-6 Weeks)</option>
                <option value="Flowering">Flowering & Reproductive (6-10 Weeks)</option>
                <option value="Maturity / Ripening">Maturity / Harvesting</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Droplets size={18} />
            <span>{isLoading ? 'Recalculating...' : 'Get Irrigation Advice'}</span>
          </button>
        </form>
      </div>

      {/* Best Irrigation Practices */}
      <div className="agri-card" style={{ background: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
        <h4 style={{ fontSize: '0.95rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
          💧 3 Practical Water Saving Tips
        </h4>
        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <li><strong>Water at Sunrise:</strong> Irrigating between 6:00 AM and 8:30 AM minimizes evaporation loss by up to 35%.</li>
          <li><strong>Avoid Leaf Wetting:</strong> Keeping leaves dry drastically lowers fungal spore germination (Early & Late Blight).</li>
          <li><strong>Mulching:</strong> Apply organic crop residue or plastic mulch to lock in root zone moisture.</li>
        </ul>
      </div>
    </div>
  );
}
