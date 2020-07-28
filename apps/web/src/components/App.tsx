import React from 'react'
import c from 'classnames'

interface Budget {
  title: string
  category: string
  allocated: number
  spent: number
  emoji: string
}

const budgets: Budget[] = [
  {title: 'Dining', category: 'food', allocated: 50, spent: 30, emoji: '🍣'},
  {title: 'Snacks', category: 'food', allocated: 40, emoji: '🍫'},
  {title: 'BTS', category: 'transportation', allocated: 50, emoji: '🚆'},
]

type BudgetCardProps = Budget & {
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
  <div className="mx-auto flex flex-col rounded-lg shadow-xl w-full">
    <BudgetCardTitle {...props} />

    <div className="p-4 px-6 bg-white rounded-bl-lg rounded-br-lg">
      <div className="text-4xl">{props.emoji || '📦️'}</div>

      <div className="text-lg sm:text-3xl">
        {props.spent || 0} / {props.allocated || 0}
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
