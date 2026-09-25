import { createContext, useContext } from 'react'
import type { AdminState } from '@/hooks/useAdminAuth'

interface AdminAuthContextValue extends AdminState {
  login: (token: string, email: string) => void
  logout: () => void
  verify: () => Promise<void>
}

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function useAdminAuthContext() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuthContext must be used inside AdminAuthProvider')
  return ctx
}
