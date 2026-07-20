import { prisma } from '../db'
import { calculateGKI } from './gkiCalculator'

export interface DeviceReading {
  glucoseMgdl?: number
  ketoneMmol?: number
  recordedAt: Date
  source: string
}

// Adapter interface — each device implements this
export interface DeviceAdapter {
  fetchLatestReadings(accessToken: string, since: Date): Promise<DeviceReading[]>
}

// Dexcom stub — real impl needs OAuth + Dexcom API v3
export const dexcomAdapter: DeviceAdapter = {
  async fetchLatestReadings(_token, _since) {
    // ponytail: stub — wire up https://api.dexcom.com/v3/users/self/egvs when credentials available
    return []
  },
}

// Freestyle Libre stub — uses LibreView API
export const freestyleAdapter: DeviceAdapter = {
  async fetchLatestReadings(_token, _since) {
    // ponytail: stub — wire up LibreView API when credentials available
    return []
  },
}

// Keto-Mojo stub — uses Keto-Mojo cloud API
export const ketoMojoAdapter: DeviceAdapter = {
  async fetchLatestReadings(_token, _since) {
    // ponytail: stub — wire up Keto-Mojo API when credentials available
    return []
  },
}

const ADAPTERS: Record<string, DeviceAdapter> = {
  dexcom: dexcomAdapter,
  freestyle_libre: freestyleAdapter,
  keto_mojo: ketoMojoAdapter,
}

// Sync all active devices for a user and persist readings
export async function syncUserDevices(userId: number): Promise<number> {
  const connections = await prisma.deviceConnection.findMany({
    where: { userId, isActive: true },
  })

  let synced = 0

  for (const conn of connections) {
    const adapter = ADAPTERS[conn.deviceType]
    if (!adapter || !conn.accessToken) continue

    const since = conn.lastSyncAt ?? new Date(Date.now() - 7 * 86_400_000)
    const readings = await adapter.fetchLatestReadings(conn.accessToken, since)

    for (const r of readings) {
      let gkiData = {}
      if (r.glucoseMgdl != null && r.ketoneMmol != null) {
        try {
          const result = calculateGKI(r.glucoseMgdl, r.ketoneMmol)
          gkiData = { gkiScore: result.gki, metabolicState: result.state, metabolicZone: result.zone }
        } catch { /* skip invalid reading */ }
      }

      await prisma.biomarkerReading.upsert({
        where: {
          // unique on userId + readingAt + source to avoid dupes
          userId_readingAt_source: { userId, readingAt: r.recordedAt, source: r.source },
        },
        create: {
          userId,
          bloodGlucoseMgdl: r.glucoseMgdl,
          betaHydroxybutyrateMmol: r.ketoneMmol,
          readingAt: r.recordedAt,
          source: r.source,
          ...gkiData,
        },
        update: {},
      })
      synced++
    }

    await prisma.deviceConnection.update({
      where: { id: conn.id },
      data: { lastSyncAt: new Date() },
    })
  }

  return synced
}
