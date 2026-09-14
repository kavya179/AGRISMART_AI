import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';

// 14 Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import DiseaseResult from './pages/DiseaseResult';
import CropRecommendation from './pages/CropRecommendation';
import SmartIrrigation from './pages/SmartIrrigation';
import Weather from './pages/Weather';
import Sustainability from './pages/Sustainability';
import FarmerAssistant from './pages/FarmerAssistant';
import PredictionHistory from './pages/PredictionHistory';
import Profile from './pages/Profile';
import HelpFAQ from './pages/HelpFAQ';

import { getStoredScanHistory, getStoredUserProfile, saveStoredUserProfile } from './services/historyStorage';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedResult, setSelectedResult] = useState(null);
  const [userProfile, setUserProfile] = useState(getStoredUserProfile());
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

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('agrismart_lang', newLang);
    if (userProfile) {
      const updated = { ...userProfile, preferredLanguage: newLang };
      setUserProfile(updated);
      saveStoredUserProfile(updated);
    }
  };

  const handleBackToDashboard = () => setActivePage('dashboard');

  return (
    <div className="app-wrapper">
      {/* Top Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
        setLanguage={handleLanguageChange}
      />

      {/* Main Container for Current Page */}
      <main className="main-container">
        {activePage === 'landing' && (
          <LandingPage setActivePage={setActivePage} language={language} />
        )}

        {activePage === 'login' && (
          <Login setActivePage={setActivePage} setUserProfile={setUserProfile} language={language} />
        )}

        {activePage === 'register' && (
          <Register setActivePage={setActivePage} setUserProfile={setUserProfile} language={language} />
        )}

        {activePage === 'dashboard' && (
          <Dashboard
            setActivePage={setActivePage}
            lastScan={lastScan}
            userProfile={userProfile}
            language={language}
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

        {activePage === 'history' && (
          <PredictionHistory
            onBack={handleBackToDashboard}
            setActivePage={setActivePage}
            setSelectedResult={setSelectedResult}
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
          />
        )}

        {activePage === 'help' && (
          <HelpFAQ onBack={handleBackToDashboard} language={language} />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} language={language} />

      {/* Bottom Navigation for Mobile Viewports */}
      <MobileNav activePage={activePage} setActivePage={setActivePage} language={language} />
    </div>
  );
}
