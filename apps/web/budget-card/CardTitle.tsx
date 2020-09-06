import React from 'react'
import c from 'classnames'
import {toBackground} from '../ui/colors'

export function BudgetCardTitle(props: BudgetCardProps) {
  const isOverBudget = props.spent > props.allocated

  const className = c(
    'rounded-tl-lg rounded-tr-lg px-5 py-1 text-white text-center md:text-left shadow-md z-10',
    toBackground(isOverBudget)
  )

  if (isOverBudget) {
    return (
      <div className={className}>
        <i className="fas fa-exclamation-triangle" />

        <span>&nbsp;{props.title}</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <span>{props.title}</span>

      <span className="hidden md:inline">&nbsp;({props.category})</span>
    </div>
  )
}
