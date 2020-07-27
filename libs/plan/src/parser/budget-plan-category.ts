import {toLines} from '../utils'
import {planCategory} from '../constants'

import {PlanCategory, BudgetCategoryMap} from '@dotbudget/plan'

const categorizeBudgetRegex = new RegExp(`(${planCategory.join('|')})\\: (.*)`)

export function parseBudgetCategory(text: string): BudgetCategoryMap {
  const category: BudgetCategoryMap = {}

  for (const line of toLines(text)) {
    const m = line.match(categorizeBudgetRegex)
    if (!m) continue

    const [_, type, categories] = m

    for (const c of categories.split(' ')) {
      if (!planCategory.includes(type as PlanCategory)) return

      category[c] = type as PlanCategory
    }
  }

  return category
}
