import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return value >= -90 && value <= 90
    }),
    longitude: z.number().refine((value) => {
      return value >= -180 && value <= 180
    }),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const createCheckInUseCase = makeCheckInUseCase()
  await createCheckInUseCase.execute({
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
  })

  return reply.status(201).send()
}
