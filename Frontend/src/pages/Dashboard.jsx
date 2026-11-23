import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProfileMenu from '../components/auth/ProfileMenu'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const signOut = async () => { await logout(); navigate('/login', { replace: true }) }
  return <AppShell user={user} onLogout={signOut}>
    <div className="page-heading"><div><p className="eyebrow">Overview</p><h1>Good to see you, {user.username}.</h1><p className="supporting-text">Your secure MedAI workspace is ready.</p></div><span className="status-pill">● Authenticated</span></div>
    <div className="dashboard-grid">
      <article className="info-card accent-card"><span className="card-icon">✦</span><p className="eyebrow">Your account</p><h2>{user.username}</h2><p>{user.email}</p><span className="verified">✓ Email verified</span></article>
      <article className="info-card"><p className="eyebrow">Coming next</p><h2>Clinical insights</h2><p className="supporting-text">Your intelligent care modules will appear here as they become available.</p><span className="module-badge">Module placeholder</span></article>
    </div>
    <section className="module-section"><p className="eyebrow">MedAI modules</p><div className="module-list"><div><strong>Care workspace</strong><span>Organize your health information</span></div><div><strong>Health insights</strong><span>Personalized intelligence, coming soon</span></div><div><strong>Account settings</strong><span><Link to="/settings">Manage your account</Link></span></div></div></section>
  </AppShell>
}

export function AppShell({ children, user, onLogout }) {
  return <div className="app-shell"><header className="app-header"><Link className="brand" to="/dashboard"><span className="brand-mark">+</span> MedAI</Link><nav><Link to="/dashboard">Dashboard</Link><Link to="/settings">Settings</Link></nav><ProfileMenu user={user} onLogout={onLogout} /></header><main className="app-content">{children}</main></div>
}
