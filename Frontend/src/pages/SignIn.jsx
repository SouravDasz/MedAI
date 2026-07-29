import { useState } from "react";
import { Link } from "react-router-dom";
import AuthAside from "../components/AuthAside.jsx";
import "./Auth.css";

export default function SignIn() {
  const [mode, setMode] = useState("password"); // password | otp
  const [showPass, setShowPass] = useState(false);
  const [robot, setRobot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="auth">
      <AuthAside />

      <main className="auth-main">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p className="auth-sub">Sign in to continue to your MedAI health dashboard.</p>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === "password" ? "active" : ""}`}
              onClick={() => setMode("password")}
            >
              Username &amp; Password
            </button>
            <button
              className={`auth-tab ${mode === "otp" ? "active" : ""}`}
              onClick={() => setMode("otp")}
            >
              Login via Email OTP
            </button>
          </div>

          {mode === "password" ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="field">
                <span>Username</span>
                <input type="text" placeholder="e.g. sarah.jones" autoComplete="username" />
              </label>

              <label className="field">
                <span>Password</span>
                <span className="pass-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
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

              <div className="robot-check">
                <input
                  type="checkbox"
                  id="robot"
                  checked={robot}
                  onChange={(e) => setRobot(e.target.checked)}
                />
                <label htmlFor="robot">
                  <strong>I&apos;m not a robot</strong>
                  <small>Verify to keep your account secure.</small>
                </label>
                <span className="robot-mark">
                  🛡️
                  <br />
                  Privacy · Terms
                </span>
              </div>

              <div className="auth-inline">
                <label className="remember">
                  <input type="checkbox" /> Remember me
                </label>
                <span className="link">Forgot password?</span>
              </div>

              <button className="btn btn--primary btn--block" type="submit">
                Sign in
              </button>

              <div className="auth-alt">
                <span>✉️</span>
                <span>Can&apos;t remember it? We can send your password reset link.</span>
                <button className="btn btn--ghost btn--sm" type="button">
                  Send to registered email
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="field">
                <span>Registered email</span>
                <input type="email" placeholder="you@example.com" autoComplete="email" />
              </label>

              {!otpSent ? (
                <button
                  className="btn btn--primary btn--block"
                  type="button"
                  onClick={() => setOtpSent(true)}
                >
                  Send one-time code
                </button>
              ) : (
                <>
                  <label className="field">
                    <span>Enter the 6-digit code</span>
                  </label>
                  <div className="otp-boxes">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <input key={i} inputMode="numeric" maxLength={1} />
                    ))}
                  </div>
                  <div className="auth-inline">
                    <span className="muted tiny">Code expires in 05:00</span>
                    <span className="link">Resend code</span>
                  </div>
                  <button className="btn btn--primary btn--block" type="submit">
                    Verify &amp; sign in
                  </button>
                  <p className="auth-note">
                    <button
                      type="button"
                      className="link"
                      onClick={() => setOtpSent(false)}
                    >
                      Use a different email
                    </button>
                  </p>
                </>
              )}

              <div className="auth-alt">
                <span>🔐</span>
                <span>No password needed — we email you a secure one-time code.</span>
              </div>
            </form>
          )}

          <div className="auth-divider">OR</div>
          <button className="google-btn" type="button">
            <span className="google-g">G</span> Continue with Google
          </button>

          <p className="auth-foot">
            You have no account? <Link to="/signup">Sign up now</Link>
          </p>
          <p className="auth-note">
            Protected by reCAPTCHA · <Link to="/">Back to home</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
