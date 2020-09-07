import {Jar} from './Jar'

/**
 * The schema of the input YAML file for blueprint.
 * This will need to be transformed into the PlanBlueprint data structure.
 */
export interface BlueprintInputSchema {
  jars: Record<Jar, string | number>
  investments: Record<string, string>
  budgets: Record<string, {jar: Jar} & Record<string, string>>
}

/**
 * The schema of the input YAML file for spending.
 * This will need to be transformed into the Spending array.
 *
 * @example
 * spending:
 *   1/9/2020:
 *     - condo/rent: 20000
 *     - food/snacks: 50
 *     - transit/motorcycle: 10
 *     - food/snacks: 80
 *
 *   5/9/2020:
 *     - condo/water: 500
 *     - transit/motorcycle: 10
 *     - food/dining: 300
 */
export interface SpendingInputSchema {
  spending: Record<string, Record<string, number>[]>
}
