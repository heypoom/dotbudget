import {jars} from './constants'

/**
  Jars define how your money is being partitioned. (e.g. necessity, security)

  @example
  jars:
    necessity: 25%
    security: 200000
    education: 0%
    lifestyle: 10%
    dream: 5%
 */
export type Jars = Record<Jar, number>
export type Jar = typeof jars[number]
