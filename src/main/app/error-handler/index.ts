import { type Express, type Request, type Response, type NextFunction } from 'express'
import { HttpError } from '@/app/errors'

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): Response => {
  console.log(error)
  if (error instanceof HttpError) {
    console.log(error.message)
    if (error.data) console.log(error.data)
    return res.status(error.httpResponse.statusCode).json(error.httpResponse.body)
  } else {
    console.log(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const setErrorHandler = (app: Express): void => {
  app.use(errorHandler)
}
