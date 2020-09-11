import React, {useState} from 'react'
import c from 'classnames'
import Ink from 'react-ink'

import {BudgetCardTitle} from './CardTitle'
import {BudgetDisplay} from './BudgetDisplay'
import {BudgetCardPercent} from './CardPercent'
import {BudgetCardProps} from './types'
import {
  useSelectedCard,
  useSelectedMoveTarget,
} from './hooks/useSelectedCard.hook'

import {useStore} from '../store'
import {toTextColor} from '../ui/colors'
import {useInputMode} from '../command-palette/utils/useInputMode'

export function BudgetCard(props: BudgetCardProps) {
  const [isExpanding, setExpanding] = useState(false)
  const {dispatch} = useStore('spending')

  const inputMode = useInputMode()

  const {spent = 0, amount = 0, isFixed, icon, category, name} = props

  const {isSelected, selected} = useSelectedCard(name, category)
  const {isSelectedMoveTarget} = useSelectedMoveTarget(name, category)

  const isOverBudget = spent > amount
  const textColor = toTextColor(isOverBudget)

  const spendingClass = c('text-xl sm:text-2xl pt-2 font-medium', textColor)
  const iconClass = c('far', 'fa-' + icon, textColor)

  const onCardClicked = () => {
    if (inputMode === 'move') {
      return dispatch('plan/selectMoveTarget', {category, name})
    }

    dispatch('plan/toggle', {category, name})
  }

  return (
    <button
      onClick={onCardClicked}
      className={c(
        'focus:outline-none focus:bg-dark rounded-lg shadow-xl w-full border-4 border-transparent',
        isFixed && 'opacity-75',
        !selected || isSelected ? 'bg-dark' : 'bg-darker',
        isSelected && 'shadow-2xl',
        isSelectedMoveTarget && 'border-orange-400'
      )}
    >
      <div className={c('relative mx-auto flex flex-col w-full rounded-lg')}>
        <BudgetCardTitle {...props} />

        <div className="p-4 px-6">
          <div className="text-4xl">
            {icon && (
              <div>
                <i className={iconClass} aria-hidden />
              </div>
            )}
          </div>

          <div className={spendingClass}>
            <BudgetDisplay {...props} />
          </div>

          {isExpanding && (
            <div>
              <button onClick={() => setExpanding(false)}>Close</button>
            </div>
          )}
        </div>

        {!isExpanding && <Ink opacity={0.05} />}

        <BudgetCardPercent {...props} />
      </div>
    </button>
  )
}

export * from './types'
