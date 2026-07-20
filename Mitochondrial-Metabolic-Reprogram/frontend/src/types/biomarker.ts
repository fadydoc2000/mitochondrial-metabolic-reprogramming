export type MetabolicZone = 'RED' | 'YELLOW' | 'GREEN'
export type MetabolicState = 'GLUCOSE_DEPENDENT' | 'TRANSITIONING' | 'KETONE_ADAPTED'
export type ProtocolPhase = 'not_started' | 'press' | 'pulse'

export interface BiomarkerReading {
  id: number
  readingAt: string
  bloodGlucoseMgdl: number | null
  betaHydroxybutyrateMmol: number | null
  gkiScore: number | null
  metabolicZone: MetabolicZone | null
  metabolicState: MetabolicState | null
  crpMgL: number | null
  triglyceridesMgdl: number | null
  hdlMgdl: number | null
  ldlMgdl: number | null
  lactateMmol: number | null
  source: string
  notes: string | null
}

export interface GKITrendPoint {
  readingAt: string
  gkiScore: number
  metabolicZone: MetabolicZone
}

export interface ProtocolStatus {
  phase: ProtocolPhase
  daysOnProtocol: number
  adherencePercent: number | null
  gkiAvg: number | null
  isTherapeutic: boolean
  daysToThreshold: number
  recommendations: string[]
  pulseReady: boolean
}

export interface DeviceConnection {
  id: number
  deviceType: string
  deviceName: string
  isActive: boolean
  lastSyncAt: string | null
  createdAt: string
}
