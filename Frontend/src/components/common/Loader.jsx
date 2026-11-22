export default function Loader({ label = 'Loading' }) {
  return <div className="loader" role="status" aria-label={label} />
}
