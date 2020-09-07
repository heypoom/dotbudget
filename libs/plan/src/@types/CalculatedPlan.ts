import {Jar} from './Jar'
import {Budget} from './Budget'
import {Investments} from './Investment'

export type JarAllocations = Record<Jar, number>

export interface CalculatedPlan {
  jars: {
    /** The amount of budget we've allocated to the jars. */
    allocated: JarAllocations

    /** The amount of budget we haven't allocated yet to the jars. */
    unallocated: JarAllocations
  }

  /** The amount of money we're going to invest in this month. */
  investments: Investments

  budgets: {
    /** The monthly budget we've allocated for this month. */
    monthly: Budget[]

    /** Quick breakdown on how much we've allocated for each budget item. */
    breakdown: Record<string, number>
  }
}
