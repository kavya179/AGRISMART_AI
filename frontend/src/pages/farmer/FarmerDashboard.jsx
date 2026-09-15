import React from 'react';
import {
  ScanLine,
  Droplets,
  CloudSun,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calendar,
  User,
  ChevronRight,
  Leaf,
  Bot,
  BrainCircuit,
  TrendingUp,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import DashboardCard from '../../components/ui/DashboardCard';
import SectionHeader from '../../components/ui/SectionHeader';
import AlertCard from '../../components/ui/AlertCard';
import RecommendationCard from '../../components/ui/RecommendationCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { mockFarmerData } from '../../data/mockData';
import { translations } from '../../translations';

const dashboardContent = {
  en: {
    farmActive: 'Farm Active',
    healthTitle: 'Overall Crop Health',
    healthSub: 'Tomato & Soybean',
    healthTrend: 'vs last week',
    moistureTitle: 'Soil Moisture',
    moistureSub: 'Optimal Zone (30-40%)',
    moistureStatus: 'Adequate',
    weatherTitle: "Today's Weather",
    weatherSub: 'Partly Cloudy • 12 km/h',
    weatherStatus: 'Humidity 62%',
    sustainabilityTitle: 'Sustainability Index',
    sustainabilitySub: 'Eco-Friendly Tier A',
    sustainabilityTrend: 'this season',
    dailyDecisionTitle: 'Daily Farm Decision Assistant',
    dailyDecisionSub: 'Key questions answered automatically from your sensors and AI models',
    recTitle: 'Recommended Actions',
    recSub: 'Personalized agronomic steps for your farm',
    recAction: 'Ask Advisor →',
    scansTitle: 'Recent Crop Scans',
    scansSub: 'Latest AI image diagnosis results',
    scansAction: 'View All History →',
    healthyBadge: 'Healthy',
    diseasedBadge: 'Diseased',
    confLabel: 'Conf.',
    alerts: [
      {
        id: 1,
        severity: 'warning',
        title: 'Early Blight Risk High in Pune District',
        message: 'Persistent 82% humidity over the past 48h increases fungal sporulation. Inspect lower tomato foliage.',
        timestamp: '2 hours ago',
        actionLabel: 'Perform Leaf Scan →',
        actionPage: 'disease',
      },
      {
        id: 2,
        severity: 'info',
        title: 'Light Showers Forecasted for Thursday',
        message: '2–5mm expected. Postpone scheduled drip fertigation by 24 hours.',
        timestamp: '5 hours ago',
        actionLabel: 'View Forecast →',
        actionPage: 'weather',
      },
    ],
    recs: [
      {
        id: 1,
        category: 'Protection',
        title: 'Apply Preventive Organic Fungicide',
        desc: 'Spray Copper Hydroxide (2.5g/L) during morning hours (07:00 - 10:00 AM) to protect against Early Blight.',
        priority: 'High',
      },
      {
        id: 2,
        category: 'Irrigation',
        title: 'Rain Delay Active - Conserve Water',
        desc: 'Soil moisture is optimal (34%). Upcoming rain prevents the need for scheduled flood watering.',
        priority: 'Medium',
      },
    ],
  },
  hi: {
    farmActive: 'खेत सक्रिय',
    healthTitle: 'कुल फसल स्वास्थ्य',
    healthSub: 'टमाटर और सोयाबीन',
    healthTrend: 'पिछले सप्ताह की तुलना में',
    moistureTitle: 'मिट्टी की नमी',
    moistureSub: 'इष्टतम क्षेत्र (30-40%)',
    moistureStatus: 'पर्याप्त नमी',
    weatherTitle: 'आज का मौसम',
    weatherSub: 'हल्के बादल • 12 किमी/घंटा हवा',
    weatherStatus: 'हवा में नमी 62%',
    sustainabilityTitle: 'स्थिरता सूचकांक',
    sustainabilitySub: 'पर्यावरण-अनुकूल श्रेणी A',
    sustainabilityTrend: 'इस मौसम में',
    dailyDecisionTitle: 'दैनिक कृषि निर्णय सहायक',
    dailyDecisionSub: 'आपके खेत के सेंसर और AI मॉडल से मिले मुख्य निर्णय',
    recTitle: 'सुझाए गए आवश्यक कार्य',
    recSub: 'आपके खेत के लिए व्यक्तिगत कृषि कदम',
    recAction: 'सलाहकार से पूछें →',
    scansTitle: 'हाल के फसल स्कैन',
    scansSub: 'नवीनतम AI छवि रोग निदान परिणाम',
    scansAction: 'सभी स्कैन इतिहास देखें →',
    healthyBadge: 'स्वस्थ',
    diseasedBadge: 'रोगग्रस्त',
    confLabel: 'सटीकता',
    alerts: [
      {
        id: 1,
        severity: 'warning',
        title: 'पुणे जिले में अगेती झुलसा (Early Blight) का उच्च जोखिम',
        message: 'पिछले 48 घंटों में 82% आर्द्रता के कारण फफूंद का प्रकोप बढ़ा है। नीचे की पत्तियों की जांच करें।',
        timestamp: '2 घंटे पहले',
        actionLabel: 'पत्ती स्कैन करें →',
        actionPage: 'disease',
      },
      {
        id: 2,
        severity: 'info',
        title: 'गुरुवार को हल्की बारिश का अनुमान',
        message: '2–5 मिमी वर्षा की संभावना है। निर्धारित ड्रिप फर्टिगेशन 24 घंटे के लिए टालें।',
        timestamp: '5 घंटे पहले',
        actionLabel: 'मौसम पूर्वानुमान देखें →',
        actionPage: 'weather',
      },
    ],
    recs: [
      {
        id: 1,
        category: 'फसल सुरक्षा',
        title: 'निवारक जैविक कवकनाशी का छिड़काव करें',
        desc: 'अगेती झुलसा से बचाव के लिए सुबह (07:00 - 10:00 बजे) कॉपर हाइड्रॉक्साइड (2.5 ग्राम/लीटर) का छिड़काव करें।',
        priority: 'उच्च',
      },
      {
        id: 2,
        category: 'सिंचाई प्रबंधन',
        title: 'बारिश के कारण सिंचाई रोकें - पानी बचाएं',
        desc: 'मिट्टी में पर्याप्त नमी (34%) है। आगामी बारिश के कारण आज पानी देने की आवश्यकता नहीं है।',
        priority: 'मध्यम',
      },
    ],
  },
  gu: {
    farmActive: 'ખેતર સક્રિય',
    healthTitle: 'સમગ્ર પાક આરોગ્ય',
    healthSub: 'ટામેટા અને સોયાબીન',
    healthTrend: 'ગયા અઠવાડિયા કરતાં',
    moistureTitle: 'જમીનમાં ભેજ',
    moistureSub: 'શ્રેષ્ઠ સ્તર (૩૦-૪૦%)',
    moistureStatus: 'પૂરતો ભેજ',
    weatherTitle: 'આજનું હવામાન',
    weatherSub: 'હળવા વાદળો • ૧૨ કિમી/કલાક',
    weatherStatus: 'હવામાં ભેજ ૬૨%',
    sustainabilityTitle: 'ટકાઉપણું સ્કોર',
    sustainabilitySub: 'પર્યાવરણ અનુકૂળ શ્રેણી A',
    sustainabilityTrend: 'આ સિઝનમાં',
    dailyDecisionTitle: 'દૈનિક ખેતી નિર્ણય સહાયક',
    dailyDecisionSub: 'તમારા સેન્સર્સ અને AI મોડેલ દ્વારા આપમેળે મળેલા જવાબો',
    recTitle: 'ભલામણ કરેલ જરૂરી પગલાં',
    recSub: 'તમારા ખેતર માટે ખાસ તૈયાર કરેલ પગલાં',
    recAction: 'સલાહકારને પૂછો →',
    scansTitle: 'તાજેતરના પાક સ્કેન',
    scansSub: 'નવીનતમ AI પાંદડા નિદાન પરિણામો',
    scansAction: 'તમામ ઇતિહાસ જુઓ →',
    healthyBadge: 'તંદુરસ્ત',
    diseasedBadge: 'રોગગ્રસ્ત',
    confLabel: 'ચોકસાઈ',
    alerts: [
      {
        id: 1,
        severity: 'warning',
        title: 'પુણે જિલ્લામાં અગેતી ઝુલસાનું ઉચ્ચ જોખમ',
        message: 'છેલ્લા ૪૮ કલાકમાં ૮૨% ભેજને કારણે ફૂગનો ફેલાવો વધ્યો છે. નીચેના પાંદડા તપાસો.',
        timestamp: '૨ કલાક પહેલાં',
        actionLabel: 'પાંદડું સ્કેન કરો →',
        actionPage: 'disease',
      },
      {
        id: 2,
        severity: 'info',
        title: 'ગુરુવારે હળવા વરસાદની આગાહી',
        message: '૨–૫ મીમી વરસાદની શક્યતા. નિર્ધારિત ટપક પિયત ૨૪ કલાક માટે મુલતવી રાખો.',
        timestamp: '૫ કલાક પહેલાં',
        actionLabel: 'હવામાન આગાહી જુઓ →',
        actionPage: 'weather',
      },
    ],
    recs: [
      {
        id: 1,
        category: 'પાક સંરક્ષણ',
        title: 'જૈવિક ફૂગનાશકનો છંટકાવ કરો',
        desc: 'અગેતી ઝુલસા સામે રક્ષણ માટે સવારે ૭ થી ૧૦ દરમિયાન કોપર હાઇડ્રોક્સાઇડ (૨.૫ ગ્રામ/લીટર) છાંટો.',
        priority: 'ઉચ્ચ',
      },
      {
        id: 2,
        category: 'સિંચાઈ',
        title: 'વરસાદની આગાહી - પાણીની બચત કરો',
        desc: 'જમીનમાં પૂરતો ભેજ (૩૪%) છે. આગામી વરસાદને કારણે પિયત આપવાની જરૂર નથી.',
        priority: 'મધ્યમ',
      },
    ],
  },
  mr: {
    farmActive: 'शेत सक्रिय',
    healthTitle: 'एकूण पीक आरोग्य',
    healthSub: 'टोमॅटो आणि सोयाबीन',
    healthTrend: 'मागील आठवड्यापेक्षा',
    moistureTitle: 'मातीतील ओलावा',
    moistureSub: 'इष्टतम श्रेणी (३०-४०%)',
    moistureStatus: 'पुरेसा ओलावा',
    weatherTitle: 'आजचे हवामान',
    weatherSub: 'अंशतः ढगाळ • १२ किमी/तास हवा',
    weatherStatus: 'आर्द्रता ६२%',
    sustainabilityTitle: 'शाश्वतता निर्देशांक',
    sustainabilitySub: 'पर्यावरण पूरक श्रेणी A',
    sustainabilityTrend: 'या हंगामात',
    dailyDecisionTitle: 'दैनंदिन शेती निर्णय सहाय्यक',
    dailyDecisionSub: 'तुमच्या शेतातील सेन्सर्स आणि AI द्वारे स्वयंचलित उत्तरे',
    recTitle: 'शिफारस केलेल्या कृती',
    recSub: 'तुमच्या शेतासाठी वैयक्तिक कृषी सल्ला',
    recAction: 'सल्लागारास विचारा →',
    scansTitle: 'अलीकडील पीक स्कॅन',
    scansSub: 'नवीनतम AI रोगनिदान निकाल',
    scansAction: 'सर्व इतिहास पहा →',
    healthyBadge: 'निरोगी',
    diseasedBadge: 'बाधित',
    confLabel: 'अचूकता',
    alerts: [
      {
        id: 1,
        severity: 'warning',
        title: 'पुणे जिल्ह्यात करपा रोगाचा उच्च धोका',
        message: 'मागील ४८ तासांत ८२% आर्द्रतेमुळे बुरशीचा प्रादुर्भाव वाढला आहे. खालची पाने तपासा.',
        timestamp: '२ तासांपूर्वी',
        actionLabel: 'पानांचे स्कॅन करा →',
        actionPage: 'disease',
      },
      {
        id: 2,
        severity: 'info',
        title: 'गुरुवारी हलक्या पावसाचा अंदाज',
        message: '२–५ मिमी पावसाची शक्यता आहे. नियोजित ठिबक खत देणे २४ तासांसाठी पुढे ढकला.',
        timestamp: '५ तासांपूर्वी',
        actionLabel: 'हवामान अंदाज पहा →',
        actionPage: 'weather',
      },
    ],
    recs: [
      {
        id: 1,
        category: 'पीक संरक्षण',
        title: 'प्रतिबंधक सेंद्रिय बुरशीनाशक फवारा',
        desc: 'करपा रोगापासून संरक्षणासाठी सकाळी ०७:०० ते १०:०० दरम्यान कॉपर हायड्रॉक्साइड फवारा.',
        priority: 'उच्च',
      },
      {
        id: 2,
        category: 'सिंचन व्यवस्थापन',
        title: 'पावसामुळे पाणी देणे पुढे ढकला',
        desc: 'मातीत पुरेसा ओलावा (३४%) आहे. आगामी पावसामुळे पाणी देण्याची गरज नाही.',
        priority: 'मध्यम',
      },
    ],
  },
};

export default function FarmerDashboard({
  setActivePage,
  lastScan,
  userProfile,
  language = 'en',
}) {
  const t = translations[language] || translations.en;
  const dText = dashboardContent[language] || dashboardContent.en;

  const cropStatus = lastScan
    ? {
        title: lastScan.status === 'healthy' ? t.q1Healthy : `${t.headingDiseased || 'Possible'} ${lastScan.class}`,
        isHealthy: lastScan.status === 'healthy',
        time: `${lastScan.date} at ${lastScan.time}`,
      }
    : {
        title: mockFarmerData.recentScans[0] ? mockFarmerData.recentScans[0].disease : t.q1NoScans,
        isHealthy: mockFarmerData.recentScans[0] ? mockFarmerData.recentScans[0].status === 'healthy' : null,
        time: mockFarmerData.recentScans[0] ? `${mockFarmerData.recentScans[0].date} at ${mockFarmerData.recentScans[0].time}` : t.q1ScanNow,
      };

  const getLocale = (lang) => {
    switch (lang) {
      case 'gu': return 'gu-IN';
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN';
      default: return 'en-IN';
    }
  };

  return (
    <div className="farmer-dashboard-container">
      {/* Welcome Banner / Header */}
      <SectionHeader
        date={new Date().toLocaleDateString(getLocale(language), {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        title={`${t.greeting || 'Namaste'}, ${userProfile?.fullName || 'Farmer'}`}
        subtitle={`${t.farmLocation || 'Farm'}: ${userProfile?.district || 'Pune'}, ${userProfile?.state || 'Maharashtra'} • ${userProfile?.primaryCrop || 'Tomato'} (${userProfile?.farmSizeAcres || '4.5'} ${t.acres || 'Acres'})`}
        badge={{ text: dText.farmActive, bg: 'var(--color-success-bg)', color: 'var(--color-success)', border: 'var(--color-success-border)' }}
        action={
          <button
            className="btn-primary"
            onClick={() => setActivePage('disease')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.95rem' }}
          >
            <ScanLine size={18} />
            <span>{t.btnCheckCrop || 'Check Crop Health'}</span>
          </button>
        }
      />

      {/* Top 4 Key Farming Metrics */}
      <div className="dashboard-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard
          title={dText.healthTitle}
          value="88%"
          subtitle={dText.healthSub}
          icon={Leaf}
          iconColor="var(--color-success)"
          iconBg="var(--color-success-bg)"
          trend="+4%"
          trendDirection="up"
          trendLabel={dText.healthTrend}
        />

        <StatCard
          title={dText.moistureTitle}
          value="34%"
          subtitle={dText.moistureSub}
          icon={Droplets}
          iconColor="var(--color-sky)"
          iconBg="var(--color-sky-tint)"
          trend={dText.moistureStatus}
          trendDirection="neutral"
        />

        <StatCard
          title={dText.weatherTitle}
          value="28°C"
          subtitle={dText.weatherSub}
          icon={CloudSun}
          iconColor="var(--color-gold)"
          iconBg="var(--color-gold-tint)"
          trend={dText.weatherStatus}
          trendDirection="neutral"
        />

        <StatCard
          title={dText.sustainabilityTitle}
          value="84 / 100"
          subtitle={dText.sustainabilitySub}
          icon={TrendingUp}
          iconColor="var(--color-primary)"
          iconBg="var(--color-primary-tint)"
          trend="+6 pts"
          trendDirection="up"
          trendLabel={dText.sustainabilityTrend}
        />
      </div>

      {/* Active Alerts Banner Section */}
      <div style={{ marginBottom: '1.5rem' }}>
        {dText.alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            severity={alert.severity}
            title={alert.title}
            message={alert.message}
            timestamp={alert.timestamp}
            actionLabel={alert.actionLabel}
            onAction={() => setActivePage(alert.actionPage)}
          />
        ))}
      </div>

      {/* 5 Core Questions Farmer Answers Grid */}
      <DashboardCard
        title={dText.dailyDecisionTitle}
        subtitle={dText.dailyDecisionSub}
        icon={BrainCircuit}
      >
        <div className="dashboard-questions-grid">
          {/* 1. Is my crop healthy? */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q1Label || '1. Is my crop healthy?'}</div>
              <div className="question-answer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {cropStatus.isHealthy === true && <CheckCircle2 size={20} color="var(--color-success)" />}
                {cropStatus.isHealthy === false && <AlertTriangle size={20} color="var(--color-danger)" />}
                <span>{cropStatus.title}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{cropStatus.time}</p>
            </div>
            <button
              onClick={() => setActivePage('disease')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <span>{lastScan ? t.q1ViewLast : t.q1ScanNow || 'Scan Leaf'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 2. Does my crop need water? */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q2Label || '2. Does my crop need water?'}</div>
              <div className="question-answer" style={{ color: 'var(--color-sky)' }}>
                {t.q2Answer || 'No watering needed today'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {t.q2Desc || 'Soil moisture is 34%. Next drip cycle tomorrow at 06:00 AM.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('irrigation')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-sky)' }}
            >
              <span>{t.q2Action || 'Irrigation Schedule'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 3. What is the weather today? */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q3Label || '3. What is the weather today?'}</div>
              <div className="question-answer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CloudSun size={20} color="var(--color-gold)" />
                <span>28°C • {t.q3Condition || 'Clear Skies'}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {t.q3Desc || 'Favorable spray window between 07:00 AM - 10:00 AM.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('weather')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <span>{t.q3Action || 'Weather Intelligence'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4. What should I do today? */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q4Label || '4. What should I do today?'}</div>
              <div className="question-answer" style={{ fontSize: '1rem' }}>
                {t.q4Answer || 'Inspect tomato foliage for blight'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {t.q4Desc || 'High humidity warning active in Pune region.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('disease')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <span>{t.q4Action || 'Take Action'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 5. Disease Warnings in your area */}
          <div className="question-card">
            <div>
              <div className="question-label">{t.q5Label || '5. Disease warnings in your area'}</div>
              <div className="question-answer" style={{ fontSize: '1rem', color: 'var(--color-warning)' }}>
                {t.q5Answer || 'Early Blight reported in Khed'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {t.q5Desc || '48 neighboring farms reported similar fungal spots.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('disease')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-warning)' }}
            >
              <span>{t.q5Action || 'View Advisory'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick Assistant Callout */}
          <div className="question-card" style={{ background: 'var(--color-primary-tint)', borderColor: 'var(--color-primary-border)' }}>
            <div>
              <div className="question-label" style={{ color: 'var(--color-primary-dark)' }}>
                {t.helpBoxTitle || 'Ask AgriSmart AI Assistant'}
              </div>
              <div className="question-answer" style={{ fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
                {t.helpBoxAnswer || 'Instant Agricultural Voice & Text Advice'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-primary-dark)' }}>
                {t.helpBoxDesc || 'Speak in Hindi, Marathi, Gujarati, or English.'}
              </p>
            </div>
            <button
              onClick={() => setActivePage('assistant')}
              className="question-action-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-primary-dark)', fontWeight: 700 }}
            >
              <span>{t.helpBoxAction || 'Chat with Assistant'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </DashboardCard>

      {/* Two Column Layout: Recommendations & Recent Scans */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* AI Recommendations */}
        <DashboardCard
          title={dText.recTitle}
          subtitle={dText.recSub}
          icon={CheckCircle2}
          action={
            <button
              onClick={() => setActivePage('assistant')}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              {dText.recAction}
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {dText.recs.map((rec) => (
              <RecommendationCard
                key={rec.id}
                category={rec.category}
                title={rec.title}
                desc={rec.desc}
                priority={rec.priority}
              />
            ))}
          </div>
        </DashboardCard>

        {/* Recent Leaf Diagnoses */}
        <DashboardCard
          title={dText.scansTitle}
          subtitle={dText.scansSub}
          icon={ScanLine}
          action={
            <button
              onClick={() => setActivePage('history')}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              {dText.scansAction}
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mockFarmerData.recentScans.map((scan) => (
              <div
                key={scan.id}
                onClick={() => setActivePage('history')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-muted)',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      {scan.crop}
                    </span>
                    <StatusBadge status={scan.status} label={scan.status === 'healthy' ? dText.healthyBadge : dText.diseasedBadge} size="sm" />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                    {scan.disease}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block' }}>
                    {scan.date}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {scan.confidence}% {dText.confLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Quick Navigation Shortcuts */}
      <DashboardCard title={t.shortcutsTitle || 'Farm Tools & Modules'}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <button
            onClick={() => setActivePage('disease')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ScanLine size={18} color="var(--color-primary)" />
              <span>{t.toolLeafCheck || 'Check Plant Disease'}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('irrigation')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Droplets size={18} color="var(--color-sky)" />
              <span>{t.toolWaterSchedule || 'Smart Irrigation'}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('crop-recommendation')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="var(--color-warning)" />
              <span>{t.toolSoilCrop || 'Crop Recommendation'}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>

          <button
            onClick={() => setActivePage('assistant')}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BrainCircuit size={18} color="var(--color-purple)" />
              <span>{t.assistant || 'Agentic Advisor'}</span>
            </div>
            <ChevronRight size={16} color="var(--text-subtle)" />
          </button>
        </div>
      </DashboardCard>
    </div>
  );
}
