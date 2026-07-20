import React, { useEffect, useState } from 'react'
import { getDevices, connectDevice, syncDevices, disconnectDevice } from '../services/api'
import type { DeviceConnection } from '../types/biomarker'

const SUPPORTED = ['dexcom', 'freestyle_libre', 'keto_mojo', 'abbott_xtra', 'apple_watch', 'oura', 'fitbit']

export default function DeviceConnector() {
  const [devices, setDevices] = useState<DeviceConnection[]>([])
  const [type, setType] = useState(SUPPORTED[0])
  const [name, setName] = useState('')
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<string | null>(null)

  const load = () => getDevices().then(setDevices).catch(() => {})

  useEffect(() => { load() }, [])

  const connect = async (e: React.FormEvent) => {
    e.preventDefault()
    await connectDevice({ deviceType: type, deviceName: name || type })
    setName('')
    await load()
  }

  const sync = async () => {
    setSyncing(true)
    setSyncMsg(null)
    try {
      const r = await syncDevices()
      setSyncMsg(r.message)
    } finally {
      setSyncing(false)
      await load()
    }
  }

  const disconnect = async (id: number) => {
    await disconnectDevice(id)
    await load()
  }

  return (
    <div>
      <h2>Connected Devices</h2>

      {devices.length === 0 ? (
        <p style={{ color: '#888' }}>No devices connected. Connect one below to sync readings automatically.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>Device</th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>Last Sync</th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {devices.map(d => (
              <tr key={d.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px' }}>{d.deviceName} <span style={{ color: '#999', fontSize: 11 }}>({d.deviceType})</span></td>
                <td style={{ padding: '8px 12px', fontSize: 12 }}>{d.lastSyncAt ? new Date(d.lastSyncAt).toLocaleString() : 'Never'}</td>
                <td style={{ padding: '8px 12px' }}>
                  <span style={{ color: d.isActive ? '#2e7d32' : '#999' }}>{d.isActive ? 'Active' : 'Disconnected'}</span>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <button onClick={() => disconnect(d.id)} style={{ fontSize: 11, color: '#c62828', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Disconnect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={sync} disabled={syncing || devices.length === 0}
        style={{ marginBottom: 16, padding: '8px 16px', borderRadius: 6, background: '#1565c0', color: '#fff', border: 'none', cursor: 'pointer' }}>
        {syncing ? 'Syncing…' : 'Sync All Devices'}
      </button>
      {syncMsg && <p style={{ color: '#2e7d32', fontSize: 12 }}>{syncMsg}</p>}

      <h3>Connect a New Device</h3>
      <form onSubmit={connect} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, color: '#666' }}>Device Type</span>
          <select value={type} onChange={e => setType(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }}>
            {SUPPORTED.map(d => <option key={d} value={d}>{d.replace(/_/g, ' ')}</option>)}
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, color: '#666' }}>Display Name (optional)</span>
          <input value={name} onChange={e => setName(e.target.value)} placeholder={type}
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', width: 180 }} />
        </label>
        <button type="submit"
          style={{ padding: '8px 20px', borderRadius: 6, background: '#2e7d32', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Connect
        </button>
      </form>
      <p style={{ fontSize: 11, color: '#999', marginTop: 8 }}>
        Live device data sync requires API credentials from each device manufacturer.
        Manual logging is always available without a connected device.
      </p>
    </div>
  )
}
