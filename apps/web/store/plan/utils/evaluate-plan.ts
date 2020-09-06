import {
  PlanBlueprint,
  CalculatedPlan,
  parseFinancialPlan,
  calculateFinancialPlan,
} from '@dotbudget/plan'

interface EvaluatedPlan {
  blueprint: PlanBlueprint
  data: CalculatedPlan
  source: string
}

export function evaluatePlanSource(source: string): EvaluatedPlan {
  const blueprint = parseFinancialPlan(source)
  const data = calculateFinancialPlan(blueprint, 130000)

  return {blueprint, data, source}
}
