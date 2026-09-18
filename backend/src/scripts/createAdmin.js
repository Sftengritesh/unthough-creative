/**
 * One-time script to create the first admin user for the dashboard.
 *
 * Usage:
 *   node src/scripts/createAdmin.js admin@unthoughtcreative.com yourStrongPassword
 *
 * Make sure MONGODB_URI is set in your .env file before running this.
 */
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Admin from '../models/Admin.js'

dotenv.config()

async function run() {
  const [, , email, password] = process.argv

  if (!email || !password) {
    console.error('Usage: node src/scripts/createAdmin.js <email> <password>')
    process.exit(1)
  }

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set in your .env file.')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)

  const existing = await Admin.findOne({ email: email.toLowerCase() })
  if (existing) {
    console.log(`Admin with email ${email} already exists.`)
    process.exit(0)
  }

  const passwordHash = await Admin.hashPassword(password)
  await Admin.create({ email: email.toLowerCase(), passwordHash })

  console.log(`Admin user created: ${email}`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
