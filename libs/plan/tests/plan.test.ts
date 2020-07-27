import * as fs from 'fs'

import {parseFinancialPlan, calculateFinancialPlan} from '../src'

const SampleFile = fs.readFileSync('./libs/plan/tests/my.budget', 'utf-8')

describe('Financial Planner', () => {
  it('should be able to parse', () => {
    const financialPlan = parseFinancialPlan(SampleFile)
    const calculations = calculateFinancialPlan(financialPlan, 130000)

    console.log(calculations)
  })
})
