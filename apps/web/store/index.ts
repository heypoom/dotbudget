import {createContext} from 'react'
import {createStoreon} from 'storeon'
import {customContext} from 'storeon/react'

import {PlanModule} from './plan'
import {SpendingModule} from './spending'
import {PersistModule} from './persist'

export const store = createStoreon([
  PlanModule,
  SpendingModule,
  PersistModule(),
])

export const StoreContext = createContext(store)
export const useStore = customContext(StoreContext)
