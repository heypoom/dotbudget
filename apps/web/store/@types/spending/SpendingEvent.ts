export interface SpendingEvent {
  'spending/setSourceText': string

  'spending/log': {
    category: string
    name: string
    amount: number
  }
}
