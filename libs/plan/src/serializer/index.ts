import {serializePlan, serializeSpending} from '..'

export {serializePlan} from './plan.serializer'
export {serializeSpending} from './spending.serializer'

export const Serialize = {
  /** Serialize plan into YAML */
  plan: serializePlan,

  /** Serialize spending into YAML */
  spending: serializeSpending,
}
