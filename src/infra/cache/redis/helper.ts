import { createClient, type RedisClientType } from 'redis'
import { REDIS_HOST, REDIS_PASSWORD } from '@/constants'

class RedisHelper {
  public client: RedisClientType

  constructor() {
    this.client = createClient({
      socket: {
        host: REDIS_HOST,
      },
      password: REDIS_PASSWORD,
    })
  }

  public getClient(): RedisClientType {
    return this.client
  }

  public async auth(): Promise<RedisClientType> {
    return this.client.connect()
  }
}

export const redisHelper = new RedisHelper()
