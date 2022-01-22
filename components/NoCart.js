import React from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap'
import Link from 'next/link'
import Head from 'next/head'
import PreFooter from './PreFooter'
import Emptycart from '../public/shopping-cart-svgrepo-com.svg'
import Image from 'next/image'

export default function NoCart() {
  return (
    <div className='mt-md-5'>
      <Head>
        <title>Empty shopping cart</title>
      </Head>
      <div>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Cart</h1>
        </Container>
        <div className='py-5 px-4 main-bg'>
          <Row className='justify-content-center'>
            <Col lg={4} md={4}>
              <div className='mt-5 empty-cart mx-auto'>
                <Image
                  src={Emptycart}
                  width={300}
                  height={300}
                  alt='emptycart'
                />
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className='py-5 px-lg-4 mt-lg-5'>
                <h1 className='mb-4'>
                  {"I'm "} sorry, Human. <br />
                  {"I'm "} afraid there's nothing here.
                </h1>
                <p>
                  It appears that your shopping cart is empty. {"We're"} eagerly
                  awaiting your money. Remember: the more you spend, the quicker
                  we all get to buy Lamborghinis.
                </p>
                <div className='py-md-2'>
                  <Link href='/shop/products' passHref>
                    <Button variant='info' size='lg' className='fw-bold shadow'>
                      Shop{' '}
                      <i className='bi bi-chevron-right text-dark mx-2'></i>
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <PreFooter />
      </div>
    </div>
  )
}
