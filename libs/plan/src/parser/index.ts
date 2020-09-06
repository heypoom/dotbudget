import * as YAML from 'yaml'

import {BlueprintInputSchema, PlanBlueprint} from '../@types'

export function parsePlanBlueprint(yml: string): PlanBlueprint {
  const data: BlueprintInputSchema = YAML.parse(yml)

  return data
}
