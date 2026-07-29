import { useState } from "react";
import Card from "../components/Card.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { macroGoals, mealPlan, activitySync } from "../data/mock.js";
import "./Wellness.css";

export default function Wellness() {
  const [view, setView] = useState("table");

  return (
    <div>
      <div className="page-head">
        <div>
          <span className="badge badge--green">🛡 HIPAA Secure Data Environment</span>
          <h1 style={{ marginTop: 10 }}>Wellness &amp; Nutrition Planner</h1>
          <p>Personalized clinical guidance based on your metabolic profile.</p>
        </div>
        <div className="row">
          <div className="right">
            <p className="tiny muted">Active Tracking</p>
            <strong>Day 14 of 30</strong>
          </div>
          <span className="icon-box">📅</span>
        </div>
      </div>

      <div className="wellness-layout">
        <div className="wellness-main">
          <div className="macro-grid">
            {macroGoals.map((goal) => (
              <article key={goal.label} className="card macro">
                <div className="spread">
                  <span className="icon-box">{goal.icon}</span>
                  <span className={`badge badge--${goal.tone}`}>{goal.delta}</span>
                </div>
                <p className="tiny label-caps">{goal.label}</p>
                <p className="macro-value">{goal.value}</p>
                <ProgressBar value={goal.pct} tone={goal.tone === "green" ? "green" : "blue"} />
              </article>
            ))}
          </div>

          <Card
            title="Weekly Meal Recommendations"
            subtitle="Clinically AI curated recipes based on your bloodwork and preferences."
            action={
              <div className="toggle">
                <button
                  className={view === "table" ? "active" : ""}
                  onClick={() => setView("table")}
                >
                  Table
                </button>
                <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
                  List
                </button>
              </div>
            }
          >
            {view === "table" ? (
              <div className="meal-grid">
                {mealPlan.map((day) => (
                  <div key={day.day} className="meal-col">
                    <p className="meal-day">{day.day}</p>
                    {day.meals.map(([slot, name]) => (
                      <div key={slot} className={`meal meal--${slot.toLowerCase()}`}>
                        <span className="meal-slot">{slot}</span>
                        <strong>{name}</strong>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <ul className="meal-list">
                {mealPlan.flatMap((day) =>
                  day.meals.map(([slot, name]) => (
                    <li key={day.day + slot}>
                      <span className="badge badge--outline">{day.day}</span>
                      <strong>{name}</strong>
                      <span className="tiny muted">{slot}</span>
                    </li>
                  ))
                )}
              </ul>
            )}
          </Card>

          <Card className="recipe-card card--flush">
            <div className="recipe">
              <div className="recipe-photo" aria-hidden="true" />
              <div className="recipe-body">
                <div className="row">
                  <span className="badge badge--green">Doctor Recommended</span>
                  <span className="badge badge--outline">High Omega-3</span>
                </div>
                <h2>Atlantic Salmon with Turmeric Quinoa</h2>
                <p className="muted">
                  This meal is specifically selected to support your current inflammatory markers.
                  Rich in Omega-3 and Curcumin, it helps reduce arterial inflammation detected in
                  your latest biometric sync.
                </p>
                <div className="spread">
                  <div className="row tiny muted">
                    <span>⏱ 25 Mins</span>
                    <span>🔥 480 Kcal</span>
                  </div>
                  <button className="btn btn--primary btn--sm">View Full Recipe →</button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <aside className="wellness-side">
          <Card tone="blue">
            <h2>✦ AI Wellness Insights</h2>
            <div className="insight">
              <strong>SODIUM ALERT</strong>
              <p>
                Your sodium intake has trended up by 15%. Consider increasing water intake by 500ml
                today to balance fluid retention.
              </p>
            </div>
            <div className="insight">
              <strong>SLEEP CORRELATION</strong>
              <p>
                Lower protein intake yesterday correlated with a 20% drop in Deep Sleep. Target 40g
                protein for dinner tonight.
              </p>
            </div>
            <button className="btn btn--onblue btn--block btn--square">Deep Analysis →</button>
          </Card>

          <Card title="Activity Sync">
            <div className="sync-list">
              {activitySync.map((item) => (
                <article key={item.title} className="sync">
                  <span className="icon-box icon-box--green">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p className="tiny muted">{item.note}</p>
                  </div>
                  <div className="right">
                    <strong>{item.value}</strong>
                    <p className="tiny muted">{item.tag}</p>
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <div className="watch-card" aria-hidden="true">
            <div className="watch" />
          </div>
        </aside>
      </div>
    </div>
  );
}
