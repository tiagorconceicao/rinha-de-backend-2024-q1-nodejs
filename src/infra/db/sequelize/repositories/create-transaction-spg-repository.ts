import { type CreateTransactionRepository } from '@/app/protocols/repositories'

import { sequelizeHelper, type ModelStatic } from '../helper'
import clientModelInit, { type ClientSpgModel } from '../models/client-spg-model'
import transactionModelInit, { type TransactionSpgModel } from '../models/transaction-spg-model'
import { NotFoundError, UnprocessableEntityError } from '@/app/errors'
import { type Sequelize, type Transaction } from 'sequelize'

export class CreateTransactionSpgRepository implements CreateTransactionRepository {
  private readonly sequelize: Sequelize
  private readonly clientModel: ModelStatic<ClientSpgModel>
  private readonly transactionModel: ModelStatic<TransactionSpgModel>

  constructor() {
    const [sequelize, dataTypes] = sequelizeHelper.getClient()
    this.sequelize = sequelize

    this.clientModel = clientModelInit(sequelize, dataTypes)
    this.transactionModel = transactionModelInit(sequelize, dataTypes)
  }

  async execute(
    { client_id, type, amount, description }: CreateTransactionRepository.Params,
    transaction: Transaction,
  ): Promise<CreateTransactionRepository.Result> {
    const op = type === 'c' ? 1 : -1

    const client = await this.clientModel.findByPk(client_id, { transaction })
    if (!client) throw new NotFoundError('Client not found')

    const nextBalance = client.balance + op * amount
    if (nextBalance < client.limit * -1)
      throw new UnprocessableEntityError('Client does not have enough limit')

    await this.clientModel.update(
      {
        balance: nextBalance,
      },
      {
        transaction,
        where: { id: client_id },
      },
    )

    await this.transactionModel.create(
      {
        client_id,
        type,
        amount,
        description,
      },
      {
        transaction,
      },
    )

    await transaction.commit()
    return {
      limit: client.limit,
      balance: nextBalance,
    }
  }

  async run(
    params: CreateTransactionRepository.Params,
  ): Promise<CreateTransactionRepository.Result> {
    const transaction = await this.sequelize.transaction()

    try {
      const result = await this.execute(params, transaction)
      return result
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
