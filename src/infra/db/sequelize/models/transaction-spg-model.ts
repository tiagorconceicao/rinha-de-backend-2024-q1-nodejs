import {
  type Sequelize,
  type Model,
  type DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type ModelStatic,
} from 'sequelize'
import {
  type TransactionModel,
  type TransactionModelType,
} from '@/app/protocols/models/transaction'

export interface TransactionSpgModel
  extends TransactionModel,
    Model<InferAttributes<TransactionSpgModel>, InferCreationAttributes<TransactionSpgModel>> {
  id: CreationOptional<number>
  created_at: CreationOptional<Date>
}

export default (
  sequelize: Sequelize,
  types: typeof DataTypes,
): ModelStatic<TransactionSpgModel> => {
  return sequelize.define<TransactionSpgModel>(
    'transactions',
    {
      id: {
        type: types.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      client_id: {
        type: types.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'clients',
          },
          key: 'id',
        },
      },
      type: {
        type: types.ENUM<TransactionModelType>('c', 'd'),
        defaultValue: 0,
        allowNull: false,
      },
      amount: {
        type: types.INTEGER,
        allowNull: false,
      },
      description: {
        type: types.STRING(10),
        allowNull: false,
      },
      created_at: {
        type: types.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'transactions',
      createdAt: 'created_at',
      updatedAt: false,
    },
  )
}
