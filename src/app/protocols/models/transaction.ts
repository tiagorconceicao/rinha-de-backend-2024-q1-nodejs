export type TransactionModelType = 'c' | 'd'

export interface TransactionModel {
  id: number
  client_id: number
  type: TransactionModelType
  amount: number
  description: string
  created_at: Date
}
