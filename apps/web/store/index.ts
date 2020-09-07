import {createContext} from 'react'
import {createStoreon} from 'storeon'
import {customContext} from 'storeon/react'
import {persistState} from '@storeon/localstorage'

import {PlanModule} from './plan'
import {SpendingModule} from './spending'

export const store = createStoreon([PlanModule, SpendingModule, persistState()])

export const StoreContext = createContext(store)
export const useStore = customContext(StoreContext)
