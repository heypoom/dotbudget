import {commandList} from '.'
import {getCommandArity} from './utils'

import {CommandContext} from '../types'
import {createCommandCompletion} from '../completions/commands'

export function handleCommand(context: CommandContext, commands = commandList) {
  // Retrieve the matching command from completion module.
  const [command] = createCommandCompletion(context.args)

  // Slice the arguments to match the receiver.
  const args = context.args.slice(getCommandArity(command))

  // Validate the command before execution
  if (!command.validate(args)) return

  // Finally, execute the command.
  return command.onCommand({...context, args})
}
