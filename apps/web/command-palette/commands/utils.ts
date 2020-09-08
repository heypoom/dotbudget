import {Budget} from '@dotbudget/plan'

import {logSpending} from '.'

import {Command} from '../types'
import {BudgetWithAmount} from '../../@types/BudgetSelection'

export const withAmount = (
  {category, name}: Budget,
  amount: string
): BudgetWithAmount => ({
  category,
  name,
  amount: Number(amount),
})

export function getCommandArity(command: Command) {
  if (command === logSpending) return 1

  return 2
}
