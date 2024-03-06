import { PORT } from '@/constants'
import { sequelizeHelper } from './infra/db/sequelize/helper'

const main = async (): Promise<void> => {
  await sequelizeHelper.auth()

  const { setApp } = await import('@/main/app')
  const app = setApp()

  app.listen(PORT, function () {
    console.log(`✅️ Server ready! Listening at http://[::]:${PORT}`)
  })
}

main().catch((e) => console.error)
