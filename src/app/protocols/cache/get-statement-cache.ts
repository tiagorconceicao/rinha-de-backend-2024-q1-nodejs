export namespace GetStatementCache {
  export const name = 'GetStatementCache'
  export type Params = number

  export type Result =
    | {
        client_id: string
        balance: number
        limit: number
        transactions: Array<{
          type: string
          amount: number
          description: string
          created_at: Date | string
        }>
      }
    | undefined
}

export interface GetStatementCache {
  run: (params: GetStatementCache.Params) => Promise<GetStatementCache.Result>
}
