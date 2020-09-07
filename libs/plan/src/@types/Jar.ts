import {jars} from './constants'

/**
  Jars define how your money is being partitioned. (e.g. necessity, security)

  @example
  jars:
    necessity: 25%
    security: 50000
    education: 0%
    lifestyle: 10%
    dream: 5%
 */
export type Jars = Record<Jar, JarPartition>
export type Jar = typeof jars[number]

/**
 * How do we want to allocate the money for this jar?
 * We can either allocate as percentage OR as a fixed amount.
 **/
export type JarPartition = {percent?: number; amount?: number}
