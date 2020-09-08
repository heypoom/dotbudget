import {useState} from 'react'

import {Command} from '../../types'
import {createCommandCompletion} from './command.completion'

export function useCommandCompletion() {
  const [completions, setCompletions] = useState<Command[]>([])

  function handleChange(text: string) {
    const commands = createCommandCompletion(text.split(' '))
    setCompletions(commands)
  }

  return {completions, handleChange}
}

export * from './command.completion'
