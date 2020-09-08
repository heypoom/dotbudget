import {useValidateCommand} from './useValidateCommand.hook'

import {useBudgetCompletion} from '../budgets'
import {useCommandCompletion} from '../commands'

export function useCompletion() {
  const BudgetCompletion = useBudgetCompletion()
  const CommandCompletion = useCommandCompletion()

  const budgets = BudgetCompletion.completions
  const commands = CommandCompletion.completions

  const CommandValidation = useValidateCommand(budgets, commands)
  const {isInvalid} = CommandValidation

  function handleCompletionChange(text: string) {
    BudgetCompletion.handleChange(text)
    CommandCompletion.handleChange(text)
    CommandValidation.handleChange(text)
  }

  return {budgets, commands, isInvalid, handleCompletionChange}
}
