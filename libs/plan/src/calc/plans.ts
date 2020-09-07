import {Plan, Jars} from '@dotbudget/plan'

import {sum} from '../utils'

import {JarAllocations} from '../@types/CalculatedPlan'

export function getJarAllocations(
  plans: Plan[],
  totalBudget: number
): JarAllocations {
  const allocations: JarAllocations = {}
  let remaining = totalBudget

  for (const plan of plans) {
    const amount = plan.fixed
      ? plan.fixed / 12
      : (plan.percent ?? 0 / 100) * totalBudget

    allocations[plan.category] = amount
  }

  const monthlyAllocations = sum(Object.values(allocations).map(x => x ?? 0)) //?
  remaining -= monthlyAllocations

  allocations.investment = remaining

  return allocations
}
