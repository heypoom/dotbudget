import {mapValues, sum, values} from 'lodash'

import {Jars, JarAllocations} from '../@types'

export function calculateJars(jars: Jars, remaining: number): JarAllocations {
  // Calculate the monthly allocations for each jars.
  const allocated: JarAllocations = mapValues(jars, p => {
    if (p.amount) return p.amount
    if (p.percent) return p.percent * remaining

    return 0
  })

  // We put the remaining money into investments.
  const investment = Math.max(remaining - sum(values(allocated)), 0)

  return {...allocated, investment}
}
