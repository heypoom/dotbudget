import {useBudgetCompletion} from '../budgets'

export function useCommandCompletion() {
  const BudgetCompletion = useBudgetCompletion()

  const [budget] = BudgetCompletion.completions

  function handleCompletionChange(text: string) {
    BudgetCompletion.handleChange(text)
  }

  return {budget, handleCompletionChange}
}
