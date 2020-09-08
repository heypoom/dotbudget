import {useState, useEffect} from 'react'
import {Budget} from '@dotbudget/plan'

import {Command} from '../../types'

import {validateCommand} from '../../commands'

function isCommandValid(
  text: string,
  budget: Budget,
  command: Command
): boolean {
  const args = text.split(' ')

  if (!command && !budget) return false
  if (args.length === 1 && budget) return true

  if (!command) return false

  const isValid = !!validateCommand(args, command)
  if (!isValid) return false

  return true
}

export function useValidateCommand(budgets: Budget[], commands: Command[]) {
  const [text, setText] = useState('')
  const [isInvalid, setInvalid] = useState(false)

  useEffect(() => {
    const [budget] = budgets
    const [command] = commands

    const isValid = isCommandValid(text, budget, command)

    setInvalid(!isValid)
  }, [text, budgets, commands])

  return {isInvalid, handleChange: setText}
}
