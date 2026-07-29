import { useState } from "react";
import { archiveItems } from "../data/mock.js";
import "./Archive.css";

const filters = ["All", "Medical Imaging", "Lab Reports"];

export default function Archive() {
  const [active, setActive] = useState("All");

  const visible = archiveItems.filter((item) => {
    if (active === "All") return true;
    if (active === "Medical Imaging") return item.kind === "IMAGING";
    return item.kind === "LAB ANALYSIS";
  });

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Analysis Archive</h1>
          <p>
            Access and manage all your historical health reports and imaging scans with AI-powered
            insights and historical comparisons.
          </p>
        </div>
      </div>

      <div className="archive-bar">
        <div className="filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={filter === active ? "chip chip--active" : "chip"}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="archive-tools">
          <label className="search">
            <span aria-hidden="true">📅</span>
            <input placeholder="Date Range" />
          </label>
          <label className="search">
            <span aria-hidden="true">🔍</span>
            <input placeholder="Filter by keyword..." />
          </label>
        </div>
      </div>

      <div className="archive-grid">
        {visible.map((item) => (
          <article key={item.title} className="card archive-card">
            {item.kind === "IMAGING" ? (
              <div className="archive-thumb" aria-hidden="true" />
            ) : (
              <div className="archive-icon">
                <span className="icon-box">📄</span>
              </div>
            )}
            <div className="spread">
              <span className="tiny label-caps blue">{item.kind}</span>
              <span className={`badge ${item.tone ? `badge--${item.tone}` : "badge--outline"}`}>
                {item.status}
              </span>
            </div>
            <h2 className="archive-title">{item.title}</h2>
            <p className="tiny muted">{item.meta}</p>

            {item.stats && (
              <div className="archive-stats">
                {item.stats.map(([label, value]) => (
                  <div key={label}>
                    <span className="tiny muted">{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            )}

            <p className="archive-insight">
              <strong>AI Insight:</strong> {item.insight}
            </p>

            <div className="archive-actions">
              <button className="btn btn--primary btn--sm">View Full Report</button>
              <button className="icon-btn">⬇</button>
            </div>
          </article>
        ))}

        <article className="card archive-sync">
          <span className="icon-box">🕘</span>
          <strong>Past Data Synchronization</strong>
          <p className="tiny muted">
            Connect your previous medical provider to import older historical reports.
          </p>
          <button className="btn btn--ghost btn--sm">Sync Health Records</button>
        </article>
      </div>

      <div className="archive-summary">
        <div>
          <strong>24</strong>
          <span>Total Analyses · Stored in your archive</span>
        </div>
        <div>
          <strong>08</strong>
          <span>Imaging Scans · Radiology and MRI</span>
        </div>
        <div>
          <strong>16</strong>
          <span>Lab Reports · Blood and metabolic panels</span>
        </div>
      </div>
    </div>
  );
}
