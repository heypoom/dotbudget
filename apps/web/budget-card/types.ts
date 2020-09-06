import {Budget} from '@dotbudget/plan'

export type CurrentBudget = Budget & {
  spent?: number
  icon?: string
}

export type BudgetCardProps = CurrentBudget
