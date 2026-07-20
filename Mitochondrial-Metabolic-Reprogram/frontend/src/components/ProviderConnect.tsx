import React, { useEffect, useState } from 'react'
import { getMyProviders, linkProvider, unlinkProvider } from '../services/api'
import type { ProviderLink } from '../services/api'

export default function ProviderConnect() {
  const [providers, setProviders] = useState<ProviderLink[]>([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const load = () => getMyProviders().then(setProviders).catch(() => {})

  useEffect(() => { load() }, [])

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null); setSuccess(null); setLoading(true)
    try {
      await linkProvider(email.trim())
      setSuccess('Provider linked. They can now view your GKI reports.')
      setEmail('')
      load()
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Failed to link provider')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlink = async (id: number, name: string) => {
    if (!confirm(`Revoke ${name}'s access to your health data?`)) return
    await unlinkProvider(id).catch(() => {})
    load()
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ margin: '0 0 8px', color: '#1565c0', fontSize: 20 }}>My Healthcare Providers</h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#666' }}>
        Link your provider so they can access your GKI trend reports. They must have a registered Provider account.
      </p>

      {/* Link form */}
      <form onSubmit={handleLink} style={{ background: '#f5f5f5', borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Add a Provider</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="provider@clinic.com"
            required
            style={{ flex: 1, padding: '10px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14 }}
          />
          <button type="submit" disabled={loading}
            style={{ padding: '10px 20px', borderRadius: 6, background: '#1565c0', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            {loading ? '…' : 'Link'}
          </button>
        </div>
        {error && <p style={{ margin: '8px 0 0', color: '#c62828', fontSize: 13 }}>{error}</p>}
        {success && <p style={{ margin: '8px 0 0', color: '#2e7d32', fontSize: 13 }}>{success}</p>}
      </form>

      {/* Provider list */}
      {providers.length === 0
        ? <p style={{ color: '#888', fontSize: 14 }}>No providers linked yet.</p>
        : providers.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{p.provider.firstName} {p.provider.lastName}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{p.provider.email} · linked {new Date(p.consentAt).toLocaleDateString()}</div>
            </div>
            <button onClick={() => handleUnlink(p.id, `${p.provider.firstName} ${p.provider.lastName}`)}
              style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #ef9a9a', background: '#fff', color: '#c62828', fontSize: 12, cursor: 'pointer' }}>
              Revoke
            </button>
          </div>
        ))
      }

      <div style={{ marginTop: 20, background: '#e3f2fd', borderRadius: 8, padding: 12 }}>
        <p style={{ margin: 0, fontSize: 12, color: '#1565c0' }}>
          Your provider can view your GKI trend, adherence stats, and biomarker history. You can revoke access at any time.
        </p>
      </div>
    </div>
  )
}
