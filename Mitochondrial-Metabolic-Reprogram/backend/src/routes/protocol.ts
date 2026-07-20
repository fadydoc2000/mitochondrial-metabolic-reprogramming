import { Router, Request, Response } from 'express'
import { prisma } from '../db'
import { authenticate } from '../middleware/auth'
import { buildProtocolStatus } from '../services/protocolAdvisor'

const router = Router()
router.use(authenticate)

// GET /api/protocol/status
router.get('/status', async (req: Request, res: Response) => {
  const userId = req.user!.id

  const latestAssessment = await prisma.assessment.findFirst({
    where: { userId },
    orderBy: { assessmentDate: 'desc' },
  })

  const recentReadings = await prisma.biomarkerReading.findMany({
    where: {
      userId,
      gkiScore: { not: null },
      readingAt: { gte: new Date(Date.now() - 90 * 86_400_000) },
    },
    select: { gkiScore: true, metabolicZone: true, readingAt: true },
    orderBy: { readingAt: 'asc' },
  })

  const snapshots = recentReadings.map(r => ({
    gki: r.gkiScore!,
    zone: r.metabolicZone!,
    readingAt: r.readingAt,
  }))

  const status = buildProtocolStatus(
    latestAssessment?.daysOnProtocol ?? 0,
    latestAssessment?.dietAdherencePercent ?? null,
    snapshots
  )

  res.json(status)
})

// GET /api/protocol/education — static press-pulse content
router.get('/education', (_req: Request, res: Response) => {
  res.json(PROTOCOL_CONTENT)
})

const PROTOCOL_CONTENT = {
  press: {
    title: 'Press Phase — Sustained Metabolic Stress',
    summary: 'The Press phase creates a sustained low-glucose, low-glutamine environment that starves cancer cells of their two primary fuels while healthy cells adapt to ketone metabolism.',
    diet: {
      ratio: '2:1 to 2.5:1 fat-to-carbohydrate+protein by weight',
      style: 'Mediterranean ketogenic — olive oil, fatty fish, nuts, non-starchy vegetables',
      targets: {
        bloodGlucoseMgdl: '<80',
        ketoneMmol: '2–5',
        gki: '<1.0',
      },
    },
    duration: 'Ongoing baseline — minimum 6 months for clinical benefit (Seyfried GBM study, 2024)',
    keyFacts: [
      '66.7% 3-year survival in GBM patients with >6 months adherence vs 12–15 month typical median',
      'Healthy cells can metabolise ketones; most cancer cells cannot',
      'GKI <1.0 indicates sufficient metabolic stress on tumour microenvironment',
    ],
  },
  pulse: {
    title: 'Pulse Phase — Targeted Interventions',
    summary: 'Pulse interventions exploit the metabolic vulnerability created by the Press phase, delivering a concentrated therapeutic hit when cancer cells are most stressed.',
    interventions: [
      { name: 'Hyperbaric Oxygen Therapy (HBOT)', description: 'Elevates reactive oxygen species in glucose-dependent cancer cells while ketone-adapted healthy cells are protected' },
      { name: 'Strategic fasting windows', description: '24–72h water fasts timed to chemotherapy cycles to amplify metabolic stress' },
      { name: 'Mebendazole', description: 'Anthelmintic repurposed drug — 2025 research shows it blocks glutamine pathway by lowering glutamate, AKG, succinate, and lactate in cancer cells' },
    ],
    timing: 'Begin only after GKI consistently <1.0 for 4+ weeks in Press phase',
    note: 'All Pulse interventions should be coordinated with a healthcare provider.',
  },
}

export default router
