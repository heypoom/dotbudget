import {parseSpending, date, serializeSpending} from '@dotbudget/plan'

import {SampleSpendingText} from './data/sample-spending-text'

import {StoreModule} from '../@types'
import {isSelectedBudget} from 'apps/web/utils/selection'

export const SpendingModule: StoreModule = store => {
  store.on('@init', () => {
    const source = SampleSpendingText
    const data = parseSpending(source)

    return {spending: {data, source}}
  })

  store.on('spending/setSourceText', (state, event) => {
    try {
      const data = parseSpending(event)

      return {spending: {...state.spending, data, source: event}}
    } catch (err) {
      return state
    }
  })

  store.on('spending/log', (state, event) => {
    const {budgets} = state.plan.blueprint

    const data = [...state.spending.data, {...event, date: date()}]
    const source = serializeSpending(data)

    const budget = budgets.find(b => isSelectedBudget(b, event))

    if (budget?.isFixed) return

    return {
      spending: {...state.spending, data, source},
    }
  })
}
