import {Jar} from './Jar'
import {Budget} from './Budget'
import {Investments} from './Investment'

export type JarAllocations = Record<Jar, number>

/** The monthly financial plan that is calculated from the remaining money. */
export interface MonthlyPlan {
  /** The amount of budget we've allocated to the jars for this month. */
  jars: JarAllocations

  /** The amount of money we're going to invest in for this month. */
  investments: Investments

  /** The monthly budget we've allocated for this month. */
  budgets: Budget[]
}
