import { PORT } from '@/constants'
import { sequelizeHelper } from './infra/db/sequelize/helper'

const main = async (): Promise<void> => {
  await sequelizeHelper.auth()

  const { setApp } = await import('@/main/app/fastify-app')
  const app = setApp()

  app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err
    console.log(`✅️ Server ready! Listening at http://[::]:${PORT}`)
  })
}

main().catch((e) => console.error)
