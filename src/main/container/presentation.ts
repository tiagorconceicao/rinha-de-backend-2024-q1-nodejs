import { CreateTransactionController, GetStatementController } from '@/presentation/controllers'
import { createTransactionRepository, getStatementRepository } from './infra'

export const createTransactionController: CreateTransactionController =
  new CreateTransactionController(createTransactionRepository)

export const getStatementController: GetStatementController = new GetStatementController(
  getStatementRepository,
)
