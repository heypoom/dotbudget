import {Budget} from '../@types'

export function calculateMonthlyBudget(budget: Budget): number {
  const {frequency, amount} = budget

  if (frequency === 'daily') return amount * 30
  if (frequency === 'weekly') return amount * 4
  if (frequency === 'yearly') return amount / 12

  return amount
}

/** Calculate the amount you have to allocate for each month. */
export const calculateMonthlyBudgets = (budgets: Budget[]): Budget[] =>
  budgets.map(budget => ({
    ...budget,
    amount: calculateMonthlyBudget(budget),
  }))
