export default function Footer() {
  return (
    <footer className="app-footer">
      <div>
        <div className="brand">
          <span className="brand-mark">✚</span> MedAI
        </div>
        <small>© 2024 MedAI Assistant. HIPAA Compliant &amp; Secure.</small>
      </div>
      <nav>
        <a href="#medical-disclaimer">Medical Disclaimer</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#api">API Status</a>
      </nav>
    </footer>
  );
}
