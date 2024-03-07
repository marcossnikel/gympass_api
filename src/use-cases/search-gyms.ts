import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

type SearchGymUseCaseRequest = {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCaseUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findByQuery(query, page)
    return { gyms }
  }
}
