const googleLoginUrl = 'http://localhost:8000/auth/google/login'

export default function GoogleButton({ label = 'Continue with Google' }) {
  return (
    <button type="button" className="button button-google" onClick={() => { window.location.href = googleLoginUrl }}>
      <svg className="google-logo" viewBox="0 0 18 18" aria-hidden="true">
        <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.716v2.258h2.909c1.702-1.567 2.684-3.875 2.684-6.615z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.258c-.806.54-1.835.86-3.047.86-2.344 0-4.328-1.585-5.036-3.711H.955v2.332A9 9 0 0 0 9 18z"/>
        <path fill="#FBBC05" d="M3.964 10.711A5.41 5.41 0 0 1 3.682 9c0-.594.102-1.17.282-1.711V4.957H.955A9 9 0 0 0 0 9c0 1.452.347 2.827.955 4.043l3.009-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.507.454 3.44 1.345l2.581-2.581C13.463.891 11.426 0 9 0A9 9 0 0 0 .955 4.957L3.964 7.29C4.672 5.164 6.656 3.58 9 3.58z"/>
      </svg>
      <span>{label}</span>
    </button>
  )
}
