import {createContext} from 'react'
import {createStoreon} from 'storeon'
import {customContext} from 'storeon/react'

import {PlanModule} from './plan'

export const store = createStoreon([PlanModule])

export const StoreContext = createContext(store)
export const useStore = customContext(StoreContext)
