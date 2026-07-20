import { Router, Request, Response } from 'express'
import { prisma } from '../db'
import { authenticate } from '../middleware/auth'
import { computeAdherence } from '../services/adherenceCoach'

const router = Router()
router.use(authenticate)

// GET /api/adherence — compute adherence status for the authenticated user
router.get('/', async (req: Request, res: Response) => {
  const readings = await prisma.biomarkerReading.findMany({
    where: { userId: req.user!.id, gkiScore: { not: null } },
    select: { readingAt: true },
    orderBy: { readingAt: 'asc' },
  })

  const dates = readings.map(r => r.readingAt)
  const status = computeAdherence(dates)
  res.json(status)
})

export default router
