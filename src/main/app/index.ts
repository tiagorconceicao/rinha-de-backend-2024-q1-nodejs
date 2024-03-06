import express, { type Express } from 'express'
import { setMiddlewares } from './middlewares'
import { setRouter } from './router'
import { setErrorHandler } from './error-handler'

export const setApp = (): Express => {
  const app = express()
  setMiddlewares(app)
  setRouter(app)
  setErrorHandler(app)

  return app
}

export default setApp
