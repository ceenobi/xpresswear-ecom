import React from 'react'
import {Button, Row, Col, Container } from 'react-bootstrap'
import Link from 'next/link'
import styled from 'styled-components'
import Footer from './Footer'

export default function BannerProducts() {
  return (
    <>
      <Bage>
        <Container fluid>
          <Row>
            <Col lg={5} className='d-none d-lg-block px-0'>
              <div className='text'>
                <h2 className='text-uppercase'>Wears</h2>
                <p>
                  <small>Clothing Fashion</small>
                </p>
                <Link href='/shop/clothing' passHref>
                  <Button variant='dark' size='lg'>
                    <i className='bi bi-cart-fill mx-2'></i>
                    <small>SHOP</small>
                  </Button>
                </Link>
              </div>
              <div className='text'>
                <h2 className='text-uppercase'>Time piece</h2>
                <p>
                  <small>Acccessories</small>
                </p>
                <Link href='/shop/wristwatch' passHref>
                  <Button variant='dark' size='lg'>
                    <i className='bi bi-cart-fill mx-2'></i>
                    <small>SHOP</small>
                  </Button>
                </Link>
              </div>
              <div className='text'>
                <h2 className='text-uppercase'>Luxury feet</h2>
                <p>
                  <small>Foot flex</small>
                </p>
                <Link href='/shop/footwear' passHref>
                  <Button variant='dark' size='lg'>
                    <i className='bi bi-cart-fill mx-2'></i>
                    <small>SHOP</small>
                  </Button>
                </Link>
              </div>
              <div className='text'>
                <h2 className='text-uppercase'>Make a statement</h2>
                <p>
                  <small>Fashion bag</small>
                </p>
                <Link href='/shop/bag' passHref>
                  <Button variant='dark' size='lg'>
                    <i className='bi bi-cart-fill mx-2'></i>
                    <small>SHOP</small>
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={7} className='d-none d-lg-block px-0'>
              <div className='parallax bg1'></div>
              <div className='parallax bg2'></div>
              <div className='parallax bg3'></div>
              <div className='parallax bg4'></div>
            </Col>
          </Row>
        </Container>
        <div className='move d-none d-lg-block'>
          <Footer />
        </div>

        {/* smaller screens */}
        <Container fluid>
          <Row>
            <Col className='d-lg-none px-0'>
              <div className='parallax bg1'></div>
              <div className='text py-4'>
                <h2 className='text-uppercase'>Wears</h2>
                <p>Clothing Fashion</p>
                <Link href='/shop/clothing' passHref>
                  <Button variant='dark' size='lg'>
                    <i className='bi bi-cart-fill mx-2'></i>
                    <small>SHOP</small>
                  </Button>
                </Link>
              </div>
              <div className='parallax bg2'></div>
              <div className='text py-4'>
                <h2 className='text-uppercase'>Time piece</h2>
                <p>Acccessories</p>
                <Link href='/shop/wristwatch' passHref>
                  <Button variant='dark' size='lg'>
                    <i className='bi bi-cart-fill mx-2'></i>
                    SHOP
                  </Button>
                </Link>
              </div>
              <div className='parallax bg3'></div>
              <div className='text py-4'>
                <h2 className='text-uppercase'>Luxury feet</h2>
                <p>Foot flex</p>
                <Link href='/shop/footwear' passHref>
                  <Button variant='dark' size='lg'>
                    <i className='bi bi-cart-fill mx-2'></i>
                    <small>SHOP</small>
                  </Button>
                </Link>
              </div>
              <div className='parallax bg4'></div>
              <div className='text py-4'>
                <h2 className='text-uppercase'>Make a statement</h2>
                <p>Fashion bag</p>
                <Link href='/shop/bag' passHref>
                  <Button variant='dark' size='lg'>
                    <i className='bi bi-cart-fill mx-2'></i>
                    <small>SHOP</small>
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        <div className='move d-lg-none'>
          <Footer />
        </div>
      </Bage>
    </>
  )
}

const Bage = styled.div`
  .parallax {
    height: 50%;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .move {
    margin-top: 142.58rem;
  }

  .bg1 {
    background-image: url('https://res.cloudinary.com/ceenobi/image/upload/v1640282102/Fashion/photo-1540221652346-e5dd6b50f3e7_ouhq4h.webp');
  }
  .bg2 {
    background-image: url('https://res.cloudinary.com/ceenobi/image/upload/v1640290703/Fashion/tsaush-aKmyHlgB09o-unsplash_hxkag6.webp');
  }
  .bg3 {
    background-image: url('https://res.cloudinary.com/ceenobi/image/upload/v1640291577/Fashion/malvestida-magazine-DMl5gG0yWWY-unsplash_shtk8e.webp');
  }
  .bg4 {
    background-image: url('https://res.cloudinary.com/ceenobi/image/upload/v1640292714/Fashion/laura-chouette-Y71FDi_jma8-unsplash_xkdkmq.webp');
  }

  .text {
    height: 50%;
    font-size: 36px;
    text-align: center;
    padding-top: 400px;
    top: 30%;
    left: 30%;
  }
  @media screen and (max-width: 1024px) and (min-width: 993px) {
    .parallax {
      height: 35%;
    }
    .text {
      padding-top: 400px;
      height: 35%;
      font-size: 30px;
    }
    .move {
      margin-top: 55.4rem;
    }
  }
  @media screen and (max-width: 992px) and (min-width: 767px) {
    .parallax {
      height: 60%;
      background-attachment: scroll;
    }
    .text {
      padding-top: 200px;
      height: 25%;
      font-size: 30px;
    }
    .move {
      margin-top: 125rem;
    }
  }
  @media screen and (max-width: 760px) and (min-width: 350px) {
    .parallax {
      height: 60%;
      background-attachment: scroll;
    }
    .text {
      padding-top: 200px;
      height: 30%;
      font-size: 30px;
    }
    .move {
      margin-top: 130rem;
    }
  }
  @media (max-width: 300px) {
    .parallax {
      background-attachment: scroll;
    }
    .move {
      margin-top: 100rem;
    }
  }
`
