import {frequencies} from './constants'

/**
  Budgets define how much budget you've allocated to each spending category.

  @example
  budgets:
    condo:
      jar: necessity
      rent: fixed monthly rent 6000
      common fee: fixed yearly rent 15000
      water: monthly 500
    transit:
      jar: necessity
      electricity: monthly 2500
      motorcycle: daily transit (10 * 2)
      bts: monthly transit (950 + 500)
 */
export interface Budget {
  /** The name of this budget item. (e.g. rent, water, electricity, bts) */
  name: string

  /** The jar this budget belongs to. (e.g. necessity, education, lifestyle, dream) */
  jar: Jar

  /** The spending category this budget belongs to. (e.g. condo, transit, food) */
  category: string

  /** Does this budget always remain the same? (e.g. rent, common fee) */
  isFixed: boolean

  /** How often are we going to spend money on this item? (e.g. daily, monthly, yearly) */
  frequency: Frequency

  /** How much money are we allocating to this item? */
  amount: number
}

/** How often are we going to spend money on this item? (e.g. daily, monthly, yearly) */
export type Frequency = typeof frequencies[number]
