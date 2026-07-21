import React, { useState, useEffect } from 'react'
import { login, register, forgotPassword, resetPassword } from '../services/auth'
import './AuthPage.css'

interface Props {
  onAuth: () => void
}

export default function AuthPage({ onAuth }: Props) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'reset'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resetToken, setResetToken] = useState<string | null>(null)

  // Check URL for ?reset=<token> so reset links work
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('reset')
    if (token) { setResetToken(token); setMode('reset') }
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
        onAuth()
      } else if (mode === 'register') {
        await register(email, password, firstName, lastName)
        onAuth()
      } else if (mode === 'forgot') {
        const res = await forgotPassword(email)
        if (res.resetToken) {
          const link = `${window.location.origin}${window.location.pathname}?reset=${res.resetToken}`
          setSuccess(`Reset link generated (email not yet configured). Copy and open this link:\n${link}`)
        } else {
          setSuccess('If that email is registered, a reset link has been sent.')
        }
      } else if (mode === 'reset') {
        if (newPassword.length < 8) { setError('Password must be at least 8 characters'); setLoading(false); return }
        await resetPassword(resetToken!, newPassword)
        setSuccess('Password updated. You can now sign in.')
        setTimeout(() => { setMode('login'); setSuccess(null) }, 2000)
      }
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      {/* Left panel — branding */}
      <div className="auth-brand">
        <div className="auth-brand-inner">
          <div className="auth-logo">
            <span className="auth-logo-mark">M</span>
            <span className="auth-logo-name">Mitochondrial Metabolic Reprogramming</span>
          </div>
          <div className="auth-tagline">
            Track the metabolism that<br /><em>fuels disease</em> — and shift it toward health.
          </div>
          <div className="auth-pillars">
            <div className="auth-pillar">
              <span className="auth-pillar-icon" style={{ background: 'rgba(255,255,255,0.15)' }}>◎</span>
              <div>
                <strong>Glucose-Ketone Index</strong>
                <p>One number. Daily finger-prick. Track your shift into therapeutic ketosis.</p>
              </div>
            </div>
            <div className="auth-pillar">
              <span className="auth-pillar-icon" style={{ background: 'rgba(255,255,255,0.15)' }}>⬡</span>
              <div>
                <strong>Press-Pulse Protocol</strong>
                <p>Sustained ketogenic diet + periodic metabolic stressors, grounded in Seyfried's research.</p>
              </div>
            </div>
            <div className="auth-pillar">
              <span className="auth-pillar-icon" style={{ background: 'rgba(255,255,255,0.15)' }}>✓</span>
              <div>
                <strong>Free · Non-profit · Evidence-based</strong>
                <p>Built on Professor Thomas Seyfried's 2024–2026 published research.</p>
              </div>
            </div>
          </div>
          {/* Mini mitochondria SVG */}
          <svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg" className="auth-mito-svg">
            <ellipse cx="110" cy="60" rx="104" ry="54" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
            <ellipse cx="110" cy="60" rx="82" ry="40" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="none"/>
            <ellipse cx="110" cy="60" rx="56" ry="26" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            {[0,1,2,3].map(i => (
              <path key={i}
                d={`M ${35 + i*44} 26 Q ${45 + i*44} 60 ${35 + i*44} 94`}
                fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"
              />
            ))}
            <text x="110" y="57" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.7)" textAnchor="middle">Matrix</text>
            <text x="110" y="70" fontSize="8" fill="rgba(255,255,255,0.5)" textAnchor="middle">Krebs cycle · ATP</text>
          </svg>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card-head">
            <h1 className="auth-card-title">
              {mode === 'login' && 'Welcome back'}
              {mode === 'register' && 'Create your account'}
              {mode === 'forgot' && 'Reset your password'}
              {mode === 'reset' && 'Choose a new password'}
            </h1>
            <p className="auth-card-sub">
              {mode === 'login' && 'Sign in to continue tracking your GKI and protocol.'}
              {mode === 'register' && "Free, private, and grounded in Seyfried's research."}
              {mode === 'forgot' && 'Enter your email and we will generate a reset link.'}
              {mode === 'reset' && 'Enter your new password below.'}
            </p>
          </div>

          {(mode === 'login' || mode === 'register') && (
            <div className="auth-tabs">
              {(['login', 'register'] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setError(null); setSuccess(null) }} className={`auth-tab${mode === m ? ' active' : ''}`}>
                  {m === 'login' ? 'Sign in' : 'Register'}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={submit} className="auth-form">
            {mode === 'register' && (
              <div className="auth-name-row">
                <label className="auth-field">
                  <span>First name</span>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required placeholder="Jane" />
                </label>
                <label className="auth-field">
                  <span>Last name</span>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required placeholder="Smith" />
                </label>
              </div>
            )}

            {(mode === 'login' || mode === 'register' || mode === 'forgot') && (
              <label className="auth-field">
                <span>Email</span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
              </label>
            )}

            {(mode === 'login' || mode === 'register') && (
              <label className="auth-field">
                <span>Password</span>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder={mode === 'register' ? 'At least 8 characters' : '••••••••'} />
              </label>
            )}

            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginTop: -4 }}>
                <button type="button" className="auth-switch-btn" onClick={() => { setMode('forgot'); setError(null); setSuccess(null) }}>
                  Forgot password?
                </button>
              </div>
            )}

            {mode === 'reset' && (
              <label className="auth-field">
                <span>New password</span>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required placeholder="At least 8 characters" minLength={8} />
              </label>
            )}

            {error && <p className="auth-error">{error}</p>}
            {success && <p className="auth-success">{success}</p>}

            <button type="submit" disabled={loading} className="auth-submit">
              {loading ? '…'
                : mode === 'login' ? 'Sign in'
                : mode === 'register' ? 'Create free account'
                : mode === 'forgot' ? 'Generate reset link'
                : 'Set new password'}
            </button>
          </form>

          {(mode === 'login' || mode === 'register') && (
            <p className="auth-switch">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null) }} className="auth-switch-btn">
                {mode === 'login' ? 'Register free' : 'Sign in'}
              </button>
            </p>
          )}

          {(mode === 'forgot' || mode === 'reset') && (
            <p className="auth-switch">
              <button onClick={() => { setMode('login'); setError(null); setSuccess(null) }} className="auth-switch-btn">
                Back to sign in
              </button>
            </p>
          )}

          <p className="auth-fine">
            Non-profit · Built on Seyfried 2024–2026 research · Not medical advice
          </p>
        </div>
      </div>
    </div>
  )
}
