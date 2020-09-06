import {omit} from 'lodash'
import {FinancialPlan, Budget, calculateFinancialPlan} from '@dotbudget/plan'

type SyncRow = 'budgets' | 'plans' | 'investments' | 'budgetCategory'

interface SyncContext {
  add<T>(row: SyncRow, data: T): void
  set<T>(row: SyncRow, key: string, value: T): void
  findOne<T extends {id?: string}>(row: SyncRow, key: string, query: string): T
}

export const MockDB: SyncContext = {
  add(row, data) {
    console.log(`Adding to ${row}:`, data)
  },
  set(row, key, value) {
    console.log(`Setting ${row}/${key} to`, value)
  },
  findOne<T>(row: SyncRow, key: string, query: string): T {
    // .where(key, '>=', query) in firestore
    console.log(`//${row}: does ${key} contains ${query}?`)

    return ({a: true} as unknown) as T
  },
}

function syncBudget(budgets: Budget[], db: SyncContext) {
  budgets.forEach(b => {
    const savedBudget = db.findOne<Budget>('budgets', 'title', b.category)

    if (savedBudget?.id) db.set('budgets', savedBudget.id, b)
    else db.add('budgets', b)
  })
}

export function syncFinancialPlan(fp: FinancialPlan, db = MockDB) {
  syncBudget(fp.budget, db)

  fp.plan.forEach(p => db.set('plans', p.category, omit(p, ['category'])))
  fp.investment.forEach(inv => db.set('investments', inv.category, inv.percent))

  for (const category in fp.budgetCategory) {
    db.set('budgetCategory', category, fp.budgetCategory[category])
  }
}
