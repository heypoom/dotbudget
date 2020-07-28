import {
  parseFinancialPlan,
  calculateFinancialPlan,
} from '../../../../libs/plan/src'

const PlanFile = `
  necessity 25%
  security 200000
  education 0%
  lifestyle 10%
  dream 5%

  necessity: rent transit food
  lifestyle: travel

  invest in Gold 10%
  invest in Thai Market 10%
  invest in Cash 20%
  invest in Dividend Stocks 20%
  invest in Global Market 40%

  yearly rent 15000 Common Fee
  monthly rent 6000 Rent
  flexible monthly rent 500 Water
  flexible monthly rent 2500 Electricity

  flexible daily transit (10 * 2) Motorcycle
  monthly transit (950 + 500) BTS

  flexible daily food 200 Dining
  flexible daily food 200 Snacks
  flexible monthly food 8000 Cooking
`

export const blueprint = parseFinancialPlan(PlanFile)
export const calculated = calculateFinancialPlan(blueprint, 130000)
