import React from 'react'
import {Budget} from '@dotbudget/plan'

import {Command} from './types'

interface HintTextProps {
  budgets: Budget[]
  commands: Command[]
}

export function HintText(props: HintTextProps) {
  const {budgets = [], commands = []} = props

  const [budget] = budgets
  const [command] = commands

  if (command) {
    return (
      <div
        className="absolute text-white text-xl pointer-events-none opacity-25"
        style={{right: 25, top: 12}}
      >
        {command.title}
      </div>
    )
  }

  if (budget) {
    return (
      <div
        className="absolute text-white text-xl pointer-events-none opacity-25"
        style={{right: 25, top: 12}}
      >
        {budget.category}/{budget.name}
      </div>
    )
  }

  return null
}
