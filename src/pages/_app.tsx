import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider, ProtectRoute } from '@/context/auth'
import { Fragment } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <AuthProvider>
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      </AuthProvider>
    </Fragment>)
}
