import * as YAML from 'yaml'
import {mapValues, isString} from 'lodash'

import {parseBudgets} from './budget.parser'

import {BlueprintInputSchema, PlanBlueprint, JarPartition} from '../@types'

const parsePercent = (s: string): number => Number(s.replace(/%/, ''))

function parseJar(s: string | number): JarPartition {
  if (isString(s) && s.endsWith('%')) return {percent: parsePercent(s)}

  return {amount: Number(s)}
}

export function parsePlanBlueprint(yml: string): PlanBlueprint {
  const data: BlueprintInputSchema = YAML.parse(yml)

  return {
    jars: mapValues(data.jars, parseJar),
    investments: mapValues(data.investments, parsePercent),
    budgets: parseBudgets(data.budgets),
  }
}

export * from './spending.parser'
export * from './frequency.parser'
export * from './budget.parser'
