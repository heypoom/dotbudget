import {useStore} from '../../store'

export function useSelectedCard(name: string, category: string) {
  const {plan} = useStore('plan')
  const {selected} = plan
  const isSelected = selected?.name === name && selected?.category === category

  return {isSelected, selected}
}
