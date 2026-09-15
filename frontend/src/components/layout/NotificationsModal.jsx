import React from 'react';
import { Bell, CheckCheck, Trash2, X, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import Modal from '../ui/Modal';
import { ROLES } from '../../services/authService';
import { mockFarmerData, mockExpertData, mockAdminData } from '../../data/mockData';

export default function NotificationsModal({
  isOpen,
  onClose,
  currentRole = ROLES.FARMER,
  setActivePage,
}) {
  const getRoleNotifications = () => {
    switch (currentRole) {
      case ROLES.EXPERT:
        return [
          {
            id: 'ntf-e1',
            title: 'New Emergency Triage Request',
            message: 'Farmer Suresh Gaikwad submitted Sugarcane sample with suspected Red Rot.',
            time: '15 mins ago',
            severity: 'danger',
            page: 'expert-requests',
          },
          {
            id: 'ntf-e2',
            title: 'Diagnostic Confirmation Verified',
            message: 'Farmer Ramesh Patil acknowledged your Mancozeb spray prescription for Early Blight.',
            time: '2 hours ago',
            severity: 'success',
            page: 'expert-requests',
          },
          {
            id: 'ntf-e3',
            title: 'Regional Outbreak Warning',
            message: 'Western Maharashtra reporting a 14% uptick in Tomato Early Blight cases.',
            time: '5 hours ago',
            severity: 'warning',
            page: 'expert-reports',
          },
        ];
      case ROLES.ADMIN:
        return [
          {
            id: 'ntf-a1',
            title: 'PyTorch Inference Model Loaded',
            message: 'ResNet hybrid v2.4 weights loaded into Django backend on port 8000.',
            time: '10 mins ago',
            severity: 'success',
            page: 'admin-model-status',
          },
          {
            id: 'ntf-a2',
            title: 'High Scan Volume Detected',
            message: 'Over 412 leaf scans processed today with average latency of 142ms.',
            time: '1 hour ago',
            severity: 'info',
            page: 'admin-analytics',
          },
          {
            id: 'ntf-a3',
            title: 'New Expert Registered',
            message: 'Dr. Rajesh Solanki registered as an agronomist for Gujarat Zone.',
            time: '3 hours ago',
            severity: 'info',
            page: 'admin-experts',
          },
        ];
      case ROLES.FARMER:
      default:
        return mockFarmerData.agroAlerts.map((a) => ({
          id: a.id,
          title: a.title,
          message: a.message,
          time: a.timestamp,
          severity: a.severity,
          page: a.actionPage,
        }));
    }
  };

  const notifications = getRoleNotifications();

  const handleAction = (page) => {
    if (page && setActivePage) {
      setActivePage(page);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Notifications & Alerts"
      subtitle={`Live updates for your ${currentRole} workspace`}
      maxWidth="520px"
      footer={
        <button className="btn-secondary" onClick={onClose} style={{ fontSize: '0.85rem' }}>
          Close Panel
        </button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifications.map((item) => {
          const isDanger = item.severity === 'danger';
          const isWarning = item.severity === 'warning';
          const isSuccess = item.severity === 'success';

          return (
            <div
              key={item.id}
              onClick={() => handleAction(item.page)}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: isDanger
                  ? 'var(--color-danger-bg)'
                  : isWarning
                  ? 'var(--color-warning-bg)'
                  : isSuccess
                  ? 'var(--color-success-bg)'
                  : 'var(--color-sky-tint)',
                border: `1px solid ${
                  isDanger
                    ? 'var(--color-danger-border)'
                    : isWarning
                    ? 'var(--color-warning-border)'
                    : isSuccess
                    ? 'var(--color-success-border)'
                    : 'var(--color-sky-border)'
                }`,
                cursor: item.page ? 'pointer' : 'default',
                transition: 'transform 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <h4
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: isDanger
                      ? 'var(--color-danger)'
                      : isWarning
                      ? 'var(--color-warning)'
                      : isSuccess
                      ? 'var(--color-success)'
                      : 'var(--color-sky)',
                    margin: 0,
                  }}
                >
                  {item.title}
                </h4>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {item.time}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0', lineHeight: 1.4 }}>
                {item.message}
              </p>
              {item.page && (
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '0.4rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--color-primary-dark)',
                    textDecoration: 'underline',
                  }}
                >
                  View Details →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
