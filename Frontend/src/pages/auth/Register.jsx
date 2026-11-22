import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import GoogleButton from '../../components/auth/GoogleButton'
import ErrorMessage from '../../components/common/ErrorMessage'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })
  const passwordScore = form.password.length === 0 ? 0 : form.password.length < 8 ? 1 : /[A-Z]/.test(form.password) && /\d/.test(form.password) ? 3 : 2

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    if (!form.username || !form.email || !form.password || !form.confirmPassword) return setError('Complete all required fields.')
    if (form.password.length < 8) return setError('Password must be at least 8 characters.')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    if (!terms) return setError('Accept the terms to continue.')
    setLoading(true)
    try {
      await register({ username: form.username, email: form.email, password: form.password })
      navigate(`/verify-email?email=${encodeURIComponent(form.email)}`)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return <AuthLayout title="Create your account" subtitle="Start your MedAI journey">
    <p className="auth-card-subtitle">Create your account to access your personal health workspace.</p>
    <form className="auth-form" onSubmit={submit}>
      <label>Full name / username<input autoComplete="name" value={form.username} onChange={update('username')} placeholder="Enter your name" /></label>
      <label>Email address<input type="email" autoComplete="email" value={form.email} onChange={update('email')} placeholder="you@example.com" /></label>
      <label>Password<div className="input-with-action"><input type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={form.password} onChange={update('password')} /><button type="button" className="input-action" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div></label>
      {form.password && <div className="password-strength" aria-label={`Password strength: ${passwordScore} out of 3`}><span className={passwordScore >= 1 ? 'active weak' : ''} /><span className={passwordScore >= 2 ? 'active medium' : ''} /><span className={passwordScore >= 3 ? 'active strong' : ''} /><small>{passwordScore === 1 ? 'Weak' : passwordScore === 2 ? 'Good' : passwordScore === 3 ? 'Strong' : ''}</small></div>}
      <label>Confirm password<div className="input-with-action"><input type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" value={form.confirmPassword} onChange={update('confirmPassword')} /><button type="button" className="input-action" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? 'Hide' : 'Show'}</button></div></label>
      <label className="checkbox"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} /> <span>I agree to the Terms and Conditions.</span></label>
      <ErrorMessage>{error}</ErrorMessage>
      <button className="button button-primary" disabled={loading}>{loading ? 'Creating account…' : 'Create account'}</button>
      <div className="divider"><span>or</span></div>
      <GoogleButton />
      <p className="form-footer">Already have an account? <Link to="/login">Sign in</Link></p>
    </form>
  </AuthLayout>
}
