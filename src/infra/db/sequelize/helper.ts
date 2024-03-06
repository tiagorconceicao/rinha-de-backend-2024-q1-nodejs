import { Sequelize, type Options, DataTypes } from 'sequelize'
import { PG_DATABASE, PG_SCHEMA, PG_USERNAME, PG_PASSWORD, PG_HOST, PG_PORT } from '@/constants'

export type { ModelStatic } from 'sequelize'

export const options: Options = {
  dialect: 'postgres' as const,
  host: PG_HOST,
  port: PG_PORT,
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  schema: PG_SCHEMA,
  logging: false,
  dialectOptions: {
    ssl: false,
  },
}

class SequelizeHelper {
  public client: Sequelize

  constructor(config: Options) {
    this.client = new Sequelize(config)
  }

  public getClient(): [Sequelize, typeof DataTypes] {
    return [this.client, DataTypes]
  }

  public async auth(): Promise<void> {
    await this.client.authenticate()
  }
}

export const sequelizeHelper = new SequelizeHelper(options)
