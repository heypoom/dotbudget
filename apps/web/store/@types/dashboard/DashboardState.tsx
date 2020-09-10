export type InputMode = 'normal' | 'spend' | 'plan'

export interface DashboardState {
  dashboard: {
    inputMode: InputMode
  }
}
