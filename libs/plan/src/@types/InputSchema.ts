import {Jar} from './Jar'

/**
 * The schema of the input YAML file.
 * This will need to be transformed into the PlanBlueprint data structure.
 */
export interface BlueprintInputSchema {
  jars: Record<Jar, string | number>
  investments: Record<string, string>
  budgets: Record<string, {jar: Jar} & Record<string, string>>
}
