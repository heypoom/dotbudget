import React from 'react'
import {AppProps} from 'next/app'
import Head from 'next/head'

import '../styles/index.scss'
import '../styles/fonts.scss'

const App = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <Head>
        <title>Dotbudget</title>
      </Head>

      <div className="app">
        <main>
          <Component {...pageProps} />
        </main>
      </div>

      <script
        src="https://kit.fontawesome.com/11f4643241.js"
        crossOrigin="anonymous"
      ></script>
    </>
  )
}

export default App
