import { type HttpResponse } from '@/presentation/protocols'

interface ErrorHttpResponse extends HttpResponse {
  body: {
    code?: string
    message: string
    errors?: Array<{
      path?: string
      message: string
    }>
  }
}

export class HttpError extends Error {
  public httpResponse: ErrorHttpResponse
  public data?: any

  constructor(message: string, httpResponse: ErrorHttpResponse, data?: any) {
    super(message)
    this.httpResponse = httpResponse
    this.data = data
  }
}
