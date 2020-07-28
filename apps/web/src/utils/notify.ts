import Noty, {Options} from 'noty'

export function notify(text: string, options: Options) {
  const n = new Noty({text, theme: 'nest', timeout: 1000, ...options})

  n.show()
}

const success = (text: string, o: Options) =>
  notify(text, {type: 'success', ...o})

const info = (text: string, o: Options) => notify(text, {type: 'info', ...o})
const alert = (text: string, o: Options) => notify(text, {type: 'alert', ...o})
const warn = (text: string, o: Options) => notify(text, {type: 'warning', ...o})
const error = (text: string, o: Options) => notify(text, {type: 'error', ...o})

export const Noti = {
  success,
  info,
  alert,
  warn,
  error,
  notify,
}
