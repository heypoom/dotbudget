import React from 'react'
import c from 'classnames'

import {Budget} from '@dotbudget/plan'

type CurrentBudget = Budget & {
  spent: number
  emoji: string
}

const budgets: CurrentBudget[] = [
  {
    title: 'Dining',
    category: 'food',
    allocated: 6000,
    spent: 2000,
    emoji: '🍣',
    isFlexible: true,
  },
  {
    title: 'Snacks',
    category: 'food',
    allocated: 6000,
    spent: 1000,
    emoji: '🍰',
    isFlexible: true,
  },
  {
    title: 'BTS',
    category: 'transportation',
    allocated: 1450,
    emoji: '🚆',
  },
]

type BudgetCardProps = CurrentBudget & {
  isOverBudget?: boolean
}

function BudgetCardTitle(props: BudgetCardProps) {
  const baseClass =
    'rounded-tl-lg rounded-tr-lg px-5 py-1 text-white text-center md:text-left shadow-md z-10'

  if (props.isOverBudget) {
    return (
      <div className={c(baseClass, 'bg-gradient-red shadow-md-pink')}>
        Over Budget!
      </div>
    )
  }

  return (
    <div className={c(baseClass, 'bg-green shadow-md-green')}>
      {props.title}

      <span className="hidden md:inline">&nbsp;({props.category})</span>
    </div>
  )
}

const BudgetCard = (props: BudgetCardProps) => (
  <div
    className={c(
      'mx-auto flex flex-col rounded-lg shadow-xl w-full bg-white',
      !props.isFlexible && 'opacity-75'
    )}
  >
    <BudgetCardTitle {...props} />

    <div className="p-4 px-6 rounded-bl-lg rounded-br-lg">
      <div className="text-4xl">{props.emoji || '📦️'}</div>

      <div className="text-lg sm:text-2xl">
        {props.isFlexible && (
          <span>
            {props.spent || 0} <small>of</small>{' '}
          </span>
        )}

        {props.allocated || 0}
      </div>
    </div>
  </div>
)

export const App = () => (
  <main className="bg-gray-200 h-screen">
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 p-6">
      {budgets.map(budget => (
        <BudgetCard key={budget.title} {...budget} />
      ))}
    </div>
  </main>
)
