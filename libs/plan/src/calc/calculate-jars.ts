import {mapValues, sum, values} from 'lodash'

import {Jars, JarAllocations, JarPartition} from '../@types'

function getMonthlyBudget(p: JarPartition, remaining: number): number {
  if (p.amount) return p.amount
  if (p.percent) return Math.round((p.percent / 100) * remaining)

  return 0
}

export function calculateJars(jars: Jars, total: number): JarAllocations {
  let remaining = total

  // Calculate the monthly allocations for each jars.
  const allocated: JarAllocations = mapValues(jars, jar => {
    const budget = getMonthlyBudget(jar, remaining)
    remaining -= budget

    return budget
  })

  // We put the remaining money into investments.
  return {...allocated, investment: remaining}
}
