import {evaluatePlanSource, rebuildPlan} from '@dotbudget/plan'

import {StoreModule} from '../@types'

import {SamplePlanText} from '../../utils/sample-plan-text'

export const PlanModule: StoreModule = store => {
  store.on('@init', () => {
    const budgetable = 200000
    const plan = evaluatePlanSource(SamplePlanText, budgetable)

    return {plan: {...plan, budgetable, selected: null}}
  })

  store.on('plan/setPlanSource', (state, event) => {
    const {budgetable} = state.plan

    try {
      const plan = evaluatePlanSource(event, budgetable)

      return {plan: {...state.plan, ...plan}}
    } catch (err) {
      console.warn('Plan Blueprint Parse Error:', {err})

      return state
    }
  })

  store.on('plan/reallocate', (state, event) => {
    const {blueprint, budgetable} = state.plan

    const budgets = blueprint.budgets.map(b =>
      b.name === event.name && b.category === event.category
        ? {...b, amount: event.amount}
        : b
    )

    const plan = rebuildPlan({...blueprint, budgets}, budgetable)

    return {plan: {...state.plan, ...plan}}
  })

  store.on('plan/toggle', (state, event) => {
    const prev = state.plan.selected

    const isSame =
      event.name === prev?.name && event.category === prev?.category

    return {
      plan: {...state.plan, selected: isSame ? null : event},
    }
  })

  store.on('plan/select', (state, event) => ({
    plan: {...state.plan, selected: event},
  }))

  store.on('plan/deselect', state => ({plan: {...state.plan, selected: null}}))
}
