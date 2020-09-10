import {StoreModule} from '../@types'

export const DashboardModule: StoreModule = store => {
  store.on('@init', () => {
    return {dashboard: {inputMode: 'normal'}}
  })

  store.on('dashboard/setInputMode', (state, inputMode) => {
    return {dashboard: {...state.dashboard, inputMode}}
  })

  store.on('dashboard/toggleInputMode', (state, event) => {
    const inputMode = state.dashboard.inputMode === event ? 'normal' : event

    return {dashboard: {...state.dashboard, inputMode}}
  })

  store.on('dashboard/cycleInputMode', state => {
    const inputMode = state.dashboard.inputMode === 'plan' ? 'spend' : 'plan'

    return {dashboard: {...state.dashboard, inputMode}}
  })
}
