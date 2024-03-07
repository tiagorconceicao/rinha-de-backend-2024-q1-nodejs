export namespace SetStatementCache {
  export const name = 'SetStatementCache'
  export type Params = {
    client_id: number
    balance: number
    limit: number
    transaction?: {
      type: string
      amount: number
      description: string
      created_at: Date | string
    }
    transactions?: Array<{
      type: string
      amount: number
      description: string
      created_at: Date | string
    }>
    options?: {
      force_write?: boolean
    }
  }

  export type Result = undefined
}

export interface SetStatementCache {
  run: (params: SetStatementCache.Params) => Promise<SetStatementCache.Result>
}
