import {useHotkeys} from 'react-hotkeys-hook'

import {useStore} from '../../store'

import {InputMode} from '../../store/@types/dashboard/DashboardState'

export function useShortcut() {
  const {dispatch} = useStore('dashboard')

  const toggleInputMode = (mode: InputMode) => () => {
    dispatch('dashboard/toggleInputMode', mode)

    console.log('dashboard/toggleInputMode:', mode)
  }

  useHotkeys('p', toggleInputMode('plan'), [])
  useHotkeys('l,s', toggleInputMode('spend'), [])
  useHotkeys('m', toggleInputMode('move'), [])
  useHotkeys('c', () => dispatch('dashboard/cycleInputMode'))
}
