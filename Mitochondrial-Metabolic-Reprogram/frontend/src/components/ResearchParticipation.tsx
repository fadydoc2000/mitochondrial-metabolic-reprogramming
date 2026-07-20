import React, { useEffect, useState } from 'react'
import { getResearchConsent, optInResearch, optOutResearch } from '../services/api'

export default function ResearchParticipation() {
  const [consented, setConsented] = useState<boolean | null>(null)
  const [consentedAt, setConsentedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getResearchConsent()
      .then(r => { setConsented(r.consented); setConsentedAt(r.consentedAt) })
      .catch(() => setConsented(false))
      .finally(() => setLoading(false))
  }, [])

  const toggle = async () => {
    setSaving(true); setError(null)
    try {
      if (consented) {
        await optOutResearch()
        setConsented(false); setConsentedAt(null)
      } else {
        await optInResearch()
        setConsented(true); setConsentedAt(new Date().toISOString())
      }
    } catch {
      setError('Failed to update consent. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={{ padding: 24, color: '#888' }}>Loading…</div>

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ margin: '0 0 8px', color: '#1565c0', fontSize: 20 }}>Research Participation</h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#666' }}>
        Help advance metabolic cancer therapy research by contributing your de-identified data.
      </p>

      {/* What's contributed */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginBottom: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>What data is shared</div>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#555', lineHeight: 2 }}>
          <li>GKI readings (dates anonymised to ISO week only)</li>
          <li>Adherence percentages and streak lengths</li>
          <li>Protocol phase and days on protocol</li>
          <li>Metabolic zone classifications (RED / YELLOW / GREEN)</li>
          <li>Anonymous safety phenotype flags (T1 diabetes, kidney/liver disease)</li>
        </ul>
        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 14, marginBottom: 10 }}>What is never shared</div>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#555', lineHeight: 2 }}>
          <li>Name, email, or any account identifier</li>
          <li>Exact reading timestamps</li>
          <li>Medication lists</li>
          <li>Provider or patient relationships</li>
        </ul>
      </div>

      {/* Research purpose */}
      <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 8, padding: 14, marginBottom: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#2e7d32', marginBottom: 6 }}>Why this matters</div>
        <p style={{ margin: 0, fontSize: 13, color: '#1b5e20', lineHeight: 1.6 }}>
          Seyfried's 2024–2026 GBM trial had a small cohort (n=18). Population-scale GKI data from this app
          can validate whether the 6-month adherence threshold and GKI &lt;1.0 target hold across
          cancer types, ages, and metabolic starting points. Your participation directly accelerates
          evidence for a non-toxic metabolic therapy.
        </p>
      </div>

      {/* Consent toggle */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>
            {consented ? 'You are contributing to research' : 'Opt in to research contribution'}
          </div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
            {consented && consentedAt
              ? `Consented ${new Date(consentedAt).toLocaleDateString()}. You can withdraw at any time.`
              : 'Participation is voluntary and you can withdraw at any time.'}
          </div>
        </div>
        <button onClick={toggle} disabled={saving}
          style={{
            padding: '10px 20px', borderRadius: 6, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', flexShrink: 0,
            background: consented ? '#fff' : '#1565c0',
            color: consented ? '#c62828' : '#fff',
            border: consented ? '1px solid #ef9a9a' : 'none',
          } as React.CSSProperties}>
          {saving ? '…' : consented ? 'Withdraw Consent' : 'Opt In'}
        </button>
      </div>

      {error && <p style={{ margin: '12px 0 0', color: '#c62828', fontSize: 13 }}>{error}</p>}

      <p style={{ marginTop: 16, fontSize: 11, color: '#aaa' }}>
        Data contribution follows privacy-by-design principles. No personally identifiable information
        leaves this application. Aggregated, anonymised findings may be shared with academic researchers
        studying metabolic cancer therapies.
      </p>
    </div>
  )
}
