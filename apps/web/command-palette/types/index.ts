import {Budget} from '@dotbudget/plan'
import {StoreonDispatch, StoreonStore} from 'storeon'

import {StoreEvent, StoreState} from '../../store/@types'

export interface Command {
  title: string
  aliases: string[]
  onCommand: (context: CommandContext) => void
  validate: (args: string[], context?: CommandContext) => boolean
}

export interface CommandContext {
  budget: Budget
  dispatch: StoreonDispatch<StoreEvent>
  args: string[]
  store: StoreonStore<StoreState, StoreEvent>
}
