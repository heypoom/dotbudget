import {Budget, Frequency} from '../@types'
import {getExpression} from '../utils'

type FrequencyAmount = Pick<Budget, 'amount' | 'frequency'>

export function calculateMonthlyBudget(budget: FrequencyAmount): number {
  const {frequency, amount} = budget

  if (frequency === 'daily') return amount * 30
  if (frequency === 'weekly') return amount * 4
  if (frequency === 'yearly') return Math.round(amount / 12)

  return amount
}

export function calculateBudgetByFrequency(monthly: FrequencyAmount): number {
  const {frequency, amount} = monthly

  if (frequency === 'daily') return Math.round(amount / 30)
  if (frequency === 'weekly') return Math.round(amount / 4)
  if (frequency === 'yearly') return amount * 12

  return amount
}

/** Calculate the amount you have to allocate for each month. */
export const calculateMonthlyBudgets = (budgets: Budget[]): Budget[] =>
  budgets.map(budget => ({
    ...budget,
    amount: calculateMonthlyBudget(budget),
    expression: getExpression(budget),
  }))
