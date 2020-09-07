import {calculateJars} from './calculate-jars'
import {calculateInvestments} from './calculate-investments'
import {calculateMonthlyBudgets} from './calculate-budgets'

import {PlanBlueprint, MonthlyPlan} from '../@types'

/** Calculates the financial plan for the current month, given the remaining money to be budgeted. */
export function calculateFinancialPlan(
  blueprint: PlanBlueprint,
  remaining: number
): MonthlyPlan {
  // Calculate the money to be allocated for this month.
  const budgets = calculateMonthlyBudgets(blueprint.budgets)

  // Calculate the money to be allocated for the 6 jars.
  const jars = calculateJars(blueprint.jars, remaining)

  // use the money in the "investment" jar to invest in varying markets to reduce risk.
  const investments = calculateInvestments(
    blueprint.investments,
    jars.investment
  )

  return {
    jars,
    investments,
    budgets: budgets,
  }
}
