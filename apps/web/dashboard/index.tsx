import React, {useMemo} from 'react'
import {sortBy} from 'lodash'

import {Budget} from '@dotbudget/plan'

import {BudgetCard} from '../budget-card'
import {CurrentBudget} from '../budget-card/types'

import {useStore} from '../store'

import {PlanEditor} from '../editor/PlanEditor'

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

function transformBudget(data: Budget[]): CurrentBudget[] {
  const budgets = data.map(b => ({
    ...b,
    icon: iconMap[b.name] || iconMap[b.category] || 'money-bill-wave',
    spent: 700,
  }))

  const fixedGoesLast = sortBy(budgets, o => o.isFixed)
  const overGoesFirst = sortBy(fixedGoesLast, o => !(o.spent > o.amount))

  return overGoesFirst
}

const BudgetGrid = () => {
  const {plan} = useStore('plan')

  const {budgets: monthlyBudgets} = plan?.data

  console.table(monthlyBudgets)

  const budgets: CurrentBudget[] = useMemo(
    () => transformBudget(monthlyBudgets),
    [monthlyBudgets]
  )

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5 p-6">
      {budgets.map(budget => (
        <BudgetCard key={budget.name} {...budget} />
      ))}
    </div>
  )
}

export const Dashboard = () => {
  return (
    <main className="bg-gray-200 h-screen">
      <div>
        <div className="flex">
          <div className="w-1/2">
            <BudgetGrid />
          </div>

          <div className="w-1/2">
            <PlanEditor />
          </div>
        </div>
      </div>
    </main>
  )
}
