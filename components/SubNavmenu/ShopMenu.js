import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import Link from 'next/link'



export default function ShopMenu() {
    return (
      <Container className='mt-2 py-5'>
        <Row className='justify-content-center'>
          <Col lg={8}>
            <div className='d-flex justify-content-between border-bottom py-2'>
              <p className='cart-text'>Special Edition</p>
              <Link href='/' passHref>
                <Button variant='info' className='shadow fw-bold'>
                  latest drop
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className='mt-4 justify-content-center'>
          <Col lg={4}>
            <div>
              <p className='cart-text'>ACTIVE DROPS</p>
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
            <p className='cart-text'>RETIRED DROPS</p>
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
          </Col>
        </Row>
      </Container>
    )
}
