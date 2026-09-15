import React from 'react';
import {
  LayoutDashboard,
  ScanLine,
  Sprout,
  Droplets,
  CloudSun,
  Leaf,
  Bot,
  BrainCircuit,
  History,
  User,
  Users,
  UserCheck,
  FileSpreadsheet,
  Activity,
  Cpu,
  Settings,
  HelpCircle,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  MessageSquareWarning,
  ClipboardList,
  Flame,
} from 'lucide-react';
import { ROLES, ROLE_CONFIG } from '../../services/authService';

export default function Sidebar({
  activePage,
  setActivePage,
  currentRole = ROLES.FARMER,
  collapsed = false,
  setCollapsed,
  isMobileOpen = false,
  setIsMobileOpen,
  onLogout,
}) {
  // Navigation structure tailored cleanly per role
  const roleNavItems = {
    [ROLES.FARMER]: [
      { id: 'dashboard', label: 'Farm Dashboard', icon: LayoutDashboard },
      { id: 'disease', label: 'Disease Detection', icon: ScanLine, badge: 'AI' },
      { id: 'crop-recommendation', label: 'Crop Advisor', icon: Sprout },
      { id: 'irrigation', label: 'Smart Irrigation', icon: Droplets },
      { id: 'weather', label: 'Weather Forecast', icon: CloudSun },
      { id: 'sustainability', label: 'Sustainability Score', icon: Leaf },
      { id: 'assistant', label: 'Farmer Assistant', icon: Bot },
      { id: 'agentic-advisor', label: 'Agentic Advisor', icon: BrainCircuit, badge: 'Auto' },
      { id: 'history', label: 'Scan History', icon: History },
      { id: 'profile', label: 'Farm Profile', icon: User },
    ],
    [ROLES.EXPERT]: [
      { id: 'expert-dashboard', label: 'Agronomist Desk', icon: LayoutDashboard },
      { id: 'expert-requests', label: 'Farmer Requests', icon: MessageSquareWarning, badge: '8 New' },
      { id: 'expert-disease-analysis', label: 'Disease Analysis', icon: Stethoscope },
      { id: 'expert-recommendations', label: 'Recommendations', icon: ClipboardList },
      { id: 'expert-advisory', label: 'Advisory Engine', icon: BrainCircuit },
      { id: 'expert-reports', label: 'Outbreak Reports', icon: FileSpreadsheet },
      { id: 'profile', label: 'Expert Profile', icon: User },
    ],
    [ROLES.ADMIN]: [
      { id: 'admin-dashboard', label: 'System Overview', icon: LayoutDashboard },
      { id: 'admin-users', label: 'All Users', icon: Users },
      { id: 'admin-farmers', label: 'Farmers Directory', icon: Sprout },
      { id: 'admin-experts', label: 'Certified Experts', icon: UserCheck },
      { id: 'admin-disease-reports', label: 'Disease Reports', icon: Flame },
      { id: 'admin-analytics', label: 'System Analytics', icon: Activity },
      { id: 'admin-model-status', label: 'Model Telemetry', icon: Cpu, badge: 'v2.4' },
      { id: 'admin-reports', label: 'Audit & Logs', icon: FileText },
      { id: 'admin-settings', label: 'System Settings', icon: Settings },
    ],
  };

  const navItems = roleNavItems[currentRole] || roleNavItems[ROLES.FARMER];
  const roleInfo = ROLE_CONFIG[currentRole] || ROLE_CONFIG[ROLES.FARMER];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`app-sidebar ${collapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand & Role Header */}
        <div className="sidebar-header">
          <div
            className="sidebar-brand"
            onClick={() => handleNavClick(roleInfo.dashboardPage)}
          >
            <div className="sidebar-logo-icon">
              <Sprout size={24} />
            </div>
            {!collapsed && (
              <div className="sidebar-brand-text">
                <span className="brand-title">AgriSmart AI</span>
                <span className={`role-badge ${roleInfo.badgeClass}`}>
                  {roleInfo.label}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          {setCollapsed && (
            <button
              className="sidebar-collapse-btn desktop-only"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle Sidebar"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        {/* Navigation Links Group */}
        <div className="sidebar-nav-container">
          <div className="sidebar-section-title">
            {!collapsed ? `${roleInfo.label.toUpperCase()} WORKSPACE` : '•••'}
          </div>

          <nav className="sidebar-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="sidebar-item-icon">
                    <Icon size={19} />
                  </div>
                  {!collapsed && (
                    <span className="sidebar-item-label">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="sidebar-item-badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Secondary Utilities */}
          <div className="sidebar-section-title" style={{ marginTop: '1.25rem' }}>
            {!collapsed ? 'SYSTEM' : '•••'}
          </div>

          <nav className="sidebar-nav-list">
            <button
              className={`sidebar-nav-item ${activePage === 'system-status' ? 'active' : ''}`}
              onClick={() => handleNavClick('system-status')}
              title="System Architecture & APIs"
            >
              <div className="sidebar-item-icon">
                <Activity size={19} />
              </div>
              {!collapsed && (
                <span className="sidebar-item-label">System Architecture</span>
              )}
            </button>

            <button
              className={`sidebar-nav-item ${activePage === 'help' ? 'active' : ''}`}
              onClick={() => handleNavClick('help')}
              title="Help & Agricultural FAQ"
            >
              <div className="sidebar-item-icon">
                <HelpCircle size={19} />
              </div>
              {!collapsed && <span className="sidebar-item-label">Help & Guide</span>}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer / User & Logout */}
        <div className="sidebar-footer">
          <button
            className="sidebar-nav-item logout-btn"
            onClick={onLogout}
            title="Sign Out"
          >
            <div className="sidebar-item-icon">
              <LogOut size={19} color="#ef4444" />
            </div>
            {!collapsed && (
              <span className="sidebar-item-label" style={{ color: '#ef4444' }}>
                Sign Out
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
