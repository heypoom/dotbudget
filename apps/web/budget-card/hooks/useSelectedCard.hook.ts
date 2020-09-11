import {useStore} from '../../store'

export function useSelectedCard(name: string, category: string) {
  const {plan} = useStore('plan')
  const {selected} = plan
  const isSelected = selected?.name === name && selected?.category === category

  return {isSelected, selected}
}

export function useSelectedMoveTarget(name: string, category: string) {
  const {plan} = useStore('plan')
  const {moveTarget} = plan
  const isSelectedMoveTarget =
    moveTarget?.name === name && moveTarget?.category === category

  return {isSelectedMoveTarget, moveTarget}
}
