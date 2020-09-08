import {commandList, logSpending} from '.'

import {CommandContext} from '../types'

export function handleCommand(context: CommandContext, commands = commandList) {
  const {args} = context

  // Searches for the commands.
  const command = commands.find(cmd => cmd.aliases.includes(args[1]))
  if (command) return command.onCommand({...context, args: args.slice(2)})

  // Simply log the spending by default.
  logSpending.onCommand({...context, args: args.slice(1)})
}
