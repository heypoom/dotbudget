import {createContext} from 'react'
import {createStoreon} from 'storeon'
import {customContext} from 'storeon/react'

import {PlanModule} from './plan'
import {SpendingModule} from './spending'

export const store = createStoreon([PlanModule, SpendingModule])

export const StoreContext = createContext(store)
export const useStore = customContext(StoreContext)
