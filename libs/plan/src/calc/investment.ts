import {Investment} from '@dotbudget/plan'

export function calculateInvestmentPlan(
  investmentBudget: number,
  strategies: Investment[]
) {
  const investmentPlan = {}

  for (const strategy of strategies) {
    investmentPlan[strategy.category] =
      investmentBudget * (strategy.percent / 100)
  }

  return investmentPlan
}
