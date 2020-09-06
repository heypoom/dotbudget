import {PlanBlueprint, CalculatedPlan} from '@dotbudget/plan'

export interface PlanState {
  plan: {
    source: string
    blueprint: PlanBlueprint
    data: CalculatedPlan
  }
}
