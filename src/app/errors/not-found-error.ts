import { HttpError } from './http-error'

type DetailedError = {
  path?: string
  message: string
}

export class NotFoundError extends HttpError {
  constructor(customMessage?: string, code?: string, errors?: DetailedError[]) {
    const message = customMessage ?? 'Not found'
    super(message, { statusCode: 404, body: { message, code, errors } })
    this.name = 'NotFoundError'
  }
}
