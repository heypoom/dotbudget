import {
  PlanBlueprint,
  MonthlyPlan,
  parsePlanBlueprint,
  calculateFinancialPlan,
} from '@dotbudget/plan'

interface EvaluatedPlan {
  blueprint: PlanBlueprint
  data: MonthlyPlan
  source: string
}

export function evaluatePlanSource(source: string): EvaluatedPlan {
  const blueprint = parsePlanBlueprint(source)
  const data = calculateFinancialPlan(blueprint, 130000)

  return {blueprint, data, source}
}
