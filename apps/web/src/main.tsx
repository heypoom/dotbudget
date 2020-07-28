import './polyfills'

import React from 'react'
import ReactDOM from 'react-dom'

import {App} from './components/App'

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept(error => {
    if (error) return console.log('[HMR] Error:', error)

    console.log('[HMR] Reloaded')
  })
}
