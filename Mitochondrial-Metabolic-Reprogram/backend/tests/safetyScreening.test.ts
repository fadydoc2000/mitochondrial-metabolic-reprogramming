import { describe, it, expect } from '@jest/globals'
import { checkSafety, checkBiomarkerAlerts } from '../src/services/safetyScreening'

describe('checkSafety', () => {
  it('clears a healthy user with no contraindications', () => {
    const r = checkSafety({ hasType1Diabetes: false, hasKidneyDisease: false, hasLiverDisease: false, isPregnant: false })
    expect(r.cleared).toBe(true)
    expect(r.blockers).toHaveLength(0)
    expect(r.warnings).toHaveLength(0)
  })

  it('blocks T1 diabetes', () => {
    const r = checkSafety({ hasType1Diabetes: true, hasKidneyDisease: false, hasLiverDisease: false, isPregnant: false })
    expect(r.cleared).toBe(false)
    expect(r.blockers.length).toBeGreaterThan(0)
  })

  it('blocks pregnancy', () => {
    const r = checkSafety({ hasType1Diabetes: false, hasKidneyDisease: false, hasLiverDisease: false, isPregnant: true })
    expect(r.cleared).toBe(false)
    expect(r.blockers.length).toBeGreaterThan(0)
  })

  it('warns for kidney disease but does not block', () => {
    const r = checkSafety({ hasType1Diabetes: false, hasKidneyDisease: true, hasLiverDisease: false, isPregnant: false })
    expect(r.cleared).toBe(true)
    expect(r.warnings.length).toBeGreaterThan(0)
  })

  it('warns for insulin medication', () => {
    const r = checkSafety({ hasType1Diabetes: false, hasKidneyDisease: false, hasLiverDisease: false, isPregnant: false, currentMedications: 'insulin glargine 20u nightly' })
    expect(r.warnings.length).toBeGreaterThan(0)
  })
})

describe('checkBiomarkerAlerts', () => {
  it('returns no alerts for normal values', () => {
    const a = checkBiomarkerAlerts({ bloodGlucoseMgdl: 75, betaHydroxybutyrateMmol: 2.5 })
    expect(a).toHaveLength(0)
  })

  it('urgent alert for glucose >250', () => {
    const a = checkBiomarkerAlerts({ bloodGlucoseMgdl: 280 })
    expect(a[0].severity).toBe('urgent')
  })

  it('urgent DKA alert for ketones >6 in T1 diabetes', () => {
    const a = checkBiomarkerAlerts({ betaHydroxybutyrateMmol: 7, hasType1Diabetes: true })
    expect(a[0].severity).toBe('urgent')
    expect(a[0].message).toContain('DKA')
  })

  it('urgent liver alert for ALT >3x normal', () => {
    const a = checkBiomarkerAlerts({ altUl: 130 })
    expect(a[0].severity).toBe('urgent')
  })
})
