import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../utils/theme'
import { GlobalStyles } from '../utils/global'
import Head from 'next/head'
import Navbar from './Navbar'
import { useDarkMode } from '../utils/useDarkMode'
import Footer from './Footer'

export default function Layout({ title, description, children }) {
  const [theme, toggleTheme, componentMounted] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  if (!componentMounted) {
    return <div />
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} - C-Store` : 'C-Store'}</title>
        {description && (
          <meta name='description' content={product.decription}></meta>
        )}
      </Head>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </>
  )
}
