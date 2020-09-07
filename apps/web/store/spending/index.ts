import {parseSpending, date} from '@dotbudget/plan'

import {StoreModule} from '../@types'

import {spendingToYaml} from './utils/spending-to-yml'
import {SampleSpendingText} from '../../utils/sample-spending-text'

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
      console.warn('Spending Log Parse Error:', {err})

      return state
    }
  })

  store.on('spending/log', (state, event) => {
    const data = [...state.spending.data, {...event, date: date()}]
    const source = spendingToYaml(data)

    return {
      spending: {...state.spending, data, source},
    }
  })
}
