import React from 'react'
import c from 'classnames'
import {toBackground} from '../ui/colors'

export function BudgetCardPercent(props: BudgetCardProps) {
  const percent = props.isFlexible
    ? Math.round((props.spent / props.allocated) * 100)
    : 100

  const isOverBudget = props.spent > props.allocated

  const percentStyle = {width: `${Math.min(percent, 100)}%`}

  const percentClassName = c(
    'absolute left-0 bottom-0 h-1 rounded-bl-lg',
    (percent > 90 || !props.isFlexible) && 'rounded-br-lg',
    toBackground(isOverBudget)
  )

  return <div className={percentClassName} style={percentStyle} />
}
