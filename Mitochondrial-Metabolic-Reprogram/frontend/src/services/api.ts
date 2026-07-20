import axios from 'axios'
import type { BiomarkerReading, GKITrendPoint, ProtocolStatus, DeviceConnection } from '../types/biomarker'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

// Biomarkers
export const getBiomarkerLatest = () =>
  api.get<BiomarkerReading>('/biomarkers/latest').then(r => r.data)

export const getBiomarkerHistory = (days = 30) =>
  api.get<BiomarkerReading[]>(`/biomarkers/history?days=${days}`).then(r => r.data)

export const getGKITrend = (days = 30) =>
  api.get<GKITrendPoint[]>(`/biomarkers/gki-trend?days=${days}`).then(r => r.data)

export const createBiomarker = (data: Partial<BiomarkerReading>) =>
  api.post<BiomarkerReading>('/biomarkers', data).then(r => r.data)

// Protocol
export const getProtocolStatus = () =>
  api.get<ProtocolStatus>('/protocol/status').then(r => r.data)

export const getProtocolEducation = () =>
  api.get('/protocol/education').then(r => r.data)

// Devices
export const getDevices = () =>
  api.get<DeviceConnection[]>('/devices').then(r => r.data)

export const connectDevice = (data: { deviceType: string; deviceName: string; accessToken?: string }) =>
  api.post<{ id: number; deviceType: string; deviceName: string }>('/devices', data).then(r => r.data)

export const syncDevices = () =>
  api.post<{ synced: number; message: string }>('/devices/sync').then(r => r.data)

export const disconnectDevice = (id: number) =>
  api.delete(`/devices/${id}`).then(r => r.data)

// Providers (patient-facing)
export const getMyProviders = () =>
  api.get<ProviderLink[]>('/providers').then(r => r.data)

export const linkProvider = (providerEmail: string) =>
  api.post<ProviderLink>('/providers/link', { providerEmail }).then(r => r.data)

export const unlinkProvider = (id: number) =>
  api.delete(`/providers/${id}`).then(r => r.data)

// Providers (provider-facing)
export const getMyPatients = () =>
  api.get<PatientLink[]>('/providers/patients').then(r => r.data)

export const getPatientReport = (patientId: number) =>
  api.get<PatientReport>('/providers/patients/' + patientId + '/report').then(r => r.data)

export interface ProviderLink {
  id: number
  consentAt: string
  provider: { id: number; firstName: string; lastName: string; email: string }
}

export interface PatientLink {
  id: number
  consentAt: string
  patient: { id: number; firstName: string; lastName: string; email: string }
}

export interface PatientReport {
  generatedAt: string
  patient: { id: number; firstName: string; lastName: string; email: string }
  protocol: { daysOnProtocol: number | null; dietAdherencePercent: number | null; protocolPhase: string | null }
  adherence: { currentStreakDays: number; longestStreakDays: number; totalDaysLogged: number; adherencePercent30d: number; milestones: string[] }
  latestBiomarkers: { readingAt: string; bloodGlucoseMgdl: number | null; betaHydroxybutyrateMmol: number | null; gkiScore: number | null; metabolicZone: string | null; crpMgL: number | null; altUl: number | null; astUl: number | null } | null
  gkiTrend90d: { date: string; gki: number; zone: string | null }[]
  safetyFlags: { hasType1Diabetes: boolean; hasKidneyDisease: boolean; hasLiverDisease: boolean; isPregnant: boolean; warnings: string[] } | null
  disclaimer: string
}

// Adherence
export const getAdherence = () =>
  api.get<AdherenceStatus>('/adherence').then(r => r.data)

export interface AdherenceStatus {
  currentStreakDays: number
  longestStreakDays: number
  totalDaysLogged: number
  lastLoggedAt: string | null
  nextMilestone: { days: number; label: string; daysRemaining: number } | null
  reachedMilestones: { days: number; label: string; message: string }[]
  coachingMessage: string
  adherencePercent: number
}

// Research consent
export const getResearchConsent = () =>
  api.get<{ consented: boolean; consentedAt: string | null }>('/research/consent').then(r => r.data)

export const optInResearch = () =>
  api.post('/research/consent').then(r => r.data)

export const optOutResearch = () =>
  api.delete('/research/consent').then(r => r.data)

// Profile / safety
export const getProfile = () =>
  api.get<Profile | null>('/profile').then(r => r.data)

export const submitSafetyCheck = (data: SafetyCheckPayload) =>
  api.post<SafetyResult>('/profile/safety-check', data).then(r => r.data)

export interface Profile {
  id: number
  userId: number
  hasType1Diabetes: boolean
  hasKidneyDisease: boolean
  hasLiverDisease: boolean
  isPregnant: boolean
  currentMedications: string | null
  safetyScreeningCompletedAt: string | null
}

export interface SafetyCheckPayload {
  hasType1Diabetes: boolean
  hasKidneyDisease: boolean
  hasLiverDisease: boolean
  isPregnant: boolean
  currentMedications?: string
}

export interface SafetyResult {
  cleared: boolean
  blockers: string[]
  warnings: string[]
}
