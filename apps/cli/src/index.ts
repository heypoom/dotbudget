import * as fs from 'fs'
import * as process from 'process'

import {parsePlanBlueprint} from '../../../libs/plan/src'

import {syncFinancialPlan} from '../../../libs/sync/src'

const [_, _2, fileName] = process.argv

if (!fileName) {
  console.log('[!] File name is missing.')

  process.exit(0)
}

const fileContent = fs.readFileSync(fileName, 'utf-8')

const plan = parsePlanBlueprint(fileContent)
syncFinancialPlan(plan)

fs.writeFileSync('./plan.json', JSON.stringify(plan, null, 2))
