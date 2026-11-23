import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  Settings,
  UserRound,
  Pencil,
  ShieldCheck,
  X,
} from 'lucide-react'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

function getInitials(name) {
  return String(name || 'User')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
}

function PasswordInput({ label, value, onChange, autoComplete }) {
  const [visible, setVisible] = useState(false)
  return (
    <label className="profile-field">
      <span>{label}</span>
      <div className="profile-password-input">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        <button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? 'Hide password' : 'Show password'}>
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </label>
  )
}

export default function ProfileMenu({ user, onLogout }) {
  const navigate = useNavigate()
  const { fetchCurrentUser } = useAuth()
  const menuRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState(user)
  const [modal, setModal] = useState(null)
  const [username, setUsername] = useState(user?.username || '')
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    api.get('/users/me')
      .then((response) => {
        setProfile(response.data)
        setUsername(response.data.username)
      })
      .catch(() => setProfile(user))
  }, [open, user])

  useEffect(() => {
    if (!open) return
    const handlePointer = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false)
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setModal(null)
      }
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const closeModal = () => {
    setModal(null)
    setError('')
    setMessage('')
  }

  const openModal = (name) => {
    setOpen(false)
    setError('')
    setMessage('')
    setModal(name)
  }

  const saveProfile = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const response = await api.patch('/users/me', { username: username.trim() })
      setProfile((current) => ({ ...current, ...response.data }))
      await fetchCurrentUser()
      setMessage('Profile updated successfully.')
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to update profile.')
    } finally {
      setBusy(false)
    }
  }

  const savePassword = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    if (passwords.next !== passwords.confirm) {
      setError('New password and confirmation do not match.')
      return
    }
    if (passwords.next.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    setBusy(true)
    try {
      await api.patch('/users/me/password', {
        current_password: passwords.current,
        new_password: passwords.next,
      })
      setPasswords({ current: '', next: '', confirm: '' })
      setMessage('Password changed successfully. Please sign in again.')
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to change password.')
    } finally {
      setBusy(false)
    }
  }

  const confirmLogout = async () => {
    setBusy(true)
    await onLogout()
  }

  const displayUser = profile || user || {}

  return (
    <>
      <div className="profile-menu" ref={menuRef}>
        <button
          type="button"
          className="profile-trigger"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="profile-avatar">{getInitials(displayUser.username)}</span>
          <span className="profile-name">{displayUser.username}</span>
          <ChevronDown className={open ? 'profile-chevron open' : 'profile-chevron'} size={15} />
        </button>
        {open && (
          <div className="profile-dropdown" role="menu">
            <div className="profile-summary">
              <span className="profile-avatar profile-avatar-large">{getInitials(displayUser.username)}</span>
              <div>
                <strong>{displayUser.username}</strong>
                <span>{displayUser.email}</span>
              </div>
            </div>
            <div className="profile-status-row">
              <span className={displayUser.is_verified ? 'profile-verified' : 'profile-unverified'}>
                <ShieldCheck size={14} />
                {displayUser.is_verified ? 'Verified' : 'Unverified'}
              </span>
              <span className="profile-provider">{displayUser.auth_provider || 'Email'}</span>
            </div>
            <div className="profile-menu-actions" role="none">
              <button type="button" role="menuitem" onClick={() => openModal('profile')}><UserRound size={17} /> My Profile</button>
              <button type="button" role="menuitem" onClick={() => openModal('edit')}><Pencil size={17} /> Edit Profile</button>
              <button type="button" role="menuitem" onClick={() => openModal('password')}><KeyRound size={17} /> Change Password</button>
              <button type="button" role="menuitem" onClick={() => { setOpen(false); navigate('/settings') }}><Settings size={17} /> Settings</button>
            </div>
            <button type="button" className="profile-logout" role="menuitem" onClick={() => openModal('logout')}>
              <LogOut size={17} /> Logout
            </button>
          </div>
        )}
      </div>

      {modal && (
        <div className="profile-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal() }}>
          <section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-modal-title">
            <button type="button" className="profile-modal-close" onClick={closeModal} aria-label="Close"><X size={18} /></button>

            {modal === 'profile' && (
              <>
                <p className="eyebrow">Account</p>
                <h2 id="profile-modal-title">My Profile</h2>
                <div className="profile-detail-card">
                  <span className="profile-avatar profile-avatar-large">{getInitials(displayUser.username)}</span>
                  <div><span>Full name</span><strong>{displayUser.username}</strong></div>
                  <div><span>Email address</span><strong>{displayUser.email}</strong></div>
                  <div><span>Account status</span><strong>{displayUser.is_verified ? 'Verified' : 'Unverified'}</strong></div>
                  <div><span>Provider</span><strong>{displayUser.auth_provider || 'Email'}</strong></div>
                </div>
                <button type="button" className="button button-primary profile-modal-action" onClick={() => openModal('edit')}>Edit Profile</button>
              </>
            )}

            {modal === 'edit' && (
              <>
                <p className="eyebrow">Personal information</p>
                <h2 id="profile-modal-title">Edit Profile</h2>
                <form className="profile-modal-form" onSubmit={saveProfile}>
                  <label className="profile-field"><span>Username</span><input value={username} onChange={(event) => setUsername(event.target.value)} minLength={3} maxLength={100} required /></label>
                  {error && <p className="profile-message profile-message-error">{error}</p>}
                  {message && <p className="profile-message profile-message-success">{message}</p>}
                  <button type="submit" className="button button-primary" disabled={busy}>{busy ? 'Saving...' : 'Save changes'}</button>
                </form>
              </>
            )}

            {modal === 'password' && (
              <>
                <p className="eyebrow">Security</p>
                <h2 id="profile-modal-title">Change Password</h2>
                {displayUser.has_password ? (
                  <form className="profile-modal-form" onSubmit={savePassword}>
                    <PasswordInput label="Current password" value={passwords.current} onChange={(event) => setPasswords({ ...passwords, current: event.target.value })} autoComplete="current-password" />
                    <PasswordInput label="New password" value={passwords.next} onChange={(event) => setPasswords({ ...passwords, next: event.target.value })} autoComplete="new-password" />
                    <PasswordInput label="Confirm new password" value={passwords.confirm} onChange={(event) => setPasswords({ ...passwords, confirm: event.target.value })} autoComplete="new-password" />
                    {error && <p className="profile-message profile-message-error">{error}</p>}
                    {message && <p className="profile-message profile-message-success">{message}</p>}
                    <button type="submit" className="button button-primary" disabled={busy}>{busy ? 'Updating...' : 'Update password'}</button>
                  </form>
                ) : (
                  <div className="profile-message profile-message-info">
                    This Google-only account does not have a password. Use Google sign-in or set up a password through account settings.
                  </div>
                )}
              </>
            )}

            {modal === 'logout' && (
              <>
                <span className="logout-modal-icon"><LogOut size={20} /></span>
                <h2 id="profile-modal-title">Sign out of MedAI?</h2>
                <p className="profile-modal-copy">You will need to sign in again to access your workspace.</p>
                {busy && <p className="profile-message profile-message-info">Signing out...</p>}
                <div className="profile-modal-actions">
                  <button type="button" className="button button-secondary" onClick={closeModal} disabled={busy}>Cancel</button>
                  <button type="button" className="button button-danger" onClick={confirmLogout} disabled={busy}>Logout</button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </>
  )
}
