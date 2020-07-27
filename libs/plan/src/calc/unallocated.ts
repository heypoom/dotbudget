import {PlanAllocations} from '@dotbudget/plan'

export function calculateUnallocated(
  allocations: PlanAllocations,
  planAllocations: PlanAllocations
) {
  const unallocated: PlanAllocations = {}

  for (const type in planAllocations) {
    const max = allocations[type]
    const current = planAllocations[type]

    unallocated[type] = max - current
  }

  return unallocated
}
