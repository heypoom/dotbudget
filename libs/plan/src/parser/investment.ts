import {createLinesParser} from '../utils'

import {Investment} from '@dotbudget/plan'

export const investmentRegex = /invest in (.*) (\d+)%/

export function parseInvestment(line: string): Investment {
  const m = line.match(investmentRegex)
  if (!m) return

  const [_, category, percent] = m

  return {category, percent: Number(percent)}
}

export const parseInvestments = createLinesParser(parseInvestment)
