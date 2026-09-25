import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  LogOut,
  Search,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  MessageSquare,
  X,
  ChevronDown,
  Users,
  Inbox,
  CheckCheck,
  CircleX,
  AlertCircle,
  Filter,
} from 'lucide-react'
import {
  fetchInquiries,
  updateInquiryStatus,
  deleteInquiry,
  type Inquiry,
  type InquiryStatus,
} from '@/lib/adminApi'
import { useAdminAuthContext } from '@/lib/adminAuthContext'
import { contact } from '@/data/siteConfig'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function statusColor(status: InquiryStatus) {
  switch (status) {
    case 'New':
      return 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    case 'Contacted':
      return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
    case 'Closed':
      return 'bg-green-500/15 text-green-400 border-green-500/30'
  }
}

// ─── Summary card ─────────────────────────────────────────────────────────────

function SummaryCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string
  value: number
  icon: React.ElementType
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-5 border flex items-center gap-4 ${
        accent
          ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30'
          : 'bg-[var(--color-surface)] border-[var(--color-line)]'
      }`}
    >
      <div
        className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
          accent
            ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]'
            : 'bg-[var(--color-surface-hi)] text-[var(--color-text-secondary)]'
        }`}
      >
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white leading-none">{value}</p>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColor(status)}`}
    >
      {status}
    </span>
  )
}

// ─── Status select ────────────────────────────────────────────────────────────

function StatusSelect({
  value,
  onChange,
  disabled,
}: {
  value: InquiryStatus
  onChange: (s: InquiryStatus) => void
  disabled?: boolean
}) {
  const options: InquiryStatus[] = ['New', 'Contacted', 'Closed']
  return (
    <div className="relative inline-flex">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as InquiryStatus)}
        disabled={disabled}
        className={`appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-medium border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${statusColor(value)}`}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#1a1a1e] text-white">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-70"
      />
    </div>
  )
}

// ─── Inquiry Detail Modal ─────────────────────────────────────────────────────

