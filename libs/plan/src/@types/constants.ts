/** How often are we going to spend money on this item? (e.g. daily, monthly, yearly) */
export const frequencies = ['daily', 'weekly', 'monthly', 'yearly'] as const

/** Jars define how your money is being partitioned. (e.g. necessity, security) */
export const jars = [
  'necessity',
  'security',
  'education',
  'lifestyle',
  'dream',
  'investment',
] as const
