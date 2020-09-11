export type InputMode = 'normal' | 'spend' | 'plan' | 'move'

export interface DashboardState {
  dashboard: {
    inputMode: InputMode
  }
}
