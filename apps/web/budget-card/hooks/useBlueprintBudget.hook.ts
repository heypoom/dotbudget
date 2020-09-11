import {useMemo} from 'react'
import {Budget} from '@dotbudget/plan'

import {useStore} from '../../store'
import {BudgetSelection} from '../../@types/BudgetSelection'

import {isSelectedBudget} from '../../utils/selection'

export function useBlueprintBudget(
  budget: BudgetSelection
): Budget | undefined {
  const {plan} = useStore('plan')
  const {budgets} = plan?.blueprint

  return useMemo(() => {
    return budgets.find(b => isSelectedBudget(b, budget))
  }, [budget, budgets])
}
