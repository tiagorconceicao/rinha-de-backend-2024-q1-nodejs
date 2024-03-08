import { type SetStatementCache } from '@/app/protocols'
import { redisHelper } from './helper'

export class SetStatementRedisCache implements SetStatementCache {
  async run({
    client_id,
    balance,
    limit,
    transaction,
    transactions,
    options,
  }: SetStatementCache.Params): Promise<SetStatementCache.Result> {
    if (options?.force_write) {
      await redisHelper.client.set(
        `client-${client_id}`,
        JSON.stringify({
          balance,
          limit,
          transactions: transactions ?? [transaction],
        }),
      )
      return
    }

    const found = await redisHelper.client.get(`client-${client_id}`)

    if (found) {
      const cachedClient = JSON.parse(found)
      cachedClient.transactions.unshift(transaction)
      cachedClient.transactions = cachedClient.transactions.slice(0, 9)

      await redisHelper.client.set(
        `client-${client_id}`,
        JSON.stringify({
          balance,
          limit,
          transactions: cachedClient.transactions,
        }),
      )
    } else {
      await redisHelper.client.set(
        `client-${client_id}`,
        JSON.stringify({
          balance,
          limit,
          transactions: transactions ?? [transaction],
        }),
      )
    }
  }
}
