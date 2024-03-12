import { Gym, Prisma } from '@prisma/client'

export type FindManyNearbyParams = {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  findById: (id: string) => Promise<Gym | null>
  findByQuery: (query: string, page: number) => Promise<Gym[]>
}
