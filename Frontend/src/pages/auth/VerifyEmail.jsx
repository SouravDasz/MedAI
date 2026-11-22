import { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import AuthLayout from '../../components/auth/AuthLayout'
import ErrorMessage from '../../components/common/ErrorMessage'

export default function VerifyEmail() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState(params.get('email') || '')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return undefined
    const timer = setInterval(() => setCooldown((value) => value - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const verify = async (event) => {
    event.preventDefault()
    setError('')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.')
    if (!/^\d{6}$/.test(otp)) return setError('Enter the six-digit verification code.')
    setLoading(true)
    try {
      await api.post('/auth/verify-otp', { email, otp })
      setMessage('Email verified. You can now sign in.')
      setTimeout(() => navigate('/login'), 900)
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to verify this code.')
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    setError('')
    try {
      await api.post('/auth/resend-otp', null, { params: { email } })
      setMessage('If eligible, a new code has been sent.')
      setCooldown(60)
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to resend the code.')
    }
  }

  return <AuthLayout title="Verify your email" subtitle="One last step">
    <form className="auth-form" onSubmit={verify}>
      <p className="supporting-text">Enter the six-digit code sent to your email address.</p>
      <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Verification code<input className="otp-input" inputMode="numeric" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} /></label>
      <ErrorMessage>{error}</ErrorMessage>
      {message && <p className="message message-success">{message}</p>}
      <button className="button button-primary" disabled={loading}>{loading ? 'Verifying…' : 'Verify email'}</button>
      <button type="button" className="text-button resend-button" disabled={cooldown > 0 || !email} onClick={resend}>{cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}</button>
      <p className="form-footer"><Link to="/login">Back to sign in</Link></p>
    </form>
  </AuthLayout>
}
