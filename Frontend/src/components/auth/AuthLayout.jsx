import { Link } from 'react-router-dom'
import medaiLogoWhite from '../../assets/medai-logo-white.svg'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <main className="auth-shell">
      <section className="auth-hero">
        <Link className="brand brand-auth" to="/" aria-label="MedAI home">
          <img src={medaiLogoWhite} alt="MedAI" />
        </Link>
        <div className="hero-copy">
          <p className="eyebrow">INTELLIGENT CARE, CONNECTED</p>
          <h1>Better decisions for <span>healthier lives.</span></h1>
          <p>Securely access your medical intelligence workspace and keep your healthcare journey in focus.</p>
          <div className="auth-trust-row" aria-label="MedAI benefits">
            <span><b>✦</b> AI-assisted insights</span>
            <span><b>✓</b> Secure account</span>
            <span><b>⌁</b> Clear reports</span>
          </div>
        </div>
        <div className="auth-preview" aria-label="Laboratory report preview">
          <div className="auth-preview-top">
            <span className="auth-preview-brand">+</span>
            <span>Laboratory report</span>
            <b>Verified</b>
          </div>
          <div className="auth-preview-content">
            <div>
              <small>BLOOD PANEL</small>
              <strong>Report summary</strong>
            </div>
            <div className="auth-preview-chart" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </div>
          </div>
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <div className="mobile-brand">
            <Link className="brand" to="/" aria-label="MedAI home">
              <img src="/medai-icon.svg" alt="" />
              <span>MedAI</span>
            </Link>
          </div>
          <p className="eyebrow">{title}</p>
          <h2>{subtitle}</h2>
          {children}
        </div>
      </section>
    </main>
  )
}
