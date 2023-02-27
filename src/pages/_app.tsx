import '../styles/globals.css'
import 'nprogress/nprogress.css'
import 'swiper/css'
import 'swiper/css/navigation'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Layout/Header'
import NProgress from 'nprogress'
import Router from 'next/router'
import Footer from '../components/Layout/Footer'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
})

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeComplete', NProgress.done)
Router.events.on('routeChangeError', NProgress.done)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
