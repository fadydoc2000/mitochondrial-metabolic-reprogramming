require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

// Routes — TypeScript files transpiled at runtime via ts-node/register in dev,
// or compiled to dist/ in production. For now load via require with ts-node.
if (process.env.NODE_ENV !== 'test') {
  require('ts-node').register({ transpileOnly: true })
}

const authRouter = require('./src/routes/auth').default
const biomarkersRouter = require('./src/routes/biomarkers').default
const devicesRouter = require('./src/routes/devices').default
const protocolRouter = require('./src/routes/protocol').default
const profileRouter = require('./src/routes/profile').default
const adherenceRouter = require('./src/routes/adherence').default
const providersRouter = require('./src/routes/providers').default
const researchRouter = require('./src/routes/research').default

app.get('/', (_req, res) => res.json({ message: 'Mitochondrial Metabolic Reprogramming API' }))
app.get('/health', (_req, res) => res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() }))

app.use('/api/auth', authRouter)
app.use('/api/biomarkers', biomarkersRouter)
app.use('/api/devices', devicesRouter)
app.use('/api/protocol', protocolRouter)
app.use('/api/profile', profileRouter)
app.use('/api/adherence', adherenceRouter)
app.use('/api/providers', providersRouter)
app.use('/api/research', researchRouter)

app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.use('*', (_req, res) => res.status(404).json({ message: 'Route not found' }))

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

module.exports = app
