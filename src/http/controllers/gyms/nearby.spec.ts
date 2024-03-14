import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Nearby Gyms (E2E) Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
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
    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Panobianco Gym',
        description: 'The best Jundiaicity gym',
        latitude: -32.1638403,
        longitude: -12.9002343,
        phone: '+55 11 944712081',
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.1638403,
        longitude: -46.9002343,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'XPrime Gym',
      }),
    ])
  })
})
