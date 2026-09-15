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

const sidebarTranslations = {
  en: {
    farmerWorkspace: 'FARMER WORKSPACE',
    expertWorkspace: 'EXPERT WORKSPACE',
    adminWorkspace: 'ADMIN WORKSPACE',
    systemSection: 'SYSTEM',
    systemArch: 'System Architecture',
    helpGuide: 'Help & Agricultural Guide',
    signOut: 'Sign Out',
    roles: {
      farmer: 'Farmer',
      expert: 'Agricultural Expert',
      admin: 'System Admin',
    },
    items: {
      dashboard: 'Farm Dashboard',
      disease: 'Disease Detection',
      'crop-recommendation': 'Crop Advisor',
      irrigation: 'Smart Irrigation',
      weather: 'Weather Forecast',
      sustainability: 'Sustainability Score',
      assistant: 'Farmer Assistant',
      'agentic-advisor': 'Agentic Advisor',
      history: 'Scan History',
      profile: 'Farm Profile',
      'expert-dashboard': 'Agronomist Desk',
      'expert-requests': 'Farmer Requests',
      'expert-disease-analysis': 'Disease Analysis',
      'expert-recommendations': 'Recommendations',
      'expert-advisory': 'Advisory Engine',
      'expert-reports': 'Outbreak Reports',
      'admin-dashboard': 'System Overview',
      'admin-users': 'All Users',
      'admin-farmers': 'Farmers Directory',
      'admin-experts': 'Certified Experts',
      'admin-disease-reports': 'Disease Reports',
      'admin-analytics': 'System Analytics',
      'admin-model-status': 'Model Telemetry',
      'admin-reports': 'Audit & Logs',
      'admin-settings': 'System Settings',
    },
  },
  hi: {
    farmerWorkspace: 'किसान कार्यक्षेत्र',
    expertWorkspace: 'विशेषज्ञ कार्यक्षेत्र',
    adminWorkspace: 'व्यवस्थापक कार्यक्षेत्र',
    systemSection: 'सिस्टम',
    systemArch: 'सिस्टम आर्किटेक्चर',
    helpGuide: 'सहायता एवं मार्गदर्शिका',
    signOut: 'लॉग आउट',
    roles: {
      farmer: 'किसान',
      expert: 'कृषि विशेषज्ञ',
      admin: 'सिस्टम एडमिन',
    },
    items: {
      dashboard: 'कृषि डैशबोर्ड',
      disease: 'रोग पहचान AI',
      'crop-recommendation': 'फसल चयन सलाहकार',
      irrigation: 'स्मार्ट सिंचाई',
      weather: 'मौसम पूर्वानुमान',
      sustainability: 'स्थिरता स्कोर',
      assistant: 'किसान सहायक AI',
      'agentic-advisor': 'एजेंटिक सलाहकार',
      history: 'स्कैन इतिहास',
      profile: 'खेत प्रोफ़ाइल',
      'expert-dashboard': 'विशेषज्ञ डेस्क',
      'expert-requests': 'किसान अनुरोध',
      'expert-disease-analysis': 'रोग विश्लेषण',
      'expert-recommendations': 'नुस्खे व सलाह',
      'expert-advisory': 'सलाहकार इंजन',
      'expert-reports': 'प्रकोप रिपोर्ट',
      'admin-dashboard': 'सिस्टम अवलोकन',
      'admin-users': 'सभी उपयोगकर्ता',
      'admin-farmers': 'किसान निर्देशिका',
      'admin-experts': 'प्रमाणित विशेषज्ञ',
      'admin-disease-reports': 'रोग रिपोर्ट',
      'admin-analytics': 'सिस्टम एनालिटिक्स',
      'admin-model-status': 'मॉडल टेलीमेट्री',
      'admin-reports': 'ऑडिट और लॉग्स',
      'admin-settings': 'सिस्टम सेटिंग्स',
    },
  },
  gu: {
    farmerWorkspace: 'ખેડૂત કાર્યક્ષેત્ર',
    expertWorkspace: 'નિષ્ણાત કાર્યક્ષેત્ર',
    adminWorkspace: 'એડમિન કાર્યક્ષેત્ર',
    systemSection: 'સિસ્ટમ',
    systemArch: 'સિસ્ટમ આર્કિટેક્ચર',
    helpGuide: 'મદદ અને કૃષિ માર્ગદર્શિકા',
    signOut: 'સાઇન આઉટ',
    roles: {
      farmer: 'ખેડૂત',
      expert: 'કૃષિ નિષ્ણાત',
      admin: 'સિસ્ટમ એડમિન',
    },
    items: {
      dashboard: 'ખેતી ડેશબોર્ડ',
      disease: 'રોગ નિદાન AI',
      'crop-recommendation': 'પાક પસંદગી સલાહકાર',
      irrigation: 'સ્માર્ટ સિંચાઈ / પિયત',
      weather: 'હવામાન આગાહી',
      sustainability: 'ટકાઉપણું સ્કોર',
      assistant: 'ખેડૂત સહાયક AI',
      'agentic-advisor': 'એજન્ટિક સલાહકાર',
      history: 'તપાસ ઇતિહાસ',
      profile: 'ખેતર પ્રોફાઇલ',
      'expert-dashboard': 'નિષ્ણાત ડેસ્ક',
      'expert-requests': 'ખેડૂત વિનંતીઓ',
      'expert-disease-analysis': 'રોગ વિશ્લેષણ',
      'expert-recommendations': 'ભલામણો અને ઉપચાર',
      'expert-advisory': 'સલાહ એન્જિન',
      'expert-reports': 'રોગચાળાના અહેવાલો',
      'admin-dashboard': 'સિસ્ટમ ઝાંખી',
      'admin-users': 'તમામ વપરાશકર્તાઓ',
      'admin-farmers': 'ખેડૂત યાદી',
      'admin-experts': 'પ્રમાણિત નિષ્ણાતો',
      'admin-disease-reports': 'રોગ અહેવાલો',
      'admin-analytics': 'સિસ્ટમ એનાલિટિક્સ',
      'admin-model-status': 'મોડેલ ટેલિમેટ્રી',
      'admin-reports': 'ઓડિટ અને લોગ્સ',
      'admin-settings': 'સિસ્ટમ સેટિંગ્સ',
    },
  },
  mr: {
    farmerWorkspace: 'शेतकरी कार्यक्षेत्र',
    expertWorkspace: 'तज्ज्ञ कार्यक्षेत्र',
    adminWorkspace: 'प्रशासक कार्यक्षेत्र',
    systemSection: 'प्रणाली',
    systemArch: 'सिस्टम आर्किटेक्चर',
    helpGuide: 'मदत आणि कृषी मार्गदर्शक',
    signOut: 'बाहेर पडा (लॉग आउट)',
    roles: {
      farmer: 'शेतकरी',
      expert: 'कृषी तज्ज्ञ',
      admin: 'सिस्टम ॲडमिन',
    },
    items: {
      dashboard: 'शेतकरी डॅशबोर्ड',
      disease: 'रोग निदान AI',
      'crop-recommendation': 'पीक निवड सल्लागार',
      irrigation: 'स्मार्ट सिंचन',
      weather: 'हवामान अंदाज',
      sustainability: 'शाश्वतता स्कोअर',
      assistant: 'शेतकरी सहाय्यक AI',
      'agentic-advisor': 'एजंटिक सल्लागार',
      history: 'स्कॅन इतिहास',
      profile: 'शेतकरी प्रोफाईल',
      'expert-dashboard': 'तज्ज्ञ डेस्क',
      'expert-requests': 'शेतकरी विनंत्या',
      'expert-disease-analysis': 'रोग विश्लेषण',
      'expert-recommendations': 'औषधोपचार शिफारसी',
      'expert-advisory': 'सल्लागार इंजिन',
      'expert-reports': 'रोग प्रादुर्भाव अहवाल',
      'admin-dashboard': 'सिस्टम अवलोकन',
      'admin-users': 'सर्व वापरकर्ते',
      'admin-farmers': 'शेतकरी यादी',
      'admin-experts': 'प्रमाणित तज्ज्ञ',
      'admin-disease-reports': 'रोग अहवाल',
      'admin-analytics': 'सिस्टम ॲनालिटिक्स',
      'admin-model-status': 'मॉडेल टेलिमेट्री',
      'admin-reports': 'ऑडिट आणि नोंदी',
      'admin-settings': 'सिस्टम सेटिंग्ज',
    },
  },
};

