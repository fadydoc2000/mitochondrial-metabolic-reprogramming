import { MetabolicZone } from '@prisma/client'

export type ProtocolPhase = 'press' | 'pulse' | 'not_started'

export interface ProtocolStatus {
  phase: ProtocolPhase
  daysOnProtocol: number
  adherencePercent: number | null
  gkiAvg: number | null
  isTherapeutic: boolean       // GKI avg < 1.0
  daysToThreshold: number      // days remaining to 6-month adherence target
  recommendations: string[]
  pulseReady: boolean          // true once GKI consistently <1.0 for 4+ weeks
}

export interface GKISnapshot {
  gki: number
  zone: MetabolicZone
  readingAt: Date
}

export function buildProtocolStatus(
  daysOnProtocol: number,
  adherencePercent: number | null,
  recentReadings: GKISnapshot[]
): ProtocolStatus {
  const TARGET_DAYS = 180 // 6 months — Seyfried clinical threshold

  const gkiAvg = recentReadings.length
    ? recentReadings.reduce((s, r) => s + r.gki, 0) / recentReadings.length
    : null

  const isTherapeutic = gkiAvg !== null && gkiAvg < 1.0

  // Pulse readiness: GKI <1.0 average sustained for at least 28 days of readings
  const last28 = recentReadings.filter(
    r => r.readingAt >= new Date(Date.now() - 28 * 86_400_000)
  )
  const pulseReady = last28.length >= 4 && last28.every(r => r.gki < 1.0)

  const recommendations = buildRecommendations(daysOnProtocol, adherencePercent, gkiAvg, pulseReady)

  return {
    phase: daysOnProtocol === 0 ? 'not_started' : pulseReady ? 'pulse' : 'press',
    daysOnProtocol,
    adherencePercent,
    gkiAvg: gkiAvg !== null ? Math.round(gkiAvg * 100) / 100 : null,
    isTherapeutic,
    daysToThreshold: Math.max(0, TARGET_DAYS - daysOnProtocol),
    recommendations,
    pulseReady,
  }
}

function buildRecommendations(
  days: number,
  adherence: number | null,
  gki: number | null,
  pulseReady: boolean
): string[] {
  const recs: string[] = []

  if (days === 0) {
    recs.push('Start Press phase: adopt Mediterranean ketogenic diet (2:1–2.5:1 fat-to-carb ratio)')
    recs.push('Log daily glucose and ketone readings to track GKI')
    return recs
  }

  if (adherence !== null && adherence < 80) {
    recs.push(`Dietary adherence at ${adherence}% — target >80%. Common barrier: carb creep. Review meal plan.`)
  }

  if (gki !== null) {
    if (gki >= 3.0) recs.push('GKI >3.0 — reduce carbohydrate intake and increase healthy fat proportion')
    else if (gki >= 1.0) recs.push('GKI 1.0–3.0 — tighten protocol to push below therapeutic threshold of 1.0')
    else recs.push('GKI <1.0 — therapeutic ketosis achieved. Maintain current protocol.')
  }

  if (pulseReady && !recs.some(r => r.includes('Pulse'))) {
    recs.push('Pulse phase available: GKI consistently therapeutic. Consider HBOT or strategic fasting window.')
  }

  if (days < 180) {
    recs.push(`${180 - days} days remaining to 6-month clinical adherence threshold`)
  } else {
    recs.push('6-month adherence threshold reached — clinical benefit window active')
  }

  return recs
}
