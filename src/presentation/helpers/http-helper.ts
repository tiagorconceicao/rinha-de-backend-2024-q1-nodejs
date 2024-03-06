import { type HttpResponse } from '../protocols'

export const ok = (data?: any): HttpResponse => ({ statusCode: 200, body: data })

export const created = (data?: any): HttpResponse => ({ statusCode: 201, body: data })

export const noContent = (): HttpResponse => ({ statusCode: 204 })

export const serviceUnavailable = (): HttpResponse => ({ statusCode: 503 })
