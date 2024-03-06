import {
  type Sequelize,
  type Model,
  type DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type ModelStatic,
} from 'sequelize'
import { type ClientModel } from '@/app/protocols/models/client'

export interface ClientSpgModel
  extends ClientModel,
    Model<InferAttributes<ClientSpgModel>, InferCreationAttributes<ClientSpgModel>> {
  id: CreationOptional<number>
  balance: CreationOptional<number>
  created_at: CreationOptional<Date>
}

export default (sequelize: Sequelize, types: typeof DataTypes): ModelStatic<ClientSpgModel> => {
  return sequelize.define<ClientSpgModel>(
    'clients',
    {
      id: {
        type: types.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: types.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      limit: {
        type: types.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: types.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'clients',
      createdAt: 'created_at',
      updatedAt: false,
    },
  )
}
