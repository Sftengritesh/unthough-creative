const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+\-\s]{7,20}$/

export function validateInquiry(req, res, next) {
  const { name, businessName, email, phone, businessType, service, message } = req.body || {}

  const errors = {}

  if (!name || !String(name).trim()) errors.name = 'Name is required.'
  if (!businessName || !String(businessName).trim())
    errors.businessName = 'Business name is required.'

  if (!email || !String(email).trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!phone || !String(phone).trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!PHONE_RE.test(phone)) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (!businessType || !String(businessType).trim())
    errors.businessType = 'Business type is required.'
  if (!service || !String(service).trim()) errors.service = 'Service is required.'
  if (!message || !String(message).trim()) errors.message = 'Message is required.'

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed.', errors })
  }

  next()
}
