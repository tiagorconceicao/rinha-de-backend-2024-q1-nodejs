import { type FastifyInstance } from 'fastify'
import { createTransactionController, getStatementController } from '@/main/container/presentation'
import { fastifyControllerAdapter } from '@/main/adapters/fastify-controller-adapter'
import { SERVER_NAME } from '@/constants'

export const setRouter = (app: FastifyInstance): void => {
  app.get('/', async (req, res) => {
    return res.send(`${SERVER_NAME} UP!`)
  })

  app.get('/clientes/:client_id/extrato', fastifyControllerAdapter(getStatementController))

  app.post('/clientes/:client_id/transacoes', fastifyControllerAdapter(createTransactionController))
}
