import { Router } from 'express'
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js'
import { validateInquiry } from '../middleware/validateInquiry.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

// Public — contact form submission
router.post('/', validateInquiry, createInquiry)

// Protected — admin dashboard
router.get('/', requireAuth, getInquiries)
router.get('/:id', requireAuth, getInquiryById)
router.patch('/:id', requireAuth, updateInquiryStatus)
router.delete('/:id', requireAuth, deleteInquiry)

export default router
