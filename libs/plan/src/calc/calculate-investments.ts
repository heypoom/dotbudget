import {mapValues} from 'lodash'

import {Investments} from '../@types'

export const calculateInvestments = (
  investments: Investments,
  remaining: number
): Investments => mapValues(investments, percent => (percent / 100) * remaining)
