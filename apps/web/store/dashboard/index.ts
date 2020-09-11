import {StoreModule} from '../@types'
import {InputMode} from '../@types/dashboard/DashboardState'

function getNextInputModeInCycle(inputMode: InputMode): InputMode {
  const cycles: InputMode[] = ['normal', 'plan', 'spend', 'move']
  const index = cycles.findIndex(i => i === inputMode)
  const nextIndex = index > 2 ? 0 : index + 1

  return cycles[nextIndex] ?? 'normal'
}

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
    const inputMode = getNextInputModeInCycle(state.dashboard.inputMode)

    return {dashboard: {...state.dashboard, inputMode}}
  })
}
