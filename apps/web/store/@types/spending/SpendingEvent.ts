import {BudgetWithAmount} from '../../../@types/BudgetSelection'

export interface SpendingEvent {
  'spending/setSourceText': string
  'spending/log': BudgetWithAmount
}
