import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/auth'
import { Fragment } from 'react'
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Fragment>
  );
}
