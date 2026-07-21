import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from '../db'
import { signToken } from '../middleware/auth'

const router = Router()

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body
  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({ error: 'email, password, firstName, lastName required' })
    return
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) { res.status(409).json({ error: 'Email already registered' }); return }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, passwordHash, firstName, lastName },
    })
    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.status(201).json({ token, user: { id: user.id, email: user.email, firstName, lastName, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) { res.status(400).json({ error: 'email and password required' }); return }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) { res.status(401).json({ error: 'Invalid credentials' }); return }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) { res.status(401).json({ error: 'Invalid credentials' }); return }

    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.json({ token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } })
  } catch {
    res.status(500).json({ error: 'Login failed' })
  }
})

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body
  if (!email) { res.status(400).json({ error: 'email required' }); return }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    // Always return 200 to avoid email enumeration
    if (!user) { res.json({ message: 'If that email is registered, a reset link has been generated.' }); return }

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.user.update({
      where: { email },
      data: { passwordResetToken: token, passwordResetExpires: expires },
    })

    // No email service configured — return token directly so the UI can show the link
    res.json({ resetToken: token })
  } catch {
    res.status(500).json({ error: 'Request failed' })
  }
})

// POST /api/auth/reset-password
router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, password } = req.body
  if (!token || !password) { res.status(400).json({ error: 'token and password required' }); return }
  if (password.length < 8) { res.status(400).json({ error: 'Password must be at least 8 characters' }); return }

  try {
    const user = await prisma.user.findUnique({ where: { passwordResetToken: token } })
    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      res.status(400).json({ error: 'Reset link is invalid or has expired' }); return
    }

    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash, passwordResetToken: null, passwordResetExpires: null },
    })

    res.json({ message: 'Password updated. You can now sign in.' })
  } catch {
    res.status(500).json({ error: 'Reset failed' })
  }
})

export default router
