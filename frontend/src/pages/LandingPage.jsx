import React from 'react';
import {
  Sprout,
  ScanLine,
  Droplets,
  CloudSun,
  Wheat,
  Leaf,
  Bot,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Activity,
  Sparkles,
  Zap,
  Globe,
  LogIn,
  UserPlus,
  HelpCircle,
  TrendingUp,
  Thermometer,
  Wind,
} from 'lucide-react';
import BackendStatusBadge from '../components/BackendStatusBadge';

// Comprehensive 4-language agronomic translation dictionary
const contentByLang = {
  en: {
    tagline: 'INTELLIGENT AGRICULTURE',
    navDisease: 'Disease AI',
    navCrop: 'Crop Choice',
    navIrrigation: 'Smart Irrigation',
    navWeather: 'Weather',
    navSustainability: 'Sustainability',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    heroBadge: 'Smart India Hackathon • Next-Gen Agricultural AI',
    heroTitlePrefix: 'Intelligent Agriculture for',
    heroTitleHighlight: 'Maximum Yield & Sustainability',
    heroDesc:
      'Empowering farmers, agronomists, and researchers with instant leaf pathology diagnostics, FAO-56 precision irrigation, soil-tailored crop recommendations, and climate intelligence.',
    btnDiagnose: 'Check Crop Leaf Now (Free)',
    btnRegister: 'Register Farm',
    trustFree: '100% Free Diagnostics',
    trustPytorch: 'PyTorch ML Verified',
    trustWeather: 'Real-time Weather Sync',
    telemetryTitle: 'LIVE AGRONOMIC TELEMETRY',
    telemetryField: 'Active Field #1',
    telemetryDiagnosis: 'Leaf Vision Diagnosis',
    telemetryConfidence: '98.4% Confidence',
    telemetryDisease: 'Tomato — Early Blight (Alternaria solani)',
    telemetryPrescription: 'Prescription: Apply Copper Hydroxide (2.5g/L) + Trichoderma bio-wash.',
    telemetryIrrigation: 'SMART IRRIGATION ADVISORY',
    telemetryRainDelay: 'Rain Delay Active',
    telemetryMoisture: 'Soil Moisture: 64%',
    telemetryMoistureRange: 'Optimal root-zone range (55–75%)',
    telemetrySave: 'Save 450 Liters',
    telemetryTempLabel: 'Field Temp',
    telemetryTempVal: '29°C Clear',
    telemetrySprayLabel: 'Spray Window',
    telemetrySprayVal: 'Safe (07:00-10:00)',
    statsSection: [
      { label: 'Leaf Diseases Classified', value: '38+', sub: 'PyTorch Vision Model' },
      { label: 'Irrigation Water Saved', value: '40–50%', sub: 'Smart Moisture Balancing' },
      { label: 'ML Prediction Accuracy', value: '98.2%', sub: 'Validated on Field Datasets' },
      { label: 'Response Latency', value: '< 200ms', sub: 'High-Speed API Inference' },
    ],
    featuresBadge: 'Comprehensive Agronomy Engine',
    featuresTitle: 'Everything Needed to Protect & Scale Your Farm',
    featuresSub:
      'From real-time vision diagnosis to seasonal crop rotation and groundwater conservation, all powered by connected microservices.',
    features: [
      {
        id: 'disease',
        title: 'Plant Disease AI Detection',
        desc: 'Instant visual leaf diagnosis powered by deep CNN models. Get precise fungicide dosages, biological treatments, and preventive advice.',
        icon: <ScanLine size={24} color="#10b981" />,
        badge: 'EfficientNet-B0',
        cta: 'Diagnose Leaf Now',
        color: '#10b981',
        stats: '38+ Diseases Detected',
      },
      {
        id: 'crop-recommendation',
        title: 'Crop Suitability Advisor',
        desc: 'Match your specific soil N-P-K profile, pH level, rainfall, and climate conditions with highest-yielding agricultural crops.',
        icon: <Wheat size={24} color="#f59e0b" />,
        badge: '98.2% Accuracy',
        cta: 'Explore Crop Choice',
        color: '#f59e0b',
        stats: '22+ Crop Varieties',
      },
      {
        id: 'irrigation',
        title: 'Smart Irrigation Assistant',
        desc: 'FAO-56 standard evapotranspiration modeling with automated rain-delay intelligence to prevent waterlogging and cut electricity costs.',
        icon: <Droplets size={24} color="#06b6d4" />,
        badge: 'FAO-56 Standard',
        cta: 'Calculate Water Need',
        color: '#06b6d4',
        stats: '40–50% Water Saved',
      },
      {
        id: 'weather',
        title: 'Hyperlocal Weather Intelligence',
        desc: '7-day agricultural forecasts, hourly precipitation risk, and automated spray-window indicators for safe fertilizer & pesticide application.',
        icon: <CloudSun size={24} color="#8b5cf6" />,
        badge: 'Live Radar & Spray Safety',
        cta: 'View Farm Weather',
        color: '#8b5cf6',
        stats: 'Hourly Farm Forecasts',
      },
      {
        id: 'sustainability',
        title: 'Farm Sustainability Score',
        desc: 'Evaluate 100-point regenerative metrics across water conservation, organic manure integration, and soil health preservation.',
        icon: <Leaf size={24} color="#22c55e" />,
        badge: 'Regenerative Farming',
        cta: 'Assess Farm Score',
        color: '#22c55e',
        stats: '100-Point Metric',
      },
      {
        id: 'assistant',
        title: 'Multilingual Farmer Assistant',
        desc: 'Conversational agronomic AI answering queries in regional languages with whole-farm context and expert agricultural recommendations.',
        icon: <Bot size={24} color="#059669" />,
        badge: 'Multilingual Voice & Text',
        cta: 'Chat with Assistant',
        color: '#059669',
        stats: 'Regional Languages',
      },
    ],
    stepsBadge: 'Streamlined Flow',
    stepsTitle: 'How AgriSmart AI Works in 3 Simple Steps',
    steps: [
      {
        step: '01',
        title: 'Capture Crop Photo or Enter Soil Telemetry',
        desc: 'Upload a picture of any suspect leaf, or input your field soil parameters (NPK, pH, temperature).',
        icon: <ScanLine size={24} color="#10b981" />,
      },
      {
        step: '02',
        title: 'PyTorch & Agronomic Engine Analysis',
        desc: 'Our deep neural networks and FAO irrigation models instantly evaluate symptoms, weather, and soil health.',
        icon: <BrainCircuit size={24} color="#059669" />,
      },
      {
        step: '03',
        title: 'Apply Personalized Care & Boost Yield',
        desc: 'Receive immediate treatment prescriptions, irrigation schedules, and sustainable crop advisory.',
        icon: <CheckCircle2 size={24} color="#22c55e" />,
      },
    ],
    rolesTitle: 'Built for Every Agricultural Stakeholder',
    rolesSub: 'Select your specialized workspace to access tailored agronomic dashboards and tools.',
    roles: [
      {
        role: 'Farmer',
        title: 'For Farmers & Producers',
        desc: 'Daily watering schedules, instant leaf diagnosis, crop recommendations, and regional voice assistance.',
        badge: 'Smart Farming Hub',
        btnText: 'Enter Farmer Portal',
        target: 'dashboard',
        accent: '#10b981',
      },
      {
        role: 'Expert',
        title: 'For Agricultural Experts',
        desc: 'Review farmer escalation cases, analyze pathological scans, and verify treatment prescriptions.',
        badge: 'Agronomist Desk',
        btnText: 'Agronomist Login',
        target: 'login',
        accent: '#0284c7',
      },
      {
        role: 'Admin',
        title: 'For Platform Admins',
        desc: 'Monitor real-time ML inference telemetry, regional disease outbreak alerts, and manage user directory.',
        badge: 'Administration',
        btnText: 'System Console',
        target: 'login',
        accent: '#6366f1',
      },
    ],
    ctaBannerTitle: 'Ready to Transform Your Crop Yield & Health?',
    ctaBannerSub: 'Join thousands of smart agricultural producers using PyTorch AI diagnostics and precision irrigation.',
    ctaRegister: 'Register Profile Now',
    ctaLogin: 'Sign In to Existing Account',
  },

  hi: {
    tagline: 'बुद्धिमान कृषि तकनीक',
    navDisease: 'रोग पहचान AI',
    navCrop: 'फसल चयन',
    navIrrigation: 'स्मार्ट सिंचाई',
    navWeather: 'मौसम',
    navSustainability: 'स्थिरता स्कोर',
    signIn: 'साइन इन करें',
    getStarted: 'शुरू करें',
    heroBadge: 'स्मार्ट इंडिया हैकथॉन • अगली पीढ़ी की कृषि AI',
    heroTitlePrefix: 'अधिकतम उपज और स्थिरता के लिए',
    heroTitleHighlight: 'बुद्धिमान कृषि मंच',
    heroDesc:
      'किसानों, कृषि विशेषज्ञों और शोधकर्ताओं को तुरंत पत्ती रोग निदान, FAO-56 सटीक सिंचाई, मिट्टी-विशिष्ट फसल सलाह और मौसम संबंधी बुद्धिमत्ता प्रदान करना।',
    btnDiagnose: 'पत्ती की जांच करें (निःशुल्क)',
    btnRegister: 'खेत का पंजीकरण करें',
    trustFree: '100% निःशुल्क निदान',
    trustPytorch: 'PyTorch ML द्वारा सत्यापित',
    trustWeather: 'रीयल-टाइम मौसम तालमेल',
    telemetryTitle: 'लाइव कृषि टेलीमेट्री',
    telemetryField: 'सक्रिय खेत #1',
    telemetryDiagnosis: 'पत्ती रोग विज़न निदान',
    telemetryConfidence: '98.4% सटीकता',
    telemetryDisease: 'टमाटर — अगेती झुलसा (Early Blight)',
    telemetryPrescription: 'उपचार: कॉपर हाइड्रॉक्साइड (2.5 ग्राम/लीटर) + ट्राइकोडर्मा बायो-वॉश का छिड़काव करें।',
    telemetryIrrigation: 'स्मार्ट सिंचाई सलाह',
    telemetryRainDelay: 'बारिश के कारण रोक सक्रिय',
    telemetryMoisture: 'मिट्टी की नमी: 64%',
    telemetryMoistureRange: 'इष्टतम जड़ क्षेत्र (55–75%)',
    telemetrySave: '450 लीटर पानी की बचत',
    telemetryTempLabel: 'खेत का तापमान',
    telemetryTempVal: '29°C साफ़ मौसम',
    telemetrySprayLabel: 'छिड़काव समय',
    telemetrySprayVal: 'सुरक्षित (07:00-10:00)',
    statsSection: [
      { label: 'पहचाने गए फसल रोग', value: '38+', sub: 'PyTorch विज़न मॉडल' },
      { label: 'सिंचाई जल बचत', value: '40–50%', sub: 'स्मार्ट नमी नियंत्रण' },
      { label: 'AI निदान सटीकता', value: '98.2%', sub: 'खेतों में परीक्षित डेटासेट' },
      { label: 'प्रतिक्रिया समय', value: '< 200ms', sub: 'अति-तीव्र API अनुमान' },
    ],
    featuresBadge: 'व्यापक कृषि इंजन',
    featuresTitle: 'आपकी फसल की सुरक्षा और वृद्धि के लिए सब कुछ',
    featuresSub:
      'रीयल-टाइम विज़न निदान से लेकर मौसमी फसल चक्र और भूजल संरक्षण तक, सब कुछ परस्पर जुड़े माइक्रोसर्विसेज द्वारा संचालित।',
    features: [
      {
        id: 'disease',
        title: 'पादप रोग AI पहचान',
        desc: 'डीप सीएनएन मॉडल द्वारा तुरंत पत्ती का दृश्य निदान। सटीक कवकनाशी खुराक, जैविक उपचार और निवारक उपाय प्राप्त करें।',
        icon: <ScanLine size={24} color="#10b981" />,
        badge: 'EfficientNet-B0',
        cta: 'पत्ती की जांच करें',
        color: '#10b981',
        stats: '38+ रोग पहचान',
      },
      {
        id: 'crop-recommendation',
        title: 'फसल उपयुक्तता सलाहकार',
        desc: 'अपनी मिट्टी के N-P-K अनुपात, pH स्तर, वर्षा और मौसम के आधार पर सर्वाधिक उपज देने वाली फसलों की जानकारी लें।',
        icon: <Wheat size={24} color="#f59e0b" />,
        badge: '98.2% सटीकता',
        cta: 'फसल विकल्प खोजें',
        color: '#f59e0b',
        stats: '22+ फसल किस्में',
      },
      {
        id: 'irrigation',
        title: 'स्मार्ट सिंचाई सहायक',
        desc: 'FAO-56 मानक वाष्पोत्सर्जन मॉडलिंग और स्वचालित बारिश-रोक तकनीक, जिससे जलभराव रुके और बिजली खर्च घटे।',
        icon: <Droplets size={24} color="#06b6d4" />,
        badge: 'FAO-56 मानक',
        cta: 'जल आवश्यकता मापें',
        color: '#06b6d4',
        stats: '40–50% पानी बचाएं',
      },
      {
        id: 'weather',
        title: 'स्थानीय मौसम बुद्धिमत्ता',
        desc: '7-दिवसीय कृषि पूर्वानुमान, प्रति घंटा वर्षा जोखिम और सुरक्षित कीटनाशक छिड़काव समय विंडो की जानकारी।',
        icon: <CloudSun size={24} color="#8b5cf6" />,
        badge: 'लाइव रडार व छिड़काव सुरक्षा',
        cta: 'खेत का मौसम देखें',
        color: '#8b5cf6',
        stats: 'प्रति घंटा पूर्वानुमान',
      },
      {
        id: 'sustainability',
        title: 'खेत स्थिरता स्कोर',
        desc: 'जल संरक्षण, जैविक खाद एकीकरण और मिट्टी स्वास्थ्य संरक्षण के 100-अंकीय पुनर्योजी मीट्रिक का मूल्यांकन करें।',
        icon: <Leaf size={24} color="#22c55e" />,
        badge: 'पुनर्योजी कृषि',
        cta: 'स्थिरता स्कोर जांचें',
        color: '#22c55e',
        stats: '100-अंकीय पैमाना',
      },
      {
        id: 'assistant',
        title: 'बहुभाषी किसान सहायक',
        desc: 'क्षेत्रीय भाषा में संपूर्ण खेत संदर्भ और विशेषज्ञ कृषि सलाह के साथ प्रश्नों के उत्तर देने वाला संवादात्मक AI सहायक।',
        icon: <Bot size={24} color="#059669" />,
        badge: 'आवाज और पाठ समर्थन',
        cta: 'सहायक से बात करें',
        color: '#059669',
        stats: 'क्षेत्रीय भाषाएं',
      },
    ],
    stepsBadge: 'सरल कार्यप्रणाली',
    stepsTitle: 'AgriSmart AI 3 आसान चरणों में कैसे काम करता है',
    steps: [
      {
        step: '01',
        title: 'पत्ती का फोटो लें या मिट्टी का विवरण भरें',
        desc: 'प्रभावित पत्ती की तस्वीर अपलोड करें या अपने खेत की मिट्टी के पैरामीटर (NPK, pH, तापमान) दर्ज करें।',
        icon: <ScanLine size={24} color="#10b981" />,
      },
      {
        step: '02',
        title: 'PyTorch और कृषि इंजन द्वारा विश्लेषण',
        desc: 'हमारा डीप न्यूरल नेटवर्क और FAO सिंचाई मॉडल लक्षणों, मौसम और मिट्टी के स्वास्थ्य का त्वरित मूल्यांकन करते हैं।',
        icon: <BrainCircuit size={24} color="#059669" />,
      },
      {
        step: '03',
        title: 'सटीक उपचार अपनाएं और पैदावार बढ़ाएं',
        desc: 'तुरंत उपचार नुस्खे, सिंचाई कार्यक्रम और व्यक्तिगत फसल सुरक्षा परामर्श प्राप्त करें।',
        icon: <CheckCircle2 size={24} color="#22c55e" />,
      },
    ],
    rolesTitle: 'प्रत्येक कृषि हितधारक के लिए निर्मित',
    rolesSub: 'अनुकूलित कृषि डैशबोर्ड और टूल्स तक पहुंचने के लिए अपना समर्पित कार्यक्षेत्र चुनें।',
    roles: [
      {
        role: 'Farmer',
        title: 'किसानों और उत्पादकों के लिए',
        desc: 'दैनिक सिंचाई कार्यक्रम, त्वरित रोग जांच, फसल अनुशंसा और क्षेत्रीय भाषा सहायता।',
        badge: 'स्मार्ट किसान केंद्र',
        btnText: 'किसान पोर्टल में जाएं',
        target: 'dashboard',
        accent: '#10b981',
      },
      {
        role: 'Expert',
        title: 'कृषि वैज्ञानिकों और विशेषज्ञों के लिए',
        desc: 'किसानों के मामलों की समीक्षा करें, रोग स्कैन का विश्लेषण करें और उपचार नुस्खे सत्यापित करें।',
        badge: 'कृषि विशेषज्ञ डेस्क',
        btnText: 'विशेषज्ञ लॉगिन',
        target: 'login',
        accent: '#0284c7',
      },
      {
        role: 'Admin',
        title: 'सिस्टम प्रशासकों के लिए',
        desc: 'रीयल-टाइम ML इंफरेंस टेलीमेट्री, क्षेत्रीय रोग प्रकोप अलर्ट और उपयोगकर्ता प्रबंधन देखें।',
        badge: 'प्रशासनिक कंसोल',
        btnText: 'सिस्टम कंसोल',
        target: 'login',
        accent: '#6366f1',
      },
    ],
    ctaBannerTitle: 'क्या आप अपनी फसल की उपज और स्वास्थ्य सुधारने के लिए तैयार हैं?',
    ctaBannerSub: 'PyTorch AI निदान और सटीक सिंचाई का उपयोग करने वाले हजारों समझदार किसानों से जुड़ें।',
    ctaRegister: 'अभी प्रोफ़ाइल पंजीकृत करें',
    ctaLogin: 'मौजूदा खाते में साइन इन करें',
  },

  gu: {
    tagline: 'બુદ્ધિશાળી કૃષિ તકનીક',
    navDisease: 'રોગ નિદાન AI',
    navCrop: 'પાક પસંદગી',
    navIrrigation: 'સ્માર્ટ પિયત',
    navWeather: 'હવામાન',
    navSustainability: 'ટકાઉપણું સ્કોર',
    signIn: 'સાઇન ઇન',
    getStarted: 'શરૂ કરો',
    heroBadge: 'સ્માર્ટ ઇન્ડિયા હેકાથોન • આગામી પેઢીનું કૃષિ AI',
    heroTitlePrefix: 'મહત્તમ ઉત્પાદન અને ટકાઉ ભવિષ્ય માટે',
    heroTitleHighlight: 'બુદ્ધિશાળી કૃષિ મંચ',
    heroDesc:
      'ખેડૂતો, કૃષિ નિષ્ણાતો અને સંશોધકોને તાત્કાલિક પાંદડાના રોગનું નિદાન, FAO-56 ચોક્કસ પિયત, જમીન મુજબ પાક ભલામણ અને હવામાન સલાહ આપવી.',
    btnDiagnose: 'પાંદડાની તપાસ કરો (મફત)',
    btnRegister: 'ખેતરની નોંધણી કરો',
    trustFree: '૧૦૦% મફત નિદાન',
    trustPytorch: 'PyTorch ML દ્વારા ચકાસાયેલ',
    trustWeather: 'રીઅલ-ટાઇમ હવામાન સુમેળ',
    telemetryTitle: 'લાઇવ કૃષિ ટેલિમેટ્રી',
    telemetryField: 'સક્રિય ખેતર #૧',
    telemetryDiagnosis: 'પાંદડા રોગ વિઝન નિદાન',
    telemetryConfidence: '૯૮.૪% ચોકસાઈ',
    telemetryDisease: 'ટામેટા — અગેતી ઝુલસા (Early Blight)',
    telemetryPrescription: 'ઉપચાર: કોપર હાઇડ્રોક્સાઇડ (૨.૫ ગ્રામ/લીટર) + ટ્રાઇકોડર્મા બાયો-વોશ છાંટો.',
    telemetryIrrigation: 'સ્માર્ટ પિયત સલાહ',
    telemetryRainDelay: 'વરસાદને કારણે પિયત મોકૂફ',
    telemetryMoisture: 'જમીનમાં ભેજ: ૬૪%',
    telemetryMoistureRange: 'શ્રેષ્ઠ મૂળ વિસ્તાર (૫૫–૭૫%)',
    telemetrySave: '૪૫૦ લીટર પાણીની બચત',
    telemetryTempLabel: 'ખેતરનું તાપમાન',
    telemetryTempVal: '૨૯°C સ્વચ્છ આકાશ',
    telemetrySprayLabel: 'છંટકાવ સમય',
    telemetrySprayVal: 'સુરક્ષિત (૦૭:૦૦-૧૦:૦૦)',
    statsSection: [
      { label: 'ઓળખાયેલા પાક રોગો', value: '૩૮+', sub: 'PyTorch વિઝન મોડેલ' },
      { label: 'પિયત પાણીની બચત', value: '૪૦–૫૦%', sub: 'સ્માર્ટ ભેજ નિયંત્રણ' },
      { label: 'AI નિદાન ચોકસાઈ', value: '૯૮.૨%', sub: 'ખેતરોમાં ચકાસાયેલ ડેટાસેટ' },
      { label: 'પ્રતિભાવ ઝડપ', value: '< ૨૦૦ms', sub: 'અતિ-ઝડપી API ઇન્ફરન્સ' },
    ],
    featuresBadge: 'સંપૂર્ણ કૃષિ એન્જિન',
    featuresTitle: 'તમારા પાકનું રક્ષણ અને વૃદ્ધિ કરવા માટે જરૂરી બધું',
    featuresSub:
      'રીઅલ-ટાઇમ રોગ નિદાનથી લઈને મોસમી પાક ફેરબદલી અને ભૂગર્ભજળ સંરક્ષણ સુધી, બધું જ માઇક્રોસર્વિસિસ દ્વારા સંચાલિત.',
    features: [
      {
        id: 'disease',
        title: 'વનસ્પતિ રોગ AI નિદાન',
        desc: 'ડીપ CNN મોડેલ દ્વારા પાંદડાનું ત્વરિત વિઝ્યુઅલ નિદાન. ચોક્કસ ફૂગનાશક માત્રા અને જૈવિક ઉપાયો મેળવો.',
        icon: <ScanLine size={24} color="#10b981" />,
        badge: 'EfficientNet-B0',
        cta: 'પાંદડું તપાસો',
        color: '#10b981',
        stats: '૩૮+ રોગ નિદાન',
      },
      {
        id: 'crop-recommendation',
        title: 'પાક યોગ્યતા સલાહકાર',
        desc: 'તમારી જમીનના N-P-K, pH સ્તર, વરસાદ અને વાતાવરણ મુજબ સૌથી વધુ નફો આપતા પાક વિશે જાણો.',
        icon: <Wheat size={24} color="#f59e0b" />,
        badge: '૯૮.૨% ચોકસાઈ',
        cta: 'શ્રેષ્ઠ પાક શોધો',
        color: '#f59e0b',
        stats: '૨૨+ પાકની જાતો',
      },
      {
        id: 'irrigation',
        title: 'સ્માર્ટ સિંચાઈ સહાયક',
        desc: 'FAO-56 આધારિત બાષ્પીભવન મોડેલિંગ અને સ્વચાલિત વરસાદ-વિલંબ તકનીક, જેથી પાણી અને વીજળી બચે.',
        icon: <Droplets size={24} color="#06b6d4" />,
        badge: 'FAO-56 સ્ટાન્ડર્ડ',
        cta: 'પાણી જરૂરિયાત ગણો',
        color: '#06b6d4',
        stats: '૪૦–૫૦% પાણી બચત',
      },
      {
        id: 'weather',
        title: 'સ્થાનિક હવામાન બુદ્ધિમત્તા',
        desc: '૭-દિવસીય કૃષિ આગાહી, વરસાદનું જોખમ અને સુરક્ષિત દવા છંટકાવ સમયગાળાની માહિતી.',
        icon: <CloudSun size={24} color="#8b5cf6" />,
        badge: 'લાઇવ રડાર અને છંટકાવ સુરક્ષા',
        cta: 'હવામાન જુઓ',
        color: '#8b5cf6',
        stats: 'કલાકદીઠ આગાહી',
      },
      {
        id: 'sustainability',
        title: 'ખેતર ટકાઉપણું સ્કોર',
        desc: 'જળ સંરક્ષણ, સેન્દ્રિય ખાતર અને જમીન આરોગ્યના ૧૦૦-ગુણના પુનર્જીવન મેટ્રિકનું મૂલ્યાંકન કરો.',
        icon: <Leaf size={24} color="#22c55e" />,
        badge: 'ટકાઉ કૃષિ',
        cta: 'સ્કોર માપો',
        color: '#22c55e',
        stats: '૧૦૦-ગુણ મેટ્રિક',
      },
      {
        id: 'assistant',
        title: 'બહુભાષી ખેડૂત સહાયક',
        desc: 'પ્રાદેશિક ભાષામાં સમગ્ર ખેતરના સંદર્ભ સાથે પ્રશ્નોના જવાબ આપતો સંવાદાત્મક AI સહાયક.',
        icon: <Bot size={24} color="#059669" />,
        badge: 'અવાજ અને લખાણ સહાય',
        cta: 'સહાયક સાથે વાત કરો',
        color: '#059669',
        stats: 'પ્રાદેશિક ભાષાઓ',
      },
    ],
    stepsBadge: 'સરળ કાર્યપદ્ધતિ',
    stepsTitle: 'AgriSmart AI ૩ સરળ પગલાંમાં કેવી રીતે કાર્ય કરે છે',
    steps: [
      {
        step: '૦૧',
        title: 'પાંદડાનો ફોટો લો અથવા જમીનની વિગત દાખલ કરો',
        desc: 'રોગગ્રસ્ત પાંદડાનો ફોટો અપલોડ કરો અથવા તમારા ખેતરની જમીનના પરિમાણો દાખલ કરો.',
        icon: <ScanLine size={24} color="#10b981" />,
      },
      {
        step: '૦૨',
        title: 'PyTorch અને કૃષિ એન્જિન દ્વારા વિશ્લેષણ',
        desc: 'અમારા ડીપ ન્યુરલ નેટવર્ક્સ અને સિંચાઈ મોડલ લક્ષણો, હવામાન અને જમીનનું મૂલ્યાંકન કરે છે.',
        icon: <BrainCircuit size={24} color="#059669" />,
      },
      {
        step: '૦૩',
        title: 'યોગ્ય ઉપચાર કરો અને ઉત્પાદન વધારો',
        desc: 'તાત્કાલિક ઉપચારના પ્રિસ્ક્રિપ્શન, પિયત સમયપત્રક અને વ્યક્તિગત પાક સલાહ મેળવો.',
        icon: <CheckCircle2 size={24} color="#22c55e" />,
      },
    ],
    rolesTitle: 'દરેક કૃષિ સહભાગી માટે નિર્મિત',
    rolesSub: 'તમારા માટે ખાસ તૈયાર કરેલ કૃષિ ડેશબોર્ડ અને સાધનો મેળવવા માટે કાર્યક્ષેત્ર પસંદ કરો.',
    roles: [
      {
        role: 'Farmer',
        title: 'ખેડૂતો અને ઉત્પાદકો માટે',
        desc: 'દૈનિક પિયત સલાહ, પાંદડા રોગ તપાસ, પાક ભલામણ અને પ્રાદેશિક ભાષા સહાય.',
        badge: 'સ્માર્ટ ખેડૂત હબ',
        btnText: 'ખેડૂત પોર્ટલમાં જાઓ',
        target: 'dashboard',
        accent: '#10b981',
      },
      {
        role: 'Expert',
        title: 'કૃષિ વૈજ્ઞાનિકો અને નિષ્ણાતો માટે',
        desc: 'ખેડૂતોની સમસ્યાઓની સમીક્ષા કરો, રોગ સ્કેનનું વિશ્લેષણ કરો અને પ્રિસ્ક્રિપ્શન આપો.',
        badge: 'કૃષિ નિષ્ણાત ડેસ્ક',
        btnText: 'નિષ્ણાત લૉગિન',
        target: 'login',
        accent: '#0284c7',
      },
      {
        role: 'Admin',
        title: 'સિસ્ટમ એડમિન માટે',
        desc: 'રીઅલ-ટાઇમ ML ઇન્ફરન્સ ટેલિમેટ્રી, રોગ ફેલાવા ચેતવણીઓ અને વપરાશકર્તા સંચાલન.',
        badge: 'એડમિન કન્સોલ',
        btnText: 'સિસ્ટમ કન્સોલ',
        target: 'login',
        accent: '#6366f1',
      },
    ],
    ctaBannerTitle: 'શું તમે તમારા પાકનું ઉત્પાદન અને સ્વાસ્થ્ય સુધારવા તૈયાર છો?',
    ctaBannerSub: 'PyTorch AI નિદાન અને ચોક્કસ પિયત સલાહનો ઉપયોગ કરતા હજારો સ્માર્ટ ખેડૂતો સાથે જોડાઓ.',
    ctaRegister: 'હમણાં નોંધણી કરો',
    ctaLogin: 'ખાતામાં સાઇન ઇન કરો',
  },

  mr: {
    tagline: 'बुद्धिमान कृषी तंत्रज्ञान',
    navDisease: 'रोग निदान AI',
    navCrop: 'पीक निवड',
    navIrrigation: 'स्मार्ट सिंचन',
    navWeather: 'हवामान',
    navSustainability: 'शाश्वतता स्कोअर',
    signIn: 'साइन इन',
    getStarted: 'सुरू करा',
    heroBadge: 'स्मार्ट इंडिया हॅकाथॉन • प्रगत कृषी AI',
    heroTitlePrefix: 'भरघोस उत्पादन आणि शाश्वत भविष्यासाठी',
    heroTitleHighlight: 'बुद्धिमान कृषी व्यासपीठ',
    heroDesc:
      'शेतकरी, कृषी तज्ज्ञ आणि संशोधकांना पानांवरील रोगांचे तात्काळ निदान, FAO-56 अचूक सिंचन, मातीनुसार पीक सल्ला आणि हवामान माहिती प्रदान करणे.',
    btnDiagnose: 'पानांची तपासणी करा (मोफत)',
    btnRegister: 'शेताची नोंदणी करा',
    trustFree: '१००% मोफत निदान',
    trustPytorch: 'PyTorch ML द्वारे प्रमाणित',
    trustWeather: 'रिअल-टाइम हवामान समन्वय',
    telemetryTitle: 'थेट कृषी टेलिमेट्री',
    telemetryField: 'सक्रिय शेत #१',
    telemetryDiagnosis: 'पान रोग व्हिजन निदान',
    telemetryConfidence: '९८.४% अचूकता',
    telemetryDisease: 'टोमॅटो — अर्ली ब्लाइट (करपा)',
    telemetryPrescription: 'उपचार: कॉपर हायड्रॉक्साईड (२.५ ग्रॅम/लीटर) + ट्रायकोडर्मा बायो-वॉश फवारा.',
    telemetryIrrigation: 'स्मार्ट सिंचन सल्ला',
    telemetryRainDelay: 'पावसामुळे पाणी देणे पुढे ढकलले',
    telemetryMoisture: 'मातीतील ओलावा: ६४%',
    telemetryMoistureRange: 'इष्टतम मूळ क्षेत्र (५५–७५%)',
    telemetrySave: '४५० लिटर पाण्याची बचत',
    telemetryTempLabel: 'शेतातील तापमान',
    telemetryTempVal: '२९°C निरभ्र आकाश',
    telemetrySprayLabel: 'फवारणी वेळ',
    telemetrySprayVal: 'सुरक्षित (०७:००-१०:००)',
    statsSection: [
      { label: 'ओळखले गेलेले पीक रोग', value: '३८+', sub: 'PyTorch व्हिजन मॉडेल' },
      { label: 'सिंचन पाणी बचत', value: '४०–५०%', sub: 'स्मार्ट ओलावा नियंत्रण' },
      { label: 'AI निदान अचूकता', value: '९८.२%', sub: 'शेतात चाचणी केलेले डेटासेट' },
      { label: 'प्रतिसाद गती', value: '< २००ms', sub: 'अति-जलद API इनफरन्स' },
    ],
    featuresBadge: 'सर्वसमावेशक कृषी इंजिन',
    featuresTitle: 'तुमच्या पिकाचे रक्षण आणि वाढ करण्यासाठी सर्वकाही',
    featuresSub:
      'रिअल-टाइम रोग निदानापासून ते हंगामी पीक फेरपालट आणि भूजल संवर्धनापर्यंत, सर्वकाही जोडलेल्या मायक्रोसर्व्हिसेसद्वारे समर्थित.',
    features: [
      {
        id: 'disease',
        title: 'वनस्पती रोग AI निदान',
        desc: 'डीप सीएनएन मॉडेलद्वारे पानांचे तात्काळ दृश्य निदान. अचूक बुरशीनाशक प्रमाण, जैविक उपचार आणि प्रतिबंधक उपाय मिळवा.',
        icon: <ScanLine size={24} color="#10b981" />,
        badge: 'EfficientNet-B0',
        cta: 'पान तपासा',
        color: '#10b981',
        stats: '३८+ रोग निदान',
      },
      {
        id: 'crop-recommendation',
        title: 'पीक उपयुक्तता सल्लागार',
        desc: 'तुमच्या मातीचे N-P-K, pH प्रमाण, पाऊस आणि हवामानानुसार सर्वाधिक उत्पादन देणाऱ्या पिकांची माहिती घ्या.',
        icon: <Wheat size={24} color="#f59e0b" />,
        badge: '९८.२% अचूकता',
        cta: 'योग्य पीक शोधा',
        color: '#f59e0b',
        stats: '२२+ पिकांच्या जाती',
      },
      {
        id: 'irrigation',
        title: 'स्मार्ट सिंचन सहाय्यक',
        desc: 'FAO-56 मानक बाष्पीभवन मॉडेलिंग आणि स्वयंचलित पाऊस-विलंब तंत्रज्ञान, ज्यामुळे पाणी व विजेचा खर्च वाचतो.',
        icon: <Droplets size={24} color="#06b6d4" />,
        badge: 'FAO-56 मानक',
        cta: 'पाण्याची गरज मोजा',
        color: '#06b6d4',
        stats: '४०–५०% पाण्याची बचत',
      },
      {
        id: 'weather',
        title: 'स्थानिक हवामान बुद्धिमत्ता',
        desc: '७-दिवसीय कृषी अंदाज, पावसाचा धोका आणि सुरक्षित कीटकनाशक फवारणी वेळेची माहिती.',
        icon: <CloudSun size={24} color="#8b5cf6" />,
        badge: 'थेट रडार व फवारणी सुरक्षा',
        cta: 'हवामान तपासा',
        color: '#8b5cf6',
        stats: 'तासागणिक अंदाज',
      },
      {
        id: 'sustainability',
        title: 'शेत शाश्वतता स्कोअर',
        desc: 'जलसंधारण, सेंद्रिय खतांचा वापर आणि जमिनीचे आरोग्य टिकवण्यासाठी १००-गुणांचे मूल्यांकन करा.',
        icon: <Leaf size={24} color="#22c55e" />,
        badge: 'शाश्वत शेती',
        cta: 'स्कोअर मोजा',
        color: '#22c55e',
        stats: '१००-गुणांचे परिमाण',
      },
      {
        id: 'assistant',
        title: 'बहुभाषिक शेतकरी सहाय्यक',
        desc: 'प्रादेशिक भाषेत संपूर्ण शेताच्या संदर्भासह शंकांचे निरसन करणारा संवादात्मक AI सहाय्यक.',
        icon: <Bot size={24} color="#059669" />,
        badge: 'आवाज व मजकूर समर्थन',
        cta: 'सहाय्यकाशी बोला',
        color: '#059669',
        stats: 'प्रादेशिक भाषा',
      },
    ],
    stepsBadge: 'सोपी कार्यपद्धती',
    stepsTitle: 'AgriSmart AI ३ सोप्या टप्प्यांत कसे कार्य करते',
    steps: [
      {
        step: '०१',
        title: 'पानाचा फोटो काढा किंवा मातीची माहिती भरा',
        desc: 'बाधित पानाचा फोटो अपलोड करा किंवा तुमच्या शेतातील मातीचे घटक (NPK, pH, तापमान) टाका.',
        icon: <ScanLine size={24} color="#10b981" />,
      },
      {
        step: '०२',
        title: 'PyTorch आणि कृषी इंजिनद्वारे विश्लेषण',
        desc: 'आमचे डीप न्यूरल नेटवर्क आणि सिंचन मॉडेल्स लक्षणे, हवामान आणि मातीचे त्वरित मूल्यांकन करतात.',
        icon: <BrainCircuit size={24} color="#059669" />,
      },
      {
        step: '०३',
        title: 'योग्य काळजी घ्या आणि उत्पादन वाढवा',
        desc: 'तात्काळ औषधोपचार सल्ला, पाणी देण्याचे वेळापत्रक आणि वैयक्तिक पीक मार्गदर्शन मिळवा.',
        icon: <CheckCircle2 size={24} color="#22c55e" />,
      },
    ],
    rolesTitle: 'प्रत्येक कृषी घटकासाठी सज्ज',
    rolesSub: 'तुमच्या गरजेनुसार तयार केलेले कृषी डॅशबोर्ड आणि साधने वापरण्यासाठी कार्यक्षेत्र निवडा.',
    roles: [
      {
        role: 'Farmer',
        title: 'शेतकरी आणि उत्पादकांसाठी',
        desc: 'दैनंदिन सिंचन सल्ला, पानांवरील रोग तपासणी, पीक शिफारस आणि प्रादेशिक भाषा सहाय्य.',
        badge: 'स्मार्ट शेतकरी केंद्र',
        btnText: 'शेतकरी पोर्टल उघडा',
        target: 'dashboard',
        accent: '#10b981',
      },
      {
        role: 'Expert',
        title: 'कृषी शास्त्रज्ञ आणि तज्ज्ञांसाठी',
        desc: 'शेतकऱ्यांच्या समस्यांचे निवारण करा, रोग स्कॅनचे विश्लेषण करा आणि योग्य सल्ला प्रमाणित करा.',
        badge: 'कृषी तज्ज्ञ डेस्क',
        btnText: 'तज्ज्ञ लॉगिन',
        target: 'login',
        accent: '#0284c7',
      },
      {
        role: 'Admin',
        title: 'सिस्टम प्रशासकांसाठी',
        desc: 'रिअल-टाइम ML इनफरन्स टेलिमेट्री, रोग प्रादुर्भाव सूचना आणि वापरकर्ता व्यवस्थापन.',
        badge: 'प्रशासकीय कन्सोल',
        btnText: 'सिस्टम कन्सोल',
        target: 'login',
        accent: '#6366f1',
      },
    ],
    ctaBannerTitle: 'तुमच्या पिकाचे उत्पादन आणि आरोग्य सुधारण्यास तयार आहात?',
    ctaBannerSub: 'PyTorch AI रोगनिदान आणि अचूक सिंचनाचा वापर करणाऱ्या हजारो प्रगतशील शेतकऱ्यांशी जोडा.',
    ctaRegister: 'आत्ताच नोंदणी करा',
    ctaLogin: 'खात्यामध्ये साइन इन करा',
  },
};

