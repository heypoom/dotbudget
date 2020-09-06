import * as YAML from 'yaml'
import {mapValues} from 'lodash'

import {parseBudgets} from './budget.parser'

import {BlueprintInputSchema, PlanBlueprint} from '../@types'

const parsePercent = (s: string): number => Number(s.replace(/%/, ''))

export function parsePlanBlueprint(yml: string): PlanBlueprint {
  const data: BlueprintInputSchema = YAML.parse(yml)

  return {
    jars: mapValues(data.jars, Number),
    investments: mapValues(data.investments, parsePercent),
    budgets: parseBudgets(data.budgets),
  }
}
