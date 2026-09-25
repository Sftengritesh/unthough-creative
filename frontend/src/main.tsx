import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AdminLoginPage from './pages/AdminLoginPage.tsx'
import AdminDashboardPage from './pages/AdminDashboardPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { AdminAuthContext } from './lib/adminAuthContext.ts'
import { useAdminAuth } from './hooks/useAdminAuth.ts'

function Root() {
  const auth = useAdminAuth()

  return (
    <AdminAuthContext.Provider value={auth}>
      <BrowserRouter>
        <Routes>
          {/* Public marketing site */}
          <Route path="/" element={<App />} />

          {/* Admin login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected admin dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* /admin → redirect to login */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

          {/* Catch-all → back to homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminAuthContext.Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
