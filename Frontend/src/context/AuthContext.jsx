import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

function getErrorMessage(error) {
  const detail = error.response?.data?.detail
  if (Array.isArray(detail)) return detail.map((item) => item.msg).join(', ')
  return detail || error.response?.data?.message || 'Something went wrong. Please try again.'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCurrentUser = useCallback(async (allowRefresh = true) => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data)
      return response.data
    } catch (error) {
      if (allowRefresh && error.response?.status === 401) {
        try {
          await api.post('/auth/refresh')
          return await fetchCurrentUser(false)
        } catch {
          setUser(null)
        }
      } else {
        setUser(null)
      }
      return null
    }
  }, [])

  useEffect(() => {
    fetchCurrentUser().finally(() => setIsLoading(false))
  }, [fetchCurrentUser])

  const login = useCallback(async (credentials) => {
    try {
      await api.post('/auth/login', credentials)
      return await fetchCurrentUser()
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }, [fetchCurrentUser])

  const register = useCallback(async (details) => {
    try {
      const response = await api.post('/auth/register', details)
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      setUser(null)
    }
  }, [])

  const logoutAll = useCallback(async () => {
    try {
      await api.post('/auth/logout-all')
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
    logoutAll,
    fetchCurrentUser,
  }), [user, isLoading, login, register, logout, logoutAll, fetchCurrentUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export { getErrorMessage }
