import { Router, Request, Response } from 'express'
import { prisma } from '../db'
import { authenticate } from '../middleware/auth'
import { syncUserDevices } from '../services/deviceIntegration'

const router = Router()
router.use(authenticate)

const SUPPORTED_DEVICES = ['dexcom', 'freestyle_libre', 'keto_mojo', 'abbott_xtra', 'apple_watch', 'oura', 'fitbit']

// GET /api/devices — list connected devices
router.get('/', async (req: Request, res: Response) => {
  const devices = await prisma.deviceConnection.findMany({
    where: { userId: req.user!.id },
    select: { id: true, deviceType: true, deviceName: true, isActive: true, lastSyncAt: true, createdAt: true },
  })
  res.json(devices)
})

// POST /api/devices — connect a device
router.post('/', async (req: Request, res: Response) => {
  const { deviceType, deviceName, accessToken, refreshToken, externalId } = req.body

  if (!SUPPORTED_DEVICES.includes(deviceType)) {
    res.status(400).json({ error: `Unsupported device. Supported: ${SUPPORTED_DEVICES.join(', ')}` })
    return
  }

  const device = await prisma.deviceConnection.upsert({
    where: { userId_deviceType: { userId: req.user!.id, deviceType } },
    create: { userId: req.user!.id, deviceType, deviceName, accessToken, refreshToken, externalId },
    update: { deviceName, accessToken, refreshToken, externalId, isActive: true },
  })

  res.status(201).json({ id: device.id, deviceType: device.deviceType, deviceName: device.deviceName })
})

// POST /api/devices/sync — trigger manual sync
router.post('/sync', async (req: Request, res: Response) => {
  const synced = await syncUserDevices(req.user!.id)
  res.json({ synced, message: `${synced} readings imported` })
})

// DELETE /api/devices/:id — disconnect a device
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const device = await prisma.deviceConnection.findFirst({ where: { id, userId: req.user!.id } })
  if (!device) { res.status(404).json({ error: 'Device not found' }); return }

  await prisma.deviceConnection.update({ where: { id }, data: { isActive: false } })
  res.json({ message: 'Device disconnected' })
})

export default router
