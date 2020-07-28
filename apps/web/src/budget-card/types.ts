import {Budget} from '@dotbudget/plan'

export type CurrentBudget = Budget & {
  spent: number
  emoji: string
}

export type BudgetCardProps = CurrentBudget
