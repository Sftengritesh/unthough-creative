import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, MessageCircle, Send, AlertCircle } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { contact, whatsappLink } from '@/data/siteConfig'
import { submitInquiry, type InquiryPayload } from '@/lib/api'
import { fadeUp, viewportOnce } from '@/lib/motion'

type Status = 'idle' | 'loading' | 'success' | 'error'

const businessTypes = [
  'Restaurant / Cafe',
  'Gym / Fitness Center',
  'Salon / Beauty',
  'School / Institution',
  'Clothing Brand',
  'Local Business',
  'Startup',
  'Personal Brand',
  'Other',
]

const servicesList = [
  'Instagram Reels',
  'Social Media Posts',
  'Page Management',
  'Content Strategy',
  'Brand Photography',
  'Video Editing',
  'Full Package',
  'Not Sure Yet',
]

const budgets = ['Under ₹8,000', '₹8,000 – ₹10,000', '₹10,000 – ₹15,000', 'Above ₹15,000']

const initialForm: InquiryPayload = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  businessType: '',
  service: '',
  budget: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState<InquiryPayload>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryPayload, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (field: keyof InquiryPayload, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof InquiryPayload, string>> = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.businessName.trim()) next.businessName = 'Business name is required.'
    if (!form.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!form.phone.trim()) {
      next.phone = 'Phone number is required.'
    } else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
      next.phone = 'Enter a valid phone number.'
    }
    if (!form.businessType) next.businessType = 'Please select your business type.'
    if (!form.service) next.service = 'Please select a service.'
    if (!form.message.trim()) next.message = 'Tell us a little about your project.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    setErrorMsg('')
    try {
      await submitInquiry(form)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
      setErrorMsg(
        'Something went wrong sending your inquiry. Please try again or reach out on WhatsApp.'
      )
    }
  }

  const inputClass = (field: keyof InquiryPayload) =>
    `w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors duration-300 focus:border-[var(--color-accent)] ${
      errors[field] ? 'border-red-400/60' : 'border-[var(--color-line)]'
    }`

  return (
    <section id="contact" className="section-pad border-t border-[var(--color-line)] scroll-mt-24">
      <div className="container-page grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's Create Something Worth Talking About."
            description="Tell us about your business, your goals, and what you want to build."
          />

          <div className="mt-10 flex flex-col gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-fit"
            >
              <MessageCircle size={16} />
              Chat On WhatsApp
            </a>
            <div className="flex flex-col gap-1 text-sm text-[var(--color-text-secondary)]">
              <span>Call / WhatsApp: {contact.phoneDisplay}</span>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)] transition-colors w-fit"
              >
                Instagram: {contact.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-7 glass rounded-3xl p-6 sm:p-8"
        >
          {status === 'success' ? (
            <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center py-10">
              <CheckCircle2 size={40} className="text-[var(--color-accent)] mb-4" />
              <h3 className="text-xl font-medium text-[var(--color-text)] mb-2">
                Inquiry Sent Successfully
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">
                Thanks for reaching out — we'll get back to you shortly. You can also
                message us directly on WhatsApp for a faster response.
              </p>
              <button onClick={() => setStatus('idle')} className="btn-outline mt-6">
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={inputClass('name')}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="businessName" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                  Business Name
                </label>
                <input
                  id="businessName"
                  value={form.businessName}
                  onChange={(e) => update('businessName', e.target.value)}
                  className={inputClass('businessName')}
                  placeholder="Your business name"
                />
                {errors.businessName && (
                  <p className="text-xs text-red-400 mt-1.5">{errors.businessName}</p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass('email')}
                  placeholder="you@business.com"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="phone" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputClass('phone')}
                  placeholder="Your phone number"
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1.5">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="businessType" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                  Business Type
                </label>
                <select
                  id="businessType"
                  value={form.businessType}
                  onChange={(e) => update('businessType', e.target.value)}
                  className={inputClass('businessType')}
                >
                  <option value="" className="bg-[var(--color-surface)]">Select business type</option>
                  {businessTypes.map((t) => (
                    <option key={t} value={t} className="bg-[var(--color-surface)]">
                      {t}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <p className="text-xs text-red-400 mt-1.5">{errors.businessType}</p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="service" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                  Service Required
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => update('service', e.target.value)}
                  className={inputClass('service')}
                >
                  <option value="" className="bg-[var(--color-surface)]">Select a service</option>
                  {servicesList.map((s) => (
                    <option key={s} value={s} className="bg-[var(--color-surface)]">
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-xs text-red-400 mt-1.5">{errors.service}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="budget" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                  Monthly Budget
                </label>
                <select
                  id="budget"
                  value={form.budget}
                  onChange={(e) => update('budget', e.target.value)}
                  className={inputClass('budget')}
                >
                  <option value="" className="bg-[var(--color-surface)]">Select a budget range</option>
                  {budgets.map((b) => (
                    <option key={b} value={b} className="bg-[var(--color-surface)]">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className={inputClass('message')}
                  placeholder="Tell us about your business and goals..."
                />
                {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <div className="sm:col-span-2 flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-400/30 px-4 py-3 text-sm text-red-300">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
                <button type="submit" disabled={status === 'loading'} className="btn-primary flex-1 disabled:opacity-60">
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Inquiry
                    </>
                  )}
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1"
                >
                  <MessageCircle size={16} />
                  Chat On WhatsApp
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
