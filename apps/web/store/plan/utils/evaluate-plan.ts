import {
  PlanBlueprint,
  MonthlyPlan,
  parsePlanBlueprint,
  calculateMonthlyPlan,
} from '@dotbudget/plan'

interface EvaluatedPlan {
  blueprint: PlanBlueprint
  data: MonthlyPlan
  source: string
}

export function evaluatePlanSource(source: string): EvaluatedPlan {
  const blueprint = parsePlanBlueprint(source)
  const data = calculateMonthlyPlan(blueprint, 200000)

  return {blueprint, data, source}
}
