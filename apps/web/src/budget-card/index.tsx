import React from 'react'
import c from 'classnames'
import Ink from 'react-ink'

import {BudgetCardTitle} from './CardTitle'
import {BudgetCardPercent} from './CardPercent'

export function BudgetCard(props: BudgetCardProps) {
  const containerClass = c(
    'relative mx-auto flex flex-col rounded-lg shadow-xl w-full bg-white',
    !props.isFlexible && 'opacity-75'
  )

  const isOverBudget = props.spent > props.allocated

  const spendingClassName = c(
    'text-xl sm:text-2xl',
    isOverBudget && 'bg-gradient-red text-gradient text-red'
  )

  return (
    <div className={containerClass}>
      <BudgetCardTitle {...props} />

      <div className="p-4 px-6">
        <div className="text-4xl">{props.emoji || '📦️'}</div>

        <div className={spendingClassName}>
          {props.isFlexible && (
            <span>
              {props.spent || 0} <small>of</small>{' '}
            </span>
          )}

          {props.allocated || 0}
        </div>
      </div>

      <Ink opacity={0.05} />

      <BudgetCardPercent {...props} />
    </div>
  )
}
