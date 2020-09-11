import {useStore} from '../../store'
import {useInputMode} from 'apps/web/command-palette/utils/useInputMode'

export function useSelectedCard(name: string, category: string) {
  const {plan} = useStore('plan')
  const {selected} = plan
  const isSelected = selected?.name === name && selected?.category === category

  return {isSelected, selected}
}

export function useSelectedMoveTarget(name: string, category: string) {
  const {plan} = useStore('plan')
  const {moveTarget} = plan

  const inputMode = useInputMode()

  const isSelectedMoveTarget =
    moveTarget?.name === name && moveTarget?.category === category

  if (inputMode !== 'move') return {isSelectedMoveTarget: false, moveTarget}

  return {isSelectedMoveTarget, moveTarget}
}
