import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

//damy data
const woredaWorker = {
  id: 1,
  email: "worker@test",
  password: "worker123", 
  name: "Woreda Worker"
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"

router.post('/', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" })
  }

  if (email !== woredaWorker.email || password !== woredaWorker.password) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: woredaWorker.id, email: woredaWorker.email, role: "woreda" },
    JWT_SECRET,
    { expiresIn: "2h" }
  )

  res.json({
    message: "Login successful",
    token,
    user: { name: woredaWorker.name, email: woredaWorker.email }
  })
})

export default router
