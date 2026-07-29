import { NavLink, Link } from "react-router-dom";
import { navItems, currentUser } from "../data/mock.js";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/" className="brand">
        <span className="brand-mark">✚</span>
        MedAI
      </Link>

      <div className="sidebar-user">
        <span className="avatar">{currentUser.initials}</span>
        <div>
          <strong>{currentUser.name}</strong>
          <span>{currentUser.role}</span>
        </div>
      </div>

      <nav className="nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <span className="nav-ico" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-foot">
        <Link to="/dashboard" className="btn btn--primary btn--block btn--sm">
          + New Analysis
        </Link>
        <span className="nav-link">
          <span className="nav-ico">⚙</span> Settings
        </span>
        <Link to="/" className="nav-link">
          <span className="nav-ico">⎋</span> Sign Out
        </Link>
      </div>
    </aside>
  );
}
