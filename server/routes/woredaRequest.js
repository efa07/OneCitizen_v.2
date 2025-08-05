import multer from "multer"
const upload = multer({ dest: "uploads/" })
import express from "express"
import { PrismaClient } from '@prisma/client'

const router=express.Router() 
const prisma = new PrismaClient()

router.post('/process-request', upload.single("resultFile"), async (req, res) => {
  const { requestId, responseNote } = req.body
  const file = req.file

  if (!requestId || !responseNote || !file) {
    return res.status(400).json({ error: "Missing fields" })
  }

 //Update request status in db
  await prisma.serviceRequest.update({
    where: { id: requestId },
    data: {
      status: "COMPLETED",
      responseNote,
      resultFilePath: file.path,
    }
  })

  // todo: notify user via email or in-app(bohala endayeresa !!!)

  res.json({ message: "Request processed" })
})

export default router