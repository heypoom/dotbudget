import {Budget} from '@dotbudget/plan'

export type BudgetSelection = Pick<Budget, 'category' | 'name'>
export type BudgetWithAmount = BudgetSelection & Pick<Budget, 'amount'>
