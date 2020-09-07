import React, {useState} from 'react'

import {useStore} from '../store'

export function CommandPalette() {
  const [text, setText] = useState('')
  const {plan, spending, dispatch} = useStore('plan', 'spending')

  function onCommand(text: string) {
    const [cmd, a1] = text.split(' ')

    if (cmd === 'fd') {
      dispatch('spending/log', {
        category: 'food',
        name: 'dining',
        amount: Number(a1),
      })
    }

    setText('')
  }

  return (
    <div className="fixed z-20" style={{bottom: 60}}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        className="text-3xl px-8 py-2 rounded-full focus:border-transparent outline-none shadow-lg bg-dark text-white"
        onKeyPress={e => e.key === 'Enter' && onCommand(text)}
      />
    </div>
  )
}
