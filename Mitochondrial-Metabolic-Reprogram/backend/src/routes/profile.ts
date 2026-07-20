import { Router, Request, Response } from 'express'
import { prisma } from '../db'
import { authenticate } from '../middleware/auth'
import { checkSafety } from '../services/safetyScreening'

const router = Router()
router.use(authenticate)

// GET /api/profile
router.get('/', async (req: Request, res: Response) => {
  const profile = await prisma.profile.findUnique({ where: { userId: req.user!.id } })
  res.json(profile ?? null)
})

// PUT /api/profile — create or update (upsert)
router.put('/', async (req: Request, res: Response) => {
  const {
    dateOfBirth, gender, heightCm, weightKg, healthGoals,
    medicalConditions, allergies, dietaryRestrictions, currentMedications,
    hasType1Diabetes, hasKidneyDisease, hasLiverDisease, isPregnant,
  } = req.body

  const profile = await prisma.profile.upsert({
    where: { userId: req.user!.id },
    create: {
      userId: req.user!.id,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender, heightCm, weightKg, healthGoals,
      medicalConditions, allergies, dietaryRestrictions, currentMedications,
      hasType1Diabetes: hasType1Diabetes ?? false,
      hasKidneyDisease: hasKidneyDisease ?? false,
      hasLiverDisease: hasLiverDisease ?? false,
      isPregnant: isPregnant ?? false,
    },
    update: {
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender, heightCm, weightKg, healthGoals,
      medicalConditions, allergies, dietaryRestrictions, currentMedications,
      hasType1Diabetes: hasType1Diabetes ?? false,
      hasKidneyDisease: hasKidneyDisease ?? false,
      hasLiverDisease: hasLiverDisease ?? false,
      isPregnant: isPregnant ?? false,
    },
  })

  res.json(profile)
})

// POST /api/profile/safety-check — run contraindication check + mark screening complete
router.post('/safety-check', async (req: Request, res: Response) => {
  const {
    hasType1Diabetes, hasKidneyDisease, hasLiverDisease, isPregnant, currentMedications,
  } = req.body

  const result = checkSafety({
    hasType1Diabetes: hasType1Diabetes ?? false,
    hasKidneyDisease: hasKidneyDisease ?? false,
    hasLiverDisease: hasLiverDisease ?? false,
    isPregnant: isPregnant ?? false,
    currentMedications,
  })

  // Persist answers + mark screening done (even if not cleared, so we show results)
  await prisma.profile.upsert({
    where: { userId: req.user!.id },
    create: {
      userId: req.user!.id,
      hasType1Diabetes: hasType1Diabetes ?? false,
      hasKidneyDisease: hasKidneyDisease ?? false,
      hasLiverDisease: hasLiverDisease ?? false,
      isPregnant: isPregnant ?? false,
      currentMedications,
      safetyScreeningCompletedAt: new Date(),
    },
    update: {
      hasType1Diabetes: hasType1Diabetes ?? false,
      hasKidneyDisease: hasKidneyDisease ?? false,
      hasLiverDisease: hasLiverDisease ?? false,
      isPregnant: isPregnant ?? false,
      currentMedications,
      safetyScreeningCompletedAt: new Date(),
    },
  })

  res.json(result)
})

export default router
