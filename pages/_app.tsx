import React from 'react'
import '../styles/globals.scss'
import ContextWrapper from "../components/ContextWrapper"

function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  )
}

export default MyApp
