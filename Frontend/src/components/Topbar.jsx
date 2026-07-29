import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/scan-analysis", label: "Analysis" },
  { to: "/lab-results", label: "Lab Results" },
  { to: "/wellness", label: "Wellness" },
  { to: "/doctors", label: "Clinics" },
];

export default function Topbar() {
  return (
    <header className="topbar">
      <span className="badge badge--blue">🛡 HIPAA SECURED</span>

      <div className="topbar-tabs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => (isActive ? "topbar-tab active" : "topbar-tab")}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <label className="search">
        <span aria-hidden="true">🔍</span>
        <input placeholder="Search my records..." />
      </label>

      <button className="btn btn--primary btn--sm">Consult AI</button>
      <button className="icon-btn" aria-label="Notifications">
        🔔
      </button>
    </header>
  );
}
