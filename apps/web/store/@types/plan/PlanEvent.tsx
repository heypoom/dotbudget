import {BudgetSelection} from '../../../@types/BudgetSelection'

export interface PlanEvent {
  'plan/setPlanSource': string

  'plan/reallocate': {
    amount: number
  } & BudgetSelection

  'plan/select': BudgetSelection
  'plan/toggle': BudgetSelection
  'plan/deselect': undefined

  'plan/setIcon': {
    key: string
    icon: string
  }
}
