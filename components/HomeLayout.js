import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../utils/theme'
import { GlobalStyles } from '../utils/global'
import { useDarkMode } from '../utils/useDarkMode'
import Navbar from './Navbar'

export default function HomeLayout({ title, description, children }) {
     const [theme, toggleTheme, componentMounted] = useDarkMode()
     const themeMode = theme === 'light' ? lightTheme : darkTheme

     if (!componentMounted) {
       return <div />
     }
    return (
      <div>
        <Head>
          <title>{title ? `${title} - C-Store` : 'C-Store'}</title>
          {description && (
            <meta name='description' content={description}></meta>
          )}
        </Head>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>{children}</main>
        </ThemeProvider>
      </div>
    )
}
