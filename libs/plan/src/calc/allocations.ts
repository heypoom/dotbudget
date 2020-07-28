import {Budget, BudgetCategoryMap, PlanAllocations} from '../@types'

export function getMonthlyAmount(b: Budget) {
  if (b.frequency === 'monthly') return b.allocated
  if (b.frequency === 'daily') return b.allocated * 30
  if (b.frequency === 'yearly') return b.allocated / 12
  if (b.frequency === 'weekly') return b.allocated / 7
}

export function getAllocations(budgets: Budget[], types: BudgetCategoryMap) {
  const allocations: Record<string, number> = {}
  const monthlyBudgets: Budget[] = []
  const allocationsPerTypes: PlanAllocations = {}
  const breakdown: Record<string, number> = {}

  for (const budget of budgets) {
    const monthlyAmount = getMonthlyAmount(budget)
    if (!monthlyAmount) continue

    allocations[budget.title] = monthlyAmount
    monthlyBudgets.push({...budget, allocated: monthlyAmount})

    if (!breakdown[budget.category]) breakdown[budget.category] = 0
    breakdown[budget.category] += monthlyAmount

    const planType = types[budget.category]
    if (!planType) continue

    if (!allocationsPerTypes[planType]) allocationsPerTypes[planType] = 0
    allocationsPerTypes[planType] += monthlyAmount
  }

  return {
    allocations,
    monthlyBudgets,
    planAllocations: allocationsPerTypes,
    breakdown,
  }
}
