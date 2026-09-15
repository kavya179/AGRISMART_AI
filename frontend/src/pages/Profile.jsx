import React, { useState } from 'react';
import { User, Check, ShieldCheck, Sprout, Stethoscope, Shield, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/ui/StatusBadge';
import { ROLES, ROLE_CONFIG, switchActiveRole } from '../services/authService';
import { saveStoredUserProfile } from '../services/historyStorage';

export default function Profile({
  onBack,
  userProfile,
  setUserProfile,
  language,
  setLanguage,
  currentRole = ROLES.FARMER,
  setCurrentRole,
  setActivePage,
}) {
  const [form, setForm] = useState(
    userProfile || {
      fullName: 'Ramesh Patil',
      phone: '+91 98765 43210',
      role: currentRole,
      state: 'Maharashtra',
      district: 'Pune',
      village: 'Khed',
      farmSizeAcres: '4.5',
      primaryCrop: 'Tomato',
      soilType: 'Black Soil',
    }
  );

  const [savedSuccess, setSavedSuccess] = useState(false);
  const roleInfo = ROLE_CONFIG[form.role || currentRole] || ROLE_CONFIG[ROLES.FARMER];

  const handleRoleChange = (newRole) => {
    const updated = switchActiveRole(newRole);
    setForm(updated);
    if (setUserProfile) setUserProfile(updated);
    if (setCurrentRole) setCurrentRole(newRole);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile(form);
    saveStoredUserProfile(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="profile-page-container">
      <PageHeader
        title="User & Farm Profile"
        description="Configure your role settings, farm details, and localized agronomic preferences."
        onBack={onBack}
      />

      {savedSuccess && (
        <div className="alert-box alert-success" style={{ marginBottom: '1rem' }}>
          <Check size={18} />
          <span>Profile & Role preferences updated successfully!</span>
        </div>
      )}

      {/* Role Switcher Box */}
      <div className="agri-card" style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-primary-dark)' }}>
          Active Workspace Role
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Switch between Farmer, Expert, and Admin views to explore role-specific workflows.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => handleRoleChange(ROLES.FARMER)}
            className={form.role === ROLES.FARMER ? 'btn-primary' : 'btn-secondary'}
            style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
          >
            <Sprout size={18} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Farmer Role</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Farm Hub & Diagnostics</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange(ROLES.EXPERT)}
            className={form.role === ROLES.EXPERT ? 'btn-primary' : 'btn-secondary'}
            style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
          >
            <Stethoscope size={18} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Expert Role</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Agronomist Desk</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange(ROLES.ADMIN)}
            className={form.role === ROLES.ADMIN ? 'btn-primary' : 'btn-secondary'}
            style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
          >
            <Shield size={18} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Admin Role</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Platform Console</div>
            </div>
          </button>
        </div>
      </div>

      {/* Profile Form */}
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
              <label className="form-label">Contact / Mobile</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            {form.role === ROLES.FARMER && (
              <>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    value={form.state || ''}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">District / Taluka</label>
                  <input
                    type="text"
                    value={form.district || ''}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Village Name</label>
                  <input
                    type="text"
                    value={form.village || ''}
                    onChange={(e) => setForm({ ...form, village: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Land Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.farmSizeAcres || ''}
                    onChange={(e) => setForm({ ...form, farmSizeAcres: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Crop</label>
                  <select
                    value={form.primaryCrop || 'Tomato'}
                    onChange={(e) => setForm({ ...form, primaryCrop: e.target.value })}
                  >
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
                  <select
                    value={form.soilType || 'Black Soil'}
                    onChange={(e) => setForm({ ...form, soilType: e.target.value })}
                  >
                    <option value="Black Soil">Black Soil (Regur)</option>
                    <option value="Alluvial Soil">Alluvial Soil</option>
                    <option value="Red Soil">Red / Laterite Soil</option>
                    <option value="Clayey Loam">Clayey Loam</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                  </select>
                </div>
              </>
            )}

            {form.role === ROLES.EXPERT && (
              <>
                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <input
                    type="text"
                    value={form.specialization || 'Horticulture & Plant Pathology'}
                    onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Institution / Organization</label>
                  <input
                    type="text"
                    value={form.institution || 'State Agro Research Center'}
                    onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  />
                </div>
              </>
            )}

            {form.role === ROLES.ADMIN && (
              <div className="form-group">
                <label className="form-label">Admin Email</label>
                <input
                  type="email"
                  value={form.email || 'admin@agrismart.ai'}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
              <Check size={18} />
              <span>Save Profile Settings</span>
            </button>

            {setActivePage && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setActivePage(ROLE_CONFIG[form.role || currentRole].dashboardPage)}
              >
                <span>Go to {roleInfo.label} Dashboard</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
