import {Parser as ExprParser} from 'expr-eval'

import {Budget} from '../@types'
import {ParserError} from '../parser/errors'

const exprParser = new ExprParser()

export function safeEvalExpression(expr: string) {
  try {
    return exprParser.evaluate(expr)
  } catch (err) {
    throw new ParserError(
      `unable to evaluate expression: ${expr} -- ${err.message}`
    )
  }
}

export function getExpression(budget: Budget): string {
  if (!budget.expression) return budget.amount.toString()

  // If the result of the evaluation is the same, keep it.
  const result = safeEvalExpression(budget.expression)
  if (result === budget.amount) return budget.expression

  // Otherwise, we update it to keep the expression in sync.
  return budget.amount.toString()
}
