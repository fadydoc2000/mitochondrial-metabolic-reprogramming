import { Router, Request, Response } from 'express'
import { prisma } from '../db'
import { authenticate, requireRole } from '../middleware/auth'
import { getAnonymizedResearchData } from '../services/dataAnonymizer'

const router = Router()
router.use(authenticate)

// GET /api/research/consent — get current user's consent status
router.get('/consent', async (req: Request, res: Response) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    select: { researchConsentAt: true },
  })
  res.json({ consented: !!profile?.researchConsentAt, consentedAt: profile?.researchConsentAt ?? null })
})

// POST /api/research/consent — opt in
router.post('/consent', async (req: Request, res: Response) => {
  await prisma.profile.upsert({
    where: { userId: req.user!.id },
    create: { userId: req.user!.id, researchConsentAt: new Date() },
    update: { researchConsentAt: new Date() },
  })
  res.json({ consented: true })
})

// DELETE /api/research/consent — withdraw consent
router.delete('/consent', async (req: Request, res: Response) => {
  await prisma.profile.upsert({
    where: { userId: req.user!.id },
    create: { userId: req.user!.id, researchConsentAt: null },
    update: { researchConsentAt: null },
  })
  res.json({ consented: false })
})

// GET /api/research/data — admin-only: anonymized aggregate export
router.get('/data', requireRole('ADMIN'), async (_req: Request, res: Response) => {
  const data = await getAnonymizedResearchData()
  res.json({ count: data.length, records: data })
})

export default router
