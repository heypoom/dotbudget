import {Parser} from 'expr-eval'

import {frequencies} from '../constants'
import {createLinesParser} from '../utils'

import {Budget, Frequency} from '@dotbudget/plan'

const budgetRegex = new RegExp(
  `(\\d+) (flexible)? ?(${frequencies.join('|')}) (\\w+) (\\d+|\\(.*\\)) (.*)`
)

function parseBudget(line: string): Budget | null {
  const m = line.match(budgetRegex)
  if (!m) return null

  const [_, id, isFlexible, frequency, category, amount, title] = m

  if (!frequencies.includes(frequency as Frequency)) return null

  return {
    id,
    title,
    category,

    isFlexible: !!isFlexible,
    frequency: frequency as Frequency,

    allocated: amount.startsWith('(')
      ? Number(Parser.evaluate(amount))
      : Number(amount),
  }
}

export const parseBudgets = createLinesParser(parseBudget)
