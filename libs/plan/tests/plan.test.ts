import * as fs from 'fs'

import {parseFinancialPlan, calculateFinancialPlan} from '../src'

describe('Financial Planner', () => {
  const SampleFile = fs.readFileSync('./libs/plan/tests/sample.budget', 'utf-8')
  const SamplePlan = parseFinancialPlan(SampleFile)

  it('should be able to parse financial plan', () => {
    expect(SamplePlan.budget.length).toBe(9)
    expect(SamplePlan.plan.length).toBe(5)
    expect(SamplePlan.investment.length).toBe(5)
  })

  it('should be able to calculate financial plan', () => {
    const {allocations} = calculateFinancialPlan(SamplePlan, 130000)

    expect(allocations.BTS).toBe(1450)
    expect(allocations.Motorcycle).toBe(600)
  })
})
