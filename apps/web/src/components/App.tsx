import React from 'react'

import {BudgetCard} from '../budget-card'

import {CurrentBudget} from '../budget-card/types'

const budgets: CurrentBudget[] = [
  {
    title: 'Dining',
    category: 'food',
    allocated: 6000,
    spent: 2000,
    icon: 'fal fa-utensils-alt',
    isFlexible: true,
  },
  {
    title: 'Snacks',
    category: 'food',
    allocated: 6000,
    spent: 1000,
    icon: 'fal fa-ice-cream',
    isFlexible: true,
  },
  {
    title: 'Motorcycle',
    category: 'transportation',
    allocated: 600,
    spent: 1000,
    icon: 'fal fa-motorcycle',
    isFlexible: true,
  },
  {
    title: 'BTS',
    category: 'transportation',
    allocated: 1450,
    icon: 'fal fa-subway',
  },
]

export const App = () => (
  <main className="bg-gray-200 h-screen">
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 p-6">
      {budgets.map(budget => (
        <BudgetCard key={budget.title} {...budget} />
      ))}
    </div>
  </main>
)
