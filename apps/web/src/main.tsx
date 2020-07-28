import './polyfills'

import React from 'react'
import ReactDOM from 'react-dom'

import {App} from '~components/App'

import {Noti} from '~utils/notify'

ReactDOM.render(<App />, document.getElementById('root'))

window.Noti = Noti

if (module.hot) {
  module.hot.accept(error => {
    if (error) return console.log('[HMR] Error:', error)

    console.log('[HMR] Reloaded')

    Noti.success('HMR Reloaded!', {timeout: 100})
  })
}
