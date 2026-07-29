export default function Card({ title, subtitle, action, tone, className = "", children }) {
  const classes = ["card", tone === "blue" ? "card--blue" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      {(title || action) && (
        <div className="card-title">
          <div>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
