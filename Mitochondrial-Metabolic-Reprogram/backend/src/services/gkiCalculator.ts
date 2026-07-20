import { MetabolicState, MetabolicZone } from '@prisma/client'

export interface GKIResult {
  gki: number
  zone: MetabolicZone
  state: MetabolicState
  isTherapeutic: boolean
  interpretation: string
}

// GKI = glucose (mmol/L) / ketones (mmol/L)
// glucose mg/dL → mmol/L: divide by 18
export function calculateGKI(glucoseMgdl: number, ketoneMmol: number): GKIResult {
  if (ketoneMmol <= 0) throw new Error('Ketone value must be > 0')

  const gki = glucoseMgdl / 18 / ketoneMmol

  let zone: MetabolicZone
  let state: MetabolicState
  let interpretation: string

  if (gki < 1.0) {
    zone = MetabolicZone.GREEN
    state = MetabolicState.KETONE_ADAPTED
    interpretation = 'Therapeutic ketosis achieved — optimal metabolic state per Seyfried protocol'
  } else if (gki <= 3.0) {
    zone = MetabolicZone.YELLOW
    state = MetabolicState.TRANSITIONING
    interpretation = 'Mild nutritional ketosis — continue Press phase to reduce GKI below 1.0'
  } else {
    zone = MetabolicZone.RED
    state = MetabolicState.GLUCOSE_DEPENDENT
    interpretation = 'Glucose-dependent metabolism — strengthen dietary adherence'
  }

  return { gki: Math.round(gki * 100) / 100, zone, state, isTherapeutic: gki < 1.0, interpretation }
}

export function gkiTargetDistance(gki: number): number {
  return Math.max(0, gki - 1.0)
}
