import { useEffect, useState } from 'react'
import { getAdherence } from '../services/api'
import type { AdherenceStatus } from '../services/api'

export default function AdherenceCoach() {
  const [status, setStatus] = useState<AdherenceStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdherence()
      .then(setStatus)
      .catch(() => setStatus(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: 20, color: '#888' }}>Loading adherence data…</div>
  if (!status) return null

  const milestoneGoal = 180
  const progressPct = Math.min(100, Math.round((status.totalDaysLogged / milestoneGoal) * 100))
  const streakColor = status.currentStreakDays >= 7 ? '#2e7d32' : status.currentStreakDays >= 3 ? '#e65100' : '#888'

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ margin: '0 0 20px', color: '#1565c0', fontSize: 20 }}>Adherence Coach</h2>

      {/* Coaching message */}
      <div style={{ background: '#e3f2fd', borderRadius: 10, padding: 16, marginBottom: 20 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#1565c0', lineHeight: 1.6 }}>{status.coachingMessage}</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <StatCard label="Current Streak" value={`${status.currentStreakDays}d`} color={streakColor} />
        <StatCard label="Best Streak" value={`${status.longestStreakDays}d`} color="#1565c0" />
        <StatCard label="Total Days Logged" value={`${status.totalDaysLogged}d`} color="#555" />
        <StatCard label="30-Day Adherence" value={`${status.adherencePercent}%`}
          color={status.adherencePercent >= 70 ? '#2e7d32' : status.adherencePercent >= 40 ? '#e65100' : '#c62828'} />
      </div>

      {/* 6-month progress bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
          <span style={{ fontWeight: 600, color: '#333' }}>Progress to 6-Month Milestone</span>
          <span style={{ color: '#888' }}>{status.totalDaysLogged} / {milestoneGoal} days</span>
        </div>
        <div style={{ background: '#e0e0e0', borderRadius: 6, height: 10, overflow: 'hidden' }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: progressPct >= 100 ? '#2e7d32' : '#1565c0', borderRadius: 6, transition: 'width 0.4s' }} />
        </div>
        <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>
          Seyfried GBM study: ≥180 days adherence → 66.7% 3-year survival
        </div>
      </div>

      {/* Next milestone */}
      {status.nextMilestone && (
        <div style={{ background: '#fff8e1', border: '1px solid #ffe082', borderRadius: 8, padding: 14, marginBottom: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#e65100', marginBottom: 4 }}>
            Next: {status.nextMilestone.label}
          </div>
          <div style={{ fontSize: 13, color: '#bf360c' }}>
            {status.nextMilestone.daysRemaining} day{status.nextMilestone.daysRemaining !== 1 ? 's' : ''} to go
          </div>
        </div>
      )}

      {/* Reached milestones */}
      {status.reachedMilestones.length > 0 && (
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#333', marginBottom: 10 }}>Milestones Reached</div>
          {status.reachedMilestones.map(m => (
            <div key={m.days} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>✓</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#2e7d32' }}>{m.label}</div>
                <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{m.message}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: '12px 16px', flex: '1 1 120px', minWidth: 100 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{label}</div>
    </div>
  )
}
