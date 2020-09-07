export const monthYear = (d = new Date()) =>
  d.getUTCMonth() + 1 + '/' + d.getUTCFullYear()

export const date = (d = new Date()) => d.getUTCDate() + '/' + monthYear(d)
