import Card from "../components/Card.jsx";
import { healthChecks, advice, sugarTrend } from "../data/mock.js";
import "./LabResult.css";

function TrendChart({ points }) {
  const max = Math.max(...points.map((point) => point.value));
  const min = Math.min(...points.map((point) => point.value));
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 90 - ((point.value - min) / (max - min || 1)) * 70;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <div className="trend">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="trend-svg">
        <path d={path} fill="none" stroke="#1a4fd6" strokeWidth="2.5" strokeLinecap="round" />
        {points.map((point, index) => {
          const x = (index / (points.length - 1)) * 100;
          const y = 90 - ((point.value - min) / (max - min || 1)) * 70;
          return <circle key={point.month} cx={x} cy={y} r="1.6" fill="#1a4fd6" />;
        })}
      </svg>
      <div className="trend-axis">
        {points.map((point) => (
          <span key={point.month}>{point.month}</span>
        ))}
      </div>
    </div>
  );
}

export default function LabResults() {
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Understanding Your Lab Results</h1>
          <p>Clear insights and simple steps for your health journey.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn--ghost btn--sm">↺ View History</button>
          <button className="btn btn--primary btn--sm">⬆ Upload New Results</button>
        </div>
      </div>

      <div className="lab-layout">
        <div className="lab-main">
          <Card className="greet-card">
            <div className="spread">
              <div className="row">
                <span className="icon-box icon-box--green">🙂</span>
                <div>
                  <strong>Hi, Sarah!</strong>
                  <p className="tiny muted">HERE IS YOUR SUMMARY</p>
                </div>
              </div>
              <div className="right">
                <p className="tiny muted">Last Test Date</p>
                <strong>October 24, 2024</strong>
              </div>
            </div>

            <div className="plain-summary">
              <span className="badge badge--blue">✦ Plain-English Summary</span>
              <p>
                Your recent check-up shows you&apos;re doing great in several areas! Your heart
                health markers are looking excellent. We did notice that your blood sugar levels are
                just a tiny bit higher than we&apos;d like to see. Also, your Vitamin D levels are a
                bit low, which might be why you&apos;ve been feeling a little tired. A few simple
                adjustments to your snacks and spending a little more time in the sun could make a
                big difference!
              </p>
            </div>
          </Card>

          <Card title="♡ Your Health Checks">
            <div className="check-grid">
              {healthChecks.map((check) => (
                <article key={check.name} className="check">
                  <div className="spread">
                    <span className="tiny label-caps">{check.name}</span>
                    <span className="check-ico">◔</span>
                  </div>
                  <p className="check-value">
                    {check.value} <span>{check.unit}</span>
                  </p>
                  <span className={`badge badge--${check.tone}`}>{check.tag}</span>
                </article>
              ))}
            </div>
          </Card>

          <Card
            title="Your Sugar Trend (A1c)"
            action={<span className="badge badge--outline">Last 6 Months</span>}
          >
            <TrendChart points={sugarTrend} />
            <p className="record-note">
              ℹ Your score has gone up slightly since May. Let&apos;s try some small changes to help
              bring it back down!
            </p>
          </Card>
        </div>

        <aside className="lab-side">
          <Card title="📍 Friendly Advice">
            <div className="advice-list">
              {advice.map((item) => (
                <article key={item.title} className="advice">
                  <span className="icon-box icon-box--amber">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p className="tiny muted">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <button className="btn btn--primary btn--block btn--square">
            💬 Chat with Health Assistant
          </button>
          <button className="btn btn--ghost btn--block btn--square">
            ✉ Share with My Doctor
          </button>

          <p className="tiny muted center">
            Your data is safe and private. Verified by MedAI Intelligence.
          </p>
        </aside>
      </div>
    </div>
  );
}
