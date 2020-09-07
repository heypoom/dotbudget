import {mapValues} from 'lodash'

import {createEmptyJar} from '../utils/empty-jar'

import {Budget, JarAllocations, Jar} from '../@types'

export function getBudgetedJars(budgets: Budget[]): JarAllocations {
  const allocated = createEmptyJar()
  for (const budget of budgets) allocated[budget.jar] += budget.amount

  return allocated
}

export function calculateUnbudgetedJars(
  budgets: Budget[],
  planned: JarAllocations
): JarAllocations {
  const allocated = getBudgetedJars(budgets)

  return mapValues(
    allocated,
    (budgeted, name) => planned[name as Jar] - budgeted
  )
}
