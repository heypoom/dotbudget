import {Budget} from '@dotbudget/plan'

export function createBudgetCompletion(
  key: string,
  budgets: Budget[]
): Budget[] {
  const [first, second] = key.trim().split('')

  return budgets.filter(
    b =>
      (b.category.startsWith(first) && b.name.startsWith(second)) ||
      (b.category.startsWith(second) && b.name.startsWith(first))
  )
}
