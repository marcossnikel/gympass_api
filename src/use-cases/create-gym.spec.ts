import { describe, expect, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase
describe('Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      title: 'XPrime Gym',
      description: 'The best Jundiaicity gym',
      latitude: -23.1638403,
      longitude: -46.9002343,
      phone: '+55 11 944712081',
    })

    expect(gym).toHaveProperty('title')
    expect(gym.id).toEqual(expect.any(String))
  })
})
