import React from 'react'
import c from 'classnames'
import styled from '@emotion/styled'

const OverspentTag = styled.div`
  right: -18px;
  --transform-rotate: 30deg;
`

export function BudgetCardTitle(props: BudgetCardProps) {
  const baseClass =
    'relative rounded-tl-lg rounded-tr-lg px-5 py-1 text-white text-center md:text-left shadow-md z-10'

  const isOverBudget = props.spent > props.allocated

  if (isOverBudget) {
    return (
      <div className={c(baseClass, 'bg-gradient-red shadow-md-pink')}>
        <span>{props.title}</span>

        <OverspentTag className="absolute top-0 bg-white transform px-3 py-1 rounded-full shadow-md-pink">
          <strong className="font-bold text-sm bg-gradient-red text-gradient text-red">
            Overspent!
          </strong>
        </OverspentTag>
      </div>
    )
  }

  return (
    <div className={c(baseClass, 'bg-green shadow-md-green')}>
      {props.title}

      <span className="hidden md:inline">&nbsp;({props.category})</span>
    </div>
  )
}
