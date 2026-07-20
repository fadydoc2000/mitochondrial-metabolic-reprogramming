import { useEffect, useState } from 'react'
import { getBiomarkerLatest, getProtocolStatus } from '../services/api'
import type { BiomarkerReading, ProtocolStatus } from '../types/biomarker'
import MetricCard from '../components/MetricCard'
import GKITracker from '../components/GKITracker'
import ProtocolPhaseWidget from '../components/ProtocolPhase'
import DeviceConnector from '../components/DeviceConnector'
import AdherenceCoach from '../components/AdherenceCoach'
import ProviderConnect from '../components/ProviderConnect'
import ResearchParticipation from '../components/ResearchParticipation'

type Tab = 'overview' | 'gki' | 'adherence' | 'providers' | 'devices' | 'research'

export default function BiomarkerDashboard() {
  const [latest, setLatest] = useState<BiomarkerReading | null>(null)
  const [protocol, setProtocol] = useState<ProtocolStatus | null>(null)
  const [tab, setTab] = useState<Tab>('overview')

  useEffect(() => {
    getBiomarkerLatest().then(setLatest).catch(() => {})
    getProtocolStatus().then(setProtocol).catch(() => {})
  }, [])

  const tabStyle = (t: Tab) => ({
    padding: '8px 20px',
    border: 'none',
    borderBottom: tab === t ? '2px solid #1565c0' : '2px solid transparent',
    background: 'none',
    cursor: 'pointer',
    fontWeight: tab === t ? 600 : 400,
    color: tab === t ? '#1565c0' : '#555',
  })

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ margin: '0 0 4px' }}>Metabolic Dashboard</h1>
      <p style={{ color: '#888', margin: '0 0 24px', fontSize: 13 }}>
        Mitochondrial Metabolic Reprogramming · Press-Pulse Protocol
      </p>

      <div style={{ borderBottom: '1px solid #eee', marginBottom: 24, display: 'flex' }}>
        <button style={tabStyle('overview')} onClick={() => setTab('overview')}>Overview</button>
        <button style={tabStyle('gki')} onClick={() => setTab('gki')}>GKI Tracker</button>
        <button style={tabStyle('adherence')} onClick={() => setTab('adherence')}>Adherence</button>
        <button style={tabStyle('providers')} onClick={() => setTab('providers')}>Providers</button>
        <button style={tabStyle('devices')} onClick={() => setTab('devices')}>Devices</button>
        <button style={tabStyle('research')} onClick={() => setTab('research')}>Research</button>
      </div>

      {tab === 'overview' && (
        <div>
          {latest && (
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
              <MetricCard label="Blood Glucose" value={latest.bloodGlucoseMgdl} unit="mg/dL" zone={latest.metabolicZone} subtitle="target <80" />
              <MetricCard label="Ketones" value={latest.betaHydroxybutyrateMmol} unit="mmol/L" zone={latest.metabolicZone} subtitle="target 2–5" />
              <MetricCard label="GKI" value={latest.gkiScore} zone={latest.metabolicZone} subtitle="target <1.0" />
              {latest.crpMgL != null && <MetricCard label="CRP" value={latest.crpMgL} unit="mg/L" subtitle="target <1.0" />}
              {latest.lactateMmol != null && <MetricCard label="Lactate" value={latest.lactateMmol} unit="mmol/L" subtitle="glutamine marker" />}
            </div>
          )}

          {!latest && (
            <div style={{ padding: 32, textAlign: 'center', color: '#888', border: '1px dashed #ddd', borderRadius: 8, marginBottom: 32 }}>
              No readings yet. Log your first glucose and ketone values in the GKI Tracker tab.
            </div>
          )}

          {protocol && (
            <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 20 }}>
              <h2 style={{ margin: '0 0 16px', fontSize: 16 }}>Protocol Status</h2>
              <ProtocolPhaseWidget status={protocol} />
            </div>
          )}
        </div>
      )}

      {tab === 'gki' && <GKITracker />}
      {tab === 'adherence' && <AdherenceCoach />}
      {tab === 'providers' && <ProviderConnect />}
      {tab === 'devices' && <DeviceConnector />}
      {tab === 'research' && <ResearchParticipation />}
    </div>
  )
}
