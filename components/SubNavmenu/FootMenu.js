import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

export default function FootMenu() {
  return (
    <Container className='mt-2 py-5'>
      <Row className='justify-content-evenly'>
        <Col lg={3}>
          <div>
            <Image
              src='https://res.cloudinary.com/ceenobi/image/upload/v1638978465/Fashion/sneakers_gucci_hs2czg.webp'
              width={250}
              height={300}
              alt='cloth'
            />
          </div>
        </Col>
        <Col lg={9}>
          <div className='d-flex justify-content-between border-bottom py-3'>
            <p className='cart-text'>Footwear</p>
            <Link href='/' passHref>
              <Button variant='info' size='sm' className='fw-bold px-3'>
                <small>SHOP ALL</small>
              </Button>
            </Link>
          </div>
          <div className='d-flex justify-content-between mt-4'>
            <Col lg={4}>
              <div>
                <p className='cart-text'>POPULAR</p>
                <ul className='list-unstyled mb-0 '>
                  <li>
                    <Link href='/' passHref>
                      Gucci
                    </Link>
                  </li>
                  <li>
                    <Link href='/' passHref>
                      Coming soon
                    </Link>
                  </li>
                  <li>
                    <Link href='/' passHref>
                      Coming soon
                    </Link>
                  </li>
                  <li>
                    <Link href='/' passHref>
                      Coming soon
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4}>
              <p className='cart-text'>NEW</p>
              <ul className='list-unstyled mb-0 '>
                <li>
                  <Link href='/' passHref>
                    Gucci
                  </Link>
                </li>
                <li>
                  <Link href='/' passHref>
                    Coming soon
                  </Link>
                </li>
              </ul>
            </Col>
            <Col lg={4}>
              <p className='cart-text'>NEW</p>
              <ul className='list-unstyled mb-0 '>
                <li>
                  <Link href='/' passHref>
                    Gucci
                  </Link>
                </li>
                <li>
                  <Link href='/' passHref>
                    Coming soon
                  </Link>
                </li>
              </ul>
            </Col>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
