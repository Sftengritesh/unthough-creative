import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      maxlength: 120,
    },
    businessName: {
      type: String,
      required: [true, 'Business name is required.'],
      trim: true,
      maxlength: 150,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address.'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
      maxlength: 20,
    },
    businessType: {
      type: String,
      required: [true, 'Business type is required.'],
      trim: true,
    },
    service: {
      type: String,
      required: [true, 'Service is required.'],
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required.'],
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
)

export default mongoose.model('Inquiry', inquirySchema)
