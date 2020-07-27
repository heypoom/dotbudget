export const frequencies = ['daily', 'weekly', 'monthly', 'yearly'] as const
export type Frequency = typeof frequencies[number]

export const planCategory = [
  'necessity',
  'security',
  'education',
  'lifestyle',
  'dream',
  'investment',
] as const

export type PlanCategory = typeof planCategory[number]
export type BudgetCategoryMap = Record<string, PlanCategory>

export type PlanAllocations = Partial<Record<PlanCategory, number>>

export interface Plan {
  category: PlanCategory
  percent?: number
  fixed?: number
}

export interface Investment {
  category: string
  percent: number
}

export interface Budget {
  isFlexible: boolean
  frequency: Frequency
  category: string
  amount: number
  title: string
}

export interface FinancialPlan {
  plan: Plan[]
  budget: Budget[]
  investment: Investment[]
  budgetCategory: BudgetCategoryMap
}
