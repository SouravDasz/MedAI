import { useState } from "react";
import Card from "../components/Card.jsx";
import "./CompareReports.css";

const markers = [
  { label: "Total Cholesterol", value: "182", unit: "mg/dL", delta: "+12% Improvement", prev: "Prev: 207 mg/dL", tone: "green" },
  { label: "Blood Sugar (Fast)", value: "114", unit: "mg/dL", delta: "+6% Caution", prev: "Prev: 108 mg/dL", tone: "red" },
  { label: "Vitamin D Level", value: "32", unit: "ng/mL", delta: "+25% Improvement", prev: "Prev: 24 ng/mL", tone: "green" },
];

export default function CompareReports() {
  const [range, setRange] = useState("month");

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Compare Your Health Reports</h1>
          <p>
            MedAI tracks your medical progress by comparing historical and current datasets. Upload
            your lab results below to visualize trends and gain clinical insights.
          </p>
        </div>
      </div>

      <div className="upload-grid">
        <div className="dropzone">
          <span className="icon-box">↺</span>
          <strong>Previous Report</strong>
          <p className="tiny muted">Select a file from 3+ months ago</p>
          <button className="btn btn--ghost btn--sm">⬆ Upload PDF or Image</button>
        </div>
        <div className="dropzone dropzone--active">
          <span className="badge badge--green dropzone-tag">Required</span>
          <span className="icon-box icon-box--green">↻</span>
          <strong>Latest Report</strong>
          <p className="tiny muted">Upload your most recent results</p>
          <button className="btn btn--primary btn--sm">⬆ Select File</button>
        </div>
      </div>

      <div className="compare-bar">
        <span className="badge badge--blue">📋 Comparison Dashboard</span>
        <span className="tiny muted">Last updated: Oct 24, 2024</span>
      </div>

      <div className="marker-grid">
        {markers.map((marker) => (
          <article key={marker.label} className="card marker">
            <div className="spread">
              <span className="tiny label-caps">{marker.label}</span>
              <span className="tiny muted">ⓘ</span>
            </div>
            <p className="marker-value">
              {marker.value} <span>{marker.unit}</span>
            </p>
            <div className={`marker-delta marker-delta--${marker.tone}`}>
              <strong>{marker.delta}</strong>
              <span>{marker.prev}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="compare-body">
        <Card title="Health Journey Summary">
          <div className="journey">
            <span className="icon-box icon-box--green">✓</span>
            <div>
              <strong>What&apos;s Improved</strong>
              <p className="tiny muted">
                Your cardiovascular markers are showing a positive trend. Both Total Cholesterol and
                LDL have dropped significantly, likely due to the dietary changes you noted in July.
                Vitamin D is now in the &ldquo;Optimal&rdquo; range.
              </p>
            </div>
          </div>
          <div className="journey">
            <span className="icon-box icon-box--amber">⚠</span>
            <div>
              <strong>What to Watch</strong>
              <p className="tiny muted">
                Fasting blood sugar has edged slightly higher (114 mg/dL). While not critically
                high, it&apos;s approaching the pre-diabetic threshold. It would be beneficial to
                review your sugar and refined carb intake over the next few weeks.
              </p>
            </div>
          </div>
        </Card>

        <Card tone="blue">
          <span className="icon-box">🤖</span>
          <h2 style={{ marginTop: 12 }}>Deep Dive with AI</h2>
          <p className="deep-text">
            Ask MedAI detailed questions about specific enzymes, trend correlations, or suggested
            lifestyle modifications based on these changes.
          </p>
          <button className="btn btn--onblue btn--square">Discuss with AI Assistant →</button>
        </Card>
      </div>

      <Card
        title="Multi-Year Trend Analysis"
        subtitle="Aggregation of 3 key markers (2022-2024)"
        className="trend-card"
        action={
          <div className="toggle">
            <button className={range === "month" ? "active" : ""} onClick={() => setRange("month")}>
              Month
            </button>
            <button className={range === "year" ? "active" : ""} onClick={() => setRange("year")}>
              Year
            </button>
          </div>
        }
      >
        <div className="wave">
          <span className="tiny muted">
            📊 Interactive Trend Graph renders upon data processing ({range} view)
          </span>
          <svg viewBox="0 0 100 24" preserveAspectRatio="none">
            <path
              d="M0,18 C18,6 30,22 46,14 C62,6 74,20 100,8"
              fill="none"
              stroke="#1443ab"
              strokeWidth="1.6"
            />
          </svg>
        </div>
      </Card>
    </div>
  );
}
