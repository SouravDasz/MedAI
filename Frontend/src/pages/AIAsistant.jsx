import { useState, useRef, useEffect } from 'react';
import MedAISidebar from '../components/MedAISidebar';
import '../styles/ai-asistant.css';
// D:\MedAI\MedAI\Frontend\src\styles\ai-asistant.css
const initialMessages = [
  {
    role: 'ai',
    content: (
      <>
        <p>Hello, Dr. Rivera. I've reviewed the latest intake for patient <strong>#4827</strong>. Here's a quick summary:</p>
        <ul className="ai-msg__list">
          <li>54-year-old male, presenting with intermittent chest tightness over 2 weeks.</li>
          <li>Blood pressure trending 142/91 mmHg across three readings.</li>
          <li>No prior cardiac history; family history of CAD (father, age 68).</li>
          <li>Current medications: Lisinopril 10mg, Atorvastatin 20mg.</li>
        </ul>
        <div className="ai-msg__tags">
          <span className="ai-msg__tag">Cardiology</span>
          <span className="ai-msg__tag">Hypertension</span>
          <span className="ai-msg__tag">Risk Stratification</span>
        </div>
      </>
    ),
    time: '09:41',
  },
  {
    role: 'user',
    content: <p>What's the likely differential and what workup do you recommend?</p>,
    time: '09:42',
  },
  {
    role: 'ai',
    content: (
      <>
        <p>Based on the presentation, the leading differentials are:</p>
        <ul className="ai-msg__list">
          <li><strong>Stable angina</strong> — exertional pattern, risk factors support this.</li>
          <li><strong>Hypertensive heart disease</strong> — uncontrolled BP with LV strain.</li>
          <li><strong>Gastroesophageal reflux</strong> — atypical, less likely given exertional link.</li>
        </ul>
        <p>Recommended next steps:</p>
        <ul className="ai-msg__list">
          <li>12-lead ECG and high-sensitivity troponin to rule out ACS.</li>
          <li>Exercise stress test or coronary CTA for risk stratification.</li>
          <li>Echocardiogram to assess LV function and wall motion.</li>
          <li>Optimize BP control — consider Lisinopril uptitration to 20mg.</li>
        </ul>
        <div className="ai-msg__tags">
          <span className="ai-msg__tag">ECG</span>
          <span className="ai-msg__tag">Troponin</span>
          <span className="ai-msg__tag">Stress Test</span>
          <span className="ai-msg__tag">Echo</span>
        </div>
      </>
    ),
    time: '09:42',
  },
];

const historyItems = [
  { id: 1, label: 'Patient #4827 — Chest tightness', active: true },
  { id: 2, label: 'Patient #4801 — Fatigue workup' },
  { id: 3, label: 'Patient #4763 — Diabetes management' },
  { id: 4, label: 'Patient #4712 — Post-op follow-up' },
  { id: 5, label: 'Patient #4698 — Migraine differential' },
];

const suggestions = [
  'Summarize latest labs',
  'Suggest ICD-10 codes',
  'Check drug interactions',
  'Draft patient letter',
];

function AiIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3v1a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-1a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3V5a3 3 0 0 0-3-3z" />
      <path d="M12 8v8" />
    </svg>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const userMsg = { role: 'user', content: <p>{input}</p>, time };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: (
            <>
              <p>I've processed your query. Here's a preliminary analysis based on available clinical data:</p>
              <ul className="ai-msg__list">
                <li>Reviewed against current guidelines and patient history.</li>
                <li>Flagged two items for follow-up before finalizing the plan.</li>
                <li>Suggested documentation is ready for your review and edit.</li>
              </ul>
              <div className="ai-msg__tags">
                <span className="ai-msg__tag">Draft</span>
                <span className="ai-msg__tag">Guideline-matched</span>
              </div>
            </>
          ),
          time,
        },
      ]);
      setIsTyping(false);
    }, 1400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-page">
      <MedAISidebar />
      <main className="ai-main">
        <header className="ai-topbar">
          <div className="ai-topbar__left">
            <h1 className="ai-topbar__title">AI Assistant</h1>
            <span className="ai-topbar__badge">Online</span>
          </div>
          <div className="ai-topbar__actions">
            <button className="ai-topbar__btn">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export
            </button>
            <button className="ai-topbar__btn">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 3.84.85 4.5 1.5.66.66 1.5 1.98 1.5 4.5 0 1.5.5 2.5 1.5 3z" />
                <path d="M9 12h.01M15 12h.01" />
              </svg>
              Templates
            </button>
            <button className="ai-topbar__btn ai-topbar__btn--primary">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Consult
            </button>
          </div>
        </header>

        <div className="ai-body">
          <aside className="ai-history">
            <button className="ai-history__new">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Conversation
            </button>
            <div className="ai-history__label">Recent</div>
            {historyItems.map((item) => (
              <button
                key={item.id}
                className={`ai-history__item${item.active ? ' ai-history__item--active' : ''}`}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {item.label}
              </button>
            ))}
          </aside>

          <section className="ai-chat">
            <div className="ai-suggestions">
              {suggestions.map((s) => (
                <button key={s} className="ai-suggestions__chip" onClick={() => setInput(s)}>
                  <AiIcon />
                  {s}
                </button>
              ))}
            </div>
            <div className="ai-chat__scroll" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`ai-msg${m.role === 'user' ? ' ai-msg--user' : ''}`}>
                  <div className={`ai-msg__avatar${m.role === 'user' ? ' ai-msg__avatar--user' : ' ai-msg__avatar--ai'}`}>
                    {m.role === 'ai' ? 'AI' : 'AR'}
                  </div>
                  <div>
                    <div className="ai-msg__bubble">{m.content}</div>
                    {m.role === 'ai' && (
                      <div className="ai-msg__actions">
                        <button className="ai-msg__action">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          Copy
                        </button>
                        <button className="ai-msg__action">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                          </svg>
                          Save to record
                        </button>
                        <button className="ai-msg__action">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21 8 14 2 9.4h7.6z" />
                          </svg>
                          Helpful
                        </button>
                      </div>
                    )}
                    <span className="ai-msg__time">{m.time}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="ai-msg">
                  <div className="ai-msg__avatar ai-msg__avatar--ai">AI</div>
                  <div className="ai-msg__bubble">
                    <div className="ai-typing"><span></span><span></span><span></span></div>
                  </div>
                </div>
              )}
            </div>
            <div className="ai-composer">
              <div className="ai-composer__wrap">
                <div className="ai-composer__tools">
                  <button className="ai-composer__tool" title="Attach">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  <button className="ai-composer__tool" title="Voice">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="9" y="2" width="6" height="13" rx="3" /><path d="M19 10a7 7 0 0 1-14 0M12 19v4" />
                    </svg>
                  </button>
                </div>
                <textarea
                  className="ai-composer__input"
                  placeholder="Ask about a patient, lab results, or clinical guidelines…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
                <button className="ai-composer__send" onClick={handleSend} title="Send">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
                  </svg>
                </button>
              </div>
              <p className="ai-composer__hint">AI responses are clinical decision support, not a substitute for professional judgment.</p>
            </div>
          </section>

          <aside className="ai-info">
            <div className="ai-info__section">
              <h3 className="ai-info__heading">Active Patient</h3>
              <div className="ai-info__card">
                <div className="ai-info__card-title">Patient #4827</div>
                <div className="ai-info__card-meta">
                  <span>54M</span> · <span>Chest tightness</span>
                </div>
              </div>
            </div>
            <div className="ai-info__section">
              <h3 className="ai-info__heading">Context Used</h3>
              <ul className="ai-info__tips">
                <li>Latest vitals & intake notes</li>
                <li>Current medication list</li>
                <li>Prior lab results (lipid panel, CBC)</li>
                <li>2024 ACC/AHA chest pain guideline</li>
              </ul>
            </div>
            <div className="ai-info__section">
              <h3 className="ai-info__heading">Suggested Actions</h3>
              <ul className="ai-info__tips">
                <li>Order ECG + troponin</li>
                <li>Refer to cardiology for stress test</li>
                <li>Recheck BP in 1 week</li>
              </ul>
            </div>
            <div className="ai-info__disclaimer">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
              Always verify against source records. This tool does not replace clinical judgment.
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
