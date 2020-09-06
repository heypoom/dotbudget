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

const ExpandableCard = styled.div`
  ${props =>
    props.expand &&
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

  const containerClass = c(
    'relative mx-auto flex flex-col rounded-lg shadow-xl w-full bg-white',
    !props.isFlexible && 'opacity-75'
  )

  const isOverBudget = props.spent > props.allocated
  const textColor = toTextColor(isOverBudget)

  const spendingClass = c('text-xl sm:text-2xl pt-2 font-medium', textColor)
  const iconClass = c('far', 'fa-' + props.icon, textColor)

  function onCardClicked() {
    if (!isExpanding) setExpanding(true)
  }

  return (
    <ExpandableCard
      className={containerClass}
      expand={isExpanding}
      onClick={onCardClicked}
    >
      <BudgetCardTitle {...props} />

      <div className="p-4 px-6">
        <div className="text-4xl">
          {props.icon && <i className={iconClass} />}
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
    </ExpandableCard>
  )
}
