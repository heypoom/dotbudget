import {Jars} from '@dotbudget/plan'
import {jars} from '../constants'
import {Jar} from '../@types'

export function calculateUnallocated(
  allocations: Jars,
  planAllocations: Jars
): Jars {
  const unallocated: Jars = {}

  for (const type in planAllocations) {
    const category = type as Jar
    if (!jars.includes(category)) continue

    const max = allocations[category] ?? 0
    const current = planAllocations[category] ?? 0

    unallocated[category] = max - current
  }

  return unallocated
}
