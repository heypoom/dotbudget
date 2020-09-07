import {calculateJars} from './calculate-jars'
import {calculateInvestments} from './calculate-investments'
import {calculateMonthlyBudgets} from './calculate-budgets'

import {PlanBlueprint, MonthlyPlan} from '../@types'
import {calculateUnbudgetedJars} from './calculate-unallocated'

/** Calculates the monthly financial plan, given the remaining money to be budgeted. */
export function calculateMonthlyPlan(
  blueprint: PlanBlueprint,
  remaining: number
): MonthlyPlan {
  // Calculate the money to be allocated for this month.
  const budgets = calculateMonthlyBudgets(blueprint.budgets)

  // Calculate the money to be allocated for the 6 jars.
  const jars = calculateJars(blueprint.jars, remaining)

  // Use the money in the "investment" jar to invest in varying markets to reduce risk.
  const investments = calculateInvestments(
    blueprint.investments,
    jars.investment
  )

  // Calculate the remaining money that haven't been budgeted for each jars.
  const unbudgeted = calculateUnbudgetedJars(budgets, jars)

  return {
    jars,
    investments,
    budgets,
    unbudgeted,
  }
}

export * from './spending'
