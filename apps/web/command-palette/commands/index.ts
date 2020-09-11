import {keyOf} from '@dotbudget/plan'

import {withAmount, isNumeric} from './utils'
import {Command} from '../types'
import {createBudgetCompletion} from '../completions'

export const reallocate: Command = {
  title: 'set budget',
  aliases: ['p', 'r', 's', 'set', 'plan', 'reallocate'],
  validate: ([amount]) => isNumeric(amount),
  onCommand: ({budget, args: [amount], dispatch}) =>
    dispatch('plan/reallocate', withAmount(budget, amount)),
}

export const setIcon: Command = {
  title: 'set icon',
  aliases: ['i', 'icon'],
  validate: () => true,
  onCommand: ({dispatch, budget, args: [icon]}) =>
    dispatch('plan/setIcon', {key: keyOf(budget), icon}),
}

export const logSpending: Command = {
  title: 'log spending',
  aliases: ['l', 'a'],
  validate: ([amount]) => isNumeric(amount),
  onCommand: ({dispatch, budget, args: [amount]}) =>
    dispatch('spending/log', withAmount(budget, amount)),
}

export const moveBudget: Command = {
  title: 'move budget',
  aliases: ['m', 'move'],
  validate: ([query, amount]) => isNumeric(amount),
  onCommand: ({dispatch, budget: from, args: [query, amount], store}) => {
    const {budgets} = store.get()?.plan?.blueprint
    const [to] = createBudgetCompletion(query, budgets)
    if (!to) return

    dispatch('plan/moveBudget', {from, to, amount: Number(amount)})
  },
}

export const commandList: Command[] = [
  reallocate,
  setIcon,
  logSpending,
  moveBudget,
]

export * from './handler'
