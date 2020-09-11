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

  'plan/selectMoveTarget': BudgetSelection

  'plan/setIcon': {
    key: string
    icon: string
  }

  'plan/moveBudget': {
    from: BudgetSelection
    to: BudgetSelection
    amount: number
  }
}
