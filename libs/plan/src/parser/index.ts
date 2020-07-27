import {parsePlans} from './plan'
import {parseBudgets} from './budget'
import {parseInvestments} from './investment'
import {parseBudgetCategory} from './budget-plan-category'

import {FinancialPlan} from '@dotbudget/plan'

export function parseFinancialPlan(text: string): FinancialPlan {
  const plan = parsePlans(text) //?
  const budget = parseBudgets(text) //?
  const investment = parseInvestments(text) //?
  const budgetCategory = parseBudgetCategory(text) //?

  return {plan, budget, investment, budgetCategory}
}

export * from './budget'
export * from './plan'
export * from './investment'
