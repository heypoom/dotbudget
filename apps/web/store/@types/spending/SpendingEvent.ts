import {BudgetSelection} from 'apps/web/@types/BudgetSelection'

export interface SpendingEvent {
  'spending/setSourceText': string

  'spending/log': BudgetSelection & {
    amount: number
  }
}
