import React, {useState} from 'react'
import {Budget} from '@dotbudget/plan'

import {createBudgetCompletion} from './completions/budgets.completion'

import {useStore} from '../store'

export function CommandPalette() {
  const [text, setText] = useState('')
  const [completions, setCompletions] = useState<Budget[]>([])

  const {plan, dispatch} = useStore('plan', 'spending')
  const {budgets} = plan?.blueprint

  function onCommand(text: string) {
    const [_cmd, a1] = text.trim().split(' ')
    const [completion] = completions

    dispatch('spending/log', {
      category: completion.category,
      name: completion.name,
      amount: Number(a1),
    })

    setText('')
  }

  function handleChange(text: string) {
    setText(text)

    const [cmd] = text.trim().split(' ')
    const completions = createBudgetCompletion(cmd, budgets)

    const [completion] = completions

    if (!completion) {
      setCompletions([])
      dispatch('plan/deselect')

      return
    }

    setCompletions(completions)

    const {category, name} = completion
    dispatch('plan/select', {category, name})
  }

  return (
    <div
      className="absolute z-20 flex items-center justify-center w-full"
      style={{bottom: 85}}
    >
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={e => handleChange(e.target.value)}
          className="text-2xl px-6 py-2 rounded-full focus:border-transparent outline-none shadow-lg bg-dark text-white"
          onKeyPress={e => e.key === 'Enter' && onCommand(text)}
        />

        {completions.length > 0 && (
          <div
            className="absolute text-white text-xl pointer-events-none opacity-25"
            style={{right: 25, top: 12}}
          >
            {completions[0]?.category}/{completions[0]?.name}
          </div>
        )}
      </div>
    </div>
  )
}
