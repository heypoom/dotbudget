import {frequencies, jars} from '../constants'

export type Frequency = typeof frequencies[number]

export type Jars = typeof jars[number]
export type BudgetCategoryMap = Record<string, Jars>

export type PlanAllocations = Partial<Record<Jars, number>>

export interface Plan {
  category: Jars
  percent?: number
  fixed?: number
}

export interface Investment {
  category: string
  percent: number
}

export interface Budget {
  id: string
  isFlexible: boolean
  frequency: Frequency
  category: string
  allocated: number
  title: string
}

export interface PlanBlueprint {
  plan: Plan[]
  budget: Budget[]
  investment: Investment[]
  budgetCategory: BudgetCategoryMap
}

interface Meta {
  id: number
}

export type WithMeta<T> = T & Meta
