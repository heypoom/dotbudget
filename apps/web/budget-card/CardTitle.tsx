import React from 'react'
import c from 'classnames'

import {toBackground} from '../ui/colors'
import {BudgetCardProps} from './types'

export function BudgetCardTitle(props: BudgetCardProps) {
  const {spent = 0, amount = 0, name, category} = props

  const isOverBudget = spent > amount

  const className = c(
    'rounded-tl-lg rounded-tr-lg px-5 py-1 text-white text-center md:text-left shadow-md z-10',
    toBackground(isOverBudget)
  )

  if (isOverBudget) {
    return (
      <div className={className}>
        <i className="fas fa-exclamation-triangle" />

        <span>&nbsp;{name}</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <span>{name}</span>

      <span className="hidden md:inline">&nbsp;({category})</span>
    </div>
  )
}
