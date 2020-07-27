import {Budget, BudgetCategoryMap, PlanAllocations} from '@dotbudget/plan'

export function getMonthlyAmount(b: Budget) {
  if (b.frequency === 'monthly') return b.amount
  if (b.frequency === 'daily') return b.amount * 30
  if (b.frequency === 'yearly') return b.amount / 12
  if (b.frequency === 'weekly') return b.amount / 7
}

export function getAllocations(budgets: Budget[], types: BudgetCategoryMap) {
  const allocations: Record<string, number> = {}
  const allocationsPerTypes: PlanAllocations = {}
  const breakdown: Record<string, number> = {}

  for (const budget of budgets) {
    const allocation = getMonthlyAmount(budget)

    allocations[budget.title] = allocation

    const planType = types[budget.category]

    if (!breakdown[budget.category]) breakdown[budget.category] = 0
    breakdown[budget.category] += allocation

    if (!allocationsPerTypes[planType]) allocationsPerTypes[planType] = 0
    allocationsPerTypes[planType] += allocation
  }

  return {allocations, planAllocations: allocationsPerTypes, breakdown}
}
