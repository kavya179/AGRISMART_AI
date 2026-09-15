import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Sparkles,
  Clock,
  RefreshCw,
  Calendar,
  Compass,
  Thermometer,
  ShieldAlert,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import DashboardCard from '../components/ui/DashboardCard';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import AlertCard from '../components/ui/AlertCard';
import {
  getWeatherIntelligence,
  getAvailableWeatherRegions,
} from '../services/weatherApi';
import { translations } from '../translations';

export default function Weather({ onBack, language = 'en', userProfile }) {
  const t = translations[language] || translations.en;
  const regions = getAvailableWeatherRegions();

  const [location, setLocation] = useState(userProfile?.state || 'Maharashtra');
  const [cropType, setCropType] = useState(userProfile?.primaryCrop || 'Tomato');
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const response = await getWeatherIntelligence({
        location,
        crop_type: cropType,
      });

      if (response && response.success && response.weather_intelligence) {
        setWeatherData(response.weather_intelligence);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location, cropType]);

  const getWeatherIcon = (cond) => {
    const c = (cond || '').toLowerCase();
    if (c.includes('rain') || c.includes('shower') || c.includes('thunder')) {
      return <CloudRain size={28} color="var(--color-sky)" />;
    }
    if (c.includes('clear') || (c.includes('sunny') && !c.includes('partly'))) {
      return <Sun size={28} color="var(--color-gold)" />;
    }
    return <CloudSun size={28} color="var(--color-earth)" />;
  };

  const current = weatherData?.current_conditions;

  return (
    <div className="weather-page">
      <SectionHeader
        title={t.weatherTitle || 'Hyperlocal Weather Intelligence'}
        subtitle={`Live agro-meteorological observations and decision directives for ${weatherData?.location || location}.`}
        badge={{ text: 'Agro-Satellite Feed', bg: 'var(--color-gold-tint)', color: 'var(--color-gold)', border: 'var(--color-gold-border)' }}
        action={
          <button
            className="btn-secondary"
            onClick={fetchWeather}
            disabled={isLoading}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
          >
            <RefreshCw size={15} className={isLoading ? 'spinner' : ''} />
            <span>Refresh Satellite</span>
          </button>
        }
      />

      {/* Location & Crop Filter Controls */}
      <div className="agri-card" style={{ marginBottom: '1.25rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
          <div>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={15} color="var(--color-primary)" />
              <span>Farming Agro-Climatic Zone</span>
            </label>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Active Crop Context</label>
            <select value={cropType} onChange={(e) => setCropType(e.target.value)}>
              <option value="Tomato">Tomato (टमाटर)</option>
              <option value="Wheat">Wheat (गेहूं)</option>
              <option value="Cotton">Cotton (कपास)</option>
              <option value="Sugarcane">Sugarcane (गन्ना)</option>
              <option value="Soybean">Soybean (सोयाबीन)</option>
              <option value="Potato">Potato (आलू)</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && !weatherData ? (
        <div className="agri-card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <div className="spinner" style={{ width: '44px', height: '44px', borderWidth: '4px' }} />
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', fontWeight: 800, marginTop: '1rem' }}>
            Fetching Satellite & Micro-Climate Telemetry...
          </h3>
        </div>
      ) : weatherData ? (
        <>
          {/* Top 4 Weather KPI Cards */}
          <div className="dashboard-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <StatCard
              title="Temperature"
              value={`${current?.temperature_celsius}°C`}
              subtitle={current?.weather_summary}
              icon={Sun}
              iconColor="var(--color-gold)"
              iconBg="var(--color-gold-tint)"
              trend="UV Index 6/10"
              trendDirection="neutral"
            />

            <StatCard
              title="Relative Humidity"
              value={`${current?.relative_humidity_percent}%`}
              subtitle="Dew point favorable"
              icon={Droplets}
              iconColor="var(--color-sky)"
              iconBg="var(--color-sky-tint)"
              trend="Elevated"
              trendDirection="down"
              trendLabel="fungal watch"
            />

            <StatCard
              title="Wind Speed & Dir"
              value={`${current?.wind_speed_kmh} km/h`}
              subtitle={`Direction: ${current?.wind_direction || 'SW'}`}
              icon={Wind}
              iconColor="var(--color-primary)"
              iconBg="var(--color-primary-tint)"
              trend="Calm"
              trendDirection="up"
              trendLabel="spray safe"
            />

            <StatCard
              title="Rainfall Forecast"
              value={weatherData.seven_day_forecast?.[2]?.rainProb || '70%'}
              subtitle="Next 48 Hours"
              icon={CloudRain}
              iconColor="var(--color-sky)"
              iconBg="var(--color-sky-tint)"
              trend="12-18mm"
              trendDirection="neutral"
              trendLabel="expected"
            />
          </div>

          {/* Active Weather Directives & Advisories */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            
            {/* Actionable Agricultural Decisions */}
            <DashboardCard
              title="Direct Field Action Directives"
              subtitle="Actionable guidance converted from atmospheric trends"
              icon={Sparkles}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {weatherData.primary_agricultural_actions?.map((action, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      padding: '0.75rem 0.85rem',
                      background: 'var(--bg-muted)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.88rem',
                      borderLeft: '4px solid var(--color-primary)',
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{action}</span>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* Spray Window & Irrigation Recommendation */}
            <DashboardCard
              title="Spraying & Irrigation Intelligence"
              subtitle="Specific operational timing windows"
              icon={Clock}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '0.85rem', background: 'var(--color-primary-tint)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary-border)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary-dark)', textTransform: 'uppercase' }}>
                    Recommended Spraying Window
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginTop: '0.2rem' }}>
                    {weatherData.spraying_window?.time_slot}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-primary-dark)', margin: '0.25rem 0 0' }}>
                    {weatherData.spraying_window?.advice}
                  </p>
                </div>

                <div style={{ padding: '0.85rem', background: 'var(--color-sky-tint)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-sky-border)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-sky)', textTransform: 'uppercase' }}>
                    Irrigation Directive
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                    {weatherData.irrigation_directive?.action}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                    {weatherData.irrigation_directive?.reason}
                  </p>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* 7-Day Agricultural Forecast Grid */}
          <DashboardCard
            title="7-Day Agricultural Weather Outlook"
            subtitle="Hyperlocal precipitation probabilities and temperature fluctuations"
            icon={Calendar}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
              {weatherData.seven_day_forecast?.map((day, idx) => {
                const isRainy = day.rainProb.replace('%', '') > 40;

                return (
                  <div
                    key={idx}
                    style={{
                      background: isRainy ? 'var(--color-sky-tint)' : 'var(--bg-muted)',
                      border: `1px solid ${isRainy ? 'var(--color-sky-border)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 0.65rem',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      minHeight: '150px',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>
                        {day.day}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {day.date}
                      </span>
                    </div>

                    <div style={{ margin: '0.4rem 0' }}>
                      {getWeatherIcon(day.condition)}
                    </div>

                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        {day.max}° / <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>{day.min}°</span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: isRainy ? 'var(--color-sky)' : 'var(--text-muted)',
                          display: 'block',
                          marginTop: '0.15rem',
                        }}
                      >
                        🌧️ {day.rainProb}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </DashboardCard>
        </>
      ) : null}
    </div>
  );
}
