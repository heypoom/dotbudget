import {flatMap} from 'lodash'
import {Parser as ExprParser} from 'expr-eval'

import {ParserError} from './errors'
import {parseFrequency} from './frequency.parser'

import {ParserOf, Budget, Jar, frequencies} from '../@types'

const budgetMetaRegex = new RegExp(
  `(fixed)?\\s?(${frequencies.join('|')}) (.*)`
)

const exprParser = new ExprParser()

function safeEval(expr: string) {
  try {
    return exprParser.evaluate(expr)
  } catch (err) {
    throw new ParserError(
      `unable to evaluate expression: ${expr} -- ${err.message}`
    )
  }
}

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
  const amount = safeEval(amountExpression)

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
  flatMap(input, ({jar, ...record}, category) =>
    flatMap(
      record,
      (meta, name): Budget => createBudget(jar, category, name, meta)
    )
  )
