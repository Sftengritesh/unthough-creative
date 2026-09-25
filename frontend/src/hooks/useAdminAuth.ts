import { useState, useEffect, useCallback } from 'react'
import { adminMe } from '@/lib/adminApi'

export interface AdminState {
  token: string | null
  email: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminState>({
    token: null,
    email: null,
    isAuthenticated: false,
    isLoading: true,
  })

  const verify = useCallback(async () => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setState({ token: null, email: null, isAuthenticated: false, isLoading: false })
      return
    }
    try {
      await adminMe()
      const email = localStorage.getItem('admin_email') ?? ''
      setState({ token, email, isAuthenticated: true, isLoading: false })
    } catch {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_email')
      setState({ token: null, email: null, isAuthenticated: false, isLoading: false })
    }
  }, [])

  useEffect(() => {
    verify()
  }, [verify])

  const login = useCallback((token: string, email: string) => {
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_email', email)
    setState({ token, email, isAuthenticated: true, isLoading: false })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_email')
    setState({ token: null, email: null, isAuthenticated: false, isLoading: false })
  }, [])

  return { ...state, login, logout, verify }
}
