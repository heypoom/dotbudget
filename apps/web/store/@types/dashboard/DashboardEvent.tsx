import {InputMode} from './DashboardState'

export interface DashboardEvent {
  'dashboard/setInputMode': InputMode
  'dashboard/toggleInputMode': InputMode
  'dashboard/cycleInputMode': undefined
}
