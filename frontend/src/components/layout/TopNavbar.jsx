import React, { useState } from 'react';
import {
  Menu,
  Bell,
  User,
  Shield,
  Sprout,
  Stethoscope,
  Globe,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { ROLES, ROLE_CONFIG, switchActiveRole } from '../../services/authService';
import { translations } from '../../translations';
import BackendStatusBadge from '../BackendStatusBadge';

export default function TopNavbar({
  activePage,
  setActivePage,
  currentRole = ROLES.FARMER,
  setCurrentRole,
  userProfile,
  setUserProfile,
  language = 'en',
  setLanguage,
  setIsMobileOpen,
  onOpenNotifications,
  onLogout,
}) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const t = translations[language] || translations.en;

  const roleInfo = ROLE_CONFIG[currentRole] || ROLE_CONFIG[ROLES.FARMER];

  const handleRoleSelect = (newRole) => {
    setRoleDropdownOpen(false);
    if (newRole === currentRole) return;
    const updated = switchActiveRole(newRole);
    if (setUserProfile) setUserProfile(updated);
    if (setCurrentRole) setCurrentRole(newRole);
    const targetDashboard = ROLE_CONFIG[newRole].dashboardPage;
    setActivePage(targetDashboard);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case ROLES.EXPERT:
        return <Stethoscope size={16} />;
      case ROLES.ADMIN:
        return <Shield size={16} />;
      case ROLES.FARMER:
      default:
        return <Sprout size={16} />;
    }
  };

  return (
    <header className="top-navbar-modern">
      <div className="top-nav-left">
        {/* Mobile Hamburger Toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <Menu size={22} />
        </button>

        {/* Portal Breadcrumb / Mode Indicator */}
        <div className="portal-indicator">
          <span className="portal-main-title">{t.appName || 'AgriSmart AI'}</span>
          <span className="portal-separator">•</span>
          <span className="portal-sub-title">{roleInfo.portalTitle}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="top-nav-right">
        {/* Live Backend / Mock Demo Mode Status Badge */}
        <BackendStatusBadge />

        {/* Role Switcher Pill */}
        <div className="role-switcher-container">
          <button
            className={`role-switcher-btn ${roleInfo.badgeClass}`}
            onClick={() => {
              setRoleDropdownOpen(!roleDropdownOpen);
              setProfileMenuOpen(false);
            }}
            title="Switch Workspace Role"
          >
            <span className="role-icon">{getRoleIcon(currentRole)}</span>
            <span className="role-name">{roleInfo.label}</span>
            <ChevronDown size={14} className={`dropdown-chevron ${roleDropdownOpen ? 'open' : ''}`} />
          </button>

          {roleDropdownOpen && (
            <>
              <div
                className="dropdown-backdrop"
                onClick={() => setRoleDropdownOpen(false)}
              />
              <div className="role-dropdown-menu">
                <div className="dropdown-header">SWITCH ROLE VIEW</div>
                {Object.keys(ROLE_CONFIG).map((roleKey) => {
                  const cfg = ROLE_CONFIG[roleKey];
                  const isSelected = currentRole === roleKey;
                  return (
                    <button
                      key={roleKey}
                      className={`role-dropdown-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleRoleSelect(roleKey)}
                    >
                      <div className="item-icon-wrap">{getRoleIcon(roleKey)}</div>
                      <div className="item-text-wrap">
                        <span className="item-label">{cfg.label}</span>
                        <span className="item-portal">{cfg.portalTitle}</span>
                      </div>
                      {isSelected && <span className="item-active-dot" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Language Select */}
        <div className="lang-select-wrapper">
          <Globe size={15} className="lang-icon" />
          <select
            className="lang-select-modern"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            title="Select Language"
            aria-label="Language Selector"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
            <option value="gu">ગુજરાતી</option>
          </select>
        </div>

        {/* Notifications Bell */}
        <button
          className="nav-icon-btn"
          onClick={onOpenNotifications}
          title="Notifications & Alerts"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="notification-badge-dot" />
        </button>

        {/* User Profile Mini Menu */}
        <div className="profile-menu-container" style={{ position: 'relative' }}>
          <button
            className="user-profile-btn"
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setRoleDropdownOpen(false);
            }}
            title="User Menu"
          >
            <div className="user-avatar">
              {userProfile?.avatar || <User size={16} />}
            </div>
            <div className="user-details-compact">
              <span className="user-name-compact">{userProfile?.fullName || 'User'}</span>
              <span className="user-role-compact">{roleInfo.label}</span>
            </div>
            <ChevronDown size={12} className={`dropdown-chevron ${profileMenuOpen ? 'open' : ''}`} />
          </button>

          {profileMenuOpen && (
            <>
              <div
                className="dropdown-backdrop"
                onClick={() => setProfileMenuOpen(false)}
              />
              <div
                className="role-dropdown-menu"
                style={{ right: 0, minWidth: '200px' }}
              >
                <div className="dropdown-header">
                  {userProfile?.fullName || 'User Account'}
                </div>
                <button
                  className="role-dropdown-item"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    setActivePage('profile');
                  }}
                >
                  <div className="item-icon-wrap"><User size={16} /></div>
                  <div className="item-text-wrap">
                    <span className="item-label">Profile & Settings</span>
                  </div>
                </button>
                <button
                  className="role-dropdown-item"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    setActivePage('help');
                  }}
                >
                  <div className="item-icon-wrap"><HelpCircle size={16} /></div>
                  <div className="item-text-wrap">
                    <span className="item-label">Help & Guide</span>
                  </div>
                </button>
                <div style={{ borderTop: '1px solid var(--border-color, #e2e8f0)', margin: '0.25rem 0' }} />
                <button
                  className="role-dropdown-item"
                  style={{ color: '#ef4444' }}
                  onClick={() => {
                    setProfileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                >
                  <div className="item-icon-wrap"><LogOut size={16} color="#ef4444" /></div>
                  <div className="item-text-wrap">
                    <span className="item-label" style={{ color: '#ef4444' }}>Sign Out</span>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
