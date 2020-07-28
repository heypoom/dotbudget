import React from 'react'
import c from 'classnames'
import styled from '@emotion/styled'

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
    title: 'Motorcycle',
    category: 'transportation',
    allocated: 600,
    spent: 1000,
    emoji: '🏍',
    isFlexible: true,
  },
  {
    title: 'BTS',
    category: 'transportation',
    allocated: 1450,
    emoji: '🚆',
  },
]

type BudgetCardProps = CurrentBudget

const OverspentTag = styled.div`
  right: -18px;
  --transform-rotate: 30deg;
`

function BudgetCardTitle(props: BudgetCardProps) {
  const baseClass =
    'relative rounded-tl-lg rounded-tr-lg px-5 py-1 text-white text-center md:text-left shadow-md z-10'

  const isOverBudget = props.spent > props.allocated

  if (isOverBudget) {
    return (
      <div className={c(baseClass, 'bg-gradient-red shadow-md-pink')}>
        <span>{props.title}</span>

        <OverspentTag className="absolute top-0 bg-white text-red-500 transform px-3 py-1 rounded-full shadow-md-pink">
          <strong className="font-bold text-sm">Overspent!</strong>
        </OverspentTag>
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

function BudgetCardPercent(props: BudgetCardProps) {
  const percent = Math.round((props.spent / props.allocated) * 100)
  const isOverBudget = props.spent > props.allocated

  const percentStyle = {
    width: `${Math.min(percent, 100)}%`,
  }

  const percentClassName = c(
    'h-1 rounded-bl-lg',
    (percent > 90 || !props.isFlexible) && 'rounded-br-lg',
    !isOverBudget && 'bg-green shadow-md-green',
    isOverBudget && 'bg-gradient-red shadow-md-pink'
  )

  return <div className={percentClassName} style={percentStyle} />
}

function BudgetCard(props: BudgetCardProps) {
  const containerClass = c(
    'mx-auto flex flex-col rounded-lg shadow-xl w-full bg-white',
    !props.isFlexible && 'opacity-75'
  )

  return (
    <div className={containerClass}>
      <BudgetCardTitle {...props} />

      <div className="p-4 px-6">
        <div className="text-4xl">{props.emoji || '📦️'}</div>

        <div className="text-xl sm:text-2xl">
          {props.isFlexible && (
            <span>
              {props.spent || 0} <small>of</small>{' '}
            </span>
          )}

          {props.allocated || 0}
        </div>
      </div>

      <BudgetCardPercent {...props} />
    </div>
  )
}

export const App = () => (
  <main className="bg-gray-200 h-screen">
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 p-6">
      {budgets.map(budget => (
        <BudgetCard key={budget.title} {...budget} />
      ))}
    </div>
  </main>
)
