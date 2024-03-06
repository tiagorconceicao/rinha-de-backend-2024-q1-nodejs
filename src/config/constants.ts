import * as dotenv from 'dotenv'
dotenv.config()

const numericHandler = (defaultNumber: number, value?: any): number => {
  const parsed = Number(value)
  if (Number.isNaN(parsed)) return defaultNumber
  return parsed
}

export const PORT = numericHandler(3000, process.env.PORT)

export const SERVER_NAME = process.env.SERVER_NAME ?? 'SERVER'

export const PG_HOST = process.env.PG_HOST
export const PG_PORT = numericHandler(5432, process.env.PG_PORT)
export const PG_USERNAME = process.env.PG_USERNAME
export const PG_PASSWORD = process.env.PG_PASSWORD
export const PG_DATABASE = process.env.PG_DATABASE
export const PG_SCHEMA = process.env.PG_SCHEMA ?? undefined
