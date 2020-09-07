import React, {useCallback} from 'react'
import {debounce} from 'lodash'

import {TextEditor} from './TextEditor'

import {useStore} from '../store'

export function SpendingEditor() {
  const {spending, dispatch} = useStore('spending')

  const handleChange = (text: string) =>
    dispatch('spending/setSourceText', text)

  const debouncedChange = useCallback(debounce(handleChange, 50), [])

  return <TextEditor value={spending.source} onChange={debouncedChange} />
}
