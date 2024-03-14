import { app } from '@/app'
import { prisma } from '@/lib/prisma'
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

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const gym = await prisma.gym.create({
      data: {
        title: 'XPrime Gym',
        description: 'The best Jundiaicity gym',
        latitude: -23.1638403,
        longitude: -46.9002343,
        phone: '+55 11 944712081',
      },
    })
    const response = await request(app.server)
      .post(`/gyms${gym.id}/check-ins`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        latitude: -23.1638403,
        longitude: -46.9002343,
      })

    expect(response.statusCode).toBe(201)
  })
})
