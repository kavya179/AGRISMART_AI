import React, { useState } from 'react';
import { Sprout, Check, ArrowRight } from 'lucide-react';
import { saveStoredUserProfile } from '../services/historyStorage';

export default function Register({ setActivePage, setUserProfile }) {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    state: 'Maharashtra',
    district: '',
    village: '',
    farmSizeAcres: '3.0',
    primaryCrop: 'Tomato',
    soilType: 'Black Soil',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile(form);
    saveStoredUserProfile(form);
    setActivePage('dashboard');
  };

  return (
    <div style={{ maxWidth: '540px', margin: '1.5rem auto' }}>
      <div className="agri-card" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', background: 'var(--color-primary-tint)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
            <Sprout size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>Register Your Farm</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Join AgriSmart to receive localized disease alerts and tailored watering guidance.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Farmer Full Name</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Patil"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                placeholder="10-digit number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">District / Taluka</label>
              <input
                type="text"
                placeholder="e.g. Pune / Khed"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Farm Size (Acres)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 4.5"
                value={form.farmSizeAcres}
                onChange={(e) => setForm({ ...form, farmSizeAcres: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary Crop</label>
              <select value={form.primaryCrop} onChange={(e) => setForm({ ...form, primaryCrop: e.target.value })}>
                <option value="Tomato">Tomato (टमाटर)</option>
                <option value="Potato">Potato (आलू)</option>
                <option value="Wheat">Wheat (गेहूं)</option>
                <option value="Rice">Rice / Paddy (धान)</option>
                <option value="Cotton">Cotton (कपास)</option>
                <option value="Corn">Corn / Maize (मक्का)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Soil Type</label>
              <select value={form.soilType} onChange={(e) => setForm({ ...form, soilType: e.target.value })}>
                <option value="Black Soil">Black Soil (Regur)</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Red Soil">Red / Laterite Soil</option>
                <option value="Clayey Loam">Clayey Loam</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary btn-block" style={{ padding: '0.85rem' }}>
            <span>Create Profile & Open Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.88rem' }}>
          <span>Already registered? </span>
          <button
            onClick={() => setActivePage('login')}
            style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
