import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'TS Gym',
      description: '',
      phone: '',
      latitude: -23.1638403,
      longitude: -46.9002343,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.1638403,
      userLongitude: -46.9002343,
    })
    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distance gym', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'TS Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.1802194),
      longitude: new Decimal(-46.8789429),
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -24.1638403,
        userLongitude: -46.9002343,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.1638403,
      userLongitude: -46.9002343,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.1638403,
        userLongitude: -46.9002343,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
  })
  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.1638403,
      userLongitude: -46.9002343,
    })

    vi.setSystemTime(new Date('2024-01-02 10:00:00'))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.1638403,
      userLongitude: -46.9002343,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
