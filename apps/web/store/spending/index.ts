import {parseSpending} from '@dotbudget/plan'

import {StoreModule} from '../@types'

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
}
