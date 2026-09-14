import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Phone, Camera, ShieldAlert } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function HelpFAQ({ onBack }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How do I take a clear photo for accurate disease detection?',
      a: 'Hold your camera 15–20 cm away from the affected leaf. Ensure natural daytime lighting and make sure the brown/yellow spots are in sharp focus. Avoid blurry photos or photos taken against strong backlights.',
    },
    {
      q: 'What should I do immediately after Early Blight is detected?',
      a: '1) Prune off the lowest infected leaves using sanitized shears and dispose of them away from the field. 2) Stop overhead watering immediately to keep foliage dry. 3) Apply preventative copper fungicide early in the morning.',
    },
    {
      q: 'Does the app work without internet connection?',
      a: 'You can review saved diagnoses and watering tips in your history offline. Uploading and analyzing new leaf photos requires internet connectivity to connect to the Django diagnosis engine.',
    },
    {
      q: 'How is the watering schedule calculated?',
      a: 'AgriSmart analyzes soil moisture levels, your crop growth stage, and upcoming 48-hour rainfall forecasts to calculate whether irrigation is needed today.',
    },
    {
      q: 'Who can I contact for emergency pest swarms or severe crop blight?',
      a: 'Contact your nearest Krishi Vigyan Kendra (KVK) or the National Kisan Call Centre toll-free at 1800-180-1551 (6:00 AM to 10:00 PM all 7 days).',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Help & Agricultural FAQ"
        description="Practical guidelines on taking diagnostic photos, managing field pests, and reaching local Kisan helplines."
        onBack={onBack}
      />

      {/* Emergency Helpline Box */}
      <div className="agri-card" style={{ background: 'var(--color-primary-tint)', border: '1px solid var(--color-primary-border)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Phone size={22} color="var(--color-primary-dark)" />
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)' }}>Kisan Call Centre (Toll-Free)</h4>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Direct agricultural expert assistance in 22 languages</span>
            </div>
          </div>
          <a
            href="tel:18001801551"
            className="btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.9rem', minHeight: '36px' }}
          >
            Call 1800-180-1551
          </a>
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="agri-card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
          Frequently Asked Questions
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: isOpen ? '#ffffff' : 'var(--bg-muted)',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  <span>{f.q}</span>
                  {isOpen ? <ChevronUp size={18} color="var(--color-primary)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </button>

                {isOpen && (
                  <div style={{ padding: '0.5rem 1rem 1rem 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, borderTop: '1px solid var(--border-subtle)' }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
