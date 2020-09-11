import React from 'react'
import c from 'classnames'

import {BudgetCardProps} from './types'

import {
  useSelectedCard,
  useSelectedMoveTarget,
} from './hooks/useSelectedCard.hook'

import {toBackground, toTextColor} from '../ui/colors'

export function BudgetCardTitle(props: BudgetCardProps) {
  const {spent = 0, amount = 0, name, category} = props
  const {isSelected} = useSelectedCard(name, category)

  const isOverBudget = spent > amount

  const className = c(
    'flex rounded-tl-lg rounded-tr-lg px-5 py-1 shadow-md z-10 h-8 overflow-hidden',
    isSelected && toBackground(isOverBudget)
  )

  const textClassName = c(
    'text-white text-center md:text-left',
    !isSelected && toTextColor(isOverBudget)
  )

  if (isOverBudget) {
    return (
      <div className={className}>
        <div>
          <i
            className={c(
              'fas fa-exclamation-triangle',
              isSelected ? 'text-white' : 'text-red'
            )}
            aria-hidden
          />
        </div>

        <span className={textClassName}>&nbsp;{name}</span>
      </div>
    )
  }

  return (
    <div className={c(className, textClassName)}>
      <span>
        {name} <span className="hidden md:inline">({category})</span>
      </span>
    </div>
  )
}
