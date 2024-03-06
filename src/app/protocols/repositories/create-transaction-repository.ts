import { type TransactionModelType } from '@/app/protocols/models'

export namespace CreateTransactionRepository {
  export const name = 'CreateTransactionRepository'
  export type Params = {
    client_id: number
    type: TransactionModelType
    amount: number
    description: string
  }
  export type Result = {
    balance: number
    limit: number
  }
}

export interface CreateTransactionRepository {
  run: (params: CreateTransactionRepository.Params) => Promise<CreateTransactionRepository.Result>
}
