import { Link } from "react-router-dom";
import "../pages/Auth.css";

function AuthAside() {
  return (
    <aside className="auth-aside">
      <Link to="/" className="brand">
        <span className="brand-mark">✚</span> MedAI
      </Link>
      <h1>Your health records, explained in plain language.</h1>
      <p>
        Sign in to view your lab reports, scan analysis and daily wellness plan — all
        in one private place.
      </p>
      <div className="auth-points">
        <div className="auth-point">
          <span>🔒</span>
          <span>
            <strong>Bank-level security</strong>
            <small>Your medical data stays encrypted and private.</small>
          </span>
        </div>
        <div className="auth-point">
          <span>🧪</span>
          <span>
            <strong>Instant report insights</strong>
            <small>Every number in your bloodwork, translated.</small>
          </span>
        </div>
        <div className="auth-point">
          <span>💬</span>
          <span>
            <strong>24/7 friendly assistant</strong>
            <small>Ask questions any hour of the day.</small>
          </span>
        </div>
      </div>
      <div className="auth-aside-foot">© 2025 MedAI · Not a substitute for professional medical advice.</div>
    </aside>
  );
}

export default AuthAside;
