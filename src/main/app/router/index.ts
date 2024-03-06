import { type Express, Router } from 'express'
import { createTransactionController, getStatementController } from '@/main/container/presentation'
import { adaptController } from '@/main/adapters/express-controller-adapter'
import { SERVER_NAME } from '@/constants'

export const setRouter = (app: Express): void => {
  const router = Router()

  router.get('/', (req, res) => {
    res.send(`${SERVER_NAME} UP!`)
  })

  router.get('/clientes/:client_id/extrato', adaptController(getStatementController))
  router.post('/clientes/:client_id/transacoes', adaptController(createTransactionController))

  app.use(router)
}
