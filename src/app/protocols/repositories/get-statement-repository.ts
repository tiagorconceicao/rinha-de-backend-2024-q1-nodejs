import { type TransactionModel } from '@/app/protocols/models'

export namespace GetStatementRepository {
  export const name = 'GetStatementRepository'
  export type Params = number
  export type Result = {
    balance: number
    limit: number
    date: Date
    transactions: TransactionModel[]
  }
}

export interface GetStatementRepository {
  run: (client_id: GetStatementRepository.Params) => Promise<GetStatementRepository.Result>
}
