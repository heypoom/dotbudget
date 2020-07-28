import React from 'react'
import {sortBy} from 'lodash'

import {BudgetCard} from '../budget-card'
import {CurrentBudget} from '../budget-card/types'

import {
  parseFinancialPlan,
  calculateFinancialPlan,
} from '../../../../libs/plan/src'

import {calculated} from '../utils/financial-plan'

export const iconMap = {
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

const budgets: CurrentBudget[] = sortBy(
  calculated.monthlyBudgets.map(b => ({
    ...b,
    icon: iconMap[b.title] || iconMap[b.category] || 'money-bill-wave',
    spent: 700,
  })),
  o => !o.isFlexible
)

export const App = () => (
  <main className="bg-gray-200 h-screen">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
      {budgets.map(budget => (
        <BudgetCard key={budget.title} {...budget} />
      ))}
    </div>
  </main>
)

window.parseFinancialPlan = parseFinancialPlan
window.calculateFinancialPlan = calculateFinancialPlan
