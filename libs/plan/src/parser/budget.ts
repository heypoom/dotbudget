import {Parser} from 'expr-eval'

import {frequencies} from '../constants'
import {createLinesParser} from '../utils'

import {Budget, Frequency} from '@dotbudget/plan'

const budgetRegex = new RegExp(
  `(flexible)? ?(${frequencies.join('|')}) (\\w+) (\\d+|\\(.*\\)) (.*)`
)

function parseBudget(line: string): Budget {
  const m = line.match(budgetRegex)
  if (!m) return

  const [_, isFlexible, frequency, category, amount, title] = m

  if (!frequencies.includes(frequency as Frequency)) return

  return {
    title,
    category,

    isFlexible: !!isFlexible,
    frequency: frequency as Frequency,

    amount: amount.startsWith('(')
      ? Number(Parser.evaluate(amount))
      : Number(amount),
  }
}

export const parseBudgets = createLinesParser(parseBudget)
