import { Router, Request, Response } from 'express'
import { prisma } from '../db'
import { authenticate, requireRole } from '../middleware/auth'
import { generatePatientReport } from '../services/reportGenerator'

const router = Router()
router.use(authenticate)

// --- Patient-facing routes ---

// GET /api/providers — list providers linked to me
router.get('/', async (req: Request, res: Response) => {
  const links = await prisma.providerPatient.findMany({
    where: { patientId: req.user!.id, isActive: true },
    include: {
      provider: { select: { id: true, firstName: true, lastName: true, email: true, role: true } },
    },
  })
  res.json(links.map(l => ({ id: l.id, consentAt: l.consentAt, provider: l.provider })))
})

// POST /api/providers/link — patient links a provider by email
router.post('/link', async (req: Request, res: Response) => {
  const { providerEmail } = req.body
  if (!providerEmail) { res.status(400).json({ error: 'providerEmail required' }); return }

  const provider = await prisma.user.findUnique({ where: { email: providerEmail } })
  if (!provider || provider.role !== 'PROVIDER') {
    res.status(404).json({ error: 'No provider account found with that email. Ask your provider to register with a PROVIDER account.' })
    return
  }
  if (provider.id === req.user!.id) {
    res.status(400).json({ error: 'Cannot link yourself as a provider' }); return
  }

  const link = await prisma.providerPatient.upsert({
    where: { providerId_patientId: { providerId: provider.id, patientId: req.user!.id } },
    create: { providerId: provider.id, patientId: req.user!.id, isActive: true },
    update: { isActive: true, consentAt: new Date() },
    include: { provider: { select: { id: true, firstName: true, lastName: true, email: true } } },
  })

  res.status(201).json({ id: link.id, provider: link.provider })
})

// DELETE /api/providers/:id — patient removes a provider link
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const link = await prisma.providerPatient.findFirst({ where: { id, patientId: req.user!.id } })
  if (!link) { res.status(404).json({ error: 'Link not found' }); return }

  await prisma.providerPatient.update({ where: { id }, data: { isActive: false } })
  res.json({ message: 'Provider access revoked' })
})

// --- Provider-facing routes ---

// GET /api/providers/patients — provider lists their linked patients
router.get('/patients', requireRole('PROVIDER', 'ADMIN'), async (req: Request, res: Response) => {
  const links = await prisma.providerPatient.findMany({
    where: { providerId: req.user!.id, isActive: true },
    include: {
      patient: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
    orderBy: { consentAt: 'desc' },
  })
  res.json(links.map(l => ({ id: l.id, consentAt: l.consentAt, patient: l.patient })))
})

// GET /api/providers/patients/:patientId/report — generate report for a patient
router.get('/patients/:patientId/report', requireRole('PROVIDER', 'ADMIN'), async (req: Request, res: Response) => {
  const patientId = Number(req.params.patientId)

  // Verify this provider has consent from this patient
  const link = await prisma.providerPatient.findFirst({
    where: { providerId: req.user!.id, patientId, isActive: true },
  })
  if (!link) { res.status(403).json({ error: 'Patient has not linked you as their provider' }); return }

  const report = await generatePatientReport(patientId)
  res.json(report)
})

export default router
