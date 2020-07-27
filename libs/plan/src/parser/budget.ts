import {frequencies} from '../@types'
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
    isFlexible: !!isFlexible,
    frequency: frequency as Frequency,
    category,
    amount: amount.startsWith('(') ? Number(eval(amount)) : Number(amount),
    title,
  }
}

export const parseBudgets = createLinesParser(parseBudget)
