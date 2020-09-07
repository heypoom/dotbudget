import React, {useMemo} from 'react'
import {sortBy} from 'lodash'

import {Budget, Spending, getTotalSpending} from '@dotbudget/plan'

import {Editor} from '../editor'
import {useStore} from '../store'

import {BudgetCard, CurrentBudget} from '../budget-card'
import {CommandPalette} from '../command-palette'

export const iconMap: Record<string, string> = {
  Dining: 'utensils-alt',
  Snacks: 'ice-cream',
  Motorcycle: 'motorcycle',
  BTS: 'subway',
  Water: 'faucet-drip',
  Electricity: 'bolt',
  Cooking: 'oven',

  food: 'utensils-alt',
  rent: 'home',
  transit: 'car',
}

function transformBudget(
  data: Budget[],
  spending: Spending[]
): CurrentBudget[] {
  const budgets = data.map(b => ({
    ...b,
    icon: iconMap[b.name] || iconMap[b.category] || 'money-bill-wave',
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

  const data: CurrentBudget[] = useMemo(() => {
    return transformBudget(budgets, spending?.data)
  }, [budgets, spending])

  console.log('Data:', data)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 p-6">
      {data.map(budget => (
        <BudgetCard key={budget.name} {...budget} />
      ))}
    </div>
  )
}

export const Dashboard = () => {
  return (
    <main className="bg-darker h-screen">
      <div>
        <CommandPalette />

        <div className="flex">
          <div className="w-1/2">
            <BudgetGrid />
          </div>

          <div className="w-1/2">
            <Editor />
          </div>
        </div>
      </div>
    </main>
  )
}
