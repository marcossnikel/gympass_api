import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Gym (E2E) Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const response = await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'XPrime Gym',
        description: 'The best Jundiaicity gym',
        latitude: -23.1638403,
        longitude: -46.9002343,
        phone: '+55 11 944712081',
      })

    expect(response.statusCode).toBe(201)
  })
})
