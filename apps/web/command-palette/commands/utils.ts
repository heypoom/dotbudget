import {Budget} from '@dotbudget/plan'
import {BudgetWithAmount} from '../../@types/BudgetSelection'

export const withAmount = (
  {category, name}: Budget,
  amount: string
): BudgetWithAmount => ({
  category,
  name,
  amount: Number(amount),
})
