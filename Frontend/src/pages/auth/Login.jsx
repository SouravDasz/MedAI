import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import GoogleButton from '../../components/auth/GoogleButton'
import ErrorMessage from '../../components/common/ErrorMessage'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(new URLSearchParams(location.search).get('error') === 'google_account_exists' ? 'This email already has a password account. Sign in with your email and password.' : '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (new URLSearchParams(location.search).get('error') === 'google_account_conflict') setError('That Google account could not be connected. Please try again.')
  }, [location.search])

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    if (!form.email || !form.password) return setError('Enter your email and password.')
    setLoading(true)
    try {
      await login(form)
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return <AuthLayout title="Welcome back" subtitle="Sign in to your workspace">
    <form className="auth-form" onSubmit={submit}>
      <label>Email address<input type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label>Password<div className="input-with-action"><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button type="button" className="input-action" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div></label>
      <div className="form-row"><span /> <button type="button" className="text-button muted" disabled>Forgot password?</button></div>
      <ErrorMessage>{error}</ErrorMessage>
      <button className="button button-primary" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
      <div className="divider"><span>or</span></div>
      <GoogleButton />
      <p className="form-footer">New to MedAI? <Link to="/register">Create an account</Link></p>
    </form>
  </AuthLayout>
}
