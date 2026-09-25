import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const adminApi = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach stored JWT to every request
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On 401, wipe the token so ProtectedRoute redirects to /admin/login
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_email')
    }
    return Promise.reject(error)
  }
)

// ─── Types ────────────────────────────────────────────────────────────────────

export type InquiryStatus = 'New' | 'Contacted' | 'Closed'

export interface Inquiry {
  _id: string
  name: string
  businessName: string
  email: string
  phone: string
  businessType: string
  service: string
  budget: string
  message: string
  status: InquiryStatus
  createdAt: string
  updatedAt: string
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function adminLogin(email: string, password: string) {
  const { data } = await adminApi.post('/api/auth/login', { email, password })
  return data as { success: boolean; token: string; admin: { email: string } }
}

export async function adminMe() {
  const { data } = await adminApi.get('/api/auth/me')
  return data as { success: boolean; admin: { id: string; email: string } }
}

// ─── Inquiries ────────────────────────────────────────────────────────────────

export async function fetchInquiries(status?: InquiryStatus) {
  const params = status ? { status } : {}
  const { data } = await adminApi.get('/api/inquiries', { params })
  return data as { success: boolean; count: number; data: Inquiry[] }
}

export async function fetchInquiryById(id: string) {
  const { data } = await adminApi.get(`/api/inquiries/${id}`)
  return data as { success: boolean; data: Inquiry }
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  const { data } = await adminApi.patch(`/api/inquiries/${id}`, { status })
  return data as { success: boolean; data: Inquiry }
}

export async function deleteInquiry(id: string) {
  const { data } = await adminApi.delete(`/api/inquiries/${id}`)
  return data as { success: boolean; message: string }
}
