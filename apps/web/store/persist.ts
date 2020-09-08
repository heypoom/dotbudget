import {StoreonStore} from 'storeon'

import {StoreState, StoreEvent} from './@types'
import {debounce} from 'lodash'

export const PersistModule = (
  config: {key?: string; storage?: Storage} = {}
) => {
  if (typeof window === 'undefined') return false

  const {key = 'storeon', storage = localStorage} = config

  const onChange = (state: StoreState) => {
    try {
      storage.setItem(key, JSON.stringify(state))
    } catch (err) {
      return
    }
  }

  const debouncedChange = debounce(onChange, 800)

  return (store: StoreonStore<StoreState, StoreEvent>) => {
    store.on('@changed', debouncedChange)

    store.on('@persist/load', () => {
      const savedState = storage.getItem(key)

      if (savedState) {
        try {
          console.log(`[Persist] Load ->`, {state: JSON.parse(savedState)})
          return JSON.parse(savedState)
        } catch (err) {
          return {}
        }
      }
    })

    store.on('@init', () => {
      setTimeout(() => store.dispatch('@persist/load'), 300)
    })
  }
}
