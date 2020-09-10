import React, {useState} from 'react'

import {HintText} from './HintText'
import {TextField} from './TextField'

import {useCompletion} from './completions'
import {handleCommand} from './commands'
import {useInputMode} from './utils/useInputMode'

import {useStore} from '../store'
import {NumberInput} from './NumberInput'

export function CommandPalette() {
  const [text, setText] = useState('')
  const {dispatch} = useStore('plan', 'spending')

  const {budgets, commands, isInvalid, handleCompletionChange} = useCompletion()
  const [budget] = budgets

  const inputMode = useInputMode()
  if (inputMode === 'plan' || inputMode === 'spend') return <NumberInput />

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

  const hint = <HintText budgets={budgets} commands={commands} />
  const noHint = budgets.length === 0 && commands.length === 0

  return (
    <TextField
      value={text}
      onChange={handleChange}
      onEnter={onCommand}
      isInvalid={isInvalid && !!text}
      children={hint}
      placeholder={noHint ? 'Enter a command...' : ''}
    />
  )
}
