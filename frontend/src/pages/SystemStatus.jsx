import React from 'react';
import { Server, Database, Cpu, ArrowRightLeft, FolderTree, CheckCircle2 } from 'lucide-react';

export default function SystemStatus({ nodeStatus, djangoStatus }) {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: '#064e3b' }}>
          🏗️ AgriSmart AI Architecture & Communication Flow
        </h1>
        <p style={{ color: '#475569', marginTop: '0.25rem' }}>
          Real-time service distribution, port mappings, and API communication boundaries.
        </p>
      </div>

      {/* Services Architecture Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* React Frontend */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#e0f2fe', color: '#0284c7', padding: '0.6rem', borderRadius: '10px' }}>
              <Cpu size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Frontend Client</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>React 18 + Vite • Port 5173</span>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
            High-contrast, farmer-friendly dashboard providing intuitive image diagnostics, real-time agro alerts, and farm log management.
          </p>
          <div className="card-metrics">
            <div className="metric-row">
              <span className="metric-label">Status</span>
              <span className="metric-value" style={{ color: '#166534' }}>Active (Client)</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Target Backends</span>
              <span className="metric-value">Django (:8000), Node (:5000)</span>
            </div>
          </div>
        </div>

        {/* Django AI Engine */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#ecfdf5', color: '#059669', padding: '0.6rem', borderRadius: '10px' }}>
              <Server size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Django REST (AI/ML)</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Python 3 + DRF • Port 8000</span>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
            Dedicated AI & Machine Learning backend. Serves PyTorch vision models, crop suitability algorithms, and irrigation equations.
          </p>
          <div className="card-metrics">
            <div className="metric-row">
              <span className="metric-label">Live Status</span>
              <span className="metric-value" style={{ color: djangoStatus?.online ? '#166534' : '#dc2626' }}>
                {djangoStatus?.online ? 'Connected' : 'Offline / Checking'}
              </span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Core Endpoint</span>
              <span className="metric-value">/api/disease/</span>
            </div>
          </div>
        </div>

        {/* Node.js MongoDB Gateway */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#fef3c7', color: '#d97706', padding: '0.6rem', borderRadius: '10px' }}>
              <Database size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Node.js / Express</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Node + Mongoose • Port 5000</span>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
            Application business logic, user auth, farmer profiles, and MongoDB document persistence.
          </p>
          <div className="card-metrics">
            <div className="metric-row">
              <span className="metric-label">Live Status</span>
              <span className="metric-value" style={{ color: nodeStatus?.online ? '#166534' : '#dc2626' }}>
                {nodeStatus?.online ? 'Connected' : 'Offline / Checking'}
              </span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Database Target</span>
              <span className="metric-value">MongoDB (:27017)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Flow Breakdown */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <ArrowRightLeft size={22} color="#059669" />
          <h2 style={{ fontSize: '1.3rem' }}>API Communication Architecture</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #059669' }}>
            <h4 style={{ color: '#065f46', marginBottom: '0.35rem' }}>1. AI / ML Inference Flow</h4>
            <p style={{ fontSize: '0.85rem', color: '#475569' }}>
              React UI ➔ <code>POST http://localhost:8000/api/disease/predict/</code> ➔ Django DRF parses multipart image ➔ ML inference loader ➔ Returns diagnostic result.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #d97706' }}>
            <h4 style={{ color: '#92400e', marginBottom: '0.35rem' }}>2. Farmer Records & Auth Flow</h4>
            <p style={{ fontSize: '0.85rem', color: '#475569' }}>
              React UI ➔ <code>http://localhost:5000/api/farmers/</code> ➔ Node/Express Controller ➔ Mongoose ➔ Stores farmer logs & scan history in MongoDB.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #0284c7' }}>
            <h4 style={{ color: '#075985', marginBottom: '0.35rem' }}>3. Health Monitoring Flow</h4>
            <p style={{ fontSize: '0.85rem', color: '#475569' }}>
              React client periodically pings <code>/api/health</code> on both Node (:5000) and Django (:8000) to ensure microservice uptime and report latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
