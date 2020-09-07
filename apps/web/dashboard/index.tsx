import React, {useMemo} from 'react'
import {sortBy} from 'lodash'

import {Budget, Spending, getTotalSpending, keyOf} from '@dotbudget/plan'

import {useStore} from '../store'

import {Editor} from '../editor'
import {CommandPalette} from '../command-palette'
import {BudgetCard, CurrentBudget} from '../budget-card'

const getBudgetIcon = (b: Budget, iconMap: Record<string, string> = {}) =>
  iconMap[keyOf(b)] || iconMap[b.category] || 'money-bill-wave'

function transformBudget(
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

const BudgetGrid = () => {
  const {plan} = useStore('plan')
  const {budgets} = plan?.data

  const {spending} = useStore('spending')

  const data = useMemo(() => {
    return transformBudget(budgets, spending.data, plan.iconMap)
  }, [budgets, spending.data, plan.iconMap])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 p-6">
      {data.map(budget => (
        <BudgetCard key={keyOf(budget)} {...budget} />
      ))}
    </div>
  )
}

export const Dashboard = () => {
  return (
    <main className="bg-darker h-screen">
      <div>
        <div className="flex">
          <div className="w-1/2 relative">
            <BudgetGrid />
            <CommandPalette />
          </div>

          <div className="w-1/2">
            <Editor />
          </div>
        </div>
      </div>
    </main>
  )
}
