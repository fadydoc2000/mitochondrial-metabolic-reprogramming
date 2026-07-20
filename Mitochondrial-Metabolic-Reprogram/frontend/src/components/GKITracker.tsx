import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import { getGKITrend, createBiomarker } from '../services/api'
import type { GKITrendPoint } from '../types/biomarker'
import MetricCard from './MetricCard'

export default function GKITracker() {
  const [trend, setTrend] = useState<GKITrendPoint[]>([])
  const [glucose, setGlucose] = useState('')
  const [ketones, setKetones] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = () => getGKITrend(30).then(setTrend).catch(() => {})

  useEffect(() => { load() }, [])

  const latest = trend[trend.length - 1] ?? null

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      await createBiomarker({
        bloodGlucoseMgdl: Number(glucose),
        betaHydroxybutyrateMmol: Number(ketones),
      })
      setGlucose('')
      setKetones('')
      await load()
    } catch {
      setError('Failed to save reading. Check values and try again.')
    } finally {
      setSaving(false)
    }
  }

  const chartData = trend.map(p => ({
    date: new Date(p.readingAt).toLocaleDateString(),
    gki: p.gkiScore,
  }))

  return (
    <div>
      <h2>GKI Tracker</h2>

      {latest && (
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <MetricCard label="GKI" value={latest.gkiScore.toFixed(2)} zone={latest.metabolicZone} subtitle="target <1.0" />
        </div>
      )}

      <form onSubmit={submit} style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, color: '#666' }}>Blood Glucose (mg/dL)</span>
          <input
            type="number" step="0.1" value={glucose}
            onChange={e => setGlucose(e.target.value)}
            placeholder="e.g. 72" required
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', width: 140 }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, color: '#666' }}>Ketones (mmol/L)</span>
          <input
            type="number" step="0.01" value={ketones}
            onChange={e => setKetones(e.target.value)}
            placeholder="e.g. 2.3" required
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', width: 140 }}
          />
        </label>
        <button type="submit" disabled={saving}
          style={{ padding: '8px 20px', borderRadius: 6, background: '#2e7d32', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {saving ? 'Saving…' : 'Log Reading'}
        </button>
      </form>

      {error && <p style={{ color: '#c62828' }}>{error}</p>}

      {chartData.length > 0 && (
        <div>
          <h3 style={{ marginBottom: 8 }}>30-Day GKI Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 'auto']} tick={{ fontSize: 11 }} />
              <Tooltip />
              <ReferenceLine y={1.0} stroke="#2e7d32" strokeDasharray="4 2" label={{ value: 'Therapeutic', position: 'right', fontSize: 10, fill: '#2e7d32' }} />
              <ReferenceLine y={3.0} stroke="#c62828" strokeDasharray="4 2" label={{ value: 'High Risk', position: 'right', fontSize: 10, fill: '#c62828' }} />
              <Line type="monotone" dataKey="gki" stroke="#1565c0" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
