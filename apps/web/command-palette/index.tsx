import React, {useState} from 'react'

import {handleCommand} from './commands/handler'

import {useStore} from '../store'
import {useCommandCompletion} from './completions/hooks/useCompletion.hook'

export function CommandPalette() {
  const [text, setText] = useState('')

  const {dispatch} = useStore('plan', 'spending')
  const {budget, handleCompletionChange} = useCommandCompletion()

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

        {budget && (
          <div
            className="absolute text-white text-xl pointer-events-none opacity-25"
            style={{right: 25, top: 12}}
          >
            {budget.category}/{budget.name}
          </div>
        )}
      </div>
    </div>
  )
}
