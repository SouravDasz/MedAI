import { Link } from "react-router-dom";
import "./Landing.css";

const features = [
  {
    icon: "🩻",
    title: "Understand Your Scans",
    text: "Get a clear explanation of your X-ray or MRI results. We help you see what matters so you can feel better conversations with your care team.",
    badge: "See How It Works",
  },
  {
    icon: "🧪",
    title: "Clear Lab Reports",
    text: "Every number in your bloodwork, translated. No jargon, no medical dictionary required.",
  },
];

const tiles = [
  { icon: "💬", title: "24/7 Friendly Chat", text: "Our sensible assistant is available any hour of the day to answer the small questions you forget to ask.", tone: "blue" },
  { icon: "💊", title: "Know Your Meds", text: "Easily check what your medicine is for, and how to take it safely, every day.", tone: "plain" },
  { icon: "🌿", title: "Daily Wellness", text: "Simple, kind nudges that help you build routines that actually stick.", tone: "green" },
];

const steps = [
  { title: "Quick & Secure Setup", text: "Create your private profile. We use bank-level security so your health data really stays private." },
  { title: "Upload or Sync", text: "Snap a photo of your results or sync with your care provider to gather your health info in one place." },
  { title: "Smart Analysis", text: "Our AI compares metrics to your history, then finds patterns and explanations tailored to your life." },
  { title: "Get Your Health Guide", text: "Receive easy-to-read reports and friendly tips so your healthy picks feel like your next every day." },
];

const stats = [
  ["100%", "Private"],
  ["SECURE", "Data Protection"],
  ["24/7", "Support"],
  ["SIMPLE", "Insights"],
];

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Link to="/" className="brand">
          <span className="brand-mark">✚</span> MedAI
        </Link>
        <nav>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#wellness">Wellness</a>
          <a href="#find">Find Care</a>
        </nav>
        <div className="landing-nav-actions">
          <Link to="/signin" className="landing-signin">
            Sign in
          </Link>
          <Link to="/dashboard" className="btn btn--primary btn--sm">
            Ask AI
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="badge badge--green">✚ Your AI Health Companion</span>
          <h1>
            Peace of Mind for
            <br />
            <span className="hero-accent">Your Everyday</span>
            <br />
            Health Journey
          </h1>
          <p>
            Understand your health reports, track your wellness, and get clear answers to your
            medical questions — all in one secure, friendly place.
          </p>
          <div className="hero-cta">
            <Link to="/dashboard" className="btn btn--dark">
              Start for Free
            </Link>
            <a href="#how" className="btn btn--ghost">
              How it helps me
            </a>
          </div>
          <div className="hero-proof">
            <div className="hero-faces">
              <span>AR</span>
              <span>SJ</span>
              <span>JW</span>
              <span>SC</span>
            </div>
            <p className="tiny muted">Loved by 12,000+ people taking charge of their health</p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              <p className="phone-label">Weekly Overview</p>
              <p className="phone-value">94%</p>
              <div className="phone-chart">
                {[38, 52, 44, 66, 58, 78, 92].map((height, index) => (
                  <span key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="phone-rows">
                <div>
                  <strong>72 bpm</strong>
                  <span>Heart rate</span>
                </div>
                <div>
                  <strong>8h 12m</strong>
                  <span>Sleep</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-note">
            <span className="icon-box icon-box--green">✓</span>
            <div>
              <strong>Your health markers</strong>
              <p className="tiny muted">Your energy levels look better this week.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-head">
          <h2>Better Health, Explained Simply</h2>
          <p className="muted">
            We use advanced technology to translate complex medical data the easy-to-understand
            insights you can actually use.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="card feature-card">
              <div className="spread">
                <span className="icon-box">{feature.icon}</span>
                {feature.badge && <span className="badge badge--green">{feature.badge}</span>}
              </div>
              <h3>{feature.title}</h3>
              <p className="muted">{feature.text}</p>
            </article>
          ))}
        </div>

        <div className="tile-grid">
          {tiles.map((tile) => (
            <article key={tile.title} className={`tile tile--${tile.tone}`}>
              <span className="tile-icon">{tile.icon}</span>
              <h3>{tile.title}</h3>
              <p>{tile.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--split" id="how">
        <div>
          <h2>
            From Confusion to Clarity in
            <br /> Minutes
          </h2>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="step-num">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p className="muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="how-visual" aria-hidden="true">
          <div className="how-kiosk" />
          <div className="how-people">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className="cta" id="find">
        <h2>Take Control of Your Health Today</h2>
        <p>
          Join thousands of people who use MedAI to find peace of mind and live healthier, more
          informed lives.
        </p>
        <div className="cta-actions">
          <Link to="/dashboard" className="btn btn--onblue">
            Get Started Now
          </Link>
          <a href="#how" className="btn btn--outline-light">
            See how it works
          </a>
        </div>
        <div className="cta-stats">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <div>
          <div className="brand">
            <span className="brand-mark">✚</span> MedAI
          </div>
          <p className="tiny muted">
            Empowering you with clear health insights and compassionate everyday guidance.
          </p>
        </div>
        <div className="landing-footer-cols">
          <div>
            <h4>Explore</h4>
            <a href="#features">How It Works</a>
            <a href="#features">Lab Reports</a>
            <a href="#features">Health Scans</a>
            <a href="#features">Mobile App</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#help">Help Center</a>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Stay Connected</h4>
            <div className="social">
              <span>f</span>
              <span>in</span>
              <span>✕</span>
            </div>
          </div>
        </div>
        <small>© 2024 MedAI Health Companion. Your data is safe &amp; private.</small>
      </footer>
    </div>
  );
}
