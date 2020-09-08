import {commandList} from '.'
import {getCommandArity} from './utils'

import {CommandContext, Command} from '../types'
import {createCommandCompletion} from '../completions/commands'

/** Validates the command and returns the sliced arguments. */
export function validateCommand(
  params: string[],
  command: Command
): string[] | null {
  // Slice the arguments to match the receiver.
  const args = params.slice(getCommandArity(command))

  // Validate the command before execution
  if (!command.validate(args)) return null

  return args
}

/** Returns the commands that matches the given arguments . */
export function getMatchingCommand(
  params: string[],
  commands = commandList
): {command: Command; args: string[]} | null {
  // Retrieve the matching command from completion module.
  const [command] = createCommandCompletion(params, commands)
  if (!command) return null

  const args = validateCommand(params, command)
  if (!args) return null

  return {command, args}
}

export function handleCommand(
  context: CommandContext,
  commands = commandList
): boolean {
  // Gets the command that matches the given arguments.
  const item = getMatchingCommand(context.args, commands)
  if (!item) return false

  // Execute the command.
  item.command.onCommand({...context, args: item.args})

  return true
}
