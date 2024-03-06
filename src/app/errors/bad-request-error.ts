import { HttpError } from './http-error'

type DetailedError = {
  path?: string
  message: string
}

export class BadRequestError extends HttpError {
  constructor(customMessage?: string, code?: string, errors?: DetailedError[]) {
    const message = customMessage ?? 'Bad Request'
    super(message, { statusCode: 400, body: { message, code, errors } })
    this.name = 'BadRequestError'
  }
}
