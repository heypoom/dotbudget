import * as YAML from 'yaml'
import {flatMap} from 'lodash'
import {SpendingInputSchema} from '@dotbudget/plan'

import {Spending} from '../@types'

/**
 * Parses the spending yaml input.
 */
export function parseSpending(input: string): Spending[] {
  const data: SpendingInputSchema = YAML.parse(input)
  if (!data.spending) return []

  return flatMap(data.spending, (records, date) =>
    flatMap(records, record =>
      flatMap(record, (amount, key) => {
        const [category, name] = key.split('/')

        return {date, category, name, amount}
      })
    )
  )
}
