import React from 'react'

import {BudgetCardProps} from './types'

export function BudgetDisplay(props: BudgetCardProps) {
  if (props.isFlexible) {
    const remaining = (props.allocated || 0) - (props.spent || 0)
    const isOverBudget = props.spent > props.allocated

    return (
      <span>
        <span>{Math.abs(remaining)}&nbsp;</span>

        <small className="font-normal">{isOverBudget ? 'over' : 'left'}</small>
      </span>
    )
  }

  return (
    <span>
      {props.allocated} <small className="font-normal">fixed</small>
    </span>
  )
}
