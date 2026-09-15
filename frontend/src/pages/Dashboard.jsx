import React from 'react';
import FarmerDashboard from './farmer/FarmerDashboard';
import ExpertDashboard from './expert/ExpertDashboard';
import AdminDashboard from './admin/AdminDashboard';
import { ROLES, getCurrentRole } from '../services/authService';

export default function Dashboard({
  setActivePage,
  lastScan,
  userProfile,
  language = 'en',
  currentRole,
}) {
  const effectiveRole = currentRole || userProfile?.role || getCurrentRole();

  if (effectiveRole === ROLES.EXPERT) {
    return (
      <ExpertDashboard
        setActivePage={setActivePage}
        userProfile={userProfile}
        language={language}
      />
    );
  }

  if (effectiveRole === ROLES.ADMIN) {
    return (
      <AdminDashboard
        setActivePage={setActivePage}
        userProfile={userProfile}
        language={language}
      />
    );
  }

  return (
    <FarmerDashboard
      setActivePage={setActivePage}
      lastScan={lastScan}
      userProfile={userProfile}
      language={language}
    />
  );
}
