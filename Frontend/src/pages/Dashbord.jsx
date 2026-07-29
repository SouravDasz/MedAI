import Card from "../components/Card.jsx";
import StatCard from "../components/StateCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import AiChatPanel from "../components/AiChatPanel.jsx";
import { habits, quickTiles } from "../data/mock.js";
import "./Dashbord.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>AI-processed findings from your latest uploads and connected devices.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn--ghost btn--sm">Upload New +</button>
          <button className="btn btn--primary btn--sm">Consult AI</button>
        </div>
      </div>

      <div className="dash-top">
        <Card className="score-card">
          <div className="spread">
            <span className="tiny label-caps">Health Stability Index</span>
            <span className="badge badge--green">↑ +2.4%</span>
          </div>
          <p className="score-value">94%</p>
          <ProgressBar value={94} />
          <div className="spread score-foot">
            <span className="tiny muted">● Optimum Range</span>
            <a className="link" href="#trends">
              View detailed trends
            </a>
          </div>
        </Card>

        <StatCard icon="❤️" iconTone="red" label="Heart Rate" note="Avg BPM" value="72" unit="bpm" />
        <StatCard icon="🌙" label="Sleep Quality" note="Last Night" value="8h 12m" />
      </div>

      <div className="dash-body">
        <div className="dash-col">
          <Card
            title="Medical Records Analysis"
            subtitle="AI-processed findings from your latest uploads"
            action={
              <a className="link" href="#upload">
                Upload New +
              </a>
            }
          >
            <div className="record-grid">
              <article className="record">
                <div className="row">
                  <span className="icon-box">📄</span>
                  <div>
                    <h3>Biochemical Screening</h3>
                    <p className="tiny muted">Processed 2 hours ago</p>
                  </div>
                </div>
                <ul className="record-rows">
                  <li>
                    <span>Cholesterol (HDL)</span>
                    <span className="badge badge--green">Optimal</span>
                  </li>
                  <li>
                    <span>Glucose (Fasting)</span>
                    <span className="badge badge--red">Slightly High</span>
                  </li>
                </ul>
                <p className="record-note">AI Insight: Moderate activity advised</p>
              </article>

              <article className="record">
                <div className="row">
                  <span className="icon-box icon-box--green">🩻</span>
                  <div>
                    <h3>Chest X-Ray Scan</h3>
                    <p className="tiny muted">Processed Oct 24, 2024</p>
                  </div>
                </div>
                <div className="scan-thumb">
                  <span className="scan-tag">AI HEATMAP OVERLAY</span>
                </div>
                <p className="record-note">Clear · No abnormalities detected</p>
              </article>
            </div>
          </Card>

          <Card tone="blue" className="summary-card">
            <div className="summary-inner">
              <div>
                <h2>Weekly Wellness Summary</h2>
                <p className="summary-text">
                  Your activity levels increased by 15% this week. We&apos;ve detected a correlation
                  between your high glucose reading and sleep patterns.
                </p>
                <button className="btn btn--onblue btn--sm">Read Full Analysis</button>
              </div>
              <span className="summary-orb">📈</span>
            </div>
          </Card>

          <Card
            title="Daily Health Habits"
            subtitle="Stay on track with your personalized wellness goals"
            action={
              <span className="badge badge--green">
                Daily Progress · {habits.filter((habit) => habit.done).length}/{habits.length}
              </span>
            }
          >
            <div className="habit-grid">
              {habits.map((habit) => (
                <label key={habit.title} className={`habit ${habit.done ? "habit--done" : ""}`}>
                  <input type="checkbox" defaultChecked={habit.done} />
                  <div>
                    <strong>{habit.title}</strong>
                    <span className="tiny muted">{habit.note}</span>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          <div className="quick-grid">
            {quickTiles.map((tile) => (
              <button key={tile.label} className="quick">
                <span className="icon-box">{tile.icon}</span>
                <span className="tiny">{tile.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="dash-col dash-col--side">
          <AiChatPanel />
        </div>
      </div>
    </div>
  );
}
