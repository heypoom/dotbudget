import {FinancialPlan, Budget, calculateFinancialPlan} from '@dotbudget/plan'

type SyncRow = 'budgets' | 'plans' | 'investments' | 'budgetCategory'

interface SyncContext {
  add<T>(row: SyncRow, data: T): void
  set<T>(row: SyncRow, key: string, value: T): void
}

export const MockDB: SyncContext = {
  add<T>(row: SyncRow, data: T) {
    console.log(`Adding ${row} ->`, {data})
  },
  set<T>(row: SyncRow, key: string, value: T) {
    console.log(`Setting ${key} to ${value}`)
  },
}

export function syncFinancialPlan(fp: FinancialPlan, db = MockDB) {
  fp.budget.forEach(b => db.add('budgets', b))
  fp.plan.forEach(p => db.set('plans', p.category, p))
  fp.investment.forEach(inv => db.set('investments', inv.category, inv.percent))

  for (const category in fp.budgetCategory) {
    db.set('budgetCategory', category, fp.budgetCategory[category])
  }
}
