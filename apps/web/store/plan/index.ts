import {evaluatePlanSource} from './utils/evaluate-plan'

import {SamplePlanText} from '../../utils/sample-plan-text'
import {StoreModule} from '../@types'

export const PlanModule: StoreModule = store => {
  store.on('@init', () => {
    const plan = evaluatePlanSource(SamplePlanText)

    return {plan: {...plan}}
  })

  store.on('plan/setPlanSource', (state, event) => {
    try {
      const plan = evaluatePlanSource(event)

      return {plan: {...state.plan, ...plan}}
    } catch (err) {
      console.warn('Plan Blueprint Parse Error:', {err})

      return state
    }
  })
}
