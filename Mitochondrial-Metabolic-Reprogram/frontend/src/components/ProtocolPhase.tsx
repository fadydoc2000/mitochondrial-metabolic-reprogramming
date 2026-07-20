import React from 'react'
import type { ProtocolStatus } from '../types/biomarker'

const PHASE_LABELS = {
  not_started: { label: 'Not Started', color: '#888' },
  press: { label: 'Press Phase', color: '#1565c0' },
  pulse: { label: 'Pulse Phase', color: '#6a1b9a' },
}

interface Props {
  status: ProtocolStatus
}

export default function ProtocolPhase({ status }: Props) {
  const { label, color } = PHASE_LABELS[status.phase]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ background: color, color: '#fff', borderRadius: 20, padding: '4px 16px', fontWeight: 600 }}>
          {label}
        </div>
        <span style={{ fontSize: 13, color: '#555' }}>
          Day {status.daysOnProtocol} · {status.daysToThreshold > 0 ? `${status.daysToThreshold} days to 6-month threshold` : '6-month threshold reached'}
        </span>
      </div>

      {status.gkiAvg !== null && (
        <p style={{ margin: '0 0 12px', fontSize: 13 }}>
          Average GKI (30 days): <strong style={{ color: status.isTherapeutic ? '#2e7d32' : '#c62828' }}>{status.gkiAvg}</strong>
          {status.isTherapeutic ? ' — therapeutic zone' : ' — above therapeutic threshold'}
        </p>
      )}

      {status.pulseReady && (
        <div style={{ background: '#f3e5f5', border: '1px solid #ce93d8', borderRadius: 6, padding: '8px 14px', marginBottom: 12, fontSize: 13 }}>
          Pulse interventions available — GKI consistently therapeutic. Discuss HBOT or fasting windows with your provider.
        </div>
      )}

      {status.recommendations.length > 0 && (
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {status.recommendations.map((r, i) => (
            <li key={i} style={{ fontSize: 13, marginBottom: 6, color: '#333' }}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
