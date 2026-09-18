import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export type InquiryPayload = {
  name: string
  businessName: string
  email: string
  phone: string
  businessType: string
  service: string
  budget: string
  message: string
}

export async function submitInquiry(payload: InquiryPayload) {
  const { data } = await api.post('/api/inquiries', payload)
  return data
}
