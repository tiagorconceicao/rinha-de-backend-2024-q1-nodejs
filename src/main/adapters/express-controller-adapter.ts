/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type Request, type Response } from 'express'
import * as yup from 'yup'
import { type Controller } from '@/presentation/protocols'
import { HttpError } from '@/app/errors'

export const adaptController = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const httpResponse = await controller.handle({
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body,
        locals: res.locals,
      })
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        return res.status(422).json({
          message: 'Validation error',
          errors: error.inner.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        })
      } else if (error instanceof HttpError) {
        return res.status(error.httpResponse.statusCode).json(error.httpResponse.body)
      } else {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
      }
    }
  }
}
