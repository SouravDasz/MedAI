import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import medaiLogo from '../assets/medai-logo.svg'
import medaiIcon from '../assets/medai-icon.svg'
import './Landing.css'

const features = [
  {
    icon: '✦',
    title: 'AI Health Insights',
    text: 'Explore general health information based on the reports you submit.',
  },
  {
    icon: '⌁',
    title: 'Laboratory Report Analysis',
    text: 'Upload laboratory reports and get clear, AI-assisted explanations of their contents.',
  },
  {
    icon: 'Rx',
    title: 'Medicine Information',
    text: 'Understand medicines, common uses and possible side effects.',
    status: 'Planned',
  },
  {
    icon: '◫',
    title: 'Wellness Tracking',
    text: 'Keep health information and wellness goals organized in one place.',
    status: 'Planned',
  },
  {
    icon: '?',
    title: 'AI Health Assistant',
    text: 'Ask health-related questions and explore useful medical information.',
    status: 'Planned',
  },
]

const steps = [
  ['01', 'Create Your Account', 'Register securely and verify your email.'],
  ['02', 'Upload Your Laboratory Report', 'Submit a laboratory report for analysis.'],
  ['03', 'AI Analyzes Your Report', 'Let MedAI organize the report into understandable insights.'],
  ['04', 'Understand Your Results', 'Review explanations and discuss concerns with a healthcare professional.'],
]

