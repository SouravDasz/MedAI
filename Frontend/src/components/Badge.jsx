export default function Badge({ tone, children }) {
  return <span className={`badge ${tone ? `badge--${tone}` : ""}`}>{children}</span>;
}
