/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { type CreateTransactionRepository } from '@/app/protocols/repositories'

type ValidHttpRequest = {
  params: {
    client_id: number
  }
  body: {
    valor: number
    tipo: 'c' | 'd'
    descricao: string
  }
}

export class CreateTransactionController implements Controller {
  constructor(private readonly createTransactionRepository: CreateTransactionRepository) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          client_id: yup.number().integer().positive().required(),
        }),
        body: yup.object({
          valor: yup.number().integer().positive().required(),
          tipo: yup
            .string()
            .oneOf(['c' as const, 'd' as const])
            .required(),
          descricao: yup.string().max(10).required(),
        }),
      })
      .validate(httpRequest)
  }

  async execute({ params, body }: ValidHttpRequest): Promise<HttpResponse> {
    const { limit, balance } = await this.createTransactionRepository.run({
      client_id: params.client_id,
      type: body.tipo,
      amount: body.valor,
      description: body.descricao,
    })

    return ok({ limite: limit, saldo: balance })
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
