import {Budget, Spending} from '../@types'

export const sum = (list: number[]) =>
  Math.round(list.reduce((a, b) => a + b, 0))

export const toLines = (text: string) => text.split('\n').filter(x => x)

export const isNotEmpty = <T>(v: T | null | undefined): v is NonNullable<T> =>
  v !== null && v !== undefined

export const createLinesParser = <T>(transform: (text: string) => T) => (
  text: string
): NonNullable<T>[] => toLines(text).map(transform).filter(isNotEmpty)

/** Get namespaced key "category/name" (e.g. food/dining) */
export const keyOf = <T extends Budget | Spending>(budget: T) =>
  budget.category + '/' + budget.name

export * from './date'
export * from './empty-jar'
export * from './evaluate-plan'
export * from './safe-eval'
