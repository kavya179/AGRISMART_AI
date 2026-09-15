import React, { useState } from 'react';
import {
  Sprout,
  Stethoscope,
  Shield,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader,
  Lock,
  Mail,
  Key,
  ChevronLeft,
  Home,
} from 'lucide-react';
import { ROLES, ROLE_CONFIG, switchActiveRole } from '../services/authService';
import { loginUser } from '../services/authApi';
import { getRoleDashboard } from '../services/authService';

export default function Login({ setActivePage, setUserProfile, setCurrentRole }) {
  const [selectedRole, setSelectedRole] = useState(ROLES.FARMER);
  const [emailOrPhone, setEmailOrPhone] = useState('farmer@agrismart.ai');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setErrorMsg(null);
    if (role === ROLES.FARMER) {
      setEmailOrPhone('farmer@agrismart.ai');
      setPassword('password123');
    } else if (role === ROLES.EXPERT) {
      setEmailOrPhone('expert@agrismart.ai');
      setPassword('password123');
    } else if (role === ROLES.ADMIN) {
      setEmailOrPhone('admin@agrismart.ai');
      setPassword('password123');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!emailOrPhone.trim()) {
      setErrorMsg('Please enter your email or registered phone number.');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      setIsLoading(false);
      return;
    }

    try {
      const isEmail = emailOrPhone.includes('@');
      const credentials = {
        email: isEmail ? emailOrPhone.trim().toLowerCase() : undefined,
        phone: !isEmail ? emailOrPhone.trim() : undefined,
        phoneNumber: !isEmail ? emailOrPhone.trim() : undefined,
        password,
        role: selectedRole,
      };

      const res = await loginUser(credentials);

      if (res && res.success) {
        const user = res.user;
        const resolvedRole = user.role || selectedRole;

        setSuccessMsg(`Welcome back, ${user.fullName || 'User'}! Opening ${ROLE_CONFIG[resolvedRole].label} Workspace...`);

        if (setUserProfile) setUserProfile(user);
        if (setCurrentRole) setCurrentRole(resolvedRole);

        setTimeout(() => {
          const targetDashboard = getRoleDashboard(resolvedRole);
          setActivePage(targetDashboard);
        }, 900);
      } else {
        setErrorMsg(res?.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred during login. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '1.5rem auto 3rem', padding: '0 1rem' }}>
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
          onClick={() => setActivePage('register')}
          style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Create New Account →
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
            <Sprout size={36} />
          </div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)', fontWeight: 800 }}>
            AgriSmart AI Portal
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Sign in to your role-specific agricultural dashboard
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
              onClick={() => handleRoleSelect(ROLES.FARMER)}
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
              onClick={() => handleRoleSelect(ROLES.EXPERT)}
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
              onClick={() => handleRoleSelect(ROLES.ADMIN)}
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
              marginBottom: '1rem',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
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
              marginBottom: '1rem',
            }}
          >
            <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label">
              {selectedRole === ROLES.ADMIN ? 'Admin Email / Username' : 'Registered Email or Phone'}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="e.g. farmer@agrismart.ai or 9876543210"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
                style={{ width: '100%', paddingLeft: '2.4rem' }}
              />
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Enter account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', paddingLeft: '2.4rem' }}
              />
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
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
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In as {ROLE_CONFIG[selectedRole].label}</span>
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
