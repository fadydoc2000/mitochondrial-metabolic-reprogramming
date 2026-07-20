// Milestones in days — tied to Seyfried GBM adherence research
const MILESTONES = [
  { days: 7,   label: 'First Week',    message: 'Your body is beginning to shift fuel sources. GKI readings this week establish your baseline.' },
  { days: 30,  label: 'One Month',     message: 'Significant metabolic adaptation occurs in the first 30 days. Your cells are learning to run on ketones.' },
  { days: 90,  label: 'Three Months',  message: '90 days — metabolic flexibility is established. Studies show measurable mitochondrial improvements at this stage.' },
  { days: 180, label: 'Six Months',    message: 'Critical milestone reached. Seyfried\'s 2024 GBM study found that only patients completing ≥6 months achieved the 66.7% 3-year survival benefit.' },
  { days: 365, label: 'One Year',      message: 'Exceptional commitment. Sustained metabolic reprogramming at this duration is associated with durable therapeutic outcomes in Seyfried\'s cohort.' },
]

export interface AdherenceStatus {
  currentStreakDays: number
  longestStreakDays: number
  totalDaysLogged: number
  lastLoggedAt: Date | null
  nextMilestone: { days: number; label: string; daysRemaining: number } | null
  reachedMilestones: { days: number; label: string; message: string }[]
  coachingMessage: string
  adherencePercent: number  // % of last 30 days that have a GKI reading
}

export function computeAdherence(
  readingDates: Date[],  // sorted ascending, one per unique day the user logged
  now = new Date()
): AdherenceStatus {
  if (readingDates.length === 0) {
    return {
      currentStreakDays: 0,
      longestStreakDays: 0,
      totalDaysLogged: 0,
      lastLoggedAt: null,
      nextMilestone: MILESTONES[0] ? { ...MILESTONES[0], daysRemaining: MILESTONES[0].days } : null,
      reachedMilestones: [],
      coachingMessage: 'Log your first glucose and ketone reading to begin tracking your metabolic journey.',
      adherencePercent: 0,
    }
  }

  // Deduplicate to one entry per calendar day (UTC)
  const daySet = new Set(readingDates.map(d => toDateKey(d)))
  const days = Array.from(daySet).sort()
  const totalDaysLogged = days.length
  const lastLoggedAt = readingDates[readingDates.length - 1]

  // Current streak: consecutive days ending at or before today
  const todayKey = toDateKey(now)
  let streak = 0
  let cursor = todayKey
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i] === cursor) {
      streak++
      cursor = prevDay(cursor)
    } else if (days[i] < cursor) {
      break
    }
  }

  // Longest streak ever
  let longest = 0, run = 1
  for (let i = 1; i < days.length; i++) {
    if (isConsecutive(days[i - 1], days[i])) {
      run++
      if (run > longest) longest = run
    } else {
      run = 1
    }
  }
  if (run > longest) longest = run

  // Milestones
  const reachedMilestones = MILESTONES.filter(m => totalDaysLogged >= m.days)
  const nextMilestone = MILESTONES.find(m => totalDaysLogged < m.days) ?? null

  // 30-day adherence percent
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86_400_000)
  const thirtyDayKey = toDateKey(thirtyDaysAgo)
  const recentDays = days.filter(d => d >= thirtyDayKey).length
  const adherencePercent = Math.round((recentDays / 30) * 100)

  return {
    currentStreakDays: streak,
    longestStreakDays: Math.max(longest, streak),
    totalDaysLogged,
    lastLoggedAt,
    nextMilestone: nextMilestone
      ? { days: nextMilestone.days, label: nextMilestone.label, daysRemaining: nextMilestone.days - totalDaysLogged }
      : null,
    reachedMilestones,
    coachingMessage: buildMessage(streak, totalDaysLogged, adherencePercent, reachedMilestones),
    adherencePercent,
  }
}

function buildMessage(streak: number, total: number, adherencePct: number, milestones: typeof MILESTONES): string {
  // Just-reached milestone takes priority
  const latestMilestone = milestones[milestones.length - 1]
  if (latestMilestone && total === latestMilestone.days) {
    return latestMilestone.message
  }
  if (adherencePct < 50 && total > 7) {
    return `Your 30-day adherence is ${adherencePct}%. Consistent daily logging is the strongest predictor of therapeutic success — even a brief reading each morning counts.`
  }
  if (streak === 0) {
    return `You haven't logged today. A single glucose + ketone reading takes 2 minutes and keeps your streak alive.`
  }
  if (streak >= 7) {
    return `${streak}-day streak. ${adherencePct}% adherence over the last 30 days. ${total < 180 ? `${180 - total} more days to the 6-month milestone that defines therapeutic benefit.` : 'You\'ve reached the critical 6-month threshold from Seyfried\'s research.'}`
  }
  return `${streak} day${streak !== 1 ? 's' : ''} logged in a row. Keep going — the 6-month milestone is ${180 - total > 0 ? `${180 - total} days away` : 'achieved'}.`
}

function toDateKey(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function prevDay(key: string): string {
  const d = new Date(key + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() - 1)
  return toDateKey(d)
}

function isConsecutive(a: string, b: string): boolean {
  const da = new Date(a + 'T00:00:00Z')
  const db = new Date(b + 'T00:00:00Z')
  return (db.getTime() - da.getTime()) === 86_400_000
}
