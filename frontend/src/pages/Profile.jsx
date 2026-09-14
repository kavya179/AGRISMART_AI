import React, { useState } from 'react';
import { User, Check, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { saveStoredUserProfile } from '../services/historyStorage';

export default function Profile({ onBack, userProfile, setUserProfile, language, setLanguage }) {
  const [form, setForm] = useState(userProfile || {
    fullName: 'Ramesh Patil',
    phone: '+91 98765 43210',
    state: 'Maharashtra',
    district: 'Pune',
    village: 'Khed',
    farmSizeAcres: '4.5',
    primaryCrop: 'Tomato',
    soilType: 'Black Soil',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile(form);
    saveStoredUserProfile(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div>
      <PageHeader
        title="Your Farmer Profile"
        description="Set your farm location and primary crops so AgriSmart can tailor weather, disease alerts, and watering advice to your field."
        onBack={onBack}
      />

      {savedSuccess && (
        <div className="alert-box alert-success" style={{ marginBottom: '1rem' }}>
          <Check size={18} />
          <span>Profile details saved successfully!</span>
        </div>
      )}

      <div className="agri-card">
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">District / Taluka</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Village Name</label>
              <input
                type="text"
                value={form.village}
                onChange={(e) => setForm({ ...form, village: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Total Land Area (Acres)</label>
              <input
                type="number"
                step="0.1"
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
                <option value="Sugarcane">Sugarcane (गन्ना)</option>
                <option value="Soybean">Soybean (सोयाबीन)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Soil Type</label>
              <select value={form.soilType} onChange={(e) => setForm({ ...form, soilType: e.target.value })}>
                <option value="Black Soil">Black Soil (Regur)</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Red Soil">Red / Laterite Soil</option>
                <option value="Clayey Loam">Clayey Loam</option>
                <option value="Sandy Loam">Sandy Loam</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
            <Check size={18} />
            <span>Save Profile Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
}
