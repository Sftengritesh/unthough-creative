import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

// POST /api/auth/login  (public)
export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required.' })
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() })
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const match = await admin.comparePassword(password)
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ success: true, token, admin: { email: admin.email } })
  } catch (err) {
    next(err)
  }
}

// GET /api/auth/me  (protected) - verify token / get current admin
export async function me(req, res) {
  res.json({ success: true, admin: req.admin })
}
