import {flatMap} from 'lodash'

import {ParserError} from './errors'
import {parseFrequency} from './frequency.parser'

import {ParserOf, Budget, Jar, frequencies} from '../@types'
import {safeEvalExpression} from '../utils'

const budgetMetaRegex = new RegExp(
  `(fixed)?\\s?(${frequencies.join('|')}) (.*)`
)

/**
 * Parse string-encoded metadata (e.g. fixed yearly 15000)
 * We can evaluate numerical expressions at the end as well.
 *
 * @example
 * monthly transit (950 + 500 * 2)
 **/
function parseBudgetMetadata(
  item: string
): Pick<Budget, 'isFixed' | 'frequency' | 'amount' | 'expression'> {
  const match = item.match(budgetMetaRegex)

  if (!match) {
    throw new ParserError(`budget information syntax is incorrect: "${item}"`)
  }

  // Always evaluate the last argument as dynamic expression.
  const [_, isFixed, frequency, expression] = match
  const amount = safeEvalExpression(expression)

  return {
    isFixed: !!isFixed,
    frequency: parseFrequency(frequency),
    amount,
    expression,
  }
}

/**
 * Creates the budget object.
 *
 * @param meta string-encoded metadata (e.g. fixed yearly 15000)
 */
const createBudget = (
  jar: Jar,
  category: string,
  name: string,
  meta: string
): Budget => ({name, category, jar, ...parseBudgetMetadata(meta)})

export const parseBudgets: ParserOf<'budgets'> = input =>
  flatMap(input, ({jar, ...record}, category) =>
    flatMap(
      record,
      (meta, name): Budget => createBudget(jar, category, name, meta)
    )
  )
