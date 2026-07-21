import { useState, useEffect } from 'react'
import { getToken, getRole, logout } from './services/auth'
import { getProfile } from './services/api'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import BiomarkerDashboard from './pages/BiomarkerDashboard'
import ProtocolGuidance from './pages/ProtocolGuidance'
import ProviderPortal from './pages/ProviderPortal'
import SafetyAssessment from './components/SafetyAssessment'
import './App.css'

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
      .catch(() => { logout(); setState('landing') })
  }, [state])

  const handleAuth = () => setState('loading')
  const handleLogout = () => { logout(); setState('landing') }
  const handleSafetyComplete = () => setState('app')

  if (state === 'loading') return <div className="app-loading">Loading…</div>
  if (state === 'landing') return <LandingPage onStart={() => setState('auth')} />
  if (state === 'auth') return <AuthPage onAuth={handleAuth} />
  if (state === 'safety') return <SafetyAssessment onComplete={handleSafetyComplete} />

  const role = getRole()
  const isProvider = role === 'PROVIDER' || role === 'ADMIN'

  return (
    <div>
      <nav className="app-nav">
        <span className="app-nav-brand">MMR</span>
        <button className={`app-nav-btn${page === 'dashboard' ? ' active' : ''}`} onClick={() => setPage('dashboard')}>Dashboard</button>
        <button className={`app-nav-btn${page === 'protocol' ? ' active' : ''}`} onClick={() => setPage('protocol')}>Protocol</button>
        {isProvider && (
          <button className={`app-nav-btn${page === 'provider-portal' ? ' active' : ''}`} onClick={() => setPage('provider-portal')}>Patients</button>
        )}
        <button className="app-nav-signout" onClick={handleLogout}>Sign out</button>
      </nav>
      {page === 'dashboard' && <BiomarkerDashboard />}
      {page === 'protocol' && <ProtocolGuidance />}
      {page === 'provider-portal' && <ProviderPortal />}
    </div>
  )
}
