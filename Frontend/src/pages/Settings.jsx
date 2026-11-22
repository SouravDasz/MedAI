import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { AppShell } from './Dashboard'
import { useAuth } from '../context/AuthContext'
import ErrorMessage from '../components/common/ErrorMessage'

export default function Settings() {
  const { user, logout, logoutAll } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState(new URLSearchParams(location.search).get('error') ? 'Google account linking was not completed.' : '')
  const [message, setMessage] = useState(new URLSearchParams(location.search).get('google') === 'linked' ? 'Google account linked successfully.' : '')
  const signOut = async (all = false) => { await (all ? logoutAll() : logout()); navigate('/login', { replace: true }) }
  const unlink = async () => {
    setError('')
    try {
      await api.delete('/auth/google/unlink')
      setMessage('Google account disconnected.')
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to disconnect Google.')
    }
  }
  useEffect(() => { if (!user) navigate('/login', { replace: true }) }, [user, navigate])
  if (!user) return null
  return <AppShell user={user} onLogout={() => signOut()}><div className="page-heading"><div><p className="eyebrow">Account</p><h1>Settings</h1><p className="supporting-text">Manage your MedAI account and connected services.</p></div></div><section className="settings-card"><div className="setting-row"><div><p className="eyebrow">Profile</p><h3>{user.username}</h3><p>{user.email}</p></div><span className="verified">✓ Verified</span></div><div className="setting-row"><div><p className="eyebrow">Google account</p><h3>Connection management</h3><p className="supporting-text">The backend does not currently return connection status in `/auth/me`.</p></div><div className="setting-actions"><button className="button button-secondary" onClick={() => { window.location.href = 'http://localhost:8000/auth/google/link' }}>Link Google</button><button className="button button-danger" onClick={unlink}>Unlink Google</button></div></div><ErrorMessage>{error}</ErrorMessage>{message && <p className="message message-success">{message}</p>}<div className="setting-footer"><button className="button button-secondary" onClick={() => signOut(true)}>Sign out all devices</button><Link to="/dashboard">Back to dashboard</Link></div></section></AppShell>
}