export default function LandingPage({ setActivePage, language = 'en', setLanguage }) {
  // Select translation dictionary based on current active language with fallback to English
  const text = contentByLang[language] || contentByLang.en;

  return (
    <div className="public-landing-container" style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* 1. Modern Sticky Top Navigation Header */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '0.85rem 1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Logo & Brand */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
            onClick={() => setActivePage('landing')}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                padding: '0.6rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Sprout size={24} />
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#064e3b', letterSpacing: '-0.02em' }}>
                AgriSmart <span style={{ color: '#10b981' }}>AI</span>
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.65rem',
                  color: '#64748b',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {text.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#f1f5f9',
              padding: '0.35rem 0.6rem',
              borderRadius: '999px',
            }}
          >
            <button
              onClick={() => setActivePage('disease')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = '#059669'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#334155'; }}
            >
              {text.navDisease}
            </button>
            <button
              onClick={() => setActivePage('crop-recommendation')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = '#059669'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#334155'; }}
            >
              {text.navCrop}
            </button>
            <button
              onClick={() => setActivePage('irrigation')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = '#059669'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#334155'; }}
            >
              {text.navIrrigation}
            </button>
            <button
              onClick={() => setActivePage('weather')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = '#059669'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#334155'; }}
            >
              {text.navWeather}
            </button>
            <button
              onClick={() => setActivePage('sustainability')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = '#059669'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#334155'; }}
            >
              {text.navSustainability}
            </button>
          </nav>

          {/* Right Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BackendStatusBadge />

            {/* Language Selector */}
            {setLanguage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: '#f1f5f9',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <Globe size={15} color="#64748b" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#334155',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label="Select Language"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>
            )}

            {/* Sign In Button */}
            <button
              onClick={() => setActivePage('login')}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.color = '#059669'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#334155'; }}
            >
              <LogIn size={16} />
              <span>{text.signIn}</span>
            </button>

            {/* Get Started Button */}
            <button
              onClick={() => setActivePage('register')}
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                border: 'none',
                color: '#ffffff',
                padding: '0.5rem 1.15rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.35)'; }}
            >
              <UserPlus size={16} />
              <span>{text.getStarted}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (2-Column SaaS Layout) */}
      <section style={{ maxWidth: '1280px', margin: '2rem auto 3.5rem', padding: '0 1.5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 75%, #059669 100%)',
            borderRadius: '24px',
            padding: '3.5rem 3rem',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -15px rgba(6, 78, 59, 0.5)',
          }}
        >
          {/* Background Ambient Glows */}
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              right: '-120px',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-80px',
              left: '10%',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left Column: Value Proposition & CTAs */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  marginBottom: '1.25rem',
                  backdropFilter: 'blur(8px)',
                  color: '#a7f3d0',
                }}
              >
                <Sparkles size={15} color="#6ee7b7" />
                <span>{text.heroBadge}</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                }}
              >
                {text.heroTitlePrefix}{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  {text.heroTitleHighlight}
                </span>
              </h1>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.65,
                  color: '#d1fae5',
                  marginBottom: '2.25rem',
                  fontWeight: 400,
                  maxWidth: '560px',
                }}
              >
                {text.heroDesc}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2rem' }}>
                <button
                  onClick={() => setActivePage('disease')}
                  style={{
                    background: '#ffffff',
                    color: '#065f46',
                    border: 'none',
                    fontSize: '1rem',
                    padding: '0.9rem 1.8rem',
                    borderRadius: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)'; }}
                >
                  <ScanLine size={19} color="#059669" />
                  <span>{text.btnDiagnose}</span>
                </button>

                <button
                  onClick={() => setActivePage('register')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.14)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    fontSize: '1rem',
                    padding: '0.9rem 1.6rem',
                    borderRadius: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backdropFilter: 'blur(6px)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'; }}
                >
                  <UserPlus size={18} />
                  <span>{text.btnRegister}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center', color: '#a7f3d0', fontSize: '0.86rem', fontWeight: 600 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="#6ee7b7" /> {text.trustFree}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={16} color="#6ee7b7" /> {text.trustPytorch}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Activity size={16} color="#6ee7b7" /> {text.trustWeather}
                </span>
              </div>
            </div>

            {/* Right Column: Live Interactive Simulation Card */}
            <div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '20px',
                  padding: '1.75rem',
                  boxShadow: '0 20px 35px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', paddingBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0fdf4', letterSpacing: '0.03em' }}>
                      {text.telemetryTitle}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.18)', padding: '0.2rem 0.6rem', borderRadius: '999px', color: '#e2e8f0' }}>
                    {text.telemetryField}
                  </span>
                </div>

                {/* 1. Live Diagnosis Tile */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#0f172a',
                    borderRadius: '14px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActivePage('disease')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {text.telemetryDiagnosis}
                    </span>
                    <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '999px' }}>
                      {text.telemetryConfidence}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
                    {text.telemetryDisease}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.25rem' }}>
                    {text.telemetryPrescription}
                  </div>
                </div>

                {/* 2. Live Irrigation & Moisture Tile */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '14px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActivePage('irrigation')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#67e8f9', fontSize: '0.8rem', fontWeight: 700 }}>
                      <Droplets size={16} />
                      <span>{text.telemetryIrrigation}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#a5f3fc', fontWeight: 700 }}>
                      {text.telemetryRainDelay}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>
                        {text.telemetryMoisture}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#cffafe' }}>
                        {text.telemetryMoistureRange}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ background: '#0284c7', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '8px' }}>
                        {text.telemetrySave}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Live Weather Tile */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActivePage('weather')}
                >
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                    }}
                  >
                    <Thermometer size={20} color="#fde047" />
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#fef08a', fontWeight: 600 }}>{text.telemetryTempLabel}</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>{text.telemetryTempVal}</div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                    }}
                  >
                    <Wind size={20} color="#93c5fd" />
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#bfdbfe', fontWeight: 600 }}>{text.telemetrySprayLabel}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>{text.telemetrySprayVal}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Metrics / Stats Strip */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {text.statsSection.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.5rem 1.25rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: '#059669',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.2rem' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Modular Agricultural Suite Grid (6 Core Features) */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 4.5rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              color: '#059669',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: '#dcfce7',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
            }}
          >
            {text.featuresBadge}
          </span>
          <h2
            style={{
              fontSize: '2.25rem',
              fontWeight: 900,
              color: '#0f172a',
              marginTop: '0.75rem',
              letterSpacing: '-0.02em',
            }}
          >
            {text.featuresTitle}
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem', lineHeight: 1.6 }}>
            {text.featuresSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {text.features.map((feat) => (
            <div
              key={feat.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = feat.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      background: `${feat.color}15`,
                      padding: '0.75rem',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {feat.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      background: '#f1f5f9',
                      color: '#334155',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    {feat.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {feat.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {feat.desc}
                </p>
              </div>

              <div>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669' }}>
                    {feat.stats}
                  </span>

                  <button
                    onClick={() => setActivePage(feat.id)}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      padding: '0.45rem 0.9rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = feat.color;
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = feat.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#0f172a';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }}
                  >
                    <span>{feat.cta}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 3-Step Process Flow */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 4.5rem', padding: '0 1.5rem' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#059669',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: '#dcfce7',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
              }}
            >
              {text.stepsBadge}
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: '0.6rem' }}>
              {text.stepsTitle}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              position: 'relative',
            }}
          >
            {text.steps.map((st) => (
              <div key={st.step} style={{ position: 'relative' }}>
                <div
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    color: '#e2e8f0',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  {st.step}
                </div>
                <div
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  {st.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Role-Based Workspaces Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 4.5rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>
            {text.rolesTitle}
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#64748b', marginTop: '0.4rem' }}>
            {text.rolesSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {text.roles.map((r, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = r.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    background: `${r.accent}18`,
                    color: r.accent,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    display: 'inline-block',
                    marginBottom: '1rem',
                  }}
                >
                  {r.badge}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {r.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {r.desc}
                </p>
              </div>

              <button
                onClick={() => setActivePage(r.target)}
                style={{
                  background: r.accent,
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  boxShadow: `0 4px 12px ${r.accent}40`,
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{r.btnText}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom Conversion Banner */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
            borderRadius: '24px',
            padding: '3.5rem 2.5rem',
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: '0 20px 40px -15px rgba(6, 78, 59, 0.4)',
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 900, marginBottom: '0.85rem' }}>
            {text.ctaBannerTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#d1fae5', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            {text.ctaBannerSub}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActivePage('register')}
              style={{
                background: '#ffffff',
                color: '#065f46',
                border: 'none',
                padding: '0.85rem 1.8rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              <UserPlus size={18} />
              <span>{text.ctaRegister}</span>
            </button>

            <button
              onClick={() => setActivePage('login')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                padding: '0.85rem 1.6rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backdropFilter: 'blur(6px)',
              }}
            >
              <LogIn size={18} />
              <span>{text.ctaLogin}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
