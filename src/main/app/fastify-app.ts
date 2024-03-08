import Fastify, { type FastifyInstance } from 'fastify'
import { setRouter } from './router/fastify-router'
import { setErrorHandler } from './error-handler/fastify-error-handler'

export const setApp = (): FastifyInstance => {
  const app = Fastify()
  setRouter(app)
  setErrorHandler(app)

  return app
}

export default setApp
