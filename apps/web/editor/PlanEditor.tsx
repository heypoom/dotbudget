import React, {useCallback} from 'react'
import {debounce} from 'lodash'

import {TextEditor} from './TextEditor'

import {useStore} from '../store'

export function PlanEditor() {
  const {plan, dispatch} = useStore('plan')

  const handleChange = (text: string) => dispatch('plan/setPlanSource', text)
  const debouncedChange = useCallback(debounce(handleChange, 500), [])

  return <TextEditor value={plan.source} onChange={debouncedChange} />
}
