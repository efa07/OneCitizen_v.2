import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

// POST /api/request
router.post("/", async (req, res) => {
  const {
    serviceType,
    fullName,
    faydaId,
    email,
    phoneNumber,
    nationality,
    gender,
    region,
    zone,
    address,
    reason,
    ...extraData
  } = req.body

  if (!serviceType || !faydaId) return res.status(400).json({ error: "Missing data" })

  try {
    const request = await prisma.serviceRequest.create({
      data: {
        serviceType,
        fullName,
        faydaId,
        email,
        phoneNumber,
        nationality,
        gender,
        region,
        zone,
        address,
        reason,
        extraData,
      },
    })

    // Simulate auto-response (optional)
    const fakeResponse = `Your ${serviceType} request is being reviewed.`
    await prisma.serviceRequest.update({
      where: { id: request.id },
      data: { response: fakeResponse },
    })

    res.json({ success: true, response: fakeResponse })
  } catch (err) {
    console.error("Create request error", err)
    res.status(500).json({ error: "Server error" })
  }
})

// GET /api/request?serviceType=...&userId=...
router.get("/", async (req, res) => {
  const { serviceType, userId } = req.query

  try {
    const request = await prisma.serviceRequest.findFirst({
      where: {
        serviceType: serviceType,
        faydaId: userId ,
      },
    })

    if (!request) return res.json({ response: null })

    res.json({ response: request.response })
  } catch (err) {
    console.error("Fetch request error", err)
    res.status(500).json({ error: "Server error" })
  }
})

export default router
