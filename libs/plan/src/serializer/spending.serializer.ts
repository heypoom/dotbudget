import * as YAML from 'yaml'

import {groupBy, mapValues} from 'lodash'
import {Spending, SpendingInputSchema} from '@dotbudget/plan'
import {keyOf} from '../utils'

export function spendingToYamlSchema(input: Spending[]): SpendingInputSchema {
  // Group by date
  const byDate = groupBy(input, s => s.date)

  // Reconstruct into spending
  const spending = mapValues(byDate, r => r.map(c => ({[keyOf(c)]: c.amount})))

  return {spending}
}

export const serializeSpending = (input: Spending[]): string =>
  YAML.stringify(spendingToYamlSchema(input))
