import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../utils/theme'
import { GlobalStyles } from '../utils/global'
import { useDarkMode } from '../utils/useDarkMode'
import { Nav, Navbar, Container, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Toggleswitch from './Toggleswitch'

export default function MyLayout({ title, description, children }) {
   const router = useRouter()
  const [theme, toggleTheme, componentMounted] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  if (!componentMounted) {
    return <div />
  }
 
  return (
    <div>
      <Head>
        <title>{title ? `${title} - C-Store` : 'C-Store'}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Navbar
          expand='lg'
          className='shadow'
          style={{ background: '#000000' }}
        >
          <Container fluid>
            <Link href='/' passHref>
              <Nav.Link
                onClick={() => router.back()}
                className='align-self-center flex-grow-1'
              >
                <i className='bi bi-arrow-left-short'></i>
                Back
              </Nav.Link>
            </Link>
            <Link href='/' passHref>
              <Navbar.Brand className='fw-bold text-uppercase flex-grow-1'>
                XpressWear
              </Navbar.Brand>
            </Link>
            <Nav className='ms-auto'>
              <Toggleswitch toggleTheme={toggleTheme} theme={theme} />
            </Nav>
          </Container>
        </Navbar>
        <main>{children}</main>
        <footer className='p-2' style={{ background: '#080808' }}>
          <Row className='justify-content-md-center'>
            <Col lg={6} md={6}>
              <div className='d-flex justify-content-around align-items-center'>
                <a href='#!' className='text-center'>
                  <small>Privacy policy</small>
                </a>
                <a href='#!' className='text-center'>
                  <small>Legal mentions</small>
                </a>
                <a href='#!' className='text-center'>
                  <small>Terms and conditions</small>
                </a>
              </div>
            </Col>
          </Row>
        </footer>
      </ThemeProvider>
    </div>
  )
}
