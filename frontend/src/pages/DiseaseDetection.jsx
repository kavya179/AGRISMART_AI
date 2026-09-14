import React, { useState } from 'react';
import { UploadCloud, X, AlertCircle, Camera, Check, Info } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { predictCropDisease } from '../services/api';
import { saveScanRecord } from '../services/historyStorage';
import { translations } from '../translations';

export default function DiseaseDetection({ setActivePage, setSelectedResult, onBack, language = 'en' }) {
  const t = translations[language] || translations.en;

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (.jpg, .jpeg, .png, .webp).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('The image size is larger than 10MB. Please upload a smaller photo.');
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setErrorMessage(null);

    const result = await predictCropDisease(selectedFile);
    setIsLoading(false);

    if (result.success) {
      const record = {
        class: result.prediction.class,
        confidence: result.prediction.confidence,
        status: result.prediction.status,
        guidance: result.guidance,
        previewUrl: previewUrl,
        fileName: selectedFile.name,
      };

      saveScanRecord(record);
      setSelectedResult(record);
      setActivePage('disease-result');
    } else {
      setErrorMessage(result.error || 'Failed to analyze the leaf. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title={t.checkCropTitle} onBack={onBack} />
        <LoadingSpinner message={t.analyzingLeaf} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t.checkCropTitle}
        description={t.checkCropDesc}
        onBack={onBack}
      />

      {errorMessage && (
        <div className="alert-box alert-danger">
          <AlertCircle size={20} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Error:</strong>
            <p style={{ marginTop: '0.2rem', margin: 0 }}>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Upload Box / Image Preview Box */}
      <div className="agri-card">
        {!previewUrl ? (
          <div>
            <label
              className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{ display: 'block' }}
            >
              <input
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', boxShadow: 'var(--shadow-subtle)' }}>
                  <Camera size={36} color="var(--color-primary)" />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', marginBottom: '0.35rem' }}>
                  {t.uploadHeading}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {t.uploadSub}
                </p>
                <span className="btn-primary" style={{ pointerEvents: 'none' }}>
                  <span>{t.btnChoosePhoto}</span>
                </span>
              </div>
            </label>
          </div>
        ) : (
          <div>
            <div className="preview-box">
              <img src={previewUrl} alt="Crop Leaf Preview" className="preview-img" />
              <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {selectedFile?.name} ({Math.round(selectedFile?.size / 1024)} KB)
                </span>
                <button onClick={handleRemove} className="btn-danger" style={{ padding: '0.3rem 0.65rem', minHeight: '32px', fontSize: '0.82rem' }}>
                  <X size={14} />
                  <span>{t.btnRemove}</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              className="btn-primary btn-block"
              style={{ padding: '0.9rem', fontSize: '1.05rem', justifyContent: 'center' }}
            >
              <Check size={20} />
              <span>{t.btnDiagnose}</span>
            </button>
          </div>
        )}
      </div>

      {/* Farmer Photo Tips */}
      <div className="agri-card" style={{ background: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Info size={16} />
          <span>{t.photoTipsTitle}</span>
        </h3>
        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <li>{t.tip1}</li>
          <li>{t.tip2}</li>
          <li>{t.tip3}</li>
        </ul>
      </div>
    </div>
  );
}
