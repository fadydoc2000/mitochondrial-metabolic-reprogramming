import { Router, Request, Response } from 'express'
import { prisma } from '../db'
import { authenticate } from '../middleware/auth'
import { calculateGKI } from '../services/gkiCalculator'

const router = Router()
router.use(authenticate)

// POST /api/biomarkers — log a reading
router.post('/', async (req: Request, res: Response) => {
  const userId = req.user!.id
  const {
    bloodGlucoseMgdl, betaHydroxybutyrateMmol,
    crpMgL, il6PgMl, triglyceridesMgdl, hdlMgdl, ldlMgdl,
    altUl, astUl, lactateMmol, source, notes, readingAt,
  } = req.body

  let gkiData = {}
  if (bloodGlucoseMgdl != null && betaHydroxybutyrateMmol != null) {
    try {
      const result = calculateGKI(Number(bloodGlucoseMgdl), Number(betaHydroxybutyrateMmol))
      gkiData = {
        gkiScore: result.gki,
        metabolicState: result.state,
        metabolicZone: result.zone,
      }
    } catch {
      res.status(400).json({ error: 'Invalid glucose/ketone values' })
      return
    }
  }

  const reading = await prisma.biomarkerReading.create({
    data: {
      userId,
      bloodGlucoseMgdl: bloodGlucoseMgdl != null ? Number(bloodGlucoseMgdl) : undefined,
      betaHydroxybutyrateMmol: betaHydroxybutyrateMmol != null ? Number(betaHydroxybutyrateMmol) : undefined,
      crpMgL: crpMgL != null ? Number(crpMgL) : undefined,
      il6PgMl: il6PgMl != null ? Number(il6PgMl) : undefined,
      triglyceridesMgdl: triglyceridesMgdl != null ? Number(triglyceridesMgdl) : undefined,
      hdlMgdl: hdlMgdl != null ? Number(hdlMgdl) : undefined,
      ldlMgdl: ldlMgdl != null ? Number(ldlMgdl) : undefined,
      altUl: altUl != null ? Number(altUl) : undefined,
      astUl: astUl != null ? Number(astUl) : undefined,
      lactateMmol: lactateMmol != null ? Number(lactateMmol) : undefined,
      source: source ?? 'manual',
      notes,
      readingAt: readingAt ? new Date(readingAt) : undefined,
      ...gkiData,
    },
  })

  res.status(201).json(reading)
})

// GET /api/biomarkers/latest
router.get('/latest', async (req: Request, res: Response) => {
  const reading = await prisma.biomarkerReading.findFirst({
    where: { userId: req.user!.id },
    orderBy: { readingAt: 'desc' },
  })
  res.json(reading ?? null)
})

// GET /api/biomarkers/history?days=30
router.get('/history', async (req: Request, res: Response) => {
  const days = Math.max(1, parseInt(String(req.query.days ?? '30'), 10) || 30)
  const since = new Date(Date.now() - days * 86_400_000)

  const readings = await prisma.biomarkerReading.findMany({
    where: { userId: req.user!.id, readingAt: { gte: since } },
    orderBy: { readingAt: 'asc' },
  })
  res.json(readings)
})

// GET /api/biomarkers/gki-trend?days=30
router.get('/gki-trend', async (req: Request, res: Response) => {
  const days = Math.max(1, parseInt(String(req.query.days ?? '30'), 10) || 30)
  const since = new Date(Date.now() - days * 86_400_000)

  const readings = await prisma.biomarkerReading.findMany({
    where: {
      userId: req.user!.id,
      readingAt: { gte: since },
      gkiScore: { not: null },
    },
    select: { readingAt: true, gkiScore: true, metabolicZone: true, bloodGlucoseMgdl: true, betaHydroxybutyrateMmol: true },
    orderBy: { readingAt: 'asc' },
  })
  res.json(readings)
})

export default router
