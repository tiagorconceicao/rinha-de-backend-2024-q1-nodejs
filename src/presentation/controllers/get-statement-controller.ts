/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { type GetStatementRepository } from '@/app/protocols/repositories'

type ValidHttpRequest = {
  params: {
    client_id: number
  }
}

export class GetStatementController implements Controller {
  constructor(private readonly GetStatementRepository: GetStatementRepository) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          client_id: yup.number().integer().positive().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ params }: ValidHttpRequest): Promise<HttpResponse> {
    const { limit, balance, date, transactions } = await this.GetStatementRepository.run(
      params.client_id,
    )

    return ok({
      saldo: { total: balance, data_extrato: date, limite: limit },
      ultimas_transacoes: transactions.map((transaction) => ({
        valor: transaction.amount,
        tipo: transaction.type,
        descricao: transaction.description,
        realizada_em: transaction.created_at,
      })),
    })
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
