import * as YAML from 'yaml'
import {mapValues} from 'lodash'

import {parseBudgets} from './budget.parser'

import {BlueprintInputSchema, PlanBlueprint, JarPartition} from '../@types'

const parsePercent = (s: string): number => Number(s.replace(/%/, ''))

const parseJar = (s: string): JarPartition =>
  s.endsWith('%') ? {percent: parsePercent(s)} : {amount: Number(s)}

export function parsePlanBlueprint(yml: string): PlanBlueprint {
  const data: BlueprintInputSchema = YAML.parse(yml)

  return {
    jars: mapValues(data.jars, parseJar),
    investments: mapValues(data.investments, parsePercent),
    budgets: parseBudgets(data.budgets),
  }
}
