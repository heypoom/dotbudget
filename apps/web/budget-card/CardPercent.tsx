import React from 'react'
import c from 'classnames'

import {toBackground} from '../ui/colors'

import {BudgetCardProps} from './types'

export function BudgetCardPercent(props: BudgetCardProps) {
  const {spent = 0, amount = 0, isFixed} = props

  const percent = props.isFixed ? 100 : Math.round((spent / amount) * 100)

  const isOverBudget = spent > amount

  const percentStyle = {width: `${Math.min(percent, 100)}%`}

  const percentClassName = c(
    'absolute left-0 bottom-0 h-1 rounded-bl-lg',
    (percent > 90 || isFixed) && 'rounded-br-lg',
    toBackground(isOverBudget)
  )

  return <div className={percentClassName} style={percentStyle} />
}
