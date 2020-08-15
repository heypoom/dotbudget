import {planCategory} from '../constants'
import {createLinesParser} from '../utils'

import {Plan, PlanCategory} from '@dotbudget/plan'

export const planRegex = new RegExp(`(${planCategory.join('|')}) (\\w+%?)`)

export function parsePlan(line: string): Plan | null {
  const m = line.match(planRegex)
  if (!m) return null

  const [_, _category, amount] = m
  const category = _category as PlanCategory

  if (amount.endsWith('%')) {
    return {category, percent: Number(amount.replace('%', ''))}
  }

  return {category, fixed: Number(amount)}
}

export const parsePlans = createLinesParser(parsePlan)
