import {Budget, BudgetCategoryMap, Jars} from '../@types'

export function getMonthlyAmount(b: Budget) {
  if (b.frequency === 'monthly') return b.amount
  if (b.frequency === 'daily') return b.amount * 30
  if (b.frequency === 'yearly') return b.amount / 12
  if (b.frequency === 'weekly') return b.amount / 7
}

export function getAllocations(budgets: Budget[], types: BudgetCategoryMap) {
  const allocations: Record<string, number> = {}
  const monthlyBudgets: Budget[] = []
  const allocationsPerTypes: Jars = {}
  const breakdown: Record<string, number> = {}

  for (const budget of budgets) {
    const monthlyAmount = getMonthlyAmount(budget)
    if (!monthlyAmount) continue

    allocations[budget.title] = monthlyAmount
    monthlyBudgets.push({...budget, amount: monthlyAmount})

    if (!breakdown[budget.category]) breakdown[budget.category] = 0
    breakdown[budget.category] += monthlyAmount

    const planType = types[budget.category]
    if (!planType) continue

    allocationsPerTypes[planType] =
      monthlyAmount + (allocationsPerTypes[planType] ?? 0)
  }

  return {
    allocations,
    monthlyBudgets,
    planAllocations: allocationsPerTypes,
    breakdown,
  }
}
