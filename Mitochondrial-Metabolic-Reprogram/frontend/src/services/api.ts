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
