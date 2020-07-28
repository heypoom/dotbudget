import React from 'react'
import c from 'classnames'

export function BudgetCardTitle(props: BudgetCardProps) {
  const baseClass =
    'rounded-tl-lg rounded-tr-lg px-5 py-1 text-white text-center md:text-left shadow-md z-10'

  const isOverBudget = props.spent > props.allocated

  if (isOverBudget) {
    return (
      <div className={c(baseClass, 'bg-gradient-red shadow-md-pink')}>
        <i className="fas fa-exclamation-triangle" />

        <span>&nbsp;{props.title}</span>
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