const faqs = [
  ['What is MedAI?', 'MedAI is a healthcare information platform that helps users organize laboratory reports and explore AI-assisted explanations.'],
  ['How does laboratory report analysis work?', 'A user uploads a supported report, and MedAI organizes available values into clearer sections and general insights.'],
  ['Can I upload my laboratory reports?', 'Report upload and analysis are available through the MedAI account workspace when enabled for the account.'],
  ['Is my personal information secure?', 'MedAI uses protected account authentication and keeps authentication cookies outside browser script storage.'],
  ['Does MedAI replace a doctor?', 'No. MedAI provides educational health information and does not replace professional medical advice, diagnosis, or treatment.'],
  ['How do I create an account?', 'Select Get Started, complete the registration form, and verify your email using the OTP sent to you.'],
]

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const startDestination = '/register'

  useEffect(() => {
    const sections = ['home', 'features', 'how-it-works', 'about', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.25, 0.5] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Primary navigation">
        <Link className="landing-brand" to="/" onClick={closeMobileMenu}>
          <img className="landing-brand-logo" src={medaiLogo} alt="MedAI" />
        </Link>
        <button
          type="button"
          className="mobile-menu-button"
          aria-expanded={mobileMenuOpen}
          aria-controls="landing-navigation"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div id="landing-navigation" className={`landing-navigation ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="landing-links">
            <a className={activeSection === 'home' ? 'active' : ''} href="#home" onClick={closeMobileMenu}>Home</a>
            <a className={activeSection === 'features' ? 'active' : ''} href="#features" onClick={closeMobileMenu}>Features</a>
            <a className={activeSection === 'how-it-works' ? 'active' : ''} href="#how-it-works" onClick={closeMobileMenu}>How It Works</a>
            <a className={activeSection === 'about' ? 'active' : ''} href="#about" onClick={closeMobileMenu}>About Us</a>
            <a className={activeSection === 'contact' ? 'active' : ''} href="#contact" onClick={closeMobileMenu}>Contact</a>
          </div>
          <div className="landing-actions">
            <Link className="landing-login" to="/login" onClick={closeMobileMenu}>Login</Link>
            <Link className="landing-primary-small" to={startDestination} onClick={closeMobileMenu}>Get Started</Link>
          </div>
        </div>
      </nav>

      <section id="home" className="landing-hero">
        <div className="hero-copy">
          <p className="hero-kicker"><span>✦</span> AI-powered healthcare</p>
          <h1>Your Health,<br />Made Smarter with <em>AI.</em></h1>
          <p className="hero-lede">
            Understand your health reports, explore medical insights, and manage your healthcare journey with the power of artificial intelligence.
          </p>
          <div className="hero-buttons">
            <Link className="landing-primary" to={startDestination}>Get Started <span>→</span></Link>
            <a className="landing-secondary" href="#features">Explore Features <span>↓</span></a>
          </div>
          <div className="trust-row">
            <span><b>✓</b> AI-assisted insights</span>
            <span><b>✓</b> Secure account</span>
            <span><b>✓</b> Clear reports</span>
          </div>
        </div>

        <div className="hero-product" aria-label="MedAI report dashboard preview">
          <div className="report-window">
            <div className="window-bar">
              <div className="window-brand"><span>+</span> MedAI</div>
              <div className="window-avatar">M</div>
            </div>
            <div className="window-body">
              <aside className="window-sidebar">
                <span className="sidebar-active">⌂ <b>Overview</b></span>
                <span>▤ <b>Reports</b></span>
                <span>✦ <b>Insights</b></span>
                <span>⚙ <b>Settings</b></span>
              </aside>
              <div className="window-main">
                <div className="window-heading">
                  <div><small>HEALTH OVERVIEW</small><strong>Your results</strong></div>
                  <span>New report</span>
                </div>
                <div className="metric-row">
                  <article><span className="metric-dot green">✓</span><small>Reports</small><strong>Ready</strong></article>
                  <article><span className="metric-dot blue">⌁</span><small>Analysis</small><strong>New</strong></article>
                  <article><span className="metric-dot gold">↑</span><small>Account</small><strong>Secure</strong></article>
                </div>
                <article className="analysis-card">
                  <div className="analysis-icon">⌁</div>
                  <div>
                    <small>LABORATORY REPORT</small>
                    <strong>Blood Test Analysis</strong>
                    <p>Key values organized into easy-to-understand sections.</p>
                  </div>
                  <span>View</span>
                </article>
              </div>
            </div>
          </div>
          <div className="floating-insight">
            <span>✦</span>
            <div><b>Report ready</b><small>AI-assisted summary</small></div>
          </div>
          <img
            className="hero-human"
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=88"
            alt="Healthcare professional"
          />
        </div>
      </section>

      <section id="features" className="feature-section">
        <div className="section-heading">
          <p>CORE FEATURES</p>
          <h2>Everything You Need for Smarter Healthcare</h2>
          <span>Explore intelligent tools designed to make understanding and managing your health easier.</span>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              {feature.status && <small className="feature-status">{feature.status}</small>}
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="steps-section">
        <div className="section-heading">
          <p>HOW IT WORKS</p>
          <h2>Your Healthcare Journey, Simplified</h2>
        </div>
        <div className="steps-grid">
          {steps.map(([number, title, text]) => (
            <article className="step-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="benefit-section">
        <div className="benefit-copy">
          <p className="section-label">WHY CHOOSE MEDAI</p>
          <h2>Technology That Makes Healthcare Easier</h2>
          <p>MedAI brings report information, account security and personal health organization into one accessible workspace.</p>
        </div>
        <div className="benefit-grid">
          {[
            ['01', 'Easy to understand', 'Plain-language explanations make medical information less overwhelming.'],
            ['02', 'AI-assisted analysis', 'Turn complex report values into organized, readable insights.'],
            ['03', 'Secure authentication', 'Use protected account access with cookie-based authentication.'],
            ['04', 'One useful dashboard', 'Keep reports and health information together in a simple workspace.'],
          ].map(([number, title, text]) => (
            <article key={title}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-copy">
          <p className="section-label">YOUR WORKSPACE</p>
          <h2>See everything that matters in one dashboard</h2>
          <p>Sign in to manage your account and access MedAI’s report analysis workspace.</p>
          <Link className="landing-primary" to={startDestination}>Open Dashboard <span>→</span></Link>
        </div>
        <div className="dashboard-preview">
          <div className="preview-sidebar">
            <div className="preview-logo">MedAI</div>
            <span>▦ Overview</span>
            <span>▤ Reports</span>
            <span>✦ Insights</span>
            <span>⚙ Settings</span>
          </div>
          <div className="preview-content">
            <div className="preview-header"><small>WORKSPACE</small><b>Health Overview</b></div>
            <div className="preview-stats">
              <span><small>Reports</small><b>Organize</b></span>
              <span><small>Analysis</small><b>Review</b></span>
              <span><small>Account</small><b>Active</b></span>
            </div>
            <div className="preview-chart">
              <div><span>Health report activity</span><b>Monthly overview</b></div>
              <div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="disclaimer" className="disclaimer" aria-label="Medical disclaimer">
        <p><strong>Medical disclaimer</strong></p>
        <p>MedAI provides AI-assisted health information for educational purposes. It does not replace professional medical advice, diagnosis, or treatment.</p>
      </section>

      <section className="faq-section" aria-labelledby="faq-heading">
        <div className="section-heading">
          <p>COMMON QUESTIONS</p>
          <h2 id="faq-heading">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <p>READY TO BEGIN</p>
        <h2>Take a smarter step toward understanding your health.</h2>
        <Link className="landing-primary" to={startDestination}>Get Started with MedAI <span>→</span></Link>
      </section>

      <footer id="contact" className="landing-footer">
        <div>
          <Link className="landing-brand footer-brand" to="/">
            <img className="landing-brand-logo" src={medaiIcon} alt="MedAI" />
            <span>MedAI</span>
          </Link>
          <p>AI-assisted medical information made clearer.</p>
        </div>
        <div className="footer-links">
          <a href="#about">About MedAI</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms and Conditions</a>
          <a href="#disclaimer">Medical Disclaimer</a>
        </div>
      </footer>
    </main>
  )
}
