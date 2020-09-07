import React from 'react'
import c from 'classnames'

import {toBackground, toTextColor} from '../ui/colors'
import {BudgetCardProps} from './types'

export function BudgetCardTitle(props: BudgetCardProps) {
  const {spent = 0, amount = 0, name, category} = props

  const isOverBudget = spent > amount

  const className = c(
    'flex rounded-tl-lg rounded-tr-lg px-5 py-1 text-white text-center md:text-left shadow-md z-10 h-8 overflow-hidden',
    toBackground(isOverBudget)
  )

  if (isOverBudget) {
    return (
      <div className={className}>
        <div>
          <i className="fas fa-exclamation-triangle" />
        </div>

        <span>&nbsp;{name}</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <span>
        {name} <span className="hidden md:inline">({category})</span>
      </span>
    </div>
  )
}
