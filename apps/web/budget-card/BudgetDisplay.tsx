import React from 'react'

import {BudgetCardProps} from './types'

export function BudgetDisplay(props: BudgetCardProps) {
  const {spent = 0, amount = 0, isFixed} = props

  if (!isFixed) {
    const remaining = amount - spent
    const isOverBudget = spent > amount

    return (
      <span>
        <span>{Math.abs(remaining)}&nbsp;</span>

        <small className="font-normal">{isOverBudget ? 'over' : 'left'}</small>
      </span>
    )
  }

  return (
    <span>
      {props.amount} <small className="font-normal">fixed</small>
    </span>
  )
}
