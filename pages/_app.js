import React from 'react'
import '../styles/customTheme.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { StoreProvider } from '../utils/store'
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'
import Scrollbutton from '../utils/scrollButton'

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false })

  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })

  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
  const Layout = Component.Layout ? Component.Layout : React.Fragment
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
          integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css'
        ></link>
      </Head>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <Layout>
            <Component {...pageProps} />
            <Scrollbutton />
          </Layout>
        </PayPalScriptProvider>
      </StoreProvider>
    </>
  )
}

export default MyApp
