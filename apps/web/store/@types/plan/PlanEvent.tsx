export interface PlanEvent {
  'plan/setPlanSource': string

  'plan/reallocate': {
    category: string
    name: string
    amount: number
  }
}
