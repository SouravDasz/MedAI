import Card from "../components/Card.jsx";
import "./ScanAnalysis.css";

const metrics = [
  { icon: "◎", title: "Precision", value: "98.4% Confidence", tone: "green" },
  { icon: "⚡", title: "Latency", value: "1.2s Processing", tone: "" },
  { icon: "🔒", title: "Privacy", value: "AES-256 Encrypted", tone: "" },
];

const capabilities = [
  { icon: "🧾", title: "OCR Analysis", text: "Extracting handwritten notes from scanned film labels with 99% accuracy.", tone: "green" },
  { icon: "🗄", title: "Secure Storage", text: "PostgreSQL encrypted storage ensures HIPAA compliance for every byte.", tone: "" },
  { icon: "🧬", title: "Orchestration", text: "Seamless bridging between CNN models and RAG-based LLM logic.", tone: "" },
  { icon: "💬", title: "Consult Expert", text: "Instant sharing capability with a network of 500+ board-certified radiologists.", tone: "blue" },
];

export default function ScanAnalysis() {
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Understand Your Scan</h1>
          <p>Analyze X-ray, CT, or MRI scans using precision AI orchestration.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn--ghost btn--sm">↺ Analysis History</button>
          <button className="btn btn--ghost btn--sm">↗ Share Scan</button>
        </div>
      </div>

      <div className="scan-layout">
        <div className="scan-main">
          <Card className="viewer-card card--flush">
            <div className="viewer-bar">
              <span className="badge badge--blue">● LIVE AI OVERLAY</span>
              <span className="badge badge--outline">X-Ray (Chest AP)</span>
              <div className="viewer-tools">
                <button className="icon-btn">🔍</button>
                <button className="icon-btn">⚙</button>
                <button className="icon-btn">✉</button>
              </div>
            </div>

            <div className="viewer">
              <span className="viewer-meta">THORACIC_CAVITY_01</span>
              <div className="bbox bbox--1">UPPER LOBE</div>
              <div className="bbox bbox--2">CARDIAC REGION</div>
              <div className="hotspot" />
              <span className="viewer-flag">POTENTIAL ANOMALY</span>
            </div>

            <div className="viewer-sliders">
              <label>
                CONTRAST
                <input type="range" defaultValue="62" />
              </label>
              <label>
                EXPOSURE
                <input type="range" defaultValue="48" />
              </label>
              <span className="tiny muted">DICOM_UID: 1.2.826.0.1.3680043.2.1125.1</span>
            </div>
          </Card>

          <div className="metric-grid">
            {metrics.map((metric) => (
              <article key={metric.title} className="card metric">
                <span className={`icon-box ${metric.tone ? `icon-box--${metric.tone}` : ""}`}>
                  {metric.icon}
                </span>
                <strong>{metric.title}</strong>
                <span className="tiny muted">{metric.value}</span>
              </article>
            ))}
          </div>

          <div className="capability-grid">
            {capabilities.map((item) => (
              <article key={item.title} className={`card capability capability--${item.tone}`}>
                <span className="cap-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p className="tiny muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="scan-side">
          <Card title="🗒 Scan Summary">
            <div className="spread">
              <span className="tiny muted">AI Analysis Match</span>
              <strong className="match">96.8%</strong>
            </div>

            <div className="finding finding--good">
              <strong>● Good News</strong>
              <p>
                Trachea is midline. Cardiomediastinal silhouette is within normal limits. Bones are
                intact.
              </p>
            </div>

            <div className="finding finding--warn">
              <strong>● What the AI found</strong>
              <p>
                Suspected focal opacity identified in the right lower lobe. Possible consolidation
                noted.
              </p>
            </div>

            <div className="finding">
              <strong>◎ AI Analysis Match</strong>
              <p>
                Compare with previous imaging (2023-11-04). Clinical correlation with symptoms
                suggested. Consider lateral view or CT follow-up.
              </p>
            </div>

            <div className="plain-quote">
              <p className="tiny label-caps">✦ Plain English Summary</p>
              <p>
                &ldquo;The AI has spotted a small area in your right lung that looks like a common
                infection. This is often seen in early-stage pneumonia. We recommend chatting with
                our AI assistant or your doctor to discuss how you&apos;re feeling.&rdquo;
              </p>
            </div>

            <div className="scan-actions">
              <button className="btn btn--ghost btn--sm">↗ Share with My Doctor</button>
              <button className="btn btn--primary btn--sm">Add to My Records</button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
