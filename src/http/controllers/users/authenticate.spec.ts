import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (E2E) Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'john@email.com',
      password: '123456',
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toBeDefined()
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
