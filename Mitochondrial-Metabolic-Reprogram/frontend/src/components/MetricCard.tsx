import type { MetabolicZone } from '../types/biomarker'
import './MetricCard.css'

interface Props {
  label: string
  value: string | number | null
  unit?: string
  zone?: MetabolicZone | null
  subtitle?: string
}

export default function MetricCard({ label, value, unit, zone, subtitle }: Props) {
  return (
    <div className="metric-card" data-zone={zone ?? undefined}>
      <div className="metric-card-label">{label}</div>
      <div className="metric-card-value">
        {value ?? '—'}
        {unit && <span className="metric-card-unit">{unit}</span>}
      </div>
      {subtitle && <div className="metric-card-subtitle">{subtitle}</div>}
      {zone && <div className="metric-card-zone">{zone}</div>}
    </div>
  )
}
