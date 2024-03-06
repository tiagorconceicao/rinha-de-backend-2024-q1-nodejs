import { type Express } from 'express'
import { bodyParser } from './body-parser'
import { cors } from './cors'
import { contentType } from './content-type'

export const setMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
