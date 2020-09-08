import {useBudgetCompletion} from '../budgets'
import {useCommandCompletion} from '../commands'

export function useCompletion() {
  const BudgetCompletion = useBudgetCompletion()
  const CommandCompletion = useCommandCompletion()

  const budgets = BudgetCompletion.completions
  const commands = CommandCompletion.completions

  function handleCompletionChange(text: string) {
    BudgetCompletion.handleChange(text)
    CommandCompletion.handleChange(text)
  }

  return {budgets, commands, handleCompletionChange}
}
