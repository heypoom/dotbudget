import {keyOf} from '@dotbudget/plan'

import {Command} from '../types'

export const reallocate: Command = {
  title: 'reallocate budget',
  aliases: ['p', 'r', 'plan', 'reallocate'],
  onCommand: ({budget: {category, name}, args: [amount], dispatch}) =>
    dispatch('plan/reallocate', {category, name, amount: Number(amount)}),
}

export const setIcon: Command = {
  title: 'set icon',
  aliases: ['i', 'icon'],
  onCommand: ({dispatch, budget, args: [icon]}) =>
    dispatch('plan/setIcon', {key: keyOf(budget), icon}),
}

export const logSpending: Command = {
  title: 'log spending',
  aliases: ['l'],
  onCommand: ({dispatch, budget: {category, name}, args: [amount]}) =>
    dispatch('spending/log', {category, name, amount: Number(amount)}),
}

export const commandList: Command[] = [reallocate, setIcon, logSpending]
