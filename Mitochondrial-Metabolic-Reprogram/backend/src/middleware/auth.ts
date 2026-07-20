import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-prod'
if (process.env.NODE_ENV === 'production' && JWT_SECRET === 'dev-secret-change-in-prod') {
  throw new Error('JWT_SECRET must be set in production')
}

interface JwtPayload {
  id: number
  email: string
  role: Role
}

function isJwtPayload(v: unknown): v is JwtPayload {
  return (
    typeof v === 'object' && v !== null &&
    typeof (v as JwtPayload).id === 'number' &&
    typeof (v as JwtPayload).email === 'string' &&
    typeof (v as JwtPayload).role === 'string'
  )
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing token' })
    return
  }
  try {
    const token = header.slice(7)
    const decoded = jwt.verify(token, JWT_SECRET)
    if (!isJwtPayload(decoded)) {
      res.status(401).json({ error: 'Invalid token' })
      return
    }
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden' })
      return
    }
    next()
  }
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}
