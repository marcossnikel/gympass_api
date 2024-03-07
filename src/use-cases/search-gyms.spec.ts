import { describe, expect, it, beforeEach } from 'vitest'
import { SearchGymUseCaseUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCaseUseCase

describe('Search gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCaseUseCase(gymsRepository)
  })

  it('should be able to search gyms based on query', async () => {
    await gymsRepository.create({
      title: 'Academia BetaFit',
      latitude: -321312312,
      longitude: -321312312,
    })
    await gymsRepository.create({
      title: 'Academia XPrime',
      latitude: -321312312,
      longitude: -321312312,
    })

    const { gyms } = await sut.execute({
      query: 'BetaFit',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia BetaFit' }),
    ])
  })

  it('should be able to fetch paginated gym query search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Smartfit de número ${i}`,
        latitude: -321312312,
        longitude: -321312312,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Smartfit',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Smartfit de número 21' }),
      expect.objectContaining({ title: 'Smartfit de número 22' }),
    ])
  })
})
