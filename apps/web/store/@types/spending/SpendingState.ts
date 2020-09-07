import {Spending} from '@dotbudget/plan'

export interface SpendingState {
  spending: {
    source: string
    data: Spending[]
  }
}
