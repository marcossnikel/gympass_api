import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCaseUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCaseUseCase

describe('Fetch nearby gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCaseUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -23.1638403,
      longitude: -46.9002343,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -32.1638403,
      longitude: -12.9002343,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.1638403,
      userLongitude: -46.9002343,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
