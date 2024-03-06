export namespace GetStatementRepository {
  export const name = 'GetStatementRepository'
  export type Params = number
  export type Result = {
    balance: number
    limit: number
    date: Date
    transactions: Array<{
      type: string
      amount: number
      description: string
      created_at: Date | string
    }>
  }
}

export interface GetStatementRepository {
  run: (client_id: GetStatementRepository.Params) => Promise<GetStatementRepository.Result>
}
