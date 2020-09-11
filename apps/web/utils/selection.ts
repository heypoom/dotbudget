import {BudgetSelection} from '../@types/BudgetSelection'

export const isSelectedBudget = (a: BudgetSelection, b: BudgetSelection) =>
  a.name === b.name && a.category === b.category
