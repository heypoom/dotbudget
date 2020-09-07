import React, {useState} from 'react'
import c from 'classnames'
import Ink from 'react-ink'

import {BudgetCardTitle} from './CardTitle'
import {BudgetDisplay} from './BudgetDisplay'
import {BudgetCardPercent} from './CardPercent'
import {BudgetCardProps} from './types'

import {useStore} from '../store'
import {toTextColor} from '../ui/colors'

export function BudgetCard(props: BudgetCardProps) {
  const [isExpanding, setExpanding] = useState(false)
  const {dispatch} = useStore('spending', 'plan')

  const {spent = 0, amount = 0, isFixed, icon, category, name} = props

  const isOverBudget = spent > amount
  const textColor = toTextColor(isOverBudget)

  const spendingClass = c('text-xl sm:text-2xl pt-2 font-medium', textColor)
  const iconClass = c('far', 'fa-' + icon, textColor)

  function onCardClicked() {
    const a = prompt('Log Spending [l] or Reallocate [r]?')?.trim()

    if (a === 'l') {
      const amount = prompt('how much?')
      dispatch('spending/log', {category, name, amount: Number(amount)})
    } else if (a === 'r') {
      const amount = prompt('how much?')
      dispatch('plan/reallocate', {category, name, amount: Number(amount)})
    }
  }

  return (
    <div
      className={c(
        'relative mx-auto flex flex-col rounded-lg shadow-xl w-full bg-dark',
        isFixed && 'opacity-75'
      )}
      onClick={onCardClicked}
    >
      <BudgetCardTitle {...props} />

      <div className="p-4 px-6">
        <div className="text-4xl">
          {icon && (
            <div>
              <i className={iconClass} />
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
  )
}

export * from './types'
