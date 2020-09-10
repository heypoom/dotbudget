import React from 'react'
import c from 'classnames'

import {useInputMode} from '../command-palette/utils/useInputMode'

export const InputModeIndicator: React.FC = () => {
  const inputMode = useInputMode()
  if (inputMode === 'normal') return null

  return (
    <div
      className={c(
        'absolute text-xl z-30 px-4 py-1 rounded-full shadow-md cursor-pointer text-center',
        inputMode === 'plan' && 'text-dark bg-green',
        inputMode === 'spend' && 'text-white bg-gradient-red'
      )}
      style={{top: 20, left: '50%', transform: 'translateX(-50%)'}}
    >
      {inputMode}
    </div>
  )
}
