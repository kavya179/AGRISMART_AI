import React, { useState, useEffect } from 'react';
import { Send, BotMessageSquare, User, Sparkles, Workflow, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Play, RotateCcw, Droplets, CloudSun, Leaf } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { chatWithFarmerAssistant, runAgenticAdvisorLoop } from '../services/api';
import { getStoredScanHistory } from '../services/historyStorage';
import { translations } from '../translations';

export default function FarmerAssistant({ onBack, language, currentLang, userProfile }) {
  const activeLang = language || currentLang || 'en';
  const t = translations[activeLang] || translations.en;

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'agentic'

  // Chat State
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'assistant',
      text: activeLang === 'gu' 
        ? 'નમસ્તે! હું તમારો એગ્રીસ્માર્ટ ખેડૂત મિત્ર છું. તમે મને ખાતર, પિયત, જૈવિક દવાઓ અથવા પાકના રોગ વિશે પૂછી શકો છો.'
        : activeLang === 'hi'
        ? 'नमस्ते! मैं आपका एग्रीस्मार्ट कृषि सहायक हूँ। आप मुझसे खाद, सिंचाई, जैविक कीटनाशक या फसल रोग के बारे में पूछ सकते हैं।'
        : activeLang === 'mr'
        ? 'नमस्कार! मी आपला अ‍ॅग्रीस्मार्ट शेती मित्र आहे. आपण मला खत नियोजन, पाणी व्यवस्थापन किंवा रोग नियंत्रणाबद्दल विचारू शकता.'
        : 'Namaste! I am your AgriSmart Farming Assistant. Ask me anything about crop diseases, watering, fertilizers, or seasonal planting in your preferred language.',
      time: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Agentic Advisor State
  const [agenticState, setAgenticState] = useState({
    crop_type: userProfile?.primaryCrop || 'Tomato',
    growth_stage: 'Flowering',
    soil_moisture: 65,
    disease_detected: 'Tomato Early Blight',
    disease_status: 'diseased',
    weather_forecast: 'Rain likely within 24 hours',
    rain_probability: 75,
    humidity: 78,
    temperature: 28,
    wind_speed: 9,
  });
  const [isLoopRunning, setIsLoopRunning] = useState(false);
  const [loopResult, setLoopResult] = useState(null);

  // Suggested Quick Questions
  const sampleQuestions = {
    en: [
      'How to treat yellow spots on my tomato leaves?',
      'When should I apply urea fertilizer to my crop?',
      'What should I do if rain is forecasted tomorrow?',
      'How to make organic neem oil spray?',
    ],
    hi: [
      'टमाटर की पत्तियों पर धब्बों का क्या उपाय है?',
      'फसल में यूरिया कब डालना चाहिए?',
      'कल बारिश की संभावना हो तो क्या करें?',
      'जैविक नीम का तेल स्प्रे कैसे बनाएं?',
    ],
    mr: [
      'टोमॅटोच्या पानांवरील डागांवर काय उपाय करावा?',
      'पिकाला युरिया खत कधी द्यावे?',
      'उद्या पाऊस असेल तर शेतात काय करावे?',
      'कडुलिंब अर्क फवारणी कशी करावी?',
    ],
    gu: [
      'ટામેટાના પાંદડા પર ટપકાં માટે શું કરવું?',
      'પાકમાં યુરિયા ખાતર ક્યારે આપવું?',
      'આવતીકાલે વરસાદ હોય તો સિંચાઈ કરવી?',
      'લીમડાના તેલનો છંટકાવ કેવી રીતે કરવો?',
    ]
  };

  const currentQuestions = sampleQuestions[activeLang] || sampleQuestions.en;

  const handleSend = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Retrieve active farm context
    const scanHistory = getStoredScanHistory();
    const lastScan = scanHistory.length > 0 ? scanHistory[0] : null;

    const farmerContext = {
      crop: userProfile?.primaryCrop || 'Tomato',
      growth_stage: 'Flowering',
      soil: 'Black Soil',
      recent_disease_prediction: lastScan ? {
        class: lastScan.class,
        status: lastScan.status,
      } : null,
      weather: {
        weather_summary: 'Partly Sunny • Good Spraying Conditions',
        primary_action: 'Delay watering if rain is likely',
      },
      irrigation_status: {
        recommended_action: 'No irrigation needed today',
        reason: 'Soil moisture is optimal for current growth stage.',
      }
    };

    try {
      const response = await chatWithFarmerAssistant(query, activeLang, farmerContext);
      let replyText = '';
      if (response && response.success && response.response) {
        replyText = response.response.reply;
      } else {
        replyText = 'For optimal crop health, maintain regular root watering without wetting foliage, and monitor lower leaves for early lesions.';
      }

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  // Run Agentic Decision Loop Simulation
  const handleRunAgenticLoop = async () => {
    setIsLoopRunning(true);
    try {
      const response = await runAgenticAdvisorLoop(agenticState);
      if (response && response.success) {
        setLoopResult(response);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoopRunning(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'agentic' && !loopResult) {
      handleRunAgenticLoop();
    }
  }, [activeTab]);

  return (
    <div>
      <PageHeader
        title={t.navAssistant || "Farmer Assistant & Agentic Advisor"}
        description="Grounded conversational assistance and demonstrable cross-module autonomous decision loop for your farm."
        onBack={onBack}
      />

      {/* Tabs Header */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('chat')}
          style={{
            background: activeTab === 'chat' ? 'var(--color-primary)' : 'var(--bg-muted)',
            color: activeTab === 'chat' ? '#ffffff' : 'var(--text-main)',
            border: 'none',
            padding: '0.6rem 1.25rem',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.92rem',
          }}
        >
          <BotMessageSquare size={16} />
          <span>Conversational Assistant</span>
        </button>

        <button
          onClick={() => setActiveTab('agentic')}
          style={{
            background: activeTab === 'agentic' ? 'var(--color-primary)' : 'var(--bg-muted)',
            color: activeTab === 'agentic' ? '#ffffff' : 'var(--text-main)',
            border: 'none',
            padding: '0.6rem 1.25rem',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.92rem',
          }}
        >
          <Workflow size={16} />
          <span>Agentic Decision Loop (8 Stages)</span>
        </button>
      </div>

      {activeTab === 'chat' ? (
        /* CONVERSATIONAL CHAT TAB */
        <div className="agri-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: '540px' }}>
          
          {/* Messages Scroll Area */}
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  gap: '0.6rem',
                  alignItems: 'flex-start',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                }}
              >
                {m.sender === 'assistant' && (
                  <div style={{ background: 'var(--color-primary-tint)', padding: '0.45rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                    <BotMessageSquare size={18} />
                  </div>
                )}

                <div
                  style={{
                    background: m.sender === 'user' ? 'var(--color-primary)' : 'var(--bg-muted)',
                    color: m.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    borderTopRightRadius: m.sender === 'user' ? '2px' : '12px',
                    borderTopLeftRadius: m.sender === 'assistant' ? '2px' : '12px',
                    fontSize: '0.92rem',
                    lineHeight: 1.5,
                  }}
                >
                  <div>{m.text}</div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      textAlign: 'right',
                      marginTop: '0.25rem',
                      color: m.sender === 'user' ? '#d8f3dc' : 'var(--text-subtle)',
                    }}
                  >
                    {m.time}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div style={{ background: 'var(--bg-muted)', padding: '0.45rem', borderRadius: '50%', color: 'var(--text-secondary)' }}>
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                <BotMessageSquare size={16} />
                <span>Consulting verified agronomic catalogs...</span>
              </div>
            )}
          </div>

          {/* Suggested Quick Questions */}
          <div style={{ margin: '0.75rem 0', display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {currentQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                style={{
                  fontSize: '0.78rem',
                  padding: '0.35rem 0.65rem',
                  background: 'var(--bg-muted)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '999px',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  minHeight: '28px',
                  cursor: 'pointer',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}
          >
            <input
              type="text"
              placeholder={
                activeLang === 'gu'
                  ? 'ખેતી સંબંધિત કોઈપણ પ્રશ્ન ગુજરાતીમાં પૂછો...'
                  : activeLang === 'hi'
                  ? 'खेती से जुड़ा कोई भी सवाल हिन्दी में पूछें...'
                  : activeLang === 'mr'
                  ? 'शेतीविषयक कोणताही प्रश्न मराठीत विचारा...'
                  : 'Ask any farming question in English, Hindi, Marathi, or Gujarati...'
              }
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              style={{ flex: 1 }}
            />

            <button type="submit" className="btn-primary" style={{ minWidth: '46px', padding: '0.65rem' }}>
              <Send size={18} />
            </button>
          </form>

        </div>
      ) : (
        /* AGENTIC DECISION LOOP TAB */
        <div>
          {/* Agentic Controls & Input Scenario Card */}
          <div className="agri-card" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-success" style={{ marginBottom: '0.3rem' }}>
                  Transparent Autonomous Pipeline
                </span>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                  Agentic Cross-Module Decision Loop
                </h3>
              </div>

              <button
                onClick={handleRunAgenticLoop}
                className="btn-primary"
                disabled={isLoopRunning}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem' }}
              >
                <Play size={16} />
                <span>{isLoopRunning ? 'Executing Loop...' : 'Trigger Decision Loop'}</span>
              </button>
            </div>

            {/* Simulated Multi-Module Parameters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', background: 'var(--bg-muted)', padding: '0.85rem', borderRadius: '8px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Crop & Stage:</span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{agenticState.crop_type} ({agenticState.growth_stage})</div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pathology Scan:</span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-danger)' }}>
                  ⚠️ {agenticState.disease_detected}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weather & Rain:</span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-sky)' }}>
                  🌧️ {agenticState.weather_forecast} ({agenticState.rain_probability}%)
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Soil Moisture:</span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  💧 {agenticState.soil_moisture}% (Adequate)
                </div>
              </div>
            </div>
          </div>

          {/* SYNTHESIZED AGENTIC DIRECTIVE BANNER */}
          {loopResult && loopResult.recommendation ? (
            <div className="agri-card" style={{ borderLeft: '6px solid var(--color-warning)', background: '#fffdfa', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge" style={{ background: '#fef3c7', color: '#92400e' }}>
                  {loopResult.recommendation.severity}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  • Synthesized at {loopResult.decision_loop_summary?.executed_at}
                </span>
              </div>

              <h2 style={{ fontSize: '1.4rem', color: '#92400e', marginBottom: '0.5rem' }}>
                {loopResult.recommendation.headline}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginTop: '0.85rem' }}>
                <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--color-sky)' }}>💧 Irrigation Action:</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                    {loopResult.recommendation.irrigation_action}
                  </p>
                </div>

                <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--color-earth)' }}>🌿 Crop Protection:</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                    {loopResult.recommendation.crop_protection_action}
                  </p>
                </div>
              </div>

              {/* Action Checklist */}
              <div style={{ marginTop: '1rem', background: 'white', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary-dark)' }}>Field Action Checklist:</strong>
                <ul style={{ margin: '0.35rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {loopResult.recommendation.action_checklist?.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          {/* 8-STAGE VISUAL DECISION TRACE */}
          <div className="agri-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Workflow size={18} />
              <span>Step-by-Step Decision Loop Trace (8 Stages)</span>
            </h3>

            {isLoopRunning ? (
              <LoadingSpinner message="Executing autonomous multi-factor reasoning loop..." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {loopResult?.decision_traces?.map((trace) => (
                  <div
                    key={trace.step}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      background: 'var(--bg-muted)',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      borderLeft: '4px solid var(--color-primary)',
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--color-primary)',
                        color: 'white',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      {trace.step}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {trace.name}
                        </span>
                        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                          {trace.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                        {trace.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
