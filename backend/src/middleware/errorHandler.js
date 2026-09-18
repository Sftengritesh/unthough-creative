export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` })
}

export function errorHandler(err, req, res, next) {
  console.error(err)

  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([key, val]) => [key, val.message])
    )
    return res.status(400).json({ success: false, message: 'Validation failed.', errors })
  }

  const status = err.status || 500
  res.status(status).json({
    success: false,
    message: err.message || 'Something went wrong on the server.',
  })
}
