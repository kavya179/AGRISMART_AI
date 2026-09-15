import React, { useState } from 'react';
import { Phone, ArrowRight, ShieldCheck, Sprout, Stethoscope, Shield, AlertCircle, Loader } from 'lucide-react';
import { ROLES, ROLE_CONFIG, switchActiveRole } from '../services/authService';
import { loginUser } from '../services/authApi';

export default function Login({ setActivePage, setUserProfile, setCurrentRole }) {
  const [selectedRole, setSelectedRole] = useState(ROLES.FARMER);
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('1234');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setErrorMsg(null);
      setStep('otp');
    } else {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await loginUser({ phone, role: selectedRole, otp });
      if (res && res.success) {
        const updatedProfile = res.user;
        if (setUserProfile) setUserProfile(updatedProfile);
        if (setCurrentRole) setCurrentRole(selectedRole);
        const targetDashboard = ROLE_CONFIG[selectedRole].dashboardPage;
        setActivePage(targetDashboard);
      } else {
        setErrorMsg(res?.error || 'Login failed. Please verify credentials.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred during login. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '2.5rem auto', padding: '0 1rem' }}>
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
            }}
          >
            <Sprout size={36} />
          </div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)', fontWeight: 800 }}>
            AgriSmart AI Portal
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Select your workspace role to access your records
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ textAlign: 'center', display: 'block', marginBottom: '0.5rem' }}>
            Select Workspace Role
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setSelectedRole(ROLES.FARMER)}
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
              onClick={() => setSelectedRole(ROLES.EXPERT)}
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
              onClick={() => setSelectedRole(ROLES.ADMIN)}
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
              marginBottom: '1rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label className="form-label">
                {selectedRole === ROLES.ADMIN ? 'Admin Email / Phone' : 'Registered Mobile Number'}
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span
                  style={{
                    padding: '0.7rem 0.8rem',
                    background: 'var(--bg-muted)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                  }}
                >
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength="10"
                  required
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary btn-block" style={{ marginTop: '1rem', padding: '0.85rem' }}>
              <span>Send OTP Verification Code</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Enter 4-Digit OTP</label>
              <input
                type="text"
                placeholder="• • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="4"
                style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '0.5rem', fontWeight: 700 }}
                required
              />
              <span className="form-help" style={{ textAlign: 'center', display: 'block', marginTop: '0.4rem' }}>
                Sent to +91 {phone} • (Use any 4 digits in demo mode)
              </span>
            </div>

            <button type="submit" className="btn-primary btn-block" style={{ marginTop: '1rem', padding: '0.85rem' }}>
              <span>Sign In as {ROLE_CONFIG[selectedRole].label}</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                width: '100%',
                marginTop: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Change phone number
            </button>
          </form>
        )}

        <div
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.88rem',
          }}
        >
          <span>New to AgriSmart? </span>
          <button
            onClick={() => setActivePage('register')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--color-primary)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Register Profile
          </button>
        </div>
      </div>
    </div>
  );
}
