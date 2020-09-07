import {getJarAllocations} from './plans'
import {getAllocations} from './allocations'
import {calculateUnallocated} from './unallocated'
import {calculateInvestmentPlan} from './investment'

import {PlanBlueprint, Jars, Budget} from '../@types'

export function calculateFinancialPlan(
  blueprint: PlanBlueprint,
  totalBudget: number
): CalculatedPlan {
  const plans = getJarAllocations(blueprint.plan, totalBudget)

  const {
    allocations,
    planAllocations,
    breakdown,
    monthlyBudgets,
  } = getAllocations(blueprint.budget, blueprint.budgetCategory)

  const unallocated = calculateUnallocated(plans, planAllocations)

  const investmentPlan = calculateInvestmentPlan(
    plans.investment ?? 0,
    blueprint.investment
  )

  return {
    plans,
    allocations,
    unallocated,
    breakdown,
    investmentPlan,
    monthlyBudgets,
  }
}

export * from './plans'
export * from './investment'
export * from './allocations'
export * from './unallocated'
