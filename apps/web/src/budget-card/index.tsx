import React from 'react'
import c from 'classnames'
import Ink from 'react-ink'

import {BudgetCardTitle} from './CardTitle'
import {BudgetCardPercent} from './CardPercent'

import {BudgetCardProps} from './types'

export function BudgetCard(props: BudgetCardProps) {
  const containerClass = c(
    'relative mx-auto flex flex-col rounded-lg shadow-xl w-full bg-white',
    !props.isFlexible && 'opacity-75'
  )

  const isOverBudget = props.spent > props.allocated

  const textColor = isOverBudget
    ? 'bg-gradient-red text-gradient text-red'
    : 'text-green'

  const spendingClass = c('text-xl sm:text-2xl pt-2', textColor)
  const iconClass = c('far', 'fa-' + props.icon, textColor)

  return (
    <div className={containerClass}>
      <BudgetCardTitle {...props} />

      <div className="p-4 px-6">
        <div className="text-4xl">
          {props.icon && <i className={iconClass} />}
        </div>

        <div className={spendingClass}>
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
