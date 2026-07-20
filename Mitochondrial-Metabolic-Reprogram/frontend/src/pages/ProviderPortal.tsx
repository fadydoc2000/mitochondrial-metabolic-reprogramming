import React, { useEffect, useState } from 'react'
import { getMyPatients, getPatientReport } from '../services/api'
import type { PatientLink, PatientReport } from '../services/api'

export default function ProviderPortal() {
  const [patients, setPatients] = useState<PatientLink[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [report, setReport] = useState<PatientReport | null>(null)
  const [loadingReport, setLoadingReport] = useState(false)

  useEffect(() => {
    getMyPatients().then(setPatients).catch(() => {})
  }, [])

  const viewReport = async (patientId: number) => {
    setSelected(patientId); setLoadingReport(true); setReport(null)
    try {
      setReport(await getPatientReport(patientId))
    } finally {
      setLoadingReport(false)
    }
  }

  const zoneColor = (zone: string | null) => zone === 'GREEN' ? '#2e7d32' : zone === 'YELLOW' ? '#e65100' : zone === 'RED' ? '#c62828' : '#888'

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ margin: '0 0 4px', color: '#1565c0' }}>Provider Portal</h1>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#888' }}>Patients who have granted you access to their MMR data.</p>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Patient list */}
        <div style={{ width: 260, flexShrink: 0 }}>
          {patients.length === 0
            ? <p style={{ color: '#888', fontSize: 14 }}>No patients linked yet. Ask your patient to add your email in their "Providers" tab.</p>
            : patients.map(p => (
              <button key={p.id}
                onClick={() => viewReport(p.patient.id)}
                style={{
                  width: '100%', textAlign: 'left', padding: '14px 16px', marginBottom: 8,
                  background: selected === p.patient.id ? '#e3f2fd' : '#fff',
                  border: selected === p.patient.id ? '1px solid #1565c0' : '1px solid #e0e0e0',
                  borderRadius: 8, cursor: 'pointer',
                }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.patient.firstName} {p.patient.lastName}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{p.patient.email}</div>
              </button>
            ))
          }
        </div>

        {/* Report panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {!selected && <div style={{ color: '#aaa', padding: 40, textAlign: 'center' }}>Select a patient to view their report</div>}
          {loadingReport && <div style={{ color: '#888', padding: 40, textAlign: 'center' }}>Generating report…</div>}

          {report && !loadingReport && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18 }}>{report.patient.firstName} {report.patient.lastName}</h2>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
                    Report generated {new Date(report.generatedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Adherence summary */}
              <Section title="Adherence">
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Stat label="Current Streak" value={`${report.adherence.currentStreakDays}d`} />
                  <Stat label="Total Days Logged" value={`${report.adherence.totalDaysLogged}d`} />
                  <Stat label="30-Day Adherence" value={`${report.adherence.adherencePercent30d}%`} />
                  <Stat label="Protocol Phase" value={report.protocol.protocolPhase ?? '—'} />
                </div>
                {report.adherence.milestones.length > 0 && (
                  <div style={{ marginTop: 12, fontSize: 13, color: '#2e7d32' }}>
                    Milestones: {report.adherence.milestones.join(' · ')}
                  </div>
                )}
              </Section>

              {/* Latest biomarkers */}
              {report.latestBiomarkers && (
                <Section title={`Latest Biomarkers (${new Date(report.latestBiomarkers.readingAt).toLocaleDateString()})`}>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Stat label="Glucose" value={report.latestBiomarkers.bloodGlucoseMgdl != null ? `${report.latestBiomarkers.bloodGlucoseMgdl} mg/dL` : '—'} />
                    <Stat label="Ketones" value={report.latestBiomarkers.betaHydroxybutyrateMmol != null ? `${report.latestBiomarkers.betaHydroxybutyrateMmol} mmol/L` : '—'} />
                    <Stat label="GKI" value={report.latestBiomarkers.gkiScore != null ? report.latestBiomarkers.gkiScore.toFixed(2) : '—'}
                      color={zoneColor(report.latestBiomarkers.metabolicZone)} />
                    <Stat label="Zone" value={report.latestBiomarkers.metabolicZone ?? '—'} color={zoneColor(report.latestBiomarkers.metabolicZone)} />
                    {report.latestBiomarkers.crpMgL != null && <Stat label="CRP" value={`${report.latestBiomarkers.crpMgL} mg/L`} />}
                    {report.latestBiomarkers.altUl != null && <Stat label="ALT" value={`${report.latestBiomarkers.altUl} U/L`} />}
                    {report.latestBiomarkers.astUl != null && <Stat label="AST" value={`${report.latestBiomarkers.astUl} U/L`} />}
                  </div>
                </Section>
              )}

              {/* Safety flags */}
              {report.safetyFlags && (
                <Section title="Safety Profile">
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: report.safetyFlags.warnings.length > 0 ? 12 : 0 }}>
                    {report.safetyFlags.hasType1Diabetes && <Flag label="T1 Diabetes" />}
                    {report.safetyFlags.hasKidneyDisease && <Flag label="Kidney Disease" />}
                    {report.safetyFlags.hasLiverDisease && <Flag label="Liver Disease" />}
                    {report.safetyFlags.isPregnant && <Flag label="Pregnant" />}
                    {!report.safetyFlags.hasType1Diabetes && !report.safetyFlags.hasKidneyDisease && !report.safetyFlags.hasLiverDisease && !report.safetyFlags.isPregnant && (
                      <span style={{ fontSize: 13, color: '#2e7d32' }}>No major contraindications flagged</span>
                    )}
                  </div>
                  {report.safetyFlags.warnings.map((w, i) => (
                    <p key={i} style={{ margin: '4px 0', fontSize: 13, color: '#e65100' }}>{w}</p>
                  ))}
                </Section>
              )}

              {/* Disclaimer */}
              <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 12, marginTop: 16 }}>
                <p style={{ margin: 0, fontSize: 11, color: '#888' }}>{report.disclaimer}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginBottom: 16 }}>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: '#333' }}>{title}</div>
      {children}
    </div>
  )
}

function Stat({ label, value, color = '#1565c0' }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ background: '#fafafa', border: '1px solid #eee', borderRadius: 6, padding: '10px 14px', minWidth: 90 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{label}</div>
    </div>
  )
}

function Flag({ label }: { label: string }) {
  return (
    <span style={{ background: '#fff3e0', border: '1px solid #ffcc80', borderRadius: 4, padding: '3px 10px', fontSize: 12, color: '#e65100', fontWeight: 600 }}>
      {label}
    </span>
  )
}
