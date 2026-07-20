import { useState, useEffect } from 'react'
import { getToken, getRole, logout } from './services/auth'
import { getProfile } from './services/api'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import BiomarkerDashboard from './pages/BiomarkerDashboard'
import ProtocolGuidance from './pages/ProtocolGuidance'
import ProviderPortal from './pages/ProviderPortal'
import SafetyAssessment from './components/SafetyAssessment'

type Page = 'dashboard' | 'protocol' | 'provider-portal'
type AppState = 'loading' | 'landing' | 'auth' | 'safety' | 'app'

export default function App() {
  const [state, setState] = useState<AppState>(getToken() ? 'loading' : 'landing')
  const [page, setPage] = useState<Page>('dashboard')

  useEffect(() => {
    if (state !== 'loading') return
    getProfile()
      .then(profile => {
        setState(profile?.safetyScreeningCompletedAt ? 'app' : 'safety')
      })
      .catch(() => setState('safety'))
  }, [state])

  const handleAuth = () => setState('loading')
  const handleLogout = () => { logout(); setState('landing') }
  const handleSafetyComplete = () => setState('app')

  if (state === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', color: '#888' }}>
        Loading…
      </div>
    )
  }

  if (state === 'landing') return <LandingPage onStart={() => setState('auth')} />
  if (state === 'auth') return <AuthPage onAuth={handleAuth} />
  if (state === 'safety') return <SafetyAssessment onComplete={handleSafetyComplete} />

  const role = getRole()
  const isProvider = role === 'PROVIDER' || role === 'ADMIN'

  const navStyle = (p: Page) => ({
    padding: '10px 20px', cursor: 'pointer',
    background: page === p ? '#1565c0' : '#e3f2fd',
    color: page === p ? '#fff' : '#1565c0',
    border: 'none', fontWeight: 600, fontSize: 14,
  })

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#fafafa' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '0 24px', display: 'flex', gap: 4, alignItems: 'center' }}>
        <span style={{ fontWeight: 700, marginRight: 24, color: '#1565c0' }}>MMR</span>
        <button style={navStyle('dashboard')} onClick={() => setPage('dashboard')}>Dashboard</button>
        <button style={navStyle('protocol')} onClick={() => setPage('protocol')}>Protocol</button>
        {isProvider && (
          <button style={navStyle('provider-portal')} onClick={() => setPage('provider-portal')}>Patients</button>
        )}
        <button onClick={handleLogout}
          style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 6, border: '1px solid #e0e0e0', background: 'none', cursor: 'pointer', fontSize: 13, color: '#888' }}>
          Sign Out
        </button>
      </nav>
      {page === 'dashboard' && <BiomarkerDashboard />}
      {page === 'protocol' && <ProtocolGuidance />}
      {page === 'provider-portal' && <ProviderPortal />}
    </div>
  )
}
