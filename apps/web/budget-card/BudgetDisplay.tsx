import React from 'react'

import {BudgetCardProps} from './types'
import {useBlueprintBudget} from './hooks/useBlueprintBudget.hook'

import {useInputMode} from '../command-palette/utils/useInputMode'

const RemainingDisplay = (props: BudgetCardProps) => {
  const {amount = 0, spent = 0} = props

  const remaining = amount - spent
  const isOverBudget = spent > amount

  return (
    <span>
      <span>{Math.abs(remaining)}&nbsp;</span>

      <small className="font-normal">{isOverBudget ? 'over' : 'left'}</small>
    </span>
  )
}

const PlanDisplay = (props: BudgetCardProps) => {
  const bb = useBlueprintBudget(props)
  const {amount = 0, frequency} = props

  return (
    <div>
      <div>
        <span>
          {amount} <small className="font-normal">monthly</small>
        </span>
      </div>

      <div className="text-lg">
        {frequency === 'monthly' ? (
          <RemainingDisplay {...props} />
        ) : (
          <span>
            <span>{bb?.amount}</span>

            <small className="font-normal text-md">&nbsp;{bb?.frequency}</small>
          </span>
        )}
      </div>
    </div>
  )
}

export function BudgetDisplay(props: BudgetCardProps) {
  const {amount = 0, isFixed} = props

  const inputMode = useInputMode()

  if (inputMode === 'plan' || inputMode === 'move') {
    return <PlanDisplay {...props} />
  }

  if (!isFixed) return <RemainingDisplay {...props} />

  return (
    <span>
      {amount} <small className="font-normal">fixed</small>
    </span>
  )
}
