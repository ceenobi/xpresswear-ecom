import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

export default function HelpMenu() {
  return (
    <Container className='mt-2 py-5'>
      <Row className='justify-content-evenly'>
        <Col lg={3}>
          <div>
            <Image
              src='https://res.cloudinary.com/ceenobi/image/upload/v1641887944/Fashion/548760_99999_0099_002_100_0000_Light_izsjzl.webp'
              width={250}
              height={300}
              alt='cloth'
            />
          </div>
        </Col>
        <Col lg={9}>
          <div className='d-flex justify-content-between border-bottom py-3'>
            <p className='cart-text'>Help</p>
            <Link href='/' passHref>
              <Button variant='info' size='sm' className='fw-bold px-3'>
                <small>EMAIL US</small>
              </Button>
            </Link>
          </div>
          <div className='d-flex justify-content-between mt-4'>
            <Col lg={4}>
              <div>
                <ul className='list-unstyled mb-0'>
                  <li>
                    <Link href='/' passHref>
                     ORDER LOOKUP
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4}>
              <ul className='list-unstyled mb-0 '>
                <li>
                  <Link href='/' passHref>
                SHIPING
                  </Link>
                </li>
              </ul>
            </Col>
            <Col lg={4}>
              <ul className='list-unstyled mb-0 '>
                <li>
                  <Link href='/' passHref>
                    CONTACT
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
