import {date, monthYear} from '../utils/date'

import {Spending, Budget} from '../@types'

type DateRange = 'day' | 'month' | 'all'

function getCurrentDateRange(range: DateRange, d = new Date()): string {
  if (range === 'day') return date(d)
  if (range === 'month') return monthYear(d)

  return ''
}

function filterSpendingByDateRange(dateRange: DateRange, d = new Date()) {
  const predicate = getCurrentDateRange(dateRange, d)

  return (spending: Spending) => spending.date.endsWith(predicate)
}

export const getTotalSpending = (
  spending: Spending[],
  b: Budget,
  dateRange: DateRange = 'month',
  d = new Date()
) =>
  spending
    .filter(x => x.name === b.name && x.category === b.category)
    .filter(filterSpendingByDateRange(dateRange, d))
    .map(x => x.amount)
    .reduce((a, b) => a + b, 0)
