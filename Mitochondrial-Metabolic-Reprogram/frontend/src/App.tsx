import React, { useState } from 'react'
import BiomarkerDashboard from './pages/BiomarkerDashboard'
import ProtocolGuidance from './pages/ProtocolGuidance'

type Page = 'dashboard' | 'protocol'

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')

  const navStyle = (p: Page) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    background: page === p ? '#1565c0' : '#e3f2fd',
    color: page === p ? '#fff' : '#1565c0',
    border: 'none',
    fontWeight: 600,
    fontSize: 14,
  })

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#fafafa' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '0 24px', display: 'flex', gap: 4, alignItems: 'center' }}>
        <span style={{ fontWeight: 700, marginRight: 24, color: '#1565c0' }}>MMR</span>
        <button style={navStyle('dashboard')} onClick={() => setPage('dashboard')}>Dashboard</button>
        <button style={navStyle('protocol')} onClick={() => setPage('protocol')}>Protocol</button>
      </nav>

      {page === 'dashboard' && <BiomarkerDashboard />}
      {page === 'protocol' && <ProtocolGuidance />}
    </div>
  )
}
