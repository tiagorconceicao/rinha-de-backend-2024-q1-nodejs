import { type FastifyInstance, type FastifyRequest, type FastifyReply } from 'fastify'
import { HttpError } from '@/app/errors'

const errorHandler = async (
  error: Error,
  req: FastifyRequest,
  res: FastifyReply,
): Promise<void> => {
  console.log(error)
  if (error instanceof HttpError) {
    console.log(error.message)
    if (error.data) console.log(error.data)
    await res.status(error.httpResponse.statusCode).send(error.httpResponse.body)
  } else {
    console.log(error)
    await res.status(500).send({ message: 'Server error' })
  }
}

export const setErrorHandler = (app: FastifyInstance): void => {
  app.setErrorHandler(errorHandler)
}
