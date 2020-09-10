import {useStore} from '../../store'

import {InputMode} from '../../store/@types/dashboard/DashboardState'

export function useInputMode(): InputMode {
  const {dashboard} = useStore('dashboard')

  return dashboard.inputMode || 'normal'
}
