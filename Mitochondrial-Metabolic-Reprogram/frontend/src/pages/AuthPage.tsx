import React, { useState } from 'react'
import { login, register } from '../services/auth'

interface Props {
  onAuth: () => void
}

export default function AuthPage({ onAuth }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password, firstName, lastName)
      }
      onAuth()
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const field = (label: string, value: string, onChange: (v: string) => void, type = 'text') => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
      <span style={{ fontSize: 12, color: '#666' }}>{label}</span>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} required
        style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14 }}
      />
    </label>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 36, width: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1565c0' }}>MMR</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Mitochondrial Metabolic Reprogramming</div>
        </div>

        <div style={{ display: 'flex', marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
          {(['login', 'register'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{ flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                background: mode === m ? '#1565c0' : '#fff', color: mode === m ? '#fff' : '#555' }}>
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>{field('First Name', firstName, setFirstName)}</div>
              <div style={{ flex: 1 }}>{field('Last Name', lastName, setLastName)}</div>
            </div>
          )}
          {field('Email', email, setEmail, 'email')}
          {field('Password', password, setPassword, 'password')}

          {error && <p style={{ color: '#c62828', fontSize: 13, margin: '0 0 12px' }}>{error}</p>}

          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '12px 0', borderRadius: 6, background: '#1565c0', color: '#fff',
              border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginTop: 4 }}>
            {loading ? '…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', marginTop: 20 }}>
          Non-profit · Built on Seyfried 2024–2026 research
        </p>
      </div>
    </div>
  )
}
