import {createLinesParser} from '../utils'

import {Investment} from '@dotbudget/plan'

export const investmentRegex = /invest in (.*) (\d+)%/

export function parseInvestment(line: string): Investment | null {
  const m = line.match(investmentRegex)
  if (!m) return null

  const [_, category, percent] = m

  return {category, percent: Number(percent)}
}

export const parseInvestments = createLinesParser(parseInvestment)