function InquiryModal({
  inquiry,
  onClose,
  onStatusChange,
  onDelete,
}: {
  inquiry: Inquiry
  onClose: () => void
  onStatusChange: (id: string, status: InquiryStatus) => Promise<void>
  onDelete: (id: string) => Promise<void>
}) {
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  async function handleStatusChange(newStatus: InquiryStatus) {
    setUpdating(true)
    try {
      await onStatusChange(inquiry._id, newStatus)
      setStatus(newStatus)
    } finally {
      setUpdating(false)
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setDeleting(true)
    try {
      await onDelete(inquiry._id)
      onClose()
    } finally {
      setDeleting(false)
    }
  }

  const whatsappUrl = `https://wa.me/${inquiry.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hi ${inquiry.name}, this is Unthought Creative following up on your inquiry.`
  )}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Inquiry from ${inquiry.name}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--color-line)] px-6 py-4 flex items-start justify-between z-10">
          <div>
            <h2 className="text-lg font-semibold text-white">{inquiry.name}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{inquiry.businessName}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={status} />
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-surface-hi)] text-[var(--color-text-muted)] hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Client info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoField label="Client Name" value={inquiry.name} />
            <InfoField label="Business Name" value={inquiry.businessName} />
            <InfoField label="Email" value={inquiry.email} />
            <InfoField label="Phone" value={inquiry.phone} />
            <InfoField label="Business Type" value={inquiry.businessType} />
            <InfoField label="Service" value={inquiry.service} />
            <InfoField label="Budget" value={inquiry.budget || '—'} />
            <InfoField label="Submitted" value={formatDate(inquiry.createdAt)} />
          </div>

          {/* Message */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
              Message
            </p>
            <div className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap">
              {inquiry.message}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            {/* Status */}
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] w-20">
                Status
              </p>
              <StatusSelect value={status} onChange={handleStatusChange} disabled={updating} />
              {updating && (
                <span className="w-4 h-4 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            {/* Contact / Delete */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--color-line)]">
              <a
                href={`mailto:${inquiry.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface-hi)] border border-[var(--color-line)] text-sm text-white hover:border-[var(--color-accent)] transition-colors"
              >
                <Mail size={14} />
                Email
              </a>
              <a
                href={`tel:${inquiry.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface-hi)] border border-[var(--color-line)] text-sm text-white hover:border-[var(--color-accent)] transition-colors"
              >
                <Phone size={14} />
                Call
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/20 border border-green-600/30 text-sm text-green-400 hover:bg-green-600/30 transition-colors"
              >
                <MessageSquare size={14} />
                WhatsApp
              </a>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors disabled:opacity-50 ${
                  confirmDelete
                    ? 'bg-red-600/20 border-red-600/40 text-red-400 hover:bg-red-600/30'
                    : 'bg-[var(--color-surface-hi)] border-[var(--color-line)] text-[var(--color-text-secondary)] hover:border-red-500/40 hover:text-red-400'
                }`}
              >
                {deleting ? (
                  <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                {confirmDelete ? 'Confirm Delete' : 'Delete'}
              </button>
            </div>

            {confirmDelete && (
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle size={13} />
                This action is permanent and cannot be undone.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
        {label}
      </p>
      <p className="text-sm text-white">{value}</p>
    </div>
  )
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

const STATUSES: { label: string; value: '' | InquiryStatus }[] = [
  { label: 'All', value: '' },
  { label: 'New', value: 'New' },
  { label: 'Contacted', value: 'Contacted' },
  { label: 'Closed', value: 'Closed' },
]

const SERVICES = [
  'All Services',
  'Short-Form Video',
  'Social Media Design',
  'Story Content',
  'Page Management',
  'Content Strategy',
  'Brand Shoots',
  'Captions & Hashtags',
  'Video Editing',
  'Other',
]

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const { email, logout } = useAdminAuthContext()

  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'' | InquiryStatus>('')
  const [serviceFilter, setServiceFilter] = useState('All Services')

  // Modal
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  const loadInquiries = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true)
    else setLoading(true)
    setError('')
    try {
      const res = await fetchInquiries()
      setInquiries(res.data)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load inquiries.'
      setError(msg)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadInquiries()
  }, [loadInquiries])

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  // Summary counts
  const counts = useMemo(
    () => ({
      total: inquiries.length,
      new: inquiries.filter((i) => i.status === 'New').length,
      contacted: inquiries.filter((i) => i.status === 'Contacted').length,
      closed: inquiries.filter((i) => i.status === 'Closed').length,
    }),
    [inquiries]
  )

  // Filtered + searched list
  const filtered = useMemo(() => {
    let list = [...inquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    if (statusFilter) list = list.filter((i) => i.status === statusFilter)
    if (serviceFilter !== 'All Services')
      list = list.filter((i) =>
        i.service.toLowerCase().includes(serviceFilter.toLowerCase())
      )
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.businessName.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.phone.includes(q) ||
          i.service.toLowerCase().includes(q)
      )
    }
    return list
  }, [inquiries, statusFilter, serviceFilter, search])

  async function handleStatusChange(id: string, status: InquiryStatus) {
    await updateInquiryStatus(id, status)
    setInquiries((prev) =>
      prev.map((i) => (i._id === id ? { ...i, status } : i))
    )
    if (selectedInquiry?._id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status } : prev))
    }
  }

  async function handleDelete(id: string) {
    await deleteInquiry(id)
    setInquiries((prev) => prev.filter((i) => i._id !== id))
    setSelectedInquiry(null)
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white">
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 25% at 50% 0%, rgba(255,77,21,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ─── Topbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-line)]">
        <div className="container-page flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <LayoutDashboard size={16} className="text-[var(--color-accent)]" />
            <div className="flex items-center gap-1 select-none">
              <span className="text-sm font-bold tracking-[0.14em] text-white">UNTHOUGHT</span>
              <span className="text-[var(--color-accent)] text-xs">✦</span>
            </div>
            <span className="text-[var(--color-line)] mx-1 hidden sm:block">|</span>
            <span className="text-xs text-[var(--color-text-muted)] hidden sm:block tracking-wider uppercase">
              Admin
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-[var(--color-text-muted)] truncate max-w-[180px]">
              {email}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface-hi)] border border-[var(--color-line)] transition-colors"
            >
              <LogOut size={13} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 container-page py-8 flex flex-col gap-6">
        {/* Page title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Inquiries</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
              All client inquiries from the contact form
            </p>
          </div>
          <button
            onClick={() => loadInquiries(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface-hi)] border border-[var(--color-line)] transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* ─── Summary cards ──────────────────────────────────────────────── */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <SummaryCard label="Total" value={counts.total} icon={Users} />
            <SummaryCard label="New" value={counts.new} icon={Inbox} accent />
            <SummaryCard label="Contacted" value={counts.contacted} icon={CheckCheck} />
            <SummaryCard label="Closed" value={counts.closed} icon={CircleX} />
          </div>
        )}

        {/* ─── Filters ────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />
            <input
              type="search"
              placeholder="Search by name, business, email, phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-white text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-colors"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <Filter
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as '' | InquiryStatus)}
              className="appearance-none pl-8 pr-8 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-sm text-white focus:outline-none focus:border-[var(--color-accent)] cursor-pointer min-w-[130px]"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#1a1a1e]">
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />
          </div>

          {/* Service filter */}
          <div className="relative">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-sm text-white focus:outline-none focus:border-[var(--color-accent)] cursor-pointer min-w-[160px]"
            >
              {SERVICES.map((s) => (
                <option key={s} value={s} className="bg-[#1a1a1e]">
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />
          </div>
        </div>

        {/* ─── Content ────────────────────────────────────────────────────── */}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-24">
            <div className="w-10 h-10 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
            <p className="text-[var(--color-text-secondary)] text-sm tracking-wider">
              Loading inquiries…
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <Inbox size={36} className="text-[var(--color-text-muted)]" />
            <p className="text-[var(--color-text-secondary)] font-medium">No inquiries found</p>
            <p className="text-[var(--color-text-muted)] text-sm">
              {inquiries.length > 0
                ? 'Try adjusting your search or filters.'
                : 'Inquiries submitted via the contact form will appear here.'}
            </p>
          </div>
        )}

        {/* ─── Table ──────────────────────────────────────────────────────── */}
        {!loading && !error && filtered.length > 0 && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-2xl border border-[var(--color-line)] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-surface)] text-left">
                    {[
                      'Client',
                      'Business',
                      'Email',
                      'Phone',
                      'Service',
                      'Budget',
                      'Status',
                      'Date',
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-line)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq, idx) => (
                    <tr
                      key={inq._id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`cursor-pointer transition-colors hover:bg-[var(--color-surface-hi)] ${
                        idx !== filtered.length - 1 ? 'border-b border-[var(--color-line)]' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                        {inq.name}
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)] max-w-[140px] truncate">
                        {inq.businessName}
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)] max-w-[180px] truncate">
                        {inq.email}
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)] whitespace-nowrap">
                        {inq.phone}
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)] max-w-[130px] truncate">
                        {inq.service}
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)] whitespace-nowrap">
                        {inq.budget || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={inq.status} />
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap text-xs">
                        {formatDate(inq.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {filtered.map((inq) => (
                <button
                  key={inq._id}
                  onClick={() => setSelectedInquiry(inq)}
                  className="text-left w-full rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-4 hover:border-[var(--color-accent)]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-semibold text-white text-sm">{inq.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{inq.businessName}</p>
                    </div>
                    <StatusBadge status={inq.status} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-[var(--color-text-secondary)]">{inq.service}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {formatDate(inq.createdAt)}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Result count */}
            <p className="text-xs text-[var(--color-text-muted)] text-right">
              Showing {filtered.length} of {inquiries.length} inquiries
            </p>
          </>
        )}
      </main>

      {/* ─── WhatsApp link for team ──────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-[var(--color-line)] mt-4">
        <div className="container-page py-4 flex items-center justify-between">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">
            Unthought Creative — Admin Portal
          </p>
          <a
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[var(--color-text-muted)] hover:text-green-400 transition-colors"
          >
            WhatsApp Support
          </a>
        </div>
      </div>

      {/* ─── Modal ──────────────────────────────────────────────────────────── */}
      {selectedInquiry && (
        <InquiryModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
