import {StoreonModule} from 'storeon'

import {PlanEvent} from './plan/PlanEvent'
import {PlanState} from './plan/PlanState'

import {SpendingEvent} from './spending/SpendingEvent'
import {SpendingState} from './spending/SpendingState'
import {DashboardState} from './dashboard/DashboardState'
import {DashboardEvent} from './dashboard/DashboardEvent'

type PersistEvent = {'@persist/load': undefined}

export type StoreState = PlanState & SpendingState & DashboardState

export type StoreEvent = PlanEvent &
  SpendingEvent &
  DashboardEvent &
  PersistEvent

export type StoreModule = StoreonModule<StoreState, StoreEvent>
