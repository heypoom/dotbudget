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
  const {plan, dispatch} = useStore('spending', 'plan')
  const {selected} = plan

  const {spent = 0, amount = 0, isFixed, icon, category, name} = props

  const isOverBudget = spent > amount
  const textColor = toTextColor(isOverBudget)

  const spendingClass = c('text-xl sm:text-2xl pt-2 font-medium', textColor)
  const iconClass = c('far', 'fa-' + icon, textColor)

  const isSelected = selected?.name === name && selected?.category === category
  const onCardClicked = () => dispatch('plan/select', {category, name})

  return (
    <div
      className={c(
        'relative mx-auto flex flex-col rounded-lg shadow-xl w-full',
        isFixed && 'opacity-75',
        !selected || isSelected ? 'bg-dark' : 'bg-darker'
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
