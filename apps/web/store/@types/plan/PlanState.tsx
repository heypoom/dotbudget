import {PlanBlueprint, MonthlyPlan} from '@dotbudget/plan'
import {BudgetSelection} from 'apps/web/@types/BudgetSelection'

export interface PlanState {
  plan: {
    source: string
    blueprint: PlanBlueprint
    data: MonthlyPlan

    budgetable: number
    selected: BudgetSelection | null
  }
}
