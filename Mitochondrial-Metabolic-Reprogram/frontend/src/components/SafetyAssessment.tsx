import React, { useState } from 'react'
import { submitSafetyCheck } from '../services/api'
import type { SafetyResult } from '../services/api'

interface Props {
  onComplete: () => void
}

const DISCLAIMER = `This tool is for educational purposes only and does not constitute medical advice.
Always consult a qualified healthcare provider before starting any dietary protocol,
particularly if you have a pre-existing medical condition.`

export default function SafetyAssessment({ onComplete }: Props) {
  const [step, setStep] = useState<'questions' | 'results'>('questions')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SafetyResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    hasType1Diabetes: false,
    hasKidneyDisease: false,
    hasLiverDisease: false,
    isPregnant: false,
    currentMedications: '',
  })

  const toggle = (field: keyof typeof form) =>
    setForm(f => ({ ...f, [field]: !f[field] }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const r = await submitSafetyCheck({
        ...form,
        currentMedications: form.currentMedications || undefined,
      })
      setResult(r)
      setStep('results')
    } catch {
      setError('Safety check failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const wrap = (children: React.ReactNode) => (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 36, width: '100%', maxWidth: 540, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        {children}
      </div>
    </div>
  )

  if (step === 'results' && result) {
    return wrap(
      <>
        <h2 style={{ color: '#1565c0', marginTop: 0 }}>Safety Screening Results</h2>

        {result.blockers.length > 0 && (
          <div style={{ background: '#ffebee', border: '1px solid #ef9a9a', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <strong style={{ color: '#c62828', display: 'block', marginBottom: 8 }}>⚠ Protocol Not Recommended</strong>
            {result.blockers.map((b, i) => (
              <p key={i} style={{ margin: '8px 0', color: '#b71c1c', fontSize: 14 }}>{b}</p>
            ))}
          </div>
        )}

        {result.warnings.length > 0 && (
          <div style={{ background: '#fff8e1', border: '1px solid #ffe082', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <strong style={{ color: '#e65100', display: 'block', marginBottom: 8 }}>Medical Supervision Required</strong>
            {result.warnings.map((w, i) => (
              <p key={i} style={{ margin: '8px 0', color: '#bf360c', fontSize: 14 }}>{w}</p>
            ))}
          </div>
        )}

        {result.cleared && result.warnings.length === 0 && (
          <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <strong style={{ color: '#2e7d32' }}>✓ No contraindications identified</strong>
            <p style={{ margin: '8px 0 0', color: '#1b5e20', fontSize: 14 }}>
              You may proceed with the Press-Pulse Protocol. Continue to monitor your biomarkers and work with your healthcare provider.
            </p>
          </div>
        )}

        <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 12, marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: 12, color: '#666' }}>{DISCLAIMER}</p>
        </div>

        <button onClick={onComplete}
          style={{ width: '100%', padding: '12px 0', borderRadius: 6, background: '#1565c0', color: '#fff', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
          Continue to Dashboard
        </button>
      </>
    )
  }

  const Checkbox = ({ field, label, description }: { field: keyof typeof form; label: string; description?: string }) => (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={!!form[field]}
        onChange={() => toggle(field)}
        style={{ marginTop: 2, width: 18, height: 18, flexShrink: 0 }}
      />
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
        {description && <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{description}</div>}
      </div>
    </label>
  )

  return wrap(
    <>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#1565c0' }}>Safety Screening</div>
        <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>One-time check before starting the MMR protocol</div>
      </div>

      <div style={{ background: '#e3f2fd', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 13, color: '#1565c0' }}>
        This takes 30 seconds. Honest answers help us flag risks specific to you.
      </div>

      <form onSubmit={submit}>
        <Checkbox field="hasType1Diabetes" label="I have Type 1 Diabetes" description="Insulin-dependent diabetes (not Type 2)" />
        <Checkbox field="hasKidneyDisease" label="I have chronic kidney disease" description="CKD stage 3 or above, or on dialysis" />
        <Checkbox field="hasLiverDisease" label="I have liver disease" description="Cirrhosis, hepatitis, or other significant liver condition" />
        <Checkbox field="isPregnant" label="I am currently pregnant" />

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '16px 0' }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Current medications <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span></span>
          <span style={{ fontSize: 12, color: '#888' }}>List key medications — we check for diet interactions</span>
          <textarea
            value={form.currentMedications}
            onChange={e => setForm(f => ({ ...f, currentMedications: e.target.value }))}
            placeholder="e.g. metformin, insulin glargine, atorvastatin..."
            rows={3}
            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13, resize: 'vertical' }}
          />
        </label>

        <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 12, marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 11, color: '#777' }}>{DISCLAIMER}</p>
        </div>

        {error && <p style={{ color: '#c62828', fontSize: 13, margin: '0 0 12px' }}>{error}</p>}

        <button type="submit" disabled={loading}
          style={{ width: '100%', padding: '12px 0', borderRadius: 6, background: '#1565c0', color: '#fff', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
          {loading ? 'Checking…' : 'Complete Safety Check'}
        </button>
      </form>
    </>
  )
}
