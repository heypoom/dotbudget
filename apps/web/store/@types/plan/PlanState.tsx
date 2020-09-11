import {PlanBlueprint, MonthlyPlan} from '@dotbudget/plan'

import {BudgetSelection} from '../../../@types/BudgetSelection'

export interface PlanState {
  plan: {
    source: string
    blueprint: PlanBlueprint
    data: MonthlyPlan

    budgetable: number
    selected: BudgetSelection | null
    iconMap: Record<string, string>

    moveTarget: BudgetSelection | null
  }
}
