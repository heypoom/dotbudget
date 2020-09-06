import {getPlanAllocations} from './plans'
import {getAllocations} from './allocations'
import {calculateUnallocated} from './unallocated'
import {calculateInvestmentPlan} from './investment'

import {PlanBlueprint, Jars, Budget} from '../@types'

export interface CalculatedPlan {
  plans: Jars
  allocations: Record<string, number>
  unallocated: Jars
  breakdown: Record<string, number>
  investmentPlan: Record<string, number>
  monthlyBudgets: Budget[]
}

export function calculateFinancialPlan(
  p: PlanBlueprint,
  totalBudget: number
): CalculatedPlan {
  const plans = getPlanAllocations(p.plan, totalBudget)

  const {
    allocations,
    planAllocations,
    breakdown,
    monthlyBudgets,
  } = getAllocations(p.budget, p.budgetCategory)

  const unallocated = calculateUnallocated(plans, planAllocations)

  const investmentPlan = calculateInvestmentPlan(
    plans.investment ?? 0,
    p.investment
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
