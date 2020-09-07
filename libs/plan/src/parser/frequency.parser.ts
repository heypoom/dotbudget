import {ParserError} from './errors'

import {frequencies, Frequency} from '../@types'

export function parseFrequency(f: string): Frequency {
  if (!frequencies.includes(f as Frequency)) {
    throw new ParserError(`incorrect budget frequency: "${f}"`)
  }

  return f as Frequency
}
