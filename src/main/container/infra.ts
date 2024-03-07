import {
  type CreateTransactionRepository,
  type GetStatementRepository,
  type GetStatementCache,
  type SetStatementCache,
} from '@/app/protocols'
import { GetStatementRedisCache, SetStatementRedisCache } from '@/infra/cache/redis'
import {
  CreateTransactionSpgRepository,
  GetStatementSpgRepository,
} from '@/infra/db/sequelize/repositories'

const getStatementCache: GetStatementCache = new GetStatementRedisCache()

const setStatementCache: SetStatementCache = new SetStatementRedisCache()

export const createTransactionRepository: CreateTransactionRepository =
  new CreateTransactionSpgRepository(setStatementCache)

export const getStatementRepository: GetStatementRepository = new GetStatementSpgRepository(
  getStatementCache,
  setStatementCache,
)
