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
import './BiomarkerDashboard.css'

type Tab = 'overview' | 'gki' | 'adherence' | 'providers' | 'devices' | 'research'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'gki', label: 'GKI Tracker' },
  { id: 'adherence', label: 'Adherence' },
  { id: 'providers', label: 'Providers' },
  { id: 'devices', label: 'Devices' },
  { id: 'research', label: 'Research' },
]

export default function BiomarkerDashboard() {
  const [latest, setLatest] = useState<BiomarkerReading | null>(null)
  const [protocol, setProtocol] = useState<ProtocolStatus | null>(null)
  const [tab, setTab] = useState<Tab>('overview')

  useEffect(() => {
    getBiomarkerLatest().then(setLatest).catch(() => {})
    getProtocolStatus().then(setProtocol).catch(() => {})
  }, [])

  return (
    <div className="bmd">
      <h1 className="bmd-heading">Metabolic Dashboard</h1>
      <p className="bmd-sub">Mitochondrial Metabolic Reprogramming · Press-Pulse Protocol</p>

      <div className="bmd-tabs" role="tablist">
        {TABS.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`bmd-tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div>
          {latest && (
            <div className="bmd-metrics">
              <MetricCard label="Blood Glucose" value={latest.bloodGlucoseMgdl} unit="mg/dL" zone={latest.metabolicZone} subtitle="target <80" />
              <MetricCard label="Ketones" value={latest.betaHydroxybutyrateMmol} unit="mmol/L" zone={latest.metabolicZone} subtitle="target 2–5" />
              <MetricCard label="GKI" value={latest.gkiScore} zone={latest.metabolicZone} subtitle="target <1.0" />
              {latest.crpMgL != null && <MetricCard label="CRP" value={latest.crpMgL} unit="mg/L" subtitle="target <1.0" />}
              {latest.lactateMmol != null && <MetricCard label="Lactate" value={latest.lactateMmol} unit="mmol/L" subtitle="glutamine marker" />}
            </div>
          )}

          {!latest && (
            <div className="bmd-empty">
              No readings yet. Log your first glucose and ketone values in the GKI Tracker tab.
            </div>
          )}

          {protocol && (
            <div className="bmd-protocol">
              <p className="bmd-protocol-heading">Protocol Status</p>
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
