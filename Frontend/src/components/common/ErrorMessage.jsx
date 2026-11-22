export default function ErrorMessage({ children }) {
  return children ? <p className="message message-error" role="alert">{children}</p> : null
}
