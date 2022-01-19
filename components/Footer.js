import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Paypal from '../public/paypal-seeklogo.com.svg'
import Stripe from '../public/stripe-seeklogo.com.svg'
import Pay from '../public/nigeria-naira-currency-symbol-svgrepo-com.svg'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='py-2' style={{ background: '#080808' }}>
      <Container className='mt-3'>
        <Row className='justify-content-evenly'>
          <Col lg={7} md={7} className='mb-2'>
            <div className='d-md-flex text-center text-md-start'>
              <p className='mx-4 cart-title'>Follow us:</p>
              <div>
                <i className='bi bi-twitter mx-3 text-info'></i>
                <i className='bi bi-instagram mx-3 text-info'></i>
                <i className='bi bi-facebook mx-3 text-info'></i>
                <i className='bi bi-whatsapp mx-3 text-info'></i>
              </div>
            </div>
          </Col>
          <Col lg={4} md={5} className='mb-2'>
            <div className='text-center text-md-end'>
              <Button variant='dark' size='lg'>
                <small>Subscribe to our Newsletter</small>
              </Button>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-evenly mt-2 mb-4'>
          <Col lg={7} md={7}>
            <div
              style={{ background: '#1a1a1a', borderRadius: '4px' }}
              className='p-3'
            >
              <div>
                <p className='cart-title'>clothing</p>
                <div className='d-flex justify-content-between mb-3'>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0'>
                      <li>
                        <a href='#!'>sweater</a>
                      </li>
                      <li>
                        <a href='#!'>chinos</a>
                      </li>
                      <li>
                        <a href='#!'>jeans</a>
                      </li>
                      <li>
                        <a href='#!'>belts</a>
                      </li>
                      <li>
                        <a href='#!'>wristwatches</a>
                      </li>
                      <li>
                        <a href='#!'>bracelets</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0'>
                      <li>
                        <a href='#!'>glasses</a>
                      </li>
                      <li>
                        <a href='#!'>jackets</a>
                      </li>
                      <li>
                        <a href='#!'>shoes</a>
                      </li>
                      <li>
                        <a href='#!'>sneakers</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0 '>
                      <li>
                        <a href='#!'>men underwear</a>
                      </li>
                      <li>
                        <a href='#!'>female underwear</a>
                      </li>
                      <li>
                        <a href='#!'>jwelry</a>
                      </li>
                      <li>
                        <a href='#!'>sweat pants</a>
                      </li>
                    </ul>
                  </Col>
                </div>
              </div>
              <div>
                <p className='cart-title'>learn more</p>
                <div className='d-flex justify-content-between mb-3'>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0 '>
                      <li>
                        <a href='#!'>returns & exchange</a>
                      </li>
                      <li>
                        <a href='#!'>deliver & handling</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-3'>
                      <li>
                        <a href='#!'>about us</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0 '>
                      <li>
                        <a href='#!'>product care </a>
                      </li>
                    </ul>
                  </Col>
                </div>
              </div>
              <div>
                <p className='cart-title'>brand</p>
                <div className='d-flex justify-content-between mb-3'>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0 '>
                      <li>
                        <a href='#!'>gucci</a>
                      </li>
                      <li>
                        <a href='#!'>dior</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0 '>
                      <li>
                        <a href='#!'>patek</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0 '>
                      <li>
                        <a href='#!'>roca</a>
                      </li>
                    </ul>
                  </Col>
                </div>
              </div>
            </div>
            <div
              style={{ background: '#1a1a1a', borderRadius: '4px' }}
              className='p-3 mt-4 mb-4'
            >
              <div>
                <p className='cart-title'>bits</p>
                <div className='d-flex justify-content-between mb-3'>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0 '>
                      <li>
                        <a href='#!'>contact us</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0 '>
                      <li>
                        <a href='#!'>giveaways</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={3} md={3}>
                    <ul className='list-unstyled mb-0 '>
                      <li>
                        <a href='#!'>shipping</a>
                      </li>
                    </ul>
                  </Col>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4} md={5} className=''>
            <div
              className='mt-2 cart-text py-3 px-4'
              style={{ background: '#1a1a1a', borderRadius: '4px' }}
            >
              <p>company</p>
              <div className='d-flex'>
                <i className='bi bi-envelope-fill text-info mx-2'></i>
                <div className='mb-0'>
                  <p className='mb-0'>shop@xpresswear.com</p>
                  <a href='#!'>
                    {' '}
                    <p className='text-info'>contact us </p>
                  </a>
                </div>
              </div>
              <div className='d-flex'>
                <i className='bi bi-emoji-sunglasses-fill text-info mx-2'></i>
                <div className='mb-0'>
                  <p className='mb-0'>xpresswear</p>
                  <p className='mb-0'>P.O. Box 98190</p>
                  <p className='mb-0'>21 Jump street</p>
                  <p className='mb-0'>Lagos</p>
                </div>
              </div>
            </div>
            <div
              className='mt-4 cart-text py-3 px-4'
              style={{ background: '#1a1a1a', borderRadius: '4px' }}
            >
              <p>payment methods</p>
              <div className='d-flex justify-content-center'>
                <Image
                  src={Paypal}
                  width={90}
                  height={30}
                  alt='paypal'
                  title='paypal'
                  className='bg-white p-2'
                />
                <Image
                  src={Stripe}
                  width={90}
                  height={30}
                  alt='stripe'
                  title='stripe'
                  className='mx-2'
                />
                <Image
                  src={Pay}
                  width={90}
                  height={30}
                  alt='stripe'
                  title='pay on delivery'
                  className='mx-2 bg-white'
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-evenly'>
          <Col lg={6} md={4} xs={12}>
            <div className='cart-title align-items-center'>
              <small> &copy;{new Date().getFullYear()} Copyright:</small>
              <a
                className='mx-1 cart-title'
                href='https://react-bootstrap.github.io/'
              >
                <small>XpressWear</small>
              </a>
            </div>
          </Col>
          <Col lg={5} md={8}>
            <div className='d-flex justify-content-md-end align-items-center'>
              <a href='#!' passHref>
                <p className='cart-title'>
                  <small>Refund Policy</small>{' '}
                </p>
              </a>
              <a href='#!' passHref>
                <p className='cart-title mx-3'>
                  <small>Privacy Policy</small>{' '}
                </p>
              </a>
              <a href='#!' passHref>
                <p className='cart-title'>
                  <small>Website Terms of Use</small>{' '}
                </p>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
