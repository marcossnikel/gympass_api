import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

type CreateGymParams = {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymParams): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
      phone,
    })
    return { gym }
  }
}
