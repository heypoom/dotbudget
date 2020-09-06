import {PlanBlueprint} from './PlanBlueprint'
import {BlueprintInputSchema} from './InputSchema'

export type ParserOf<T extends keyof BlueprintInputSchema> = (
  input: BlueprintInputSchema[T]
) => PlanBlueprint[T]
