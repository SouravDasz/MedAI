export default function ProgressBar({ value, tone = "green", onBlue = false }) {
  const classes = [
    "progress",
    tone === "blue" ? "progress--blue" : "",
    onBlue ? "progress--onblue" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="progressbar" aria-valuenow={value}>
      <span style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    </div>
  );
}
