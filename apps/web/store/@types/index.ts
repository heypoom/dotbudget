import {StoreonModule} from 'storeon'

import {PlanEvent} from './plan/PlanEvent'
import {PlanState} from './plan/PlanState'

import {SpendingEvent} from './spending/SpendingEvent'
import {SpendingState} from './spending/SpendingState'

type PersistEvent = {'@persist/load': undefined}

export type StoreState = PlanState & SpendingState
export type StoreEvent = PlanEvent & SpendingEvent & PersistEvent

export type StoreModule = StoreonModule<StoreState, StoreEvent>
