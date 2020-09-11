import {
  evaluatePlanSource,
  evaluatePlan,
  withAmount,
  calculateBudgetByFrequency,
} from '@dotbudget/plan'

import {StoreModule} from '../@types'

import {defaultIconMap} from './data/iconMap'
import {SamplePlanText} from './data/sample-plan-text'

import {InputMode} from '../@types/dashboard/DashboardState'

import {isSelectedBudget} from '../../utils/selection'

function getSelectionInputMode(
  inputMode: InputMode,
  selected: boolean
): InputMode {
  if (!selected) return 'normal'
  if (inputMode === 'normal') return 'spend'

  return inputMode
}

export const PlanModule: StoreModule = store => {
  store.on('@init', () => {
    const budgetable = 200000
    const plan = evaluatePlanSource(SamplePlanText, budgetable)

    return {
      plan: {
        ...plan,
        budgetable,
        selected: null,
        iconMap: defaultIconMap,
        moveTarget: null,
      },
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

    const budgets = blueprint.budgets.map(b => {
      if (!isSelectedBudget(event, b)) return b

      const amount = calculateBudgetByFrequency({
        amount: event.amount,
        frequency: b.frequency,
      })

      return withAmount(b, amount)
    })

    const plan = evaluatePlan({...blueprint, budgets}, budgetable)

    return {plan: {...state.plan, ...plan}}
  })

  store.on('plan/toggle', (state, event) => {
    const prev = state.plan.selected

    const isSame =
      event.name === prev?.name && event.category === prev?.category

    const selected = isSame ? null : event
    const inputMode = getSelectionInputMode(
      state.dashboard.inputMode,
      !!selected
    )

    return {
      plan: {...state.plan, selected},
      dashboard: {...state.dashboard, inputMode},
    }
  })

  store.on('plan/select', (state, event) => ({
    plan: {...state.plan, selected: event},
  }))

  store.on('plan/selectMoveTarget', (state, event) => ({
    plan: {...state.plan, moveTarget: event},
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

  // Input of event.amount is on a monthly basis!
  //
  store.on('plan/moveBudget', (state, event) => {
    const {blueprint, budgetable} = state.plan

    const budgets = blueprint.budgets.map(b => {
      const amount = calculateBudgetByFrequency({
        amount: event.amount,
        frequency: b.frequency,
      })

      if (isSelectedBudget(event.from, b)) {
        return withAmount(b, b.amount - amount)
      }

      if (isSelectedBudget(event.to, b)) {
        return withAmount(b, b.amount + amount)
      }

      return b
    })

    const plan = evaluatePlan({...blueprint, budgets}, budgetable)

    return {plan: {...state.plan, ...plan}}
  })
}
