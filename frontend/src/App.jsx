import React, { useState, useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';

// Common & Auth Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HelpFAQ from './pages/HelpFAQ';
import SystemStatus from './pages/SystemStatus';

// Farmer Core Modules
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import DiseaseResult from './pages/DiseaseResult';
import CropRecommendation from './pages/CropRecommendation';
import SmartIrrigation from './pages/SmartIrrigation';
import Weather from './pages/Weather';
import Sustainability from './pages/Sustainability';
import FarmerAssistant from './pages/FarmerAssistant';
import PredictionHistory from './pages/PredictionHistory';

// Expert Specific Pages
import ExpertDashboard from './pages/expert/ExpertDashboard';
import ExpertRequests from './pages/expert/ExpertRequests';
import ExpertDiseaseAnalysis from './pages/expert/ExpertDiseaseAnalysis';
import ExpertAdvisory from './pages/expert/ExpertAdvisory';
import ExpertReports from './pages/expert/ExpertReports';

// Admin Specific Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminModelStatus from './pages/admin/AdminModelStatus';
import AdminSettings from './pages/admin/AdminSettings';

import {
  ROLES,
  getCurrentRole,
  canAccessPage,
  getRoleDashboard,
  switchActiveRole,
} from './services/authService';
import {
  getStoredScanHistory,
  getStoredUserProfile,
  saveStoredUserProfile,
} from './services/historyStorage';
import './App.css';

export default function App() {
  const [userProfile, setUserProfile] = useState(() => getStoredUserProfile());
  const [currentRole, setCurrentRole] = useState(() => {
    const profile = getStoredUserProfile();
    return profile?.role || getCurrentRole();
  });

  const [activePage, setActivePage] = useState(() => {
    const initialRole = getStoredUserProfile()?.role || ROLES.FARMER;
    return getRoleDashboard(initialRole);
  });

  const [selectedResult, setSelectedResult] = useState(null);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('agrismart_lang') || 'en';
  });
  const [lastScan, setLastScan] = useState(null);

  useEffect(() => {
    const history = getStoredScanHistory();
    if (history.length > 0) {
      setLastScan(history[0]);
    }
  }, [activePage]);

  // Route protection: ensure user does not access pages outside their role permissions
  useEffect(() => {
    if (!canAccessPage(activePage, currentRole)) {
      console.warn(`Access denied to '${activePage}' for role '${currentRole}'. Redirecting to role dashboard.`);
      setActivePage(getRoleDashboard(currentRole));
    }
  }, [activePage, currentRole]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('agrismart_lang', newLang);
    if (userProfile) {
      const updated = { ...userProfile, preferredLanguage: newLang };
      setUserProfile(updated);
      saveStoredUserProfile(updated);
    }
  };

  const handleRoleChange = (newRole) => {
    const updated = switchActiveRole(newRole);
    setUserProfile(updated);
    setCurrentRole(newRole);
    setActivePage(getRoleDashboard(newRole));
  };

  const handleLogout = () => {
    setActivePage('login');
  };

  const handleBackToDashboard = () => {
    setActivePage(getRoleDashboard(currentRole));
  };

  return (
    <AppLayout
      activePage={activePage}
      setActivePage={setActivePage}
      currentRole={currentRole}
      setCurrentRole={handleRoleChange}
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      language={language}
      setLanguage={handleLanguageChange}
      onLogout={handleLogout}
    >
      {/* 1. Common / Authentication Pages */}
      {activePage === 'landing' && (
        <LandingPage setActivePage={setActivePage} language={language} />
      )}

      {activePage === 'login' && (
        <Login
          setActivePage={setActivePage}
          setUserProfile={setUserProfile}
          setCurrentRole={setCurrentRole}
          language={language}
        />
      )}

      {activePage === 'register' && (
        <Register
          setActivePage={setActivePage}
          setUserProfile={setUserProfile}
          language={language}
        />
      )}

      {activePage === 'profile' && (
        <Profile
          onBack={handleBackToDashboard}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          language={language}
          setLanguage={handleLanguageChange}
          currentRole={currentRole}
          setCurrentRole={handleRoleChange}
          setActivePage={setActivePage}
        />
      )}

      {activePage === 'help' && (
        <HelpFAQ onBack={handleBackToDashboard} language={language} />
      )}

      {activePage === 'system-status' && (
        <SystemStatus onBack={handleBackToDashboard} />
      )}

      {/* 2. Farmer Core Modules */}
      {activePage === 'dashboard' && (
        <Dashboard
          setActivePage={setActivePage}
          lastScan={lastScan}
          userProfile={userProfile}
          language={language}
          currentRole={currentRole}
        />
      )}

      {activePage === 'disease' && (
        <DiseaseDetection
          setActivePage={setActivePage}
          setSelectedResult={setSelectedResult}
          onBack={handleBackToDashboard}
          language={language}
        />
      )}

      {activePage === 'disease-result' && (
        <DiseaseResult
          result={selectedResult}
          setActivePage={setActivePage}
          language={language}
        />
      )}

      {activePage === 'crop-recommendation' && (
        <CropRecommendation onBack={handleBackToDashboard} language={language} />
      )}

      {activePage === 'irrigation' && (
        <SmartIrrigation
          onBack={handleBackToDashboard}
          userProfile={userProfile}
          language={language}
        />
      )}

      {activePage === 'weather' && (
        <Weather
          onBack={handleBackToDashboard}
          userProfile={userProfile}
          language={language}
        />
      )}

      {activePage === 'sustainability' && (
        <Sustainability onBack={handleBackToDashboard} language={language} />
      )}

      {activePage === 'assistant' && (
        <FarmerAssistant
          onBack={handleBackToDashboard}
          userProfile={userProfile}
          language={language}
        />
      )}

      {activePage === 'agentic-advisor' && (
        <FarmerAssistant
          onBack={handleBackToDashboard}
          userProfile={userProfile}
          language={language}
        />
      )}

      {activePage === 'history' && (
        <PredictionHistory
          onBack={handleBackToDashboard}
          setActivePage={setActivePage}
          setSelectedResult={setSelectedResult}
          language={language}
        />
      )}

      {/* 3. Expert Specific Pages */}
      {activePage === 'expert-dashboard' && (
        <ExpertDashboard
          setActivePage={setActivePage}
          userProfile={userProfile}
          language={language}
        />
      )}

      {activePage === 'expert-requests' && (
        <ExpertRequests
          onBack={handleBackToDashboard}
          setActivePage={setActivePage}
        />
      )}

      {activePage === 'expert-disease-analysis' && (
        <ExpertDiseaseAnalysis onBack={handleBackToDashboard} />
      )}

      {activePage === 'expert-recommendations' && (
        <ExpertAdvisory onBack={handleBackToDashboard} />
      )}

      {activePage === 'expert-advisory' && (
        <ExpertAdvisory onBack={handleBackToDashboard} />
      )}

      {activePage === 'expert-reports' && (
        <ExpertReports onBack={handleBackToDashboard} />
      )}

      {/* 4. Admin Specific Pages */}
      {activePage === 'admin-dashboard' && (
        <AdminDashboard
          setActivePage={setActivePage}
          userProfile={userProfile}
          language={language}
        />
      )}

      {activePage === 'admin-users' && (
        <AdminUsers initialRoleFilter="all" />
      )}

      {activePage === 'admin-farmers' && (
        <AdminUsers initialRoleFilter="farmer" />
      )}

      {activePage === 'admin-experts' && (
        <AdminUsers initialRoleFilter="expert" />
      )}

      {activePage === 'admin-disease-reports' && (
        <ExpertReports onBack={handleBackToDashboard} />
      )}

      {activePage === 'admin-analytics' && (
        <AdminAnalytics onBack={handleBackToDashboard} />
      )}

      {activePage === 'admin-model-status' && (
        <AdminModelStatus onBack={handleBackToDashboard} />
      )}

      {activePage === 'admin-reports' && (
        <ExpertReports onBack={handleBackToDashboard} />
      )}

      {activePage === 'admin-settings' && (
        <AdminSettings onBack={handleBackToDashboard} />
      )}
    </AppLayout>
  );
}
