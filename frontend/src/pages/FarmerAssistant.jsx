import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  BotMessageSquare,
  User,
  Sparkles,
  Workflow,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Play,
  RotateCcw,
  Droplets,
  CloudSun,
  Leaf,
  Trash2,
  Clock,
  Layers,
  BrainCircuit,
  MessageSquare,
  Sliders,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import DashboardCard from '../components/ui/DashboardCard';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import {
  chatWithFarmerAssistant,
  runAgenticAdvisorLoop,
  getSuggestedQuestions,
} from '../services/assistantApi';
import { getStoredScanHistory } from '../services/historyStorage';
import { translations } from '../translations';

export default function FarmerAssistant({ onBack, language = 'en', userProfile }) {
  const t = translations[language] || translations.en;
  const messagesEndRef = useRef(null);

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'agentic'

  // ==========================================
  // 1. CHAT ASSISTANT STATE
  // ==========================================
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'assistant',
      text: 'Namaste! I am your AgriSmart Farming Assistant. Ask me anything about crop diseases, watering schedules, fertilizer application, or soil management.',
      time: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = getSuggestedQuestions();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, activeTab]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    const scanHistory = getStoredScanHistory();
    const lastScan = scanHistory.length > 0 ? scanHistory[0] : null;

    const farmerContext = {
      crop: userProfile?.primaryCrop || 'Tomato',
      soil: userProfile?.soilType || 'Black Soil',
      recent_scan: lastScan ? lastScan.disease : 'Healthy Leaf',
    };

    try {
      const response = await chatWithFarmerAssistant(query, language, farmerContext);
      if (response && response.success && response.response) {
        const assistantMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: response.response.reply,
          time: response.response.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Unable to connect to the assistant service. Please check your network.',
          time: 'Now',
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'assistant',
        text: 'Chat history cleared. How can I help with your crops today?',
        time: 'Just now',
      },
    ]);
  };

  // ==========================================
  // 2. AGENTIC ADVISOR STATE
  // ==========================================
  const [agenticState, setAgenticState] = useState({
    crop_type: userProfile?.primaryCrop || 'Tomato',
    growth_stage: 'Flowering / Reproductive',
    soil_moisture: 65,
    disease_detected: 'Tomato Early Blight',
    weather_forecast: 'Rain Expected',
    rain_probability: 75,
  });

  const [isLoopRunning, setIsLoopRunning] = useState(false);
  const [loopResult, setLoopResult] = useState(null);

  const handleRunAgenticLoop = async () => {
    setIsLoopRunning(true);
    try {
      const response = await runAgenticAdvisorLoop(agenticState);
      if (response && response.success && response.loop_result) {
        setLoopResult(response.loop_result);
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
    <div className="farmer-assistant-page">
      <SectionHeader
        title="Farmer Assistant & Autonomous Agentic Advisor"
        subtitle="Conversational agricultural guidance and cross-module autonomous decision-making loop."
        badge={{ text: 'Grounded AI Engine', bg: 'var(--color-primary-tint)', color: 'var(--color-primary)', border: 'var(--color-primary-border)' }}
      />

      {/* Main Tab Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={activeTab === 'chat' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
        >
          <BotMessageSquare size={18} />
          <span>Conversational Assistant</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('agentic')}
          className={activeTab === 'agentic' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
        >
          <BrainCircuit size={18} />
          <span>Agentic Decision Loop (8 Stages)</span>
        </button>
      </div>

      {/* ===================================================
          TAB 1: CONVERSATIONAL FARMER ASSISTANT
         =================================================== */}
      {activeTab === 'chat' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem', alignItems: 'flex-start' }}>
          
          {/* Main Chat Box */}
          <div
            className="agri-card"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              height: '620px',
              marginBottom: 0,
            }}
          >
            {/* Chat Top Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ background: 'var(--color-primary-tint)', color: 'var(--color-primary)', padding: '0.5rem', borderRadius: '50%' }}>
                  <BotMessageSquare size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    AgriSmart Conversational Advisor
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                    ● Online & Grounded in Agricultural Standards
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClearChat}
                className="btn-secondary"
                style={{ padding: '0.35rem 0.65rem', minHeight: '32px', fontSize: '0.78rem' }}
                title="Clear Chat History"
              >
                <Trash2 size={13} />
                <span>Clear Chat</span>
              </button>
            </div>

            {/* Messages Stream */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                paddingRight: '0.4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                    }}
                  >
                    {!isUser && (
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'var(--color-primary)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <BotMessageSquare size={16} />
                      </div>
                    )}

                    <div>
                      <div
                        style={{
                          padding: '0.85rem 1rem',
                          borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                          background: isUser ? 'var(--color-primary)' : 'var(--bg-muted)',
                          color: isUser ? '#ffffff' : 'var(--text-main)',
                          fontSize: '0.92rem',
                          lineHeight: 1.5,
                          border: isUser ? 'none' : '1px solid var(--border-color)',
                          boxShadow: 'var(--shadow-subtle)',
                        }}
                      >
                        {msg.text}
                      </div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--text-subtle)',
                          display: 'block',
                          marginTop: '0.2rem',
                          textAlign: isUser ? 'right' : 'left',
                        }}
                      >
                        {msg.time}
                      </span>
                    </div>

                    {isUser && (
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'var(--color-gold-tint)',
                          color: 'var(--color-gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                          border: '1px solid var(--color-gold-border)',
                        }}
                      >
                        <User size={16} />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', alignSelf: 'flex-start' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--color-primary)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <BotMessageSquare size={16} />
                  </div>
                  <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-muted)', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>Formulating agronomic advice...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}
            >
              <input
                type="text"
                placeholder="Ask about crop care, fertilizer, watering, or leaf spots..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                disabled={isTyping}
                style={{ flex: 1, minHeight: '44px' }}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={!inputQuery.trim() || isTyping}
                style={{ padding: '0 1.25rem', minHeight: '44px' }}
              >
                <Send size={18} />
                <span>Send</span>
              </button>
            </form>
          </div>

          {/* Right Column: Suggested Questions & Context */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Suggested Questions */}
            <DashboardCard
              title="Suggested Inquiries"
              subtitle="Click any prompt to ask the advisor instantly"
              icon={Sparkles}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="btn-secondary"
                    style={{
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      padding: '0.75rem 0.85rem',
                      minHeight: 'auto',
                      fontSize: '0.85rem',
                    }}
                  >
                    <span>{q}</span>
                    <ArrowRight size={14} color="var(--color-primary)" />
                  </button>
                ))}
              </div>
            </DashboardCard>

            {/* Farmer Context Card */}
            <DashboardCard
              title="Active Farm Context"
              subtitle="Grounded parameters passed to the assistant"
              icon={Layers}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Primary Crop:</span>
                  <span style={{ fontWeight: 700 }}>{userProfile?.primaryCrop || 'Tomato'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Soil Type:</span>
                  <span style={{ fontWeight: 700 }}>{userProfile?.soilType || 'Black Soil'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Location:</span>
                  <span style={{ fontWeight: 700 }}>{userProfile?.district || 'Pune'}, {userProfile?.state || 'MH'}</span>
                </div>
              </div>
            </DashboardCard>
          </div>

        </div>
      )}

      {/* ===================================================
          TAB 2: AGENTIC CROSS-MODULE DECISION LOOP
         =================================================== */}
      {activeTab === 'agentic' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Interactive Scenario Controls */}
          <DashboardCard
            title="Agentic Scenario Simulator"
            subtitle="Modify cross-module sensor parameters to observe autonomous reasoning"
            icon={Sliders}
            action={
              <button
                type="button"
                className="btn-primary"
                onClick={handleRunAgenticLoop}
                disabled={isLoopRunning}
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              >
                <Play size={15} />
                <span>{isLoopRunning ? 'Running Loop...' : 'Execute Decision Loop'}</span>
              </button>
            }
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Crop & Stage</label>
                <select
                  value={agenticState.crop_type}
                  onChange={(e) => setAgenticState({ ...agenticState, crop_type: e.target.value })}
                >
                  <option value="Tomato">Tomato (Flowering)</option>
                  <option value="Wheat">Wheat (Tillering)</option>
                  <option value="Cotton">Cotton (Boll Formation)</option>
                  <option value="Sugarcane">Sugarcane (Grand Growth)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Pathology Scan</label>
                <select
                  value={agenticState.disease_detected}
                  onChange={(e) => setAgenticState({ ...agenticState, disease_detected: e.target.value })}
                >
                  <option value="Tomato Early Blight">Tomato Early Blight</option>
                  <option value="Healthy Leaf">Healthy Leaf (No Disease)</option>
                  <option value="Potato Late Blight">Potato Late Blight</option>
                  <option value="Cotton Bacterial Blight">Cotton Bacterial Blight</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Soil Moisture ({agenticState.soil_moisture}%)</label>
                <input
                  type="range"
                  min="20"
                  max="90"
                  value={agenticState.soil_moisture}
                  onChange={(e) => setAgenticState({ ...agenticState, soil_moisture: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Precipitation ({agenticState.rain_probability}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={agenticState.rain_probability}
                  onChange={(e) => setAgenticState({ ...agenticState, rain_probability: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--color-sky)' }}
                />
              </div>
            </div>
          </DashboardCard>

          {/* Synthesized Decision Result Card */}
          {loopResult && (
            <div
              className="agri-card"
              style={{
                borderLeft: '6px solid var(--color-primary)',
                background: 'var(--bg-surface)',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <StatusBadge
                      status="healthy"
                      label="Synthesized Decision"
                      size="sm"
                    />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Decision Code: <code>{loopResult.decision_code}</code>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0, lineHeight: 1.3 }}>
                    {loopResult.primary_directive}
                  </h3>
                </div>
              </div>

              {/* Reasoning Factors Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
                <div style={{ background: 'var(--bg-muted)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Cross-Module Reasoning Factors:
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {loopResult.reasoning_factors?.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'var(--color-primary-tint)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary-border)' }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-primary-dark)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Autonomous Action Items:
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--color-primary-dark)', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem', fontWeight: 600 }}>
                    {loopResult.action_items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 8-Stage Flowchart / Loop Cards */}
          <DashboardCard
            title="8-Stage Cross-Module Agentic Pipeline"
            subtitle="Autonomous telemetry ingestion, risk evaluation, and synthesized directive dispatch"
            icon={Workflow}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
              {loopResult?.stages?.map((stage) => (
                <div
                  key={stage.stageNumber}
                  style={{
                    padding: '0.85rem',
                    background: 'var(--bg-muted)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                        STAGE #{stage.stageNumber}
                      </span>
                      <CheckCircle2 size={16} color="var(--color-success)" />
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.35rem' }}>
                      {stage.name}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

        </div>
      )}
    </div>
  );
}
