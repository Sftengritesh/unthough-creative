import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Allow a comma-separated list of origins in CLIENT_URL, e.g.
// CLIENT_URL=http://localhost:5173,https://unthoughtcreative.vercel.app
const allowedOrigins = (
  process.env.CLIENT_URL ||
  'http://localhost:5173,https://unthoughtcreative.vercel.app'
)
  .split(',')
  .map((s) => s.trim().replace(/\/+$/, ''))
  .filter(Boolean)

app.use(helmet())
app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools (curl, Postman) with no origin header
      if (!origin || allowedOrigins.includes(origin.replace(/\/+$/, ''))) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '10kb' }))
app.use(morgan('dev'))

// Basic rate limiting on the public contact endpoint to prevent spam/abuse
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
})

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Unthought Creative API is running.' })
})

app.get('/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/inquiries', inquiryLimiter, inquiryRoutes)
app.use('/api/auth', authRoutes)

app.use(notFound)
app.use(errorHandler)

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Unthought Creative API listening on port ${PORT}`)
  })
}

start()
