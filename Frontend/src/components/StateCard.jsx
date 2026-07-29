import "./StateCard.css";

export default function StatCard({ icon, iconTone, label, note, value, unit, foot }) {
  return (
    <div className="card stat">
      <div className="spread">
        <span className={`icon-box ${iconTone ? `icon-box--${iconTone}` : ""}`}>{icon}</span>
        <span className="tiny muted">{note}</span>
      </div>
      <p className="stat-label">{label}</p>
      <p className="stat-value">
        {value} {unit && <span>{unit}</span>}
      </p>
      {foot}
    </div>
  );
}
