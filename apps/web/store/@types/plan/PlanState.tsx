import {PlanBlueprint, MonthlyPlan} from '@dotbudget/plan'

export interface PlanState {
  plan: {
    source: string
    blueprint: PlanBlueprint
    data: MonthlyPlan
  }
}
