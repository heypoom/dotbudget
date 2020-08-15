import * as fs from 'fs'

import {parseFinancialPlan, calculateFinancialPlan} from '@dotbudget/plan'

describe('Data Synchronizer', () => {
  const SampleFile = fs.readFileSync('./libs/plan/tests/sample.budget', 'utf-8')

  it('should be able to sync financial plan', () => {
    const financialPlan = parseFinancialPlan(SampleFile)
    const calculatedPlan = calculateFinancialPlan(financialPlan, 130000)
    const {allocations} = calculatedPlan

    allocations //?

    expect(allocations.BTS).toBe(1450)
    expect(allocations.Motorcycle).toBe(600)
  })
})
