import { describe, it, expect } from '@jest/globals'
import { computeAdherence } from '../src/services/adherenceCoach'

const day = (offset: number, base = new Date('2026-07-21T12:00:00Z')) =>
  new Date(base.getTime() + offset * 86_400_000)

describe('computeAdherence', () => {
  it('returns zero state for no readings', () => {
    const r = computeAdherence([], new Date('2026-07-21T12:00:00Z'))
    expect(r.currentStreakDays).toBe(0)
    expect(r.totalDaysLogged).toBe(0)
    expect(r.adherencePercent).toBe(0)
  })

  it('counts a 3-day streak ending today', () => {
    const now = new Date('2026-07-21T12:00:00Z')
    const dates = [day(-2, now), day(-1, now), day(0, now)]
    const r = computeAdherence(dates, now)
    expect(r.currentStreakDays).toBe(3)
    expect(r.longestStreakDays).toBe(3)
  })

  it('breaks streak on gap', () => {
    const now = new Date('2026-07-21T12:00:00Z')
    const dates = [day(-5, now), day(-4, now), day(-1, now), day(0, now)]
    const r = computeAdherence(dates, now)
    expect(r.currentStreakDays).toBe(2)
    expect(r.longestStreakDays).toBe(2)
  })

  it('deduplicates multiple readings on the same day', () => {
    const now = new Date('2026-07-21T12:00:00Z')
    const today = new Date('2026-07-21T08:00:00Z')
    const today2 = new Date('2026-07-21T20:00:00Z')
    const r = computeAdherence([today, today2], now)
    expect(r.totalDaysLogged).toBe(1)
    expect(r.currentStreakDays).toBe(1)
  })

  it('recognises 7-day milestone', () => {
    const now = new Date('2026-07-21T12:00:00Z')
    const dates = Array.from({ length: 7 }, (_, i) => day(i - 6, now))
    const r = computeAdherence(dates, now)
    expect(r.reachedMilestones.some(m => m.days === 7)).toBe(true)
  })

  it('sets nextMilestone correctly', () => {
    const now = new Date('2026-07-21T12:00:00Z')
    const dates = Array.from({ length: 10 }, (_, i) => day(i - 9, now))
    const r = computeAdherence(dates, now)
    expect(r.nextMilestone?.days).toBe(30)
    expect(r.nextMilestone?.daysRemaining).toBe(20)
  })

  it('30-day adherence percent reflects recent activity', () => {
    const now = new Date('2026-07-21T12:00:00Z')
    // 15 readings in the past 30 days = 50%
    const dates = Array.from({ length: 15 }, (_, i) => day(-i, now))
    const r = computeAdherence(dates, now)
    expect(r.adherencePercent).toBe(50)
  })
})
