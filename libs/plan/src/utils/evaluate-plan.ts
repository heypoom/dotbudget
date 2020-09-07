import {
  serializePlan,
  MonthlyPlan,
  PlanBlueprint,
  parsePlanBlueprint,
  calculateMonthlyPlan,
} from '@dotbudget/plan'

interface EvaluatedPlan {
  blueprint: PlanBlueprint
  data: MonthlyPlan
  source: string
}

export function evaluatePlanSource(
  source: string,
  total: number
): EvaluatedPlan {
  const blueprint = parsePlanBlueprint(source)
  const data = calculateMonthlyPlan(blueprint, total)

  return {blueprint, data, source}
}

export function rebuildPlan(
  blueprint: PlanBlueprint,
  total: number
): EvaluatedPlan {
  const source = serializePlan(blueprint)
  const data = calculateMonthlyPlan(blueprint, total)

  return {blueprint, data, source}
}
