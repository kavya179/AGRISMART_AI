import React, { useState } from 'react';
import {
  Sprout,
  Check,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader,
  Stethoscope,
  Shield,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  ChevronLeft,
} from 'lucide-react';
import { registerUser, ROLES, ROLE_CONFIG } from '../services/authApi';
import { getRoleDashboard } from '../services/authService';

export default function Register({ setActivePage, setUserProfile, setCurrentRole }) {
  const [selectedRole, setSelectedRole] = useState(ROLES.FARMER);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    state: 'Maharashtra',
    district: '',
    village: '',
    farmSizeAcres: '3.0',
    primaryCrop: 'Tomato',
    soilType: 'Black Soil',
    specialization: 'Plant Pathology & IPM',
    institution: 'State Agricultural Extension',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMsg(null);
  };

  const validateForm = () => {
    // 1. Full Name
    if (!form.fullName.trim()) {
      return 'Please enter your full name.';
    }

    // 2. Email Validation
    if (!form.email.trim()) {
      return 'Please enter your email address.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      return 'Please enter a valid email address (e.g. name@example.com).';
    }

    // 3. Mobile Number Validation
    if (!form.phone.trim()) {
      return 'Please enter your mobile number.';
    }
    if (form.phone.trim().length < 10) {
      return 'Please enter a valid 10-digit mobile number.';
    }

    // 4. Password Validation
    if (!form.password) {
      return 'Please create a secure password.';
    }
    if (form.password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (form.password !== form.confirmPassword) {
      return 'Password and Confirm Password do not match.';
    }

    // 5. Role-specific validation
    if (selectedRole === ROLES.FARMER) {
      if (!form.district.trim()) {
        return 'Please enter your district or taluka.';
      }
      if (!form.farmSizeAcres || Number(form.farmSizeAcres) <= 0) {
        return 'Please enter a valid farm size in acres.';
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Client Validation
    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...form,
        role: selectedRole,
      };

      const res = await registerUser(payload);

      if (res && res.success) {
        setSuccessMsg('Account registered successfully! Redirecting to your workspace...');
        if (setUserProfile) setUserProfile(res.user);
        if (setCurrentRole) setCurrentRole(selectedRole);

        // Redirect after brief success feedback
        setTimeout(() => {
          const targetDashboard = getRoleDashboard(selectedRole);
          setActivePage(targetDashboard);
        }, 1200);
      } else {
        setErrorMsg(res?.error || 'Registration failed. Please verify your details.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '580px', margin: '1.5rem auto 3rem', padding: '0 1rem' }}>
      {/* Top Back Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => setActivePage('landing')}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <ChevronLeft size={16} />
          <span>Back to Home Overview</span>
        </button>

        <button
          onClick={() => setActivePage('login')}
          style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Sign In Instead →
        </button>
      </div>

      <div className="agri-card" style={{ padding: '2rem 1.75rem', boxShadow: 'var(--shadow-elevated)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              background: 'var(--color-primary-tint)',
              padding: '0.85rem',
              borderRadius: '50%',
              color: 'var(--color-primary)',
              marginBottom: '0.75rem',
              cursor: 'pointer',
            }}
            onClick={() => setActivePage('landing')}
            title="Click to visit Home Overview"
          >
            <Sprout size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)', fontWeight: 800 }}>
            Create AgriSmart AI Account
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Register to access personalized crop health checks, smart irrigation, and expert advisory.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ textAlign: 'center', display: 'block', marginBottom: '0.5rem' }}>
            Select Your Account Role
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleRoleChange(ROLES.FARMER)}
              className={selectedRole === ROLES.FARMER ? 'btn-primary' : 'btn-secondary'}
              style={{
                flexDirection: 'column',
                gap: '0.25rem',
                padding: '0.6rem 0.3rem',
                minHeight: '62px',
                fontSize: '0.82rem',
              }}
            >
              <Sprout size={18} />
              <span>Farmer</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange(ROLES.EXPERT)}
              className={selectedRole === ROLES.EXPERT ? 'btn-primary' : 'btn-secondary'}
              style={{
                flexDirection: 'column',
                gap: '0.25rem',
                padding: '0.6rem 0.3rem',
                minHeight: '62px',
                fontSize: '0.82rem',
              }}
            >
              <Stethoscope size={18} />
              <span>Expert</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange(ROLES.ADMIN)}
              className={selectedRole === ROLES.ADMIN ? 'btn-primary' : 'btn-secondary'}
              style={{
                flexDirection: 'column',
                gap: '0.25rem',
                padding: '0.6rem 0.3rem',
                minHeight: '62px',
                fontSize: '0.82rem',
              }}
            >
              <Shield size={18} />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#dc2626',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <AlertCircle size={17} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert Box */}
        {successMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '8px',
              color: '#15803d',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* User Core Identity Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '0.85rem' }}>
            <div className="form-group">
              <label className="form-label">
                {selectedRole === ROLES.EXPERT ? 'Agronomist Full Name *' : selectedRole === ROLES.ADMIN ? 'Administrator Name *' : 'Farmer Full Name *'}
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Patil"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                placeholder="e.g. ramesh@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '0.85rem' }}>
            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input
                type="tel"
                placeholder="10-digit number (e.g. 9876543210)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength="10"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Punjab">Punjab</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
          </div>

          {/* Role-Specific Fields: Farmer Details */}
          {selectedRole === ROLES.FARMER && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">District / Taluka *</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune / Khed"
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Farm Size (Acres) *</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 4.5"
                    value={form.farmSizeAcres}
                    onChange={(e) => setForm({ ...form, farmSizeAcres: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Primary Crop</label>
                  <select value={form.primaryCrop} onChange={(e) => setForm({ ...form, primaryCrop: e.target.value })}>
                    <option value="Tomato">Tomato (टमाटर)</option>
                    <option value="Wheat">Wheat (गेहूं)</option>
                    <option value="Cotton">Cotton (कपास)</option>
                    <option value="Soybean">Soybean (सोयाबीन)</option>
                    <option value="Potato">Potato (आलू)</option>
                    <option value="Rice">Rice / Paddy (धान)</option>
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
            </>
          )}

          {/* Role-Specific Fields: Expert Details */}
          {selectedRole === ROLES.EXPERT && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Specialization Area</label>
                <input
                  type="text"
                  placeholder="e.g. Plant Pathology & IPM"
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Affiliated Research Institution</label>
                <input
                  type="text"
                  placeholder="e.g. State Agricultural Extension"
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Password Security Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Create Password *</label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary btn-block"
            style={{ padding: '0.85rem', minHeight: '44px' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={16} className="spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Register as {ROLE_CONFIG[selectedRole].label}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.88rem',
          }}
        >
          <span>Already have an account? </span>
          <button
            onClick={() => setActivePage('login')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--color-primary)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
}
