import {Jars} from './Jar'
import {Budget} from './Budget'
import {Investments} from './Investment'

/**
 * Plan blueprints are the schema of how you manage your finances.
 */
export interface PlanBlueprint {
  /** Jars define how your money is being partitioned. (e.g. necessity, security) */
  jars: Jars

  /** Investments define the percentages in which you'll be investing your money in. (e.g. gold, stocks, bonds) */
  investments: Investments

  /** Budgets define how much budget you've allocated to each spending category. */
  budgets: Budget[]
}
