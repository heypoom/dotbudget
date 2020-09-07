export const primaryText = 'text-green'
export const dangerText = 'bg-gradient-red text-gradient text-red'

export const toTextColor = (isDanger: boolean) =>
  isDanger ? dangerText : primaryText

export const primaryBg = 'bg-green'
export const dangerBg = 'bg-gradient-red'

export const toBackground = (isDanger: boolean) =>
  isDanger ? dangerBg : primaryBg
