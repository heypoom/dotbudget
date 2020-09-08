import {
  BudgetSelection,
  BudgetWithAmount,
} from '../../../@types/BudgetSelection'

export interface PlanEvent {
  'plan/setPlanSource': string

  'plan/reallocate': BudgetWithAmount

  'plan/select': BudgetSelection
  'plan/toggle': BudgetSelection
  'plan/deselect': undefined

  'plan/setIcon': {
    key: string
    icon: string
  }
}
