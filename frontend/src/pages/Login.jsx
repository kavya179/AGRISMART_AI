import React, { useState } from 'react';
import { Phone, ArrowRight, ShieldCheck, Sprout } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function Login({ setActivePage, setUserProfile }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Log in user
    setActivePage('dashboard');
  };

  return (
    <div style={{ maxWidth: '460px', margin: '2rem auto' }}>
      <div className="agri-card" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', background: 'var(--color-primary-tint)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
            <Sprout size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>Farmer Sign In</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Enter your mobile number to access your farm's records.
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ padding: '0.7rem 0.8rem', background: 'var(--bg-muted)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
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
              <span>Sign In to Your Farm</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', width: '100%', marginTop: '0.75rem', cursor: 'pointer' }}
            >
              Change phone number
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
          <span>New to AgriSmart? </span>
          <button
            onClick={() => setActivePage('register')}
            style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            Register Farm Profile
          </button>
        </div>
      </div>
    </div>
  );
}
