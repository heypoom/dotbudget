import React, {useState} from 'react'

import {handleCommand} from './commands/handler'

import {useStore} from '../store'
import {useCompletion} from './completions/hooks/useCompletion.hook'
import {HintText} from './HintText'

export function CommandPalette() {
  const [text, setText] = useState('')
  const {dispatch} = useStore('plan', 'spending')

  const {budgets, commands, handleCompletionChange} = useCompletion()
  const [budget] = budgets

  function onCommand(text: string) {
    handleCommand({budget, dispatch, args: text.trim().split(' ')})
    setText('')
  }

  function handleChange(text: string) {
    setText(text)
    handleCompletionChange(text)
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

        <HintText budgets={budgets} commands={commands} />
      </div>
    </div>
  )
}
