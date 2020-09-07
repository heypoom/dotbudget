import {Spending, Budget} from '../@types'

export const getTotalSpending = (spending: Spending[], b: Budget) =>
  spending
    .filter(x => x.name === b.name && x.category === b.category)
    .map(x => x.amount)
    .reduce((a, b) => a + b, 0)
