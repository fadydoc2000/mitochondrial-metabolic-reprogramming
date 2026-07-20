import { describe, it, expect } from '@jest/globals'
import { buildProtocolStatus } from '../src/services/protocolAdvisor'

const greenSnapshot = (daysAgo: number) => ({
  gki: 0.7,
  zone: 'GREEN' as const,
  readingAt: new Date(Date.now() - daysAgo * 86_400_000),
})

describe('buildProtocolStatus', () => {
  it('returns not_started when daysOnProtocol = 0', () => {
    const s = buildProtocolStatus(0, null, [])
    expect(s.phase).toBe('not_started')
    expect(s.daysToThreshold).toBe(180)
  })

  it('is in press phase without sufficient therapeutic readings', () => {
    const s = buildProtocolStatus(30, 90, [{ gki: 2.5, zone: 'YELLOW', readingAt: new Date() }])
    expect(s.phase).toBe('press')
    expect(s.pulseReady).toBe(false)
  })

  it('transitions to pulse phase when 4+ readings all GKI <1.0 in last 28 days', () => {
    const readings = [0, 3, 7, 14].map(d => greenSnapshot(d))
    const s = buildProtocolStatus(60, 95, readings)
    expect(s.pulseReady).toBe(true)
    expect(s.phase).toBe('pulse')
  })

  it('counts down correctly to 6-month threshold', () => {
    const s = buildProtocolStatus(100, 85, [greenSnapshot(1)])
    expect(s.daysToThreshold).toBe(80)
  })

  it('caps threshold at 0 after 180+ days', () => {
    const s = buildProtocolStatus(200, 90, [greenSnapshot(1)])
    expect(s.daysToThreshold).toBe(0)
  })

  it('sets isTherapeutic true when avg GKI < 1.0', () => {
    const readings = [greenSnapshot(1), greenSnapshot(2)]
    const s = buildProtocolStatus(30, 90, readings)
    expect(s.isTherapeutic).toBe(true)
    expect(s.gkiAvg).toBeCloseTo(0.7)
  })
})
