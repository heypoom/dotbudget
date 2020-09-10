import {StoreModule} from '../@types'

export const DashboardModule: StoreModule = store => {
  store.on('@init', () => {
    return {dashboard: {inputMode: 'normal'}}
  })

  store.on('dashboard/setInputMode', (state, inputMode) => {
    return {dashboard: {...state.dashboard, inputMode}}
  })

  store.on('dashboard/toggleInputMode', (state, inputMode) => {
    return {
      dashboard: {
        ...state.dashboard,
        inputMode:
          state.dashboard.inputMode === inputMode ? 'normal' : inputMode,
      },
    }
  })
}
