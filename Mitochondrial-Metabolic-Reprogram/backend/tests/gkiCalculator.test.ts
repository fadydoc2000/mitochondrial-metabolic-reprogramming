import { describe, it, expect } from '@jest/globals'
import { calculateGKI, gkiTargetDistance } from '../src/services/gkiCalculator'

describe('calculateGKI', () => {
  it('classifies GKI <1.0 as GREEN / KETONE_ADAPTED', () => {
    // glucose 72 mg/dL, ketones 4 mmol/L → GKI = 72/18/4 = 1.0
    // use ketones=5 to get 0.8
    const r = calculateGKI(72, 5)
    expect(r.gki).toBeCloseTo(0.8, 2)
    expect(r.zone).toBe('GREEN')
    expect(r.state).toBe('KETONE_ADAPTED')
  })

  it('classifies GKI 1.0–3.0 as YELLOW / TRANSITIONING', () => {
    const r = calculateGKI(90, 3) // 90/18/3 = 1.67
    expect(r.gki).toBeCloseTo(1.67, 1)
    expect(r.zone).toBe('YELLOW')
    expect(r.state).toBe('TRANSITIONING')
  })

  it('classifies GKI >3.0 as RED / GLUCOSE_DEPENDENT', () => {
    const r = calculateGKI(120, 1) // 120/18/1 = 6.67
    expect(r.gki).toBeCloseTo(6.67, 1)
    expect(r.zone).toBe('RED')
    expect(r.state).toBe('GLUCOSE_DEPENDENT')
  })

  it('throws on zero ketones', () => {
    expect(() => calculateGKI(80, 0)).toThrow()
  })
})

describe('gkiTargetDistance', () => {
  it('returns 0 when already at or below target', () => {
    expect(gkiTargetDistance(0.5)).toBe(0)
    expect(gkiTargetDistance(1.0)).toBe(0)
  })

  it('returns positive distance above target', () => {
    expect(gkiTargetDistance(3.0)).toBeCloseTo(2.0)
  })
})
