import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import NotificationsModal from './NotificationsModal';
import MobileNav from '../MobileNav';
import Footer from '../Footer';
import { ROLES } from '../../services/authService';

export default function AppLayout({
  children,
  activePage,
  setActivePage,
  currentRole = ROLES.FARMER,
  setCurrentRole,
  userProfile,
  setUserProfile,
  language = 'en',
  setLanguage,
  onLogout,
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Pages that don't need the dashboard sidebar shell (e.g., login, register, landing)
  const isAuthOrLanding = ['landing', 'login', 'register'].includes(activePage);

  if (isAuthOrLanding) {
    return (
      <div className="app-standalone-wrapper">
        <main className={activePage === 'landing' ? 'landing-standalone-main' : 'standalone-main'}>
          {children}
        </main>
        <Footer setActivePage={setActivePage} language={language} />
      </div>
    );
  }

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Role-Aware Collapsible Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        currentRole={currentRole}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        isMobileOpen={mobileSidebarOpen}
        setIsMobileOpen={setMobileSidebarOpen}
        onLogout={onLogout}
      />

      {/* Main App Content Area */}
      <div className="app-main-viewport">
        {/* Modern Sticky Top Navbar */}
        <TopNavbar
          activePage={activePage}
          setActivePage={setActivePage}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          language={language}
          setLanguage={setLanguage}
          setIsMobileOpen={setMobileSidebarOpen}
          onOpenNotifications={() => setNotificationsOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="app-content-container">
          {children}
        </main>

        {/* Global Footer */}
        <Footer setActivePage={setActivePage} language={language} />
      </div>

      {/* Notifications Drawer Modal */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        currentRole={currentRole}
        setActivePage={setActivePage}
      />

      {/* Bottom Navigation for Mobile Devices */}
      <MobileNav
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
      />
    </div>
  );
}
