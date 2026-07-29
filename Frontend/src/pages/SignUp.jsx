import { useState } from "react";
import { Link } from "react-router-dom";
import AuthAside from "../components/AuthAside.jsx";
import "./Auth.css";

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="auth">
      <AuthAside />

      <main className="auth-main">
        <div className="auth-card">
          <Link to="/signin" className="auth-back">
            ← Back to sign in
          </Link>
          <h2>Create your account</h2>
          <p className="auth-sub">
            Quick and secure setup — your private health profile in under a minute.
          </p>

          <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 20 }}>
            <label className="field">
              <span>Full name</span>
              <input type="text" placeholder="Sarah Jones" autoComplete="name" />
            </label>

            <div className="field-row">
              <label className="field">
                <span>Email address</span>
                <input type="email" placeholder="you@example.com" autoComplete="email" />
              </label>
              <label className="field">
                <span>Phone number</span>
                <input type="tel" placeholder="+1 555 000 1234" autoComplete="tel" />
              </label>
            </div>

            <label className="field">
              <span>Password</span>
              <span className="pass-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </span>
            </label>

            <div className="progress progress--blue" style={{ marginBottom: 8 }}>
              <span style={{ width: "60%" }} />
            </div>
            <p className="muted tiny" style={{ marginBottom: 16 }}>
              Use 8+ characters with a number and a symbol.
            </p>

            <label className="remember" style={{ marginBottom: 16 }}>
              <input type="checkbox" /> I agree to the Terms &amp; Privacy Policy
            </label>

            <button className="btn btn--primary btn--block" type="submit">
              Create account
            </button>
          </form>

          <div className="auth-divider">OR</div>
          <button className="google-btn" type="button">
            <span className="google-g">G</span> Continue with Google
          </button>

          <p className="auth-foot">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
          <p className="auth-note">
            Your data is encrypted and never shared without your consent.
          </p>
        </div>
      </main>
    </div>
  );
}
