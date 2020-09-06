import {PlanAllocations} from '@dotbudget/plan'
import {planCategory} from '../constants'
import {PlanCategory} from '../@types'

export function calculateUnallocated(
  allocations: PlanAllocations,
  planAllocations: PlanAllocations
): PlanAllocations {
  const unallocated: PlanAllocations = {}

  for (const type in planAllocations) {
    const category = type as PlanCategory
    if (!planCategory.includes(category)) continue

    const max = allocations[category] ?? 0
    const current = planAllocations[category] ?? 0

    unallocated[category] = max - current
  }

  return unallocated
}
