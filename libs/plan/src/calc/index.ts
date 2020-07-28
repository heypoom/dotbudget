import {getPlanAllocations} from './plans'
import {getAllocations} from './allocations'
import {calculateUnallocated} from './unallocated'
import {calculateInvestmentPlan} from './investment'

import {FinancialPlan} from '../@types'

export function calculateFinancialPlan(p: FinancialPlan, totalBudget: number) {
  const plans = getPlanAllocations(p.plan, totalBudget)

  const {
    allocations,
    planAllocations,
    breakdown,
    monthlyBudgets,
  } = getAllocations(p.budget, p.budgetCategory)

  const unallocated = calculateUnallocated(plans, planAllocations)

  const investmentPlan = calculateInvestmentPlan(plans.investment, p.investment)

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
