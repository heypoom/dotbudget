import React from 'react'
import c from 'classnames'

interface TextFieldProps {
  value: string
  onChange: (text: string) => void
  onEnter: (text: string) => void

  onKeyPress?: (key: string) => void
  isInvalid?: boolean
  className?: string
  bottom?: number
  placeholder?: string
  autoFocus?: boolean

  children?: JSX.Element
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const containerStyle = {bottom: props.bottom ?? 85}

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter') props.onEnter(props.value)

      props.onKeyPress?.(e.key)
    }

    return (
      <div
        className="absolute z-20 flex items-center justify-center w-full"
        style={containerStyle}
      >
        <div className="relative">
          <input
            type="text"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className={c(
              'text-2xl px-6 py-2 rounded-full focus:border-transparent outline-none shadow-lg bg-dark text-white',
              props.isInvalid && 'text-red placeholder-red',
              props.className
            )}
            onKeyPress={handleKeyPress}
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            ref={ref}
          />

          {props.children}
        </div>
      </div>
    )
  }
)
