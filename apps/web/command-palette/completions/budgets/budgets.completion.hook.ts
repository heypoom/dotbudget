import {useState} from 'react'
import {Budget} from '@dotbudget/plan'

import {createBudgetCompletion} from './budgets.completion'

import {useStore} from '../../../store'

export function useBudgetCompletion() {
  const {plan, dispatch} = useStore('plan', 'spending')
  const {budgets} = plan.blueprint

  const [completions, setCompletions] = useState<Budget[]>([])

  function handleChange(text: string) {
    const [cmd] = text.trim().split(' ')
    const completions = createBudgetCompletion(cmd, budgets)

    const [completion] = completions

    if (!completion) {
      setCompletions([])
      dispatch('plan/deselect')

      return
    }

    setCompletions(completions)

    const {category, name} = completion
    dispatch('plan/select', {category, name})
  }

  return {completions, handleChange}
}
