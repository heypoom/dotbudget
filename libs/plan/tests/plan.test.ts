import * as fs from 'fs'

import {parseFinancialPlan, calculateFinancialPlan} from '@dotbudget/plan'

describe('Financial Planner', () => {
  it('should be able to parse', () => {
    const text = fs.readFileSync('./my.budget', 'utf-8')

    const financialPlan = parseFinancialPlan(text)
    const calculations = calculateFinancialPlan(financialPlan, 130000)

    console.log(calculations)
  })
})
