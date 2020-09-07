import React, {useState} from 'react'
import c from 'classnames'
import Ink from 'react-ink'

import {css} from '@emotion/core'
import styled from '@emotion/styled'

import {BudgetCardTitle} from './CardTitle'
import {BudgetDisplay} from './BudgetDisplay'
import {BudgetCardPercent} from './CardPercent'

import {BudgetCardProps} from './types'
import {toTextColor} from '../ui/colors'
import {divide} from 'lodash'
import {useStore} from '../store'

const ExpandableCard = styled.div`
  ${props =>
    expand &&
    css`
      /* position: fixed; */
      width: calc(100vw - 45px);
      height: calc(100vh - 45px);
      z-index: 100;
      transition: 0.3s cubic-bezier(0.4, 0, 0, 1.53) all;
      opacity: 1;
    `}
`

export function BudgetCard(props: BudgetCardProps) {
  const [isExpanding, setExpanding] = useState(false)
  const {dispatch} = useStore('spending', 'plan')

  const {spent = 0, amount = 0, isFixed, icon, category, name} = props

  const containerClass = c(
    'relative mx-auto flex flex-col rounded-lg shadow-xl w-full bg-white',
    isFixed && 'opacity-75'
  )

  const isOverBudget = spent > amount
  const textColor = toTextColor(isOverBudget)

  const spendingClass = c('text-xl sm:text-2xl pt-2 font-medium', textColor)
  const iconClass = c('far', 'fa-' + icon, textColor)

  function onCardClicked() {
    // dispatch('spending/log', {category, name, amount: amount + 10})

    dispatch('plan/reallocate', {category, name, amount: amount + 20})
  }

  return (
    <div className={containerClass} onClick={onCardClicked}>
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
