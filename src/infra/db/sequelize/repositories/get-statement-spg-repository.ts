import { type GetStatementRepository } from '@/app/protocols/repositories'

import { sequelizeHelper, type ModelStatic } from '../helper'
import clientModelInit, { type ClientSpgModel } from '../models/client-spg-model'
import transactionModelInit, { type TransactionSpgModel } from '../models/transaction-spg-model'
import { NotFoundError } from '@/app/errors'
import { type Transaction, type Sequelize } from 'sequelize'

export class GetStatementSpgRepository implements GetStatementRepository {
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
    client_id: GetStatementRepository.Params,
    transaction: Transaction,
  ): Promise<GetStatementRepository.Result> {
    const date = new Date()

    const client = await this.clientModel.findByPk(client_id, { transaction })
    if (!client) throw new NotFoundError('Client not found')

    const transactions = await this.transactionModel.findAll({
      where: { client_id },
      order: [['created_at', 'DESC']],
      limit: 10,
      transaction,
    })

    await transaction.commit()
    return {
      limit: client.limit,
      balance: client.balance,
      date,
      transactions,
    }
  }

  async run(params: GetStatementRepository.Params): Promise<GetStatementRepository.Result> {
    const date = new Date()
    const transaction = await this.sequelize.transaction()

    try {
      const { limit, balance, transactions } = await this.execute(params, transaction)
      return { limit, balance, date, transactions }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
