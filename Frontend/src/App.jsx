import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Loader from './components/common/Loader'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyEmail from './pages/auth/VerifyEmail'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Landing from './pages/Landing'
import './App.css'

function OAuthSuccess() {
  const { fetchCurrentUser } = useAuth()
  const location = useLocation()
  const [ready, setReady] = useState(false)
  useEffect(() => { fetchCurrentUser().finally(() => setReady(true)) }, [fetchCurrentUser])
  if (!ready) return <div className="page-center"><Loader label="Completing sign in" /></div>
  return <Navigate to="/dashboard" replace state={{ from: location }} />
}

function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verify-email" element={<VerifyEmail />} />
    <Route path="/auth/google/success" element={<OAuthSuccess />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}

export default function App() {
  return <BrowserRouter><AuthProvider><AppRoutes /></AuthProvider></BrowserRouter>
}