export default function Sidebar({
  activePage,
  setActivePage,
  currentRole = ROLES.FARMER,
  collapsed = false,
  setCollapsed,
  isMobileOpen = false,
  setIsMobileOpen,
  language = 'en',
  onLogout,
}) {
  const t = sidebarTranslations[language] || sidebarTranslations.en;

  // Navigation structure tailored cleanly per role
  const roleNavItems = {
    [ROLES.FARMER]: [
      { id: 'dashboard', icon: LayoutDashboard },
      { id: 'disease', icon: ScanLine, badge: 'AI' },
      { id: 'crop-recommendation', icon: Sprout },
      { id: 'irrigation', icon: Droplets },
      { id: 'weather', icon: CloudSun },
      { id: 'sustainability', icon: Leaf },
      { id: 'assistant', icon: Bot },
      { id: 'agentic-advisor', icon: BrainCircuit, badge: 'Auto' },
      { id: 'history', icon: History },
      { id: 'profile', icon: User },
    ],
    [ROLES.EXPERT]: [
      { id: 'expert-dashboard', icon: LayoutDashboard },
      { id: 'expert-requests', icon: MessageSquareWarning, badge: '8 New' },
      { id: 'expert-disease-analysis', icon: Stethoscope },
      { id: 'expert-recommendations', icon: ClipboardList },
      { id: 'expert-advisory', icon: BrainCircuit },
      { id: 'expert-reports', icon: FileSpreadsheet },
      { id: 'profile', icon: User },
    ],
    [ROLES.ADMIN]: [
      { id: 'admin-dashboard', icon: LayoutDashboard },
      { id: 'admin-users', icon: Users },
      { id: 'admin-farmers', icon: Sprout },
      { id: 'admin-experts', icon: UserCheck },
      { id: 'admin-disease-reports', icon: Flame },
      { id: 'admin-analytics', icon: Activity },
      { id: 'admin-model-status', icon: Cpu, badge: 'v2.4' },
      { id: 'admin-reports', icon: FileText },
      { id: 'admin-settings', icon: Settings },
    ],
  };

  const navItems = roleNavItems[currentRole] || roleNavItems[ROLES.FARMER];
  const roleInfo = ROLE_CONFIG[currentRole] || ROLE_CONFIG[ROLES.FARMER];
  const localizedRoleLabel = t.roles[currentRole] || roleInfo.label;

  const getWorkspaceTitle = () => {
    switch (currentRole) {
      case ROLES.EXPERT:
        return t.expertWorkspace;
      case ROLES.ADMIN:
        return t.adminWorkspace;
      case ROLES.FARMER:
      default:
        return t.farmerWorkspace;
    }
  };

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
                  {localizedRoleLabel}
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
            {!collapsed ? getWorkspaceTitle() : '•••'}
          </div>

          <nav className="sidebar-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const label = t.items[item.id] || item.id;

              return (
                <button
                  key={item.id}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  title={collapsed ? label : undefined}
                >
                  <div className="sidebar-item-icon">
                    <Icon size={19} />
                  </div>
                  {!collapsed && (
                    <span className="sidebar-item-label">{label}</span>
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
            {!collapsed ? t.systemSection : '•••'}
          </div>

          <nav className="sidebar-nav-list">
            <button
              className={`sidebar-nav-item ${activePage === 'system-status' ? 'active' : ''}`}
              onClick={() => handleNavClick('system-status')}
              title={t.systemArch}
            >
              <div className="sidebar-item-icon">
                <Activity size={19} />
              </div>
              {!collapsed && (
                <span className="sidebar-item-label">{t.systemArch}</span>
              )}
            </button>

            <button
              className={`sidebar-nav-item ${activePage === 'help' ? 'active' : ''}`}
              onClick={() => handleNavClick('help')}
              title={t.helpGuide}
            >
              <div className="sidebar-item-icon">
                <HelpCircle size={19} />
              </div>
              {!collapsed && <span className="sidebar-item-label">{t.helpGuide}</span>}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer / User & Logout */}
        <div className="sidebar-footer">
          <button
            className="sidebar-nav-item logout-btn"
            onClick={onLogout}
            title={t.signOut}
          >
            <div className="sidebar-item-icon">
              <LogOut size={19} color="#ef4444" />
            </div>
            {!collapsed && (
              <span className="sidebar-item-label" style={{ color: '#ef4444' }}>
                {t.signOut}
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
