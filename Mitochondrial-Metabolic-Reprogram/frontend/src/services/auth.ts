import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export interface AuthUser {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
}

export async function register(email: string, password: string, firstName: string, lastName: string): Promise<string> {
  const r = await api.post<{ token: string; user: AuthUser }>('/auth/register', { email, password, firstName, lastName })
  localStorage.setItem('token', r.data.token)
  return r.data.token
}

export async function login(email: string, password: string): Promise<string> {
  const r = await api.post<{ token: string; user: AuthUser }>('/auth/login', { email, password })
  localStorage.setItem('token', r.data.token)
  return r.data.token
}

export function logout() {
  localStorage.removeItem('token')
}

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export async function forgotPassword(email: string): Promise<{ resetToken?: string }> {
  const r = await api.post<{ resetToken?: string; message?: string }>('/auth/forgot-password', { email })
  return r.data
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await api.post('/auth/reset-password', { token, password })
}

export function getRole(): string | null {
  const token = getToken()
  if (!token) return null
  try {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(b64.padEnd(b64.length + (4 - b64.length % 4) % 4, '=')))
    return payload.role ?? null
  } catch {
    return null
  }
}
