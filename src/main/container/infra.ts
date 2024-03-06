import {
  type CreateTransactionRepository,
  type GetStatementRepository,
} from '@/app/protocols/repositories'
import {
  CreateTransactionSpgRepository,
  GetStatementSpgRepository,
} from '@/infra/db/sequelize/repositories'

export const createTransactionRepository: CreateTransactionRepository =
  new CreateTransactionSpgRepository()

export const getStatementRepository: GetStatementRepository = new GetStatementSpgRepository()
