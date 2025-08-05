import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"

export function verifyWoredaToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authorization header missing or invalid" })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded // Attach user data to request object
    next()
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" })
  }
}
