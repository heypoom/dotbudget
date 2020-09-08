import {commandList, logSpending} from '../../commands'

export function createCommandCompletion(
  args: string[],
  commands = commandList
) {
  const [arg0, arg1] = args
  if (!arg0 || !arg1) return []

  // Search for completion by aliases and title.
  const completions = commands.filter(
    cmd => cmd.aliases.includes(arg1) || cmd.title.startsWith(arg1)
  )

  // Return if we found some completions
  if (completions.length > 0) return completions

  // Otherwise, if arg1 is a number, return the Log Spending action.
  if (logSpending.validate([arg1])) return [logSpending]

  return []
}
