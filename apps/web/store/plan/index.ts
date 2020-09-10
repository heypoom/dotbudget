import {evaluatePlanSource, evaluatePlan, withAmount} from '@dotbudget/plan'

import {StoreModule} from '../@types'

import {defaultIconMap} from './data/iconMap'
import {SamplePlanText} from './data/sample-plan-text'

export const PlanModule: StoreModule = store => {
  store.on('@init', () => {
    const budgetable = 200000
    const plan = evaluatePlanSource(SamplePlanText, budgetable)

    return {
      plan: {...plan, budgetable, selected: null, iconMap: defaultIconMap},
    }
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
        ? withAmount(b, event.amount)
        : b
    )

    const plan = evaluatePlan({...blueprint, budgets}, budgetable)

    return {plan: {...state.plan, ...plan}}
  })

  store.on('plan/toggle', (state, event) => {
    const prev = state.plan.selected

    const isSame =
      event.name === prev?.name && event.category === prev?.category

    const selected = isSame ? null : event
    const {inputMode} = state.dashboard

    return {
      plan: {...state.plan, selected},
      dashboard: {
        ...state.dashboard,
        inputMode: selected
          ? inputMode === 'normal'
            ? 'spend'
            : inputMode
          : 'normal',
      },
    }
  })

  store.on('plan/select', (state, event) => ({
    plan: {...state.plan, selected: event},
  }))

  store.on('plan/deselect', state => ({plan: {...state.plan, selected: null}}))

  store.on('plan/setIcon', (state, event) => {
    console.log(`Set icon> ${event.key} = ${event.icon}`, {state})

    return {
      plan: {
        ...state.plan,
        iconMap: {...state.plan.iconMap, [event.key]: event.icon},
      },
    }
  })
}
