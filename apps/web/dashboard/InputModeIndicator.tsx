import React from 'react'
import c from 'classnames'

import {useStore} from '../store'
import {useInputMode} from '../command-palette/utils/useInputMode'

export const InputModeIndicator: React.FC = () => {
  const {dispatch} = useStore('dashboard')

  const inputMode = useInputMode()
  if (inputMode === 'normal') return null

  const cycleInputMode = () => dispatch('dashboard/cycleInputMode')

  return (
    <button
      className={c(
        'absolute flex items-center justify-center text-lg z-30 px-3 py-1 rounded-full shadow-md cursor-pointer text-center focus:outline-none',
        inputMode === 'plan' && 'text-dark bg-green',
        inputMode === 'spend' && 'text-white bg-gradient-red',
        inputMode === 'move' && 'text-dark bg-orange-500'
      )}
      style={{bottom: 160, left: '50%', transform: 'translateX(-50%)'}}
      onClick={cycleInputMode}
    >
      {inputMode}
    </button>
  )
}
