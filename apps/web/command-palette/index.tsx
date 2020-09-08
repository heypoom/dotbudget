import React, {useState} from 'react'
import c from 'classnames'

import {HintText} from './HintText'

import {useCompletion} from './completions'
import {handleCommand} from './commands'

import {useStore} from '../store'

export function CommandPalette() {
  const [text, setText] = useState('')
  const {dispatch} = useStore('plan', 'spending')

  const {budgets, commands, isInvalid, handleCompletionChange} = useCompletion()
  const [budget] = budgets

  function onCommand(text: string) {
    const success = handleCommand({
      budget,
      dispatch,
      args: text.trim().split(' '),
    })

    if (success) setText('')
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
          className={c(
            'text-2xl px-6 py-2 rounded-full focus:border-transparent outline-none shadow-lg bg-dark text-white',
            isInvalid && 'text-red'
          )}
          onKeyPress={e => e.key === 'Enter' && onCommand(text)}
        />

        <HintText budgets={budgets} commands={commands} />
      </div>
    </div>
  )
}
