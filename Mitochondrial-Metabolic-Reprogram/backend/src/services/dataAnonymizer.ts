import { prisma } from '../db'

export interface AnonymizedRecord {
  // No PII — no name, email, or user ID
  cohortWeek: string          // ISO week "2026-W29" — temporal context without exact date
  daysOnProtocol: number | null
  protocolPhase: string | null
  currentStreakDays: number
  totalDaysLogged: number
  adherencePercent30d: number
  latestGkiScore: number | null
  latestMetabolicZone: string | null
  // Safety phenotype — boolean flags only
  hasType1Diabetes: boolean
  hasKidneyDisease: boolean
  hasLiverDisease: boolean
  // GKI readings: anonymized to zone + rough date only
  gkiReadingCount: number
  gkiInTherapeuticRange: number  // count of readings with GKI < 1.0
}

function isoWeek(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`
}

// Returns anonymized records for all users who have consented
export async function getAnonymizedResearchData(): Promise<AnonymizedRecord[]> {
  const consentedProfiles = await prisma.profile.findMany({
    where: { researchConsentAt: { not: null } },
    select: {
      userId: true,
      hasType1Diabetes: true,
      hasKidneyDisease: true,
      hasLiverDisease: true,
      researchConsentAt: true,
    },
  })

  const records: AnonymizedRecord[] = []

  for (const profile of consentedProfiles) {
    const latestAssessment = await prisma.assessment.findFirst({
      where: { userId: profile.userId },
      orderBy: { assessmentDate: 'desc' },
      select: { daysOnProtocol: true, protocolPhase: true, assessmentDate: true },
    })

    const allGkiReadings = await prisma.biomarkerReading.findMany({
      where: { userId: profile.userId, gkiScore: { not: null } },
      select: { readingAt: true, gkiScore: true, metabolicZone: true },
      orderBy: { readingAt: 'asc' },
    })

    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 86_400_000)
    const daySet = new Set(allGkiReadings.map(r => r.readingAt.toISOString().slice(0, 10)))
    const recentDays = allGkiReadings.filter(r => r.readingAt >= thirtyDaysAgo)
    const recentDaySet = new Set(recentDays.map(r => r.readingAt.toISOString().slice(0, 10)))
    const adherencePct = Math.round((recentDaySet.size / 30) * 100)

    // Current streak (simplified: just use totalDaysLogged, no streak logic here)
    const totalDaysLogged = daySet.size

    const latestReading = allGkiReadings[allGkiReadings.length - 1]
    const gkiInTherapeuticRange = allGkiReadings.filter(r => (r.gkiScore ?? 99) < 1.0).length

    records.push({
      cohortWeek: isoWeek(profile.researchConsentAt!),
      daysOnProtocol: latestAssessment?.daysOnProtocol ?? null,
      protocolPhase: latestAssessment?.protocolPhase ?? null,
      currentStreakDays: 0, // ponytail: stub — adherenceCoach not imported to keep deps minimal
      totalDaysLogged,
      adherencePercent30d: adherencePct,
      latestGkiScore: latestReading?.gkiScore ?? null,
      latestMetabolicZone: latestReading?.metabolicZone ?? null,
      hasType1Diabetes: profile.hasType1Diabetes,
      hasKidneyDisease: profile.hasKidneyDisease,
      hasLiverDisease: profile.hasLiverDisease,
      gkiReadingCount: allGkiReadings.length,
      gkiInTherapeuticRange,
    })
  }

  return records
}
