import { PORT } from '@/constants'
import { sequelizeHelper } from './infra/db/sequelize/helper'
import { redisHelper } from './infra/cache/redis/helper'

const main = async (): Promise<void> => {
  await sequelizeHelper.auth()
  await redisHelper.auth()

  const { setApp } = await import('@/main/app')
  const app = setApp()

  app.listen(PORT, function () {
    console.log(`✅️ Server ready! Listening at http://[::]:${PORT} | ${new Date().toISOString()}`)
  })
}

main().catch((e) => console.error)
