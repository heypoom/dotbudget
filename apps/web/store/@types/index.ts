import {StoreonModule} from 'storeon'

import {PlanEvent} from './plan/PlanEvent'
import {PlanState} from './plan/PlanState'

import {SpendingEvent} from './spending/SpendingEvent'
import {SpendingState} from './spending/SpendingState'

export type StoreState = PlanState & SpendingState
export type StoreEvent = PlanEvent & SpendingEvent

export type StoreModule = StoreonModule<StoreState, StoreEvent>
