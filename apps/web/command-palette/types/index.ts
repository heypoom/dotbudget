import {Budget} from '@dotbudget/plan'
import {StoreonDispatch} from 'storeon'

import {StoreEvent} from '../../store/@types'

export interface Command {
  title: string
  aliases: string[]
  onCommand: (context: CommandContext) => void
}

export interface CommandContext {
  budget: Budget
  dispatch: StoreonDispatch<StoreEvent>
  args: string[]
}
