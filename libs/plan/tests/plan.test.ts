import * as fs from 'fs'

import {parsePlanBlueprint, calculateFinancialPlan} from '../src'

describe('Financial Planner', () => {
  const SampleFile = fs.readFileSync('./plan.yml', 'utf-8')

  it('should be able to parse financial plan', () => {
    const plan = parsePlanBlueprint(SampleFile)
    plan //?

    expect(plan.budget.length).toBe(9)
    expect(plan.plan.length).toBe(5)
    expect(plan.investment.length).toBe(5)
  })

  it('should be able to calculate financial plan', () => {
    const plan = parsePlanBlueprint(SampleFile)
    const {allocations} = calculateFinancialPlan(plan, 130000)

    allocations //?

    expect(allocations.BTS).toBe(1450)
    expect(allocations.Motorcycle).toBe(600)
  })
})
