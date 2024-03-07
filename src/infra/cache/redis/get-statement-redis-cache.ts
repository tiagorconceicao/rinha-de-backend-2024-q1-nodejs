import { type GetStatementCache } from '@/app/protocols'
import { redisHelper } from './helper'

export class GetStatementRedisCache implements GetStatementCache {
  async run(client_id: GetStatementCache.Params): Promise<GetStatementCache.Result> {
    const found = await redisHelper.client.get(`client-${client_id}`)
    if (!found) return

    const cachedClient = JSON.parse(found)
    return cachedClient
  }
}
