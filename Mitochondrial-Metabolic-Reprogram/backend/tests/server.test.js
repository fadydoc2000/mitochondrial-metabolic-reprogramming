const request = require('supertest')
const app = require('../server')

describe('GET /', () => {
  it('returns API message', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Mitochondrial Metabolic Reprogramming API')
  })
})

describe('GET /health', () => {
  it('returns OK', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('OK')
  })
})
