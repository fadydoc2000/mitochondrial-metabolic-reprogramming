import React from 'react'
import type { MetabolicZone } from '../types/biomarker'

const ZONE_COLORS: Record<MetabolicZone, string> = {
  GREEN: '#2e7d32',
  YELLOW: '#f57f17',
  RED: '#c62828',
}

interface Props {
  label: string
  value: string | number | null
  unit?: string
  zone?: MetabolicZone | null
  subtitle?: string
}

export default function MetricCard({ label, value, unit, zone, subtitle }: Props) {
  const color = zone ? ZONE_COLORS[zone] : '#555'

  return (
    <div style={{ border: `2px solid ${color}`, borderRadius: 8, padding: 16, minWidth: 140, textAlign: 'center' }}>
      <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color }}>
        {value ?? '—'}{unit && <span style={{ fontSize: 14, marginLeft: 2 }}>{unit}</span>}
      </div>
      {subtitle && <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>{subtitle}</div>}
      {zone && (
        <div style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color, textTransform: 'uppercase' }}>
          {zone}
        </div>
      )}
    </div>
  )
}
