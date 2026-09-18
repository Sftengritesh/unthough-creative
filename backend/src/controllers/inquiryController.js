import Inquiry from '../models/Inquiry.js'

// POST /api/inquiries  (public)
export async function createInquiry(req, res, next) {
  try {
    const { name, businessName, email, phone, businessType, service, budget, message } =
      req.body

    const inquiry = await Inquiry.create({
      name,
      businessName,
      email,
      phone,
      businessType,
      service,
      budget,
      message,
    })

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will get back to you shortly.',
      data: inquiry,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/inquiries  (protected, admin)
export async function getInquiries(req, res, next) {
  try {
    const { status } = req.query
    const filter = status ? { status } : {}
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, count: inquiries.length, data: inquiries })
  } catch (err) {
    next(err)
  }
}

// GET /api/inquiries/:id  (protected, admin)
export async function getInquiryById(req, res, next) {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' })
    }
    res.json({ success: true, data: inquiry })
  } catch (err) {
    next(err)
  }
}

// PATCH /api/inquiries/:id  (protected, admin) - update status
export async function updateInquiryStatus(req, res, next) {
  try {
    const { status } = req.body
    if (!['New', 'Contacted', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' })
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' })
    }

    res.json({ success: true, data: inquiry })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/inquiries/:id  (protected, admin)
export async function deleteInquiry(req, res, next) {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id)
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' })
    }
    res.json({ success: true, message: 'Inquiry deleted.' })
  } catch (err) {
    next(err)
  }
}
