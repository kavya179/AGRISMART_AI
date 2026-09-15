import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  Image as ImageIcon,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info,
  HelpCircle,
  Layers,
  ArrowRight,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DashboardCard from '../components/ui/DashboardCard';
import StatusBadge from '../components/ui/StatusBadge';
import { predictCropDisease, getSampleLeafPresets } from '../services/diseaseApi';
import { saveScanRecord } from '../services/historyStorage';
import { translations } from '../translations';

export default function DiseaseDetection({
  setActivePage,
  setSelectedResult,
  onBack,
  language = 'en',
}) {
  const t = translations[language] || translations.en;
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sampleType, setSampleType] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('Extracting leaf features...');
  const [errorMessage, setErrorMessage] = useState(null);

  const samplePresets = getSampleLeafPresets();

  const handleValidateAndSetFile = (file, explicitType = null) => {
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type) && !file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid leaf image file (.jpg, .jpeg, .png, or .webp).');
      return;
    }

    // Validate size (max 12MB)
    if (file.size > 12 * 1024 * 1024) {
      setErrorMessage('Image size is too large (over 12MB). Please upload a smaller photo.');
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    setSampleType(explicitType);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleValidateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSampleType(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSelectSample = (sample) => {
    // Generate a clean mock file object for the sample
    const sampleFileName = `${sample.id}.jpg`;
    const mockFile = new File(['mock leaf bytes'], sampleFileName, { type: 'image/jpeg' });
    
    // Create an inline SVG data URL for the sample preview
    const isHealthy = sample.type === 'healthy';
    const isLate = sample.type === 'late-blight';
    const isUncertain = sample.type === 'uncertain';
    
    const svgBg = isHealthy ? '#2d6a4f' : isLate ? '#991b1b' : isUncertain ? '#64748b' : '#b45309';
    const svgText = isHealthy ? '🌿 Healthy Soybean Leaf' : isLate ? '🍂 Potato Late Blight' : isUncertain ? '🔍 Blurry Sample' : '🍅 Tomato Early Blight';
    
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="${svgBg}" rx="12"/>
      <circle cx="200" cy="130" r="70" fill="rgba(255,255,255,0.15)"/>
      <path d="M200,70 C150,110 150,170 200,210 C250,170 250,110 200,70 Z" fill="rgba(255,255,255,0.3)"/>
      <text x="200" y="260" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">${svgText}</text>
    </svg>`;
    
    const samplePreviewUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

    setErrorMessage(null);
    setSelectedFile(mockFile);
    setSampleType(sample.type);
    setPreviewUrl(samplePreviewUrl);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);
    setLoadingStep('Uploading & scanning leaf image...');

    const timer1 = setTimeout(() => setLoadingStep('Analyzing cell structure and lesions...'), 400);
    const timer2 = setTimeout(() => setLoadingStep('Matching against 38 plant pathogen profiles...'), 800);

    try {
      const response = await predictCropDisease(selectedFile, sampleType);
      clearTimeout(timer1);
      clearTimeout(timer2);

      if (response && response.success) {
        const record = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          crop: response.crop,
          disease: response.disease,
          confidence: response.confidence,
          status: response.status,
          severity: response.severity,
          explanation: response.explanation,
          recommendation: response.recommendation,
          preventionTips: response.preventionTips,
          expertConsultationRequired: response.expertConsultationRequired,
          previewUrl: previewUrl,
          fileName: selectedFile.name,
          isMock: response.isMock,
        };

        saveScanRecord(record);
        setSelectedResult(record);
        setIsLoading(false);
        setActivePage('disease-result');
      } else {
        setIsLoading(false);
        setErrorMessage(response?.error || 'Unable to complete leaf diagnosis. Please try again.');
      }
    } catch (err) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsLoading(false);
      setErrorMessage('Network or processing error during diagnosis. Please check your connection.');
    }
  };

  return (
    <div className="disease-detection-page">
      <SectionHeader
        title={t.checkCropTitle || 'Plant Disease AI Diagnosis'}
        subtitle="Upload a clear photo of the affected leaf to receive instant pathology analysis and treatment guidance."
        badge={{ text: 'Vision AI v2.4', bg: 'var(--color-primary-tint)', color: 'var(--color-primary)', border: 'var(--color-primary-border)' }}
      />

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="alert-box alert-danger">
          <AlertCircle size={20} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Image Upload Notice:</strong>
            <p style={{ marginTop: '0.2rem', margin: 0 }}>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Loading Overlay / State */}
      {isLoading ? (
        <div
          className="agri-card"
          style={{
            padding: '3.5rem 1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-surface)',
          }}
        >
          <div className="spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginTop: '1rem', fontWeight: 800 }}>
            {t.analyzingLeaf || 'Diagnosing Plant Leaf...'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.4rem', maxWidth: '420px' }}>
            {loadingStep}
          </p>
          <div style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', background: 'var(--color-primary-tint)', borderRadius: 'var(--radius-full)', color: 'var(--color-primary-dark)', fontSize: '0.82rem', fontWeight: 700 }}>
            <Sparkles size={14} />
            <span>AI Neural Inference Engine Active</span>
          </div>
        </div>
      ) : (
        <>
          {/* Main Upload Card */}
          <div className="agri-card" style={{ padding: '1.75rem' }}>
            {!previewUrl ? (
              <div>
                <div
                  className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ cursor: 'pointer', textAlign: 'center', padding: '2.5rem 1.5rem' }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    style={{ display: 'none' }}
                    onChange={(e) => handleValidateAndSetFile(e.target.files[0])}
                  />

                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    onChange={(e) => handleValidateAndSetFile(e.target.files[0])}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        background: '#ffffff',
                        padding: '1.25rem',
                        borderRadius: '50%',
                        marginBottom: '1rem',
                        boxShadow: 'var(--shadow-card)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      <UploadCloud size={40} />
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '0.35rem' }}>
                      Upload a clear photo of the affected leaf
                    </h3>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '440px', marginBottom: '1.25rem' }}>
                      Drag and drop your leaf photo here, or click to browse from your device. Supports JPG, PNG, and WEBP.
                    </p>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        <ImageIcon size={18} />
                        <span>Browse Files</span>
                      </button>

                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          cameraInputRef.current?.click();
                        }}
                      >
                        <Camera size={18} color="var(--color-primary)" />
                        <span>Take Camera Photo</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Test Sample Presets */}
                <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Or Try with a Sample Leaf Image:
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1-Click Demo Testing</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                    {samplePresets.map((sample) => (
                      <button
                        key={sample.id}
                        type="button"
                        className="btn-secondary"
                        onClick={() => handleSelectSample(sample)}
                        style={{
                          justifyContent: 'space-between',
                          padding: '0.7rem 0.85rem',
                          textAlign: 'left',
                          minHeight: 'auto',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{sample.label}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sample.desc}</div>
                        </div>
                        <StatusBadge
                          status={sample.badge === 'Healthy' ? 'healthy' : sample.badge === 'Critical' ? 'critical' : sample.badge === 'Uncertain' ? 'warning' : 'warning'}
                          label={sample.badge}
                          size="sm"
                          showIcon={false}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Image Preview & Submit View */
              <div>
                <div className="preview-box" style={{ background: 'var(--bg-muted)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                  <img
                    src={previewUrl}
                    alt="Uploaded Crop Leaf Preview"
                    className="preview-img"
                    style={{ maxHeight: '320px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)' }}
                  />

                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)', display: 'block' }}>
                        {selectedFile?.name || 'Selected Leaf Image'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Ready for AI vision pathology scanner • {Math.round((selectedFile?.size || 2048) / 1024)} KB
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-secondary"
                        style={{ padding: '0.4rem 0.85rem', minHeight: '36px', fontSize: '0.85rem' }}
                      >
                        <ImageIcon size={15} />
                        <span>Change Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="btn-danger"
                        style={{ padding: '0.4rem 0.85rem', minHeight: '36px', fontSize: '0.85rem' }}
                      >
                        <X size={15} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div style={{ marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    className="btn-primary btn-block"
                    disabled={isLoading}
                    style={{
                      padding: '1rem',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      justifyContent: 'center',
                      gap: '0.6rem',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    <Sparkles size={20} />
                    <span>Run AI Disease Diagnosis Now</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Farmer Photo Guidelines */}
          <div className="agri-card" style={{ background: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={18} color="var(--color-primary)" />
              <span>How to Take the Best Photo for Maximum AI Accuracy</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <strong>1. Center the Leaf:</strong> Keep the affected leaf in the center of the frame against a clean background.
              </div>
              <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <strong>2. Natural Daylight:</strong> Photograph in good daylight without harsh flash glare or deep shadows.
              </div>
              <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <strong>3. Focus on Spots:</strong> Ensure leaf lesions, rings, or discolorations are crisp and clear.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
