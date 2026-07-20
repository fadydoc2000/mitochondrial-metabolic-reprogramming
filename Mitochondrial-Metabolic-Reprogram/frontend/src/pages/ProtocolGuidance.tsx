import React, { useEffect, useState } from 'react'
import { getProtocolEducation, getProtocolStatus } from '../services/api'
import type { ProtocolStatus } from '../types/biomarker'
import ProtocolPhaseWidget from '../components/ProtocolPhase'

export default function ProtocolGuidance() {
  const [education, setEducation] = useState<any>(null)
  const [status, setStatus] = useState<ProtocolStatus | null>(null)

  useEffect(() => {
    getProtocolEducation().then(setEducation).catch(() => {})
    getProtocolStatus().then(setStatus).catch(() => {})
  }, [])

  const sectionStyle = { border: '1px solid #e0e0e0', borderRadius: 8, padding: 20, marginBottom: 20 }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ margin: '0 0 4px' }}>Press-Pulse Protocol</h1>
      <p style={{ color: '#888', margin: '0 0 24px', fontSize: 13 }}>
        Based on Seyfried et al. metabolic therapy research (2024–2026). For educational use.
        Always coordinate protocol changes with a qualified healthcare provider.
      </p>

      {status && (
        <div style={sectionStyle}>
          <h2 style={{ margin: '0 0 16px', fontSize: 16 }}>Your Current Status</h2>
          <ProtocolPhaseWidget status={status} />
        </div>
      )}

      {education?.press && (
        <div style={sectionStyle}>
          <h2 style={{ margin: '0 0 8px', color: '#1565c0' }}>{education.press.title}</h2>
          <p style={{ color: '#555', marginTop: 0 }}>{education.press.summary}</p>

          <h3 style={{ fontSize: 14, margin: '16px 0 8px' }}>Diet Targets</h3>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>Fat ratio: {education.press.diet.ratio}</li>
            <li>Style: {education.press.diet.style}</li>
            <li>Blood glucose: {education.press.diet.targets.bloodGlucoseMgdl} mg/dL</li>
            <li>Ketones: {education.press.diet.targets.ketoneMmol} mmol/L</li>
            <li>GKI: {education.press.diet.targets.gki}</li>
          </ul>

          <h3 style={{ fontSize: 14, margin: '16px 0 8px' }}>Duration</h3>
          <p style={{ margin: 0, color: '#555' }}>{education.press.duration}</p>

          <h3 style={{ fontSize: 14, margin: '16px 0 8px' }}>Key Clinical Findings</h3>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {education.press.keyFacts.map((f: string, i: number) => (
              <li key={i} style={{ marginBottom: 6, color: '#333' }}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {education?.pulse && (
        <div style={sectionStyle}>
          <h2 style={{ margin: '0 0 8px', color: '#6a1b9a' }}>{education.pulse.title}</h2>
          <p style={{ color: '#555', marginTop: 0 }}>{education.pulse.summary}</p>

          <h3 style={{ fontSize: 14, margin: '16px 0 8px' }}>Interventions</h3>
          {education.pulse.interventions.map((iv: any, i: number) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong>{iv.name}</strong>
              <p style={{ margin: '4px 0 0', color: '#555', fontSize: 13 }}>{iv.description}</p>
            </div>
          ))}

          <div style={{ background: '#fce4ec', border: '1px solid #e57373', borderRadius: 6, padding: '10px 14px', marginTop: 16, fontSize: 13 }}>
            <strong>Timing:</strong> {education.pulse.timing}<br />
            <strong>Note:</strong> {education.pulse.note}
          </div>
        </div>
      )}

      <div style={{ ...sectionStyle, background: '#f9f9f9' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 15 }}>Disclaimer</h2>
        <p style={{ margin: 0, color: '#666', fontSize: 13 }}>
          This app provides educational information based on published research by Dr. Thomas Seyfried and colleagues.
          It is not a substitute for professional medical advice. Ketogenic and calorie-restricted diets carry real risks
          for people with Type 1 diabetes, kidney disease, liver disease, or pregnancy. Always work with a healthcare
          provider before starting this protocol.
        </p>
      </div>
    </div>
  )
}
