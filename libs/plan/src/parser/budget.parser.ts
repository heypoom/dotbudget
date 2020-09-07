import {flatMap} from 'lodash'
import {Parser as ExprParser} from 'expr-eval'

import {ParserError} from './errors'
import {parseFrequency} from './frequency.parser'

import {ParserOf, Budget, Jar, frequencies} from '../@types'

const exprParser = new ExprParser()

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
): Pick<Budget, 'isFixed' | 'frequency' | 'amount'> {
  const match = item.match(budgetMetaRegex)

  if (!match) {
    throw new ParserError(`budget information syntax is incorrect: "${item}"`)
  }

  const [_, isFixed, frequency, amountExpression] = match
  const amount = exprParser.evaluate(amountExpression)

  return {isFixed: !!isFixed, frequency: parseFrequency(frequency), amount}
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
  flatMap(input, (record, category) =>
    flatMap(
      record,
      (meta, name): Budget => createBudget(record.jar, category, name, meta)
    )
  )
