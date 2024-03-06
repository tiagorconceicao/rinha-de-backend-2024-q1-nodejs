import { HttpError } from './http-error'

type DetailedError = {
  path?: string
  message: string
}

export class UnprocessableEntityError extends HttpError {
  constructor(customMessage?: string, code?: string, errors?: DetailedError[]) {
    const message = customMessage ?? 'Unprocessable Entity'
    super(message, { statusCode: 422, body: { message, code, errors } })
    this.name = 'UnprocessableEntityError'
  }
}
