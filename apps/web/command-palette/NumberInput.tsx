import React, {useState, useRef, useEffect} from 'react'

import {TextField} from './TextField'

import {isNumeric} from './commands/utils'
import {useInputMode} from './utils/useInputMode'

import {useStore} from '../store'
import {InputMode} from '../store/@types/dashboard/DashboardState'

export function NumberInput() {
  const {plan} = useStore('plan')
  const {dispatch} = useStore('plan', 'spending', 'dashboard')
  const inputMode = useInputMode()

  const {selected, moveTarget} = plan

  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const isNotNumber = !isNumeric(input) && !!input
  const isInvalid = !selected || isNotNumber

  const clear = () => window.setTimeout(() => setInput(''), 20)

  function toggleMode(m: InputMode) {
    dispatch('dashboard/toggleInputMode', m)
    clear()
  }

  // Re-focus when the item is selected.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selected || !inputRef.current) return

      inputRef.current.focus()
      setInput('')
    })

    return () => clearTimeout(timer)
  }, [selected])

  if (inputMode === 'normal') return null

  function handleSubmit(text: string) {
    if (isInvalid || !selected) return

    const amount = Number(text)
    const payload = {...selected, amount}

    setInput('')

    if (inputMode === 'plan') {
      dispatch('plan/reallocate', payload)
    } else if (inputMode === 'spend') {
      dispatch('spending/log', payload)
    } else if (inputMode === 'move') {
      if (!moveTarget) return

      dispatch('plan/moveBudget', {from: selected, to: moveTarget, amount})
    }
  }

  const placeholders: Record<InputMode, string> = {
    normal: '',
    plan: 'Set budget to...',
    spend: 'Log spending of...',
    move: 'Move spending of...',
  }

  function handleKeyPress(key: string) {
    console.log('KeyPress:', {key, inputMode})

    if (key === 'p') return toggleMode('plan')
    if (key === 'l' || key === 's') return toggleMode('spend')
    if (key === 'm') return toggleMode('move')

    if (isNotNumber) return console.log('key not number:', {key})
    // dispatch('dashboard/setInputMode', 'normal')
  }

  const placeholder = selected ? placeholders[inputMode] : 'Select a budget...'

  return (
    <TextField
      value={input}
      onChange={setInput}
      onEnter={handleSubmit}
      onKeyPress={handleKeyPress}
      isInvalid={isInvalid}
      placeholder={placeholder}
      ref={inputRef}
    />
  )
}
