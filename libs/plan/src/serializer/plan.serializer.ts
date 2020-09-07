import * as YAML from 'yaml'
import {mapValues, groupBy, merge} from 'lodash'

import {PlanBlueprint, BlueprintInputSchema, Budget} from '@dotbudget/plan'

const createBudgetMetadata = (budget: Budget): string =>
  [
    budget.isFixed ? 'fixed' : '',
    budget.frequency,
    budget.expression ?? budget.amount,
  ]
    .join(' ')
    .trim()

function transformBudgetsToInputSchema(
  budgets: Budget[]
): BlueprintInputSchema['budgets'] {
  const byCategory = groupBy(budgets, b => b.category)

  return mapValues(byCategory, budgets =>
    budgets
      .map(budget => ({
        jar: budget.jar,
        [budget.name]: createBudgetMetadata(budget),
      }))
      .reduce(merge)
  )
}

export function planBlueprintToYamlSchema(
  blueprint: PlanBlueprint
): BlueprintInputSchema {
  // Append the percentage markers to investments and jars
  const investments = mapValues(blueprint.investments, iv => iv + '%')
  const jars = mapValues(blueprint.jars, j => j.amount ?? j.percent + '%')

  // Transform the budget into the input schema.
  const budgets = transformBudgetsToInputSchema(blueprint.budgets)

  return {budgets, jars, investments}
}

export const serializePlan = (blueprint: PlanBlueprint): string =>
  YAML.stringify(planBlueprintToYamlSchema(blueprint))
