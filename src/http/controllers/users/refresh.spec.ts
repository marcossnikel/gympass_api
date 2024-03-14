import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { e } from 'vitest/dist/reporters-1evA5lom'

describe('Refresh Token (E2E) Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john@email.com',
      password: '123456',
    })

    const cookies = authResponse.headers['set-cookie']

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.token).toBeDefined()
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('set-cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
