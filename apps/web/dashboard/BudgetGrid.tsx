import {sortBy} from 'lodash'
import React, {useMemo} from 'react'
import {keyOf, Budget, Spending, getTotalSpending} from '@dotbudget/plan'

import {useShortcut} from './hooks/useShortcuts'

import {useStore} from '../store'
import {BudgetCard, CurrentBudget} from '../budget-card'

const getBudgetIcon = (b: Budget, iconMap: Record<string, string> = {}) =>
  iconMap[keyOf(b)] || iconMap[b.category] || 'money-bill-wave'

export function transformBudget(
  data: Budget[],
  spending: Spending[],
  iconMap: Record<string, string> = {}
): CurrentBudget[] {
  const budgets = data.map(b => ({
    ...b,
    icon: getBudgetIcon(b, iconMap),
    spent: getTotalSpending(spending, b, 'month', new Date()),
  }))

  const fixedGoesLast = sortBy(budgets, o => o.isFixed)
  const overGoesFirst = sortBy(fixedGoesLast, o => !(o.spent > o.amount))

  return overGoesFirst
}

export const BudgetGrid = () => {
  const {plan} = useStore('plan')
  const {spending} = useStore('spending')
  const {budgets} = plan?.data

  const data = useMemo(() => {
    return transformBudget(budgets, spending.data, plan.iconMap)
  }, [budgets, spending.data, plan.iconMap])

  useShortcut()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 p-6">
      {data.map(budget => (
        <BudgetCard key={keyOf(budget)} {...budget} />
      ))}
    </div>
  )
}
