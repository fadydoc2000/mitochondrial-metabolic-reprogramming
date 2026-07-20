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

export function getRole(): string | null {
  const token = getToken()
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.role ?? null
  } catch {
    return null
  }
}
